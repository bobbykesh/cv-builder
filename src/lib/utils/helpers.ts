import { v4 as uuidv4 } from 'uuid';

export const generateId = (): string => uuidv4();

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });
};

export const getCurrentDate = (): string => {
  return new Date().toISOString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const getInitials = (firstName: string, lastName: string): string => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${first}${last}`;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
  return phoneRegex.test(phone);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getFileExtension = (format: string): string => {
  const extensions: Record<string, string> = {
    pdf: '.pdf',
    word: '.docx',
    txt: '.txt',
  };
  return extensions[format] || '.pdf';
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const calculateCVCompleteness = (cv: {
  personalInfo: { firstName: string; lastName: string; email: string };
  summary: string;
  experience: unknown[];
  education: unknown[];
  skills: unknown[];
}): number => {
  let score = 0;
  const total = 6;

  if (cv.personalInfo.firstName && cv.personalInfo.lastName) score++;
  if (cv.personalInfo.email) score++;
  if (cv.summary && cv.summary.length > 20) score++;
  if (cv.experience.length > 0) score++;
  if (cv.education.length > 0) score++;
  if (cv.skills.length > 0) score++;

  return Math.round((score / total) * 100);
};
