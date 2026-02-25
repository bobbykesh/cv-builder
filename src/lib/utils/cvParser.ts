import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { CVData, DEFAULT_CV_DATA, PersonalInfo, ExperienceItem, EducationItem, SkillItem } from '@/types/cv';
import { generateId, getCurrentDate } from './helpers';

// Set worker source
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

// ---- TYPES ----
interface ParsedSection {
  type: 'header' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'unknown';
  content: string[];
}

interface ExtractionConfidence {
  name: boolean;
  jobTitle: boolean;
  email: boolean;
  phone: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
}

// ---- UTILS ----
const hasEmail = (s: string) => /@/.test(s);
const hasDigit = (s: string) => /\d/.test(s);
const isSentence = (s: string) => /[.!?]/.test(s) || s.split(/\s+/).length > 10;
const isAllCaps = (s: string) => /^[A-Z\s]+$/.test(s) && s.length > 3;
const wordCount = (s: string) => s.trim().split(/\s+/).length;
const cleanText = (s: string) => s.replace(/[^a-zA-Z0-9\s@.,-]/g, '').trim();

// ---- MAIN PARSER FUNCTION ----
export const parseCV = async (file: File): Promise<Partial<CVData>> => {
  let text = '';

  try {
    if (file.type === 'application/pdf') {
      text = await extractTextFromPDF(file);
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      text = await extractTextFromDocx(file);
    } else {
      text = await file.text();
    }
  } catch (err) {
    console.error('File reading failed:', err);
    throw new Error('Failed to read file content');
  }

  return processTextToCV(text);
};

// ---- RAW TEXT EXTRACTION ----
const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join('\n');
    fullText += pageText + '\n';
  }
  return fullText;
};

const extractTextFromDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

// ---- CORE PROCESSING LOGIC ----
const processTextToCV = (text: string): Partial<CVData> => {
  // 1. Clean and split lines
  const rawLines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  
  // 2. Identify Sections
  const sections = segmentTextIntoSections(rawLines);

  // 3. Extract Data with Confidence Gating
  const headerSection = sections.find(s => s.type === 'header')?.content || rawLines.slice(0, 10);
  const personalInfo = extractPersonalInfo(headerSection, text);
  
  const experienceSection = sections.find(s => s.type === 'experience')?.content || [];
  const experience = extractExperience(experienceSection);

  const educationSection = sections.find(s => s.type === 'education')?.content || [];
  const education = extractEducation(educationSection);

  const skillsSection = sections.find(s => s.type === 'skills')?.content || [];
  const skills = extractSkills(skillsSection);

  const summarySection = sections.find(s => s.type === 'summary')?.content || [];
  const summary = summarySection.join(' ');

  // 4. Construct CV Data
  return {
    ...DEFAULT_CV_DATA,
    id: generateId(),
    title: personalInfo.firstName ? `${personalInfo.firstName}'s CV (Imported)` : 'Imported CV',
    personalInfo: { ...DEFAULT_CV_DATA.personalInfo, ...personalInfo },
    summary,
    experience,
    education,
    skills,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    templateId: 'modern',
    colorScheme: '#002d6b',
  };
};

// ---- SEGMENTATION ENGINE ----
const segmentTextIntoSections = (lines: string[]): ParsedSection[] => {
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection = { type: 'header', content: [] };

  const patterns = {
    experience: /^(work\s+history|professional\s+experience|employment|experience|career\s+history)/i,
    education: /^(education|academic|qualifications|academic\s+background)/i,
    skills: /^(skills|technical\s+skills|core\s+competencies|technologies|expertise)/i,
    summary: /^(summary|professional\s+summary|profile|about\s+me|objective)/i,
    projects: /^(projects|key\s+projects|portfolio)/i,
  };

  for (const line of lines) {
    const cleanLine = line.toLowerCase().trim();
    
    // Header detection (short line, matches keywords)
    if (line.length < 40) {
      if (patterns.experience.test(cleanLine)) {
        sections.push(currentSection);
        currentSection = { type: 'experience', content: [] };
        continue;
      }
      if (patterns.education.test(cleanLine)) {
        sections.push(currentSection);
        currentSection = { type: 'education', content: [] };
        continue;
      }
      if (patterns.skills.test(cleanLine)) {
        sections.push(currentSection);
        currentSection = { type: 'skills', content: [] };
        continue;
      }
      if (patterns.summary.test(cleanLine)) {
        sections.push(currentSection);
        currentSection = { type: 'summary', content: [] };
        continue;
      }
    }
    currentSection.content.push(line);
  }
  sections.push(currentSection);
  return sections;
};

