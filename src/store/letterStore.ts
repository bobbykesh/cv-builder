import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  LetterData,
  LetterPersonalInfo,
  RecipientInfo,
  LetterContent,
  DEFAULT_LETTER_DATA,
} from '@/types/letter';
import { generateId, getCurrentDate } from '@/lib/utils/helpers';
import { STORAGE_KEYS } from '@/lib/utils/constants';

interface LetterState {
  // All letters
  letters: LetterData[];

  // Current letter being edited
  currentLetter: LetterData | null;
  currentStep: number;

  // Loading states
  isLoading: boolean;
  isSaving: boolean;

  // Actions - Letter Management
  createLetter: (templateId?: string, colorScheme?: string) => LetterData;
  loadLetter: (id: string) => void;
  saveCurrentLetter: () => void;
  deleteLetter: (id: string) => void;
  duplicateLetter: (id: string) => LetterData | null;

  // Actions - Current Letter Updates
  setCurrentLetter: (letter: LetterData | null) => void;
  updateCurrentLetter: (updates: Partial<LetterData>) => void;

  // Actions - Personal Info
  updatePersonalInfo: (info: Partial<LetterPersonalInfo>) => void;

  // Actions - Recipient Info
  updateRecipientInfo: (info: Partial<RecipientInfo>) => void;

  // Actions - Content
  updateContent: (content: Partial<LetterContent>) => void;

  // Actions - Template & Styling
  setTemplate: (templateId: string) => void;
  setColorScheme: (color: string) => void;

  // Actions - Step Navigation
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Actions - Utility
  resetCurrentLetter: () => void;
  clearAll: () => void;
}

export const useLetterStore = create<LetterState>()(
  persist(
    (set, get) => ({
      letters: [],
      currentLetter: null,
      currentStep: 0,
      isLoading: false,
      isSaving: false,

      // Letter Management
      createLetter: (templateId = 'modern', colorScheme = '#002d6b') => {
        const now = getCurrentDate();
        const newLetter: LetterData = {
          ...DEFAULT_LETTER_DATA,
          id: generateId(),
          templateId,
          colorScheme,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          letters: [...state.letters, newLetter],
          currentLetter: newLetter,
          currentStep: 0,
        }));

        return newLetter;
      },

      loadLetter: (id: string) => {
        const letter = get().letters.find((l) => l.id === id);
        if (letter) {
          set({ currentLetter: letter, currentStep: 0 });
        }
      },

      saveCurrentLetter: () => {
        const { currentLetter, letters } = get();
        if (!currentLetter) return;

        set({ isSaving: true });

        const updatedLetter = { ...currentLetter, updatedAt: getCurrentDate() };
        const updatedLetters = letters.map((letter) =>
          letter.id === updatedLetter.id ? updatedLetter : letter
        );

        set({
          letters: updatedLetters,
          currentLetter: updatedLetter,
          isSaving: false,
        });
      },

      deleteLetter: (id: string) => {
        set((state) => ({
          letters: state.letters.filter((letter) => letter.id !== id),
          currentLetter:
            state.currentLetter?.id === id ? null : state.currentLetter,
        }));
      },

      duplicateLetter: (id: string) => {
        const original = get().letters.find((letter) => letter.id === id);
        if (!original) return null;

        const now = getCurrentDate();
        const duplicate: LetterData = {
          ...original,
          id: generateId(),
          title: `${original.title} (Copy)`,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          letters: [...state.letters, duplicate],
        }));

        return duplicate;
      },

      // Current Letter Updates
      setCurrentLetter: (letter) => set({ currentLetter: letter }),

      updateCurrentLetter: (updates) => {
        set((state) => ({
          currentLetter: state.currentLetter
            ? { ...state.currentLetter, ...updates, updatedAt: getCurrentDate() }
            : null,
        }));
      },

      // Personal Info
      updatePersonalInfo: (info) => {
        set((state) => ({
          currentLetter: state.currentLetter
            ? {
                ...state.currentLetter,
                personalInfo: { ...state.currentLetter.personalInfo, ...info },
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      // Recipient Info
      updateRecipientInfo: (info) => {
        set((state) => ({
          currentLetter: state.currentLetter
            ? {
                ...state.currentLetter,
                recipientInfo: { ...state.currentLetter.recipientInfo, ...info },
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      // Content
      updateContent: (content) => {
        set((state) => ({
          currentLetter: state.currentLetter
            ? {
                ...state.currentLetter,
                content: { ...state.currentLetter.content, ...content },
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      // Template & Styling
      setTemplate: (templateId) => {
        set((state) => ({
          currentLetter: state.currentLetter
            ? { ...state.currentLetter, templateId, updatedAt: getCurrentDate() }
            : null,
        }));
      },

      setColorScheme: (colorScheme) => {
        set((state) => ({
          currentLetter: state.currentLetter
            ? { ...state.currentLetter, colorScheme, updatedAt: getCurrentDate() }
            : null,
        }));
      },

      // Step Navigation
      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(0, state.currentStep - 1),
        })),

      // Utility
      resetCurrentLetter: () => set({ currentLetter: null, currentStep: 0 }),

      clearAll: () => set({ letters: [], currentLetter: null, currentStep: 0 }),
    }),
    {
      name: STORAGE_KEYS.LETTERS,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        letters: state.letters,
      }),
    }
  )
);
