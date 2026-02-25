export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
  linkedin: string;
  website: string;
  photo: string | null;
  jobTitle: string;
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  city: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
}

export type SkillLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'expert';

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
}

export type LanguageProficiency =
  | 'basic'
  | 'conversational'
  | 'fluent'
  | 'native';

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  heading: string;
  description: string;
}

export interface CVData {
  id: string;
  title: string;
  templateId: string;
  colorScheme: string;
  includePhoto: boolean;
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  customSections: CustomSection[];
  status: 'draft' | 'complete';
  createdAt: string;
  updatedAt: string;
}

export interface CVCheckResult {
  score: number;
  maxScore: number;
  percentage: number;
  issues: CVCheckIssue[];
  passed: CVCheckRule[];
}

export interface CVCheckIssue {
  id: string;
  category: CVCheckCategory;
  severity: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  suggestion: string;
}

export interface CVCheckRule {
  id: string;
  category: CVCheckCategory;
  title: string;
  description: string;
}

export type CVCheckCategory =
  | 'content'
  | 'formatting'
  | 'completeness'
  | 'impact'
  | 'ats';

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  postcode: '',
  linkedin: '',
  website: '',
  photo: null,
  jobTitle: '',
};

export const DEFAULT_CV_DATA: Omit<CVData, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Untitled CV',
  templateId: 'modern',
  colorScheme: '#002d6b',
  includePhoto: false,
  personalInfo: DEFAULT_PERSONAL_INFO,
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  customSections: [],
  status: 'draft',
};
