export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'PerfectCV';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'Build your perfect CV for free';

export const STORAGE_KEYS = {
  CVS: 'perfectcv_cvs',
  LETTERS: 'perfectcv_letters',
  SETTINGS: 'perfectcv_settings',
  CURRENT_CV: 'perfectcv_current_cv',
  CURRENT_LETTER: 'perfectcv_current_letter',
} as const;

export const CV_BUILDER_STEPS = [
  { id: 'template', label: 'Template', icon: 'layout' },
  { id: 'personal', label: 'Personal Info', icon: 'user' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'education', label: 'Education', icon: 'graduation-cap' },
  { id: 'skills', label: 'Skills', icon: 'star' },
  { id: 'summary', label: 'Summary', icon: 'file-text' },
  { id: 'preview', label: 'Preview', icon: 'eye' },
] as const;

export const LETTER_BUILDER_STEPS = [
  { id: 'template', label: 'Template', icon: 'layout' },
  { id: 'personal', label: 'Your Info', icon: 'user' },
  { id: 'recipient', label: 'Recipient', icon: 'building' },
  { id: 'content', label: 'Content', icon: 'edit' },
  { id: 'preview', label: 'Preview', icon: 'eye' },
] as const;

export const EXPORT_FORMATS = [
  { id: 'pdf', label: 'PDF', icon: 'file-text', description: 'Best for sharing and printing' },
  { id: 'word', label: 'Word', icon: 'file', description: 'Easy to edit later' },
  { id: 'txt', label: 'TXT', icon: 'file-minus', description: 'Plain text format' },
] as const;

export const NAV_LINKS = [
  { label: 'Build CV', href: '/build-cv', isExternal: false },
  { label: 'Cover Letter', href: '/build-letter', isExternal: false },
  { label: 'CV Check', href: '/cv-check', isExternal: false },
  { label: 'My CVs', href: '/dashboard', isExternal: false },
] as const;

export const FOOTER_LINKS = [
  { label: 'HOME', href: '/', isExternal: false },
  { label: 'PRIVACY POLICY', href: '/privacy', isExternal: false },
  { label: 'TERMS & CONDITIONS', href: '/terms', isExternal: false },
  { label: 'CONTACT US', href: '/contact', isExternal: false },
] as const;

export const SOCIAL_PROOF_STATS = {
  satisfactionRate: 85,
  surveyUsers: 11242,
  jobLandingBoost: 30,
  recruiterResponseBoost: 42,
  surveySample: 1133,
} as const;

export const MAX_CVS = 50;
export const MAX_EXPERIENCE_ITEMS = 20;
export const MAX_EDUCATION_ITEMS = 10;
export const MAX_SKILLS = 30;
export const MAX_LANGUAGES = 10;
export const MAX_CERTIFICATIONS = 15;
export const MAX_CUSTOM_SECTIONS = 5;
