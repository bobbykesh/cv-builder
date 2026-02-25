import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { CVData, DEFAULT_CV_DATA, PersonalInfo, ExperienceItem, EducationItem, SkillItem } from '@/types/cv';
import { generateId, getCurrentDate } from './helpers';

// Set worker source
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

// ---- TYPES & INTERFACES ----
interface ParsedSection {
  type: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'unknown';
  content: string[];
}

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

// ---- EXTRACTION HELPERS ----
const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    // Join items with a space, but preserve newlines based on Y position (simplified)
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

// ---- INTELLIGENT PROCESSING ----
const processTextToCV = (text: string): Partial<CVData> => {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  const sections = segmentTextIntoSections(lines);

  const personalInfo = extractPersonalInfo(sections.find(s => s.type === 'personal')?.content || [], text);
  const experience = extractExperience(sections.find(s => s.type === 'experience')?.content || []);
  const education = extractEducation(sections.find(s => s.type === 'education')?.content || []);
  const skills = extractSkills(sections.find(s => s.type === 'skills')?.content || []);
  const summary = extractSummary(sections.find(s => s.type === 'summary')?.content || []);

  return {
    ...DEFAULT_CV_DATA,
    id: generateId(),
    title: 'Imported CV (Revamped)',
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

// ---- SECTION SEGMENTATION ----
const segmentTextIntoSections = (lines: string[]): ParsedSection[] => {
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection = { type: 'personal', content: [] }; // Assume start is personal info

  // Regex patterns for section headers
  const patterns = {
    experience: /^(work|professional|employment)\s+(experience|history|background)/i,
    education: /^(education|academic|qualifications|background)/i,
    skills: /^(skills|technical|technologies|competencies|expertise)/i,
    summary: /^(summary|profile|about|objective)/i,
    projects: /^(projects|portfolio)/i,
  };

  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    // Check if line is a header (short & matches pattern)
    if (line.length < 40) {
      if (patterns.experience.test(lowerLine)) {
        sections.push(currentSection);
        currentSection = { type: 'experience', content: [] };
        continue;
      }
      if (patterns.education.test(lowerLine)) {
        sections.push(currentSection);
        currentSection = { type: 'education', content: [] };
        continue;
      }
      if (patterns.skills.test(lowerLine)) {
        sections.push(currentSection);
        currentSection = { type: 'skills', content: [] };
        continue;
      }
      if (patterns.summary.test(lowerLine)) {
        sections.push(currentSection);
        currentSection = { type: 'summary', content: [] };
        continue;
      }
    }
    
    currentSection.content.push(line);
  }
  sections.push(currentSection); // Push the last section

  return sections;
};

// ---- DATA EXTRACTORS ----

// 1. Personal Info
const extractPersonalInfo = (lines: string[], fullText: string): Partial<PersonalInfo> => {
  // Regex for contact info
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const phoneRegex = /((?:\+|00)[1-9][0-9 \-\(\)\.]{7,32})|(0\d{10})|(0\d{3,4}[ \-]\d{3}[ \-]\d{3,4})/;
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/;

  const emailMatch = fullText.match(emailRegex);
  const phoneMatch = fullText.match(phoneRegex);
  const linkMatch = fullText.match(urlRegex);

  // Name guessing: Usually the first line of the document
  // Logic: Exclude lines that look like emails, numbers, or addresses
  let firstName = '';
  let lastName = '';
  
  if (lines.length > 0) {
    const potentialName = lines[0];
    if (potentialName.split(' ').length < 5 && !potentialName.includes('@')) {
      const parts = potentialName.split(' ');
      firstName = parts[0];
      lastName = parts.slice(1).join(' ');
    }
  }

  return {
    firstName: firstName || 'Your',
    lastName: lastName || 'Name',
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0] : '',
    website: linkMatch ? linkMatch[0] : '',
    jobTitle: lines[1] && lines[1].length < 50 ? lines[1] : '', // Guess second line is job title
    city: '', // Hard to guess accurately without API
    country: '',
  };
};

