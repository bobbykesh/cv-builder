import { get, set, del, clear, keys } from 'idb-keyval';
import { CVData } from '@/types/cv';
import { LetterData } from '@/types/letter';

const CV_PREFIX = 'cv_';
const LETTER_PREFIX = 'letter_';

// Check if IndexedDB is available
const isIndexedDBAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    return 'indexedDB' in window;
  } catch {
    return false;
  }
};

// CV Functions
export const saveCVToIDB = async (cv: CVData): Promise<boolean> => {
  if (!isIndexedDBAvailable()) return false;
  
  try {
    await set(`${CV_PREFIX}${cv.id}`, cv);
    return true;
  } catch (error) {
    console.error('Error saving CV to IndexedDB:', error);
    return false;
  }
};

export const getCVFromIDB = async (id: string): Promise<CVData | null> => {
  if (!isIndexedDBAvailable()) return null;
  
  try {
    const cv = await get(`${CV_PREFIX}${id}`);
    return cv || null;
  } catch (error) {
    console.error('Error getting CV from IndexedDB:', error);
    return null;
  }
};

export const getAllCVsFromIDB = async (): Promise<CVData[]> => {
  if (!isIndexedDBAvailable()) return [];
  
  try {
    const allKeys = await keys();
    const cvKeys = allKeys.filter((key) => 
      typeof key === 'string' && key.startsWith(CV_PREFIX)
    );
    
    const cvs: CVData[] = [];
    for (const key of cvKeys) {
      const cv = await get(key);
      if (cv) cvs.push(cv as CVData);
    }
    
    return cvs.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch (error) {
    console.error('Error getting all CVs from IndexedDB:', error);
    return [];
  }
};

export const deleteCVFromIDB = async (id: string): Promise<boolean> => {
  if (!isIndexedDBAvailable()) return false;
  
  try {
    await del(`${CV_PREFIX}${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting CV from IndexedDB:', error);
    return false;
  }
};

// Letter Functions
export const saveLetterToIDB = async (letter: LetterData): Promise<boolean> => {
  if (!isIndexedDBAvailable()) return false;
  
  try {
    await set(`${LETTER_PREFIX}${letter.id}`, letter);
    return true;
  } catch (error) {
    console.error('Error saving letter to IndexedDB:', error);
    return false;
  }
};

export const getLetterFromIDB = async (id: string): Promise<LetterData | null> => {
  if (!isIndexedDBAvailable()) return null;
  
  try {
    const letter = await get(`${LETTER_PREFIX}${id}`);
    return letter || null;
  } catch (error) {
    console.error('Error getting letter from IndexedDB:', error);
    return null;
  }
};

export const getAllLettersFromIDB = async (): Promise<LetterData[]> => {
  if (!isIndexedDBAvailable()) return [];
  
  try {
    const allKeys = await keys();
    const letterKeys = allKeys.filter((key) => 
      typeof key === 'string' && key.startsWith(LETTER_PREFIX)
    );
    
    const letters: LetterData[] = [];
    for (const key of letterKeys) {
      const letter = await get(key);
      if (letter) letters.push(letter as LetterData);
    }
    
    return letters.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch (error) {
    console.error('Error getting all letters from IndexedDB:', error);
    return [];
  }
};

export const deleteLetterFromIDB = async (id: string): Promise<boolean> => {
  if (!isIndexedDBAvailable()) return false;
  
  try {
    await del(`${LETTER_PREFIX}${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting letter from IndexedDB:', error);
    return false;
  }
};

// Clear all data
export const clearAllFromIDB = async (): Promise<boolean> => {
  if (!isIndexedDBAvailable()) return false;
  
  try {
    await clear();
    return true;
  } catch (error) {
    console.error('Error clearing IndexedDB:', error);
    return false;
  }
};

// Export data (for backup)
export const exportAllDataFromIDB = async (): Promise<{
  cvs: CVData[];
  letters: LetterData[];
} | null> => {
  try {
    const cvs = await getAllCVsFromIDB();
    const letters = await getAllLettersFromIDB();
    return { cvs, letters };
  } catch (error) {
    console.error('Error exporting data from IndexedDB:', error);
    return null;
  }
};

// Import data (from backup)
export const importDataToIDB = async (data: {
  cvs: CVData[];
  letters: LetterData[];
}): Promise<boolean> => {
  try {
    for (const cv of data.cvs) {
      await saveCVToIDB(cv);
    }
    for (const letter of data.letters) {
      await saveLetterToIDB(letter);
    }
    return true;
  } catch (error) {
    console.error('Error importing data to IndexedDB:', error);
    return false;
  }
};
