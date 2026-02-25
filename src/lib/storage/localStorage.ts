import { CVData } from '@/types/cv';
import { LetterData } from '@/types/letter';
import { STORAGE_KEYS } from '@/lib/utils/constants';

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// Generic get function
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (!isLocalStorageAvailable()) return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

// Generic set function
export const setToStorage = <T>(key: string, value: T): boolean => {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
};

// Generic remove function
export const removeFromStorage = (key: string): boolean => {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
    return false;
  }
};

// CV-specific functions
export const getAllCVs = (): CVData[] => {
  return getFromStorage<CVData[]>(STORAGE_KEYS.CVS, []);
};

export const saveAllCVs = (cvs: CVData[]): boolean => {
  return setToStorage(STORAGE_KEYS.CVS, cvs);
};

export const getCVById = (id: string): CVData | null => {
  const cvs = getAllCVs();
  return cvs.find((cv) => cv.id === id) || null;
};

export const saveCV = (cv: CVData): boolean => {
  const cvs = getAllCVs();
  const existingIndex = cvs.findIndex((c) => c.id === cv.id);
  
  if (existingIndex >= 0) {
    cvs[existingIndex] = { ...cv, updatedAt: new Date().toISOString() };
  } else {
    cvs.push(cv);
  }
  
  return saveAllCVs(cvs);
};

export const deleteCV = (id: string): boolean => {
  const cvs = getAllCVs();
  const filtered = cvs.filter((cv) => cv.id !== id);
  return saveAllCVs(filtered);
};

export const duplicateCV = (id: string, newId: string): CVData | null => {
  const original = getCVById(id);
  if (!original) return null;
  
  const duplicate: CVData = {
    ...original,
    id: newId,
    title: `${original.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  saveCV(duplicate);
  return duplicate;
};

// Letter-specific functions
export const getAllLetters = (): LetterData[] => {
  return getFromStorage<LetterData[]>(STORAGE_KEYS.LETTERS, []);
};

export const saveAllLetters = (letters: LetterData[]): boolean => {
  return setToStorage(STORAGE_KEYS.LETTERS, letters);
};

export const getLetterById = (id: string): LetterData | null => {
  const letters = getAllLetters();
  return letters.find((letter) => letter.id === id) || null;
};

export const saveLetter = (letter: LetterData): boolean => {
  const letters = getAllLetters();
  const existingIndex = letters.findIndex((l) => l.id === letter.id);
  
  if (existingIndex >= 0) {
    letters[existingIndex] = { ...letter, updatedAt: new Date().toISOString() };
  } else {
    letters.push(letter);
  }
  
  return saveAllLetters(letters);
};

export const deleteLetter = (id: string): boolean => {
  const letters = getAllLetters();
  const filtered = letters.filter((letter) => letter.id !== id);
  return saveAllLetters(filtered);
};

// Current CV/Letter being edited
export const getCurrentCVId = (): string | null => {
  return getFromStorage<string | null>(STORAGE_KEYS.CURRENT_CV, null);
};

export const setCurrentCVId = (id: string | null): boolean => {
  if (id === null) {
    return removeFromStorage(STORAGE_KEYS.CURRENT_CV);
  }
  return setToStorage(STORAGE_KEYS.CURRENT_CV, id);
};

export const getCurrentLetterId = (): string | null => {
  return getFromStorage<string | null>(STORAGE_KEYS.CURRENT_LETTER, null);
};

export const setCurrentLetterId = (id: string | null): boolean => {
  if (id === null) {
    return removeFromStorage(STORAGE_KEYS.CURRENT_LETTER);
  }
  return setToStorage(STORAGE_KEYS.CURRENT_LETTER, id);
};

// Settings
export interface AppSettings {
  theme: 'light' | 'dark';
  autoSave: boolean;
  autoSaveInterval: number;
  defaultTemplate: string;
  defaultColor: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  autoSave: true,
  autoSaveInterval: 30000,
  defaultTemplate: 'modern',
  defaultColor: '#002d6b',
};

export const getSettings = (): AppSettings => {
  return getFromStorage<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
};

export const saveSettings = (settings: Partial<AppSettings>): boolean => {
  const current = getSettings();
  return setToStorage(STORAGE_KEYS.SETTINGS, { ...current, ...settings });
};

// Clear all data
export const clearAllData = (): boolean => {
  try {
    removeFromStorage(STORAGE_KEYS.CVS);
    removeFromStorage(STORAGE_KEYS.LETTERS);
    removeFromStorage(STORAGE_KEYS.CURRENT_CV);
    removeFromStorage(STORAGE_KEYS.CURRENT_LETTER);
    removeFromStorage(STORAGE_KEYS.SETTINGS);
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

// Get storage usage info
export const getStorageInfo = (): { used: number; available: number; percentage: number } => {
  if (!isLocalStorageAvailable()) {
    return { used: 0, available: 0, percentage: 0 };
  }
  
  let used = 0;
  for (const key in window.localStorage) {
    if (Object.prototype.hasOwnProperty.call(window.localStorage, key)) {
      used += window.localStorage.getItem(key)?.length || 0;
    }
  }
  
  // localStorage typically has 5MB limit
  const available = 5 * 1024 * 1024;
  const percentage = (used / available) * 100;
  
  return { used, available, percentage };
};