// 2. Experience
const extractExperience = (lines: string[]): ExperienceItem[] => {
  const experiences: ExperienceItem[] = [];
  let currentExp: Partial<ExperienceItem> | null = null;

  // Date Pattern: "Jan 2020 - Present" or "2018-2019" or "01/2020"
  const datePattern = /((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|\d{4})\s*(-|–|to)\s*(present|current|now|\d{1,2}\/\d{4}|\d{4}|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4})/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isDateLine = datePattern.test(line);

    if (isDateLine) {
      // Save previous item if exists
      if (currentExp) {
        experiences.push(finalizeExperience(currentExp));
      }

      // Start new item
      // Heuristic: The line BEFORE the date is usually the Company or Title
      let company = 'Unknown Company';
      let title = 'Professional';

      if (i > 0) {
        // Line above date
        const prevLine = lines[i - 1];
        if (prevLine.includes(',')) {
           const parts = prevLine.split(',');
           title = parts[0].trim();
           company = parts[1].trim();
        } else {
           title = prevLine;
        }
      }

      // Parse dates from current line
      const dates = line.match(datePattern);
      const startDate = dates ? dates[1] : '';
      const endDate = dates ? dates[4] : '';

      currentExp = {
        id: generateId(),
        jobTitle: title,
        company: company,
        startDate: startDate,
        endDate: endDate,
        current: endDate.toLowerCase().includes('present'),
        bullets: []
      };
    } else if (currentExp) {
      // It's a bullet point or description
      if (line.length > 5) { // Filter noise
        currentExp.bullets?.push(line.replace(/^[•\-\*]\s*/, '')); // Clean bullet chars
      }
    }
  }

  // Push last item
  if (currentExp) {
    experiences.push(finalizeExperience(currentExp));
  }

  return experiences;
};

const finalizeExperience = (exp: Partial<ExperienceItem>): ExperienceItem => {
  return {
    id: exp.id || generateId(),
    jobTitle: exp.jobTitle || 'Role',
    company: exp.company || 'Company',
    city: '',
    startDate: exp.startDate || '',
    endDate: exp.endDate || '',
    current: exp.current || false,
    description: '',
    bullets: exp.bullets || [],
  };
};

// 3. Education
const extractEducation = (lines: string[]): EducationItem[] => {
  const education: EducationItem[] = [];
  let currentEdu: Partial<EducationItem> | null = null;
  const datePattern = /\d{4}/; // Simple year match

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const hasDate = datePattern.test(line);

    // Heuristic: If line contains "University", "College", "School" OR "Degree", "Bachelor", "Master"
    const isSchool = /university|college|school|institute/i.test(line);
    const isDegree = /bachelor|master|phd|diploma|degree|bsc|msc|ba|ma/i.test(line);

    if (isSchool || isDegree) {
      if (currentEdu && !currentEdu.school && isSchool) {
         currentEdu.school = line;
      } else if (currentEdu && !currentEdu.degree && isDegree) {
         currentEdu.degree = line;
      } else {
         // Start new
         if (currentEdu) education.push(finalizeEducation(currentEdu));
         currentEdu = {
           id: generateId(),
           school: isSchool ? line : '',
           degree: isDegree ? line : '',
           startDate: '',
           endDate: ''
         };
      }
    }

    if (currentEdu && hasDate) {
       const dates = line.match(/\d{4}/g);
       if (dates && dates.length > 0) {
         currentEdu.endDate = dates[dates.length - 1]; // Graduation year
         if (dates.length > 1) currentEdu.startDate = dates[0];
       }
    }
  }

  if (currentEdu) education.push(finalizeEducation(currentEdu));
  return education;
};

const finalizeEducation = (edu: Partial<EducationItem>): EducationItem => {
  return {
    id: edu.id || generateId(),
    school: edu.school || 'University',
    degree: edu.degree || 'Degree',
    city: '',
    startDate: edu.startDate || '',
    endDate: edu.endDate || '',
    description: '',
  };
};

// 4. Skills
const extractSkills = (lines: string[]): SkillItem[] => {
  const skills: SkillItem[] = [];
  
  // Flatten lines into one string if they look like a comma-separated list
  const fullText = lines.join(' ');
  
  let candidates: string[] = [];

  if (fullText.includes(',')) {
    // Comma separated
    candidates = fullText.split(',').map(s => s.trim());
  } else {
    // Newline separated
    candidates = lines.map(s => s.trim());
  }

  // Filter valid skills (2-30 chars)
  candidates = candidates.filter(s => s.length > 2 && s.length < 30);

  candidates.slice(0, 15).forEach(skill => {
    skills.push({
      id: generateId(),
      name: skill,
      level: 'intermediate'
    });
  });

  return skills;
};

// 5. Summary
const extractSummary = (lines: string[]): string => {
  return lines.join(' ').trim();
};
