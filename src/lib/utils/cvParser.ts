import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { CVData, DEFAULT_CV_DATA, PersonalInfo } from '@/types/cv';
import { generateId, getCurrentDate } from './helpers';

// Set worker source
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export const parseCV = async (file: File): Promise<Partial<CVData>> => {
  let text = '';

  if (file.type === 'application/pdf') {
    text = await extractTextFromPDF(file);
  } else if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    text = await extractTextFromDocx(file);
  } else {
    // Try reading as plain text
    text = await file.text();
  }

  return mapTextToCV(text);
};

const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
};

const extractTextFromDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const mapTextToCV = (text: string): Partial<CVData> => {
  const lines = text.split('\n').filter((line) => line.trim() !== '');
  
  // Basic regex matchers
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const phoneRegex = /((?:\+|00)[1-9][0-9 \-\(\)\.]{7,32})|(0\d{10})|(0\d{3,4}[ \-]\d{3}[ \-]\d{3,4})/;
  
  // Extract Personal Info
  const emailMatch = text.match(emailRegex);
  const phoneMatch = text.match(phoneRegex);
  
  // Guess Name (First line that isn't a label)
  let firstName = '';
  let lastName = '';
  if (lines.length > 0) {
    const nameLine = lines[0].trim();
    const parts = nameLine.split(' ');
    if (parts.length >= 2) {
      firstName = parts[0];
      lastName = parts.slice(1).join(' ');
    }
  }

  const personalInfo: PersonalInfo = {
    ...DEFAULT_CV_DATA.personalInfo,
    firstName: firstName || 'Your',
    lastName: lastName || 'Name',
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0] : '',
    jobTitle: 'Professional', // Fallback
  };

  // Heuristic: Content Extraction
  // This is a naive implementation. In a real backend we would use AI.
  // Here we just map matched text into Summary for the user to edit.
  
  return {
    ...DEFAULT_CV_DATA,
    id: generateId(),
    title: 'Imported CV (Revamped)',
    personalInfo,
    summary: text.slice(0, 500) + '...', // Grab first chunk as summary context
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    templateId: 'modern', // Automatically revamp to "Modern"
    colorScheme: '#002d6b',
  };
};