// ---- EXTRACTION LOGIC (CONFIDENCE GATED) ----

// 1. Personal Info Extraction
const extractPersonalInfo = (headerLines: string[], fullText: string): Partial<PersonalInfo> => {
  // A. Score Name Candidates
  const scoreName = (line: string): number => {
    let score = 0;
    if (wordCount(line) >= 2 && wordCount(line) <= 4) score += 3; // Ideal name length
    if (!hasDigit(line) && !hasEmail(line)) score += 3; // No noise
    if (isAllCaps(line)) score += 2; // Often names are capitalized
    if (isSentence(line)) score -= 5; // Names aren't sentences
    if (/resume|curriculum|vitae|cv/i.test(line)) score -= 10; // Not header words
    return score;
  };

  const nameCandidate = headerLines
    .map(l => ({ l, s: scoreName(l) }))
    .sort((a, b) => b.s - a.s)[0];

  const nameLine = nameCandidate?.s >= 5 ? cleanText(nameCandidate.l) : '';
  const nameParts = nameLine.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // B. Score Role Candidates
  const ROLE_KEYWORDS = /engineer|developer|designer|manager|analyst|consultant|officer|admin|assistant|specialist|director|lead|head/i;
  
  const scoreRole = (line: string): number => {
    let score = 0;
    if (line === nameLine) return -10; // Can't be name
    if (line.length < 60) score += 2;
    if (ROLE_KEYWORDS.test(line)) score += 5; // Contains job keyword
    if (hasDigit(line)) score -= 2;
    return score;
  };

  const roleCandidate = headerLines
    .map(l => ({ l, s: scoreRole(l) }))
    .sort((a, b) => b.s - a.s)[0];

  const jobTitle = roleCandidate?.s >= 4 ? cleanText(roleCandidate.l) : '';

  // C. Contact Info (Regex is reliable here)
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const phoneRegex = /((?:\+|00)[1-9][0-9 \-\(\)\.]{7,32})|(0\d{10})|(0\d{3,4}[ \-]\d{3}[ \-]\d{3,4})/;
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(linkedin\.com\/in\/[^\s]+)/;

  const contactText = headerLines.join(' '); // Scan only header for contact info to avoid old jobs
  const emailMatch = contactText.match(emailRegex);
  const phoneMatch = contactText.match(phoneRegex);
  const linkMatch = contactText.match(urlRegex);

  return {
    firstName,
    lastName,
    jobTitle,
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0] : '',
    linkedin: linkMatch ? linkMatch[0] : '',
    city: '', 
    country: '',
  };
};

// 2. Experience Extraction (Date Anchor Method)
const extractExperience = (lines: string[]): ExperienceItem[] => {
  const experiences: ExperienceItem[] = [];
  let currentExp: Partial<ExperienceItem> | null = null;

  // Pattern: "Jan 2020 - Present" or "2018 - 2022" or "01/2020"
  const datePattern = /((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|\d{4})\s*(-|–|to)\s*(present|current|now|\d{1,2}\/\d{4}|\d{4}|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4})/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (datePattern.test(line)) {
      // Finish previous item
      if (currentExp) experiences.push(finalizeExperience(currentExp));

      // Start new item
      // Look back 1-2 lines for Title/Company
      let title = 'Professional Role';
      let company = '';

      if (i > 0) {
        const prevLine = lines[i - 1];
        if (prevLine.includes(',')) { // "Software Engineer, Google"
           const parts = prevLine.split(',');
           title = parts[0].trim();
           company = parts[1].trim();
        } else if (prevLine.includes('|')) { // "Software Engineer | Google"
           const parts = prevLine.split('|');
           title = parts[0].trim();
           company = parts[1].trim();
        } else {
           title = prevLine; // Fallback: Line above date is title
           if (i > 1) company = lines[i - 2]; // Line above that is company?
        }
      }

      const dates = line.match(datePattern);
      
      currentExp = {
        id: generateId(),
        jobTitle: cleanText(title),
        company: cleanText(company),
        startDate: dates ? dates[1] : '',
        endDate: dates ? dates[4] : '',
        current: line.toLowerCase().includes('present') || line.toLowerCase().includes('current'),
        bullets: []
      };
    } else if (currentExp) {
      // It's a bullet point content
      const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
      if (cleanLine.length > 5 && !datePattern.test(cleanLine)) {
        currentExp.bullets?.push(cleanLine);
      }
    }
  }

  if (currentExp) experiences.push(finalizeExperience(currentExp));
  return experiences;
};

const finalizeExperience = (exp: Partial<ExperienceItem>): ExperienceItem => ({
  id: exp.id || generateId(),
  jobTitle: exp.jobTitle || 'Role',
  company: exp.company || 'Company',
  city: '',
  startDate: exp.startDate || '',
  endDate: exp.endDate || '',
  current: exp.current || false,
  description: '',
  bullets: exp.bullets || [],
});

// 3. Education Extraction (Keyword + Date Anchor)
const extractEducation = (lines: string[]): EducationItem[] => {
  const education: EducationItem[] = [];
  let currentEdu: Partial<EducationItem> | null = null;
  const yearPattern = /\b(19|20)\d{2}\b/; // Matches years like 1999, 2023

  for (const line of lines) {
    const isSchool = /university|college|school|institute/i.test(line);
    const isDegree = /bachelor|master|phd|diploma|degree|bsc|msc|ba|ma/i.test(line);
    const hasYear = yearPattern.test(line);

    if (isSchool || isDegree) {
      if (currentEdu && !currentEdu.school && isSchool) {
         currentEdu.school = cleanText(line);
      } else if (currentEdu && !currentEdu.degree && isDegree) {
         currentEdu.degree = cleanText(line);
      } else {
         // Start new item if we found a strong signal
         if (currentEdu) education.push(finalizeEducation(currentEdu));
         currentEdu = {
           id: generateId(),
           school: isSchool ? cleanText(line) : '',
           degree: isDegree ? cleanText(line) : '',
         };
      }
    }

    if (currentEdu && hasYear) {
       const dates = line.match(/\b(19|20)\d{2}\b/g);
       if (dates && dates.length > 0) {
         currentEdu.endDate = dates[dates.length - 1]; // Graduation year usually last
         if (dates.length > 1) currentEdu.startDate = dates[0];
       }
    }
  }

  if (currentEdu) education.push(finalizeEducation(currentEdu));
  return education;
};

const finalizeEducation = (edu: Partial<EducationItem>): EducationItem => ({
  id: edu.id || generateId(),
  school: edu.school || 'University',
  degree: edu.degree || 'Degree',
  city: '',
  startDate: edu.startDate || '',
  endDate: edu.endDate || '',
  description: '',
});

// 4. Skills Extraction (Noise Filtering)
const extractSkills = (lines: string[]): SkillItem[] => {
  const skills: SkillItem[] = [];
  
  // Strategy: Flatten, split by delimiter, filter noise
  const fullText = lines.join(' ');
  const delimiter = fullText.includes(',') ? ',' : fullText.includes('|') ? '|' : '\n';
  
  let candidates = delimiter === '\n' 
    ? lines 
    : fullText.split(delimiter);

  // Filter out sentences and junk
  candidates = candidates
    .map(s => s.trim())
    .filter(s => 
      s.length > 2 && 
      s.length < 25 && 
      wordCount(s) <= 3 && 
      !isSentence(s) &&
      !hasDigit(s)
    );

  // Take top 15
  candidates.slice(0, 15).forEach(skill => {
    skills.push({
      id: generateId(),
      name: skill,
      level: 'intermediate'
    });
  });

  return skills;
};
