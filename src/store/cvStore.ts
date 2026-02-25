import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  CVData, 
  PersonalInfo, 
  ExperienceItem, 
  EducationItem, 
  SkillItem,
  LanguageItem,
  CertificationItem,
  CustomSection,
  DEFAULT_CV_DATA,
  DEFAULT_PERSONAL_INFO 
} from '@/types/cv';
import { generateId, getCurrentDate } from '@/lib/utils/helpers';
import { STORAGE_KEYS, MAX_CVS } from '@/lib/utils/constants';

interface CVState {
  // All CVs
  cvs: CVData[];
  
  // Current CV being edited
  currentCV: CVData | null;
  currentStep: number;
  
  // Loading states
  isLoading: boolean;
  isSaving: boolean;
  
  // Actions - CV Management
  createCV: (templateId?: string, colorScheme?: string) => CVData;
  loadCV: (id: string) => void;
  saveCurrentCV: () => void;
  deleteCV: (id: string) => void;
  duplicateCV: (id: string) => CVData | null;
  
  // Actions - Current CV Updates
  setCurrentCV: (cv: CVData | null) => void;
  updateCurrentCV: (updates: Partial<CVData>) => void;
  
  // Actions - Personal Info
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  
  // Actions - Summary
  updateSummary: (summary: string) => void;
  
  // Actions - Experience
  addExperience: (experience?: Partial<ExperienceItem>) => void;
  updateExperience: (id: string, updates: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;
  
  // Actions - Education
  addEducation: (education?: Partial<EducationItem>) => void;
  updateEducation: (id: string, updates: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;
  
  // Actions - Skills
  addSkill: (skill?: Partial<SkillItem>) => void;
  updateSkill: (id: string, updates: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void;
  
  // Actions - Languages
  addLanguage: (language?: Partial<LanguageItem>) => void;
  updateLanguage: (id: string, updates: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
  
  // Actions - Certifications
  addCertification: (certification?: Partial<CertificationItem>) => void;
  updateCertification: (id: string, updates: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;
  
  // Actions - Custom Sections
  addCustomSection: (title: string) => void;
  updateCustomSection: (id: string, updates: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, updates: Partial<{ heading: string; description: string }>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  
  // Actions - Template & Styling
  setTemplate: (templateId: string) => void;
  setColorScheme: (color: string) => void;
  setIncludePhoto: (include: boolean) => void;
  
  // Actions - Step Navigation
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Actions - Utility
  resetCurrentCV: () => void;
  clearAll: () => void;
}

export const useCVStore = create<CVState>()(
  persist(
    (set, get) => ({
      cvs: [],
      currentCV: null,
      currentStep: 0,
      isLoading: false,
      isSaving: false,

      // CV Management
      createCV: (templateId = 'modern', colorScheme = '#002d6b') => {
        const state = get();
        if (state.cvs.length >= MAX_CVS) {
          throw new Error(`Maximum of ${MAX_CVS} CVs reached`);
        }

        const now = getCurrentDate();
        const newCV: CVData = {
          ...DEFAULT_CV_DATA,
          id: generateId(),
          templateId,
          colorScheme,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          cvs: [...state.cvs, newCV],
          currentCV: newCV,
          currentStep: 0,
        }));

        return newCV;
      },

      loadCV: (id: string) => {
        const cv = get().cvs.find((c) => c.id === id);
        if (cv) {
          set({ currentCV: cv, currentStep: 0 });
        }
      },

      saveCurrentCV: () => {
        const { currentCV, cvs } = get();
        if (!currentCV) return;

        set({ isSaving: true });

        const updatedCV = { ...currentCV, updatedAt: getCurrentDate() };
        const updatedCVs = cvs.map((cv) =>
          cv.id === updatedCV.id ? updatedCV : cv
        );

        set({
          cvs: updatedCVs,
          currentCV: updatedCV,
          isSaving: false,
        });
      },

      deleteCV: (id: string) => {
        set((state) => ({
          cvs: state.cvs.filter((cv) => cv.id !== id),
          currentCV: state.currentCV?.id === id ? null : state.currentCV,
        }));
      },

      duplicateCV: (id: string) => {
        const original = get().cvs.find((cv) => cv.id === id);
        if (!original) return null;

        const now = getCurrentDate();
        const duplicate: CVData = {
          ...original,
          id: generateId(),
          title: `${original.title} (Copy)`,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          cvs: [...state.cvs, duplicate],
        }));

        return duplicate;
      },

      // Current CV Updates
      setCurrentCV: (cv) => set({ currentCV: cv }),

      updateCurrentCV: (updates) => {
        set((state) => ({
          currentCV: state.currentCV
            ? { ...state.currentCV, ...updates, updatedAt: getCurrentDate() }
            : null,
        }));
      },

      // Personal Info
      updatePersonalInfo: (info) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                personalInfo: { ...state.currentCV.personalInfo, ...info },
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      // Summary
      updateSummary: (summary) => {
        set((state) => ({
          currentCV: state.currentCV
            ? { ...state.currentCV, summary, updatedAt: getCurrentDate() }
            : null,
        }));
      },

      // Experience
      addExperience: (experience = {}) => {
        const newExperience: ExperienceItem = {
          id: generateId(),
          jobTitle: '',
          company: '',
          city: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          bullets: [],
          ...experience,
        };

        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                experience: [...state.currentCV.experience, newExperience],
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      updateExperience: (id, updates) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                experience: state.currentCV.experience.map((exp) =>
                  exp.id === id ? { ...exp, ...updates } : exp
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      removeExperience: (id) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                experience: state.currentCV.experience.filter((exp) => exp.id !== id),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      reorderExperience: (fromIndex, toIndex) => {
        set((state) => {
          if (!state.currentCV) return state;
          const experience = [...state.currentCV.experience];
          const [removed] = experience.splice(fromIndex, 1);
          experience.splice(toIndex, 0, removed);
          return {
            currentCV: {
              ...state.currentCV,
              experience,
              updatedAt: getCurrentDate(),
            },
          };
        });
      },

      // Education
      addEducation: (education = {}) => {
        const newEducation: EducationItem = {
          id: generateId(),
          degree: '',
          school: '',
          city: '',
          startDate: '',
          endDate: '',
          description: '',
          ...education,
        };

        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                education: [...state.currentCV.education, newEducation],
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      updateEducation: (id, updates) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                education: state.currentCV.education.map((edu) =>
                  edu.id === id ? { ...edu, ...updates } : edu
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      removeEducation: (id) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                education: state.currentCV.education.filter((edu) => edu.id !== id),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      reorderEducation: (fromIndex, toIndex) => {
        set((state) => {
          if (!state.currentCV) return state;
          const education = [...state.currentCV.education];
          const [removed] = education.splice(fromIndex, 1);
          education.splice(toIndex, 0, removed);
          return {
            currentCV: {
              ...state.currentCV,
              education,
              updatedAt: getCurrentDate(),
            },
          };
        });
      },

      // Skills
      addSkill: (skill = {}) => {
        const newSkill: SkillItem = {
          id: generateId(),
          name: '',
          level: 'intermediate',
          ...skill,
        };

        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                skills: [...state.currentCV.skills, newSkill],
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      updateSkill: (id, updates) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                skills: state.currentCV.skills.map((skill) =>
                  skill.id === id ? { ...skill, ...updates } : skill
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      removeSkill: (id) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                skills: state.currentCV.skills.filter((skill) => skill.id !== id),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      // Languages
      addLanguage: (language = {}) => {
        const newLanguage: LanguageItem = {
          id: generateId(),
          name: '',
          proficiency: 'conversational',
          ...language,
        };

        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                languages: [...state.currentCV.languages, newLanguage],
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      updateLanguage: (id, updates) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                languages: state.currentCV.languages.map((lang) =>
                  lang.id === id ? { ...lang, ...updates } : lang
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      removeLanguage: (id) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                languages: state.currentCV.languages.filter((lang) => lang.id !== id),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      // Certifications
      addCertification: (certification = {}) => {
        const newCertification: CertificationItem = {
          id: generateId(),
          name: '',
          issuer: '',
          date: '',
          ...certification,
        };

        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                certifications: [...state.currentCV.certifications, newCertification],
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      updateCertification: (id, updates) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                certifications: state.currentCV.certifications.map((cert) =>
                  cert.id === id ? { ...cert, ...updates } : cert
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      removeCertification: (id) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                certifications: state.currentCV.certifications.filter(
                  (cert) => cert.id !== id
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      // Custom Sections
      addCustomSection: (title) => {
        const newSection: CustomSection = {
          id: generateId(),
          title,
          items: [],
        };

        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                customSections: [...state.currentCV.customSections, newSection],
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      updateCustomSection: (id, updates) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                customSections: state.currentCV.customSections.map((section) =>
                  section.id === id ? { ...section, ...updates } : section
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      removeCustomSection: (id) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                customSections: state.currentCV.customSections.filter(
                  (section) => section.id !== id
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      addCustomSectionItem: (sectionId) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                customSections: state.currentCV.customSections.map((section) =>
                  section.id === sectionId
                    ? {
                        ...section,
                        items: [
                          ...section.items,
                          { id: generateId(), heading: '', description: '' },
                        ],
                      }
                    : section
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      updateCustomSectionItem: (sectionId, itemId, updates) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                customSections: state.currentCV.customSections.map((section) =>
                  section.id === sectionId
                    ? {
                        ...section,
                        items: section.items.map((item) =>
                          item.id === itemId ? { ...item, ...updates } : item
                        ),
                      }
                    : section
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      removeCustomSectionItem: (sectionId, itemId) => {
        set((state) => ({
          currentCV: state.currentCV
            ? {
                ...state.currentCV,
                customSections: state.currentCV.customSections.map((section) =>
                  section.id === sectionId
                    ? {
                        ...section,
                        items: section.items.filter((item) => item.id !== itemId),
                      }
                    : section
                ),
                updatedAt: getCurrentDate(),
              }
            : null,
        }));
      },

      // Template & Styling
      setTemplate: (templateId) => {
        set((state) => ({
          currentCV: state.currentCV
            ? { ...state.currentCV, templateId, updatedAt: getCurrentDate() }
            : null,
        }));
      },

      setColorScheme: (colorScheme) => {
        set((state) => ({
          currentCV: state.currentCV
            ? { ...state.currentCV, colorScheme, updatedAt: getCurrentDate() }
            : null,
        }));
      },

      setIncludePhoto: (includePhoto) => {
        set((state) => ({
          currentCV: state.currentCV
            ? { ...state.currentCV, includePhoto, updatedAt: getCurrentDate() }
            : null,
        }));
      },

      // Step Navigation
      setCurrentStep: (step) => set({ currentStep: step }),
      
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      
      prevStep: () => set((state) => ({ 
        currentStep: Math.max(0, state.currentStep - 1) 
      })),

      // Utility
      resetCurrentCV: () => set({ currentCV: null, currentStep: 0 }),
      
      clearAll: () => set({ cvs: [], currentCV: null, currentStep: 0 }),
    }),
    {
      name: STORAGE_KEYS.CVS,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cvs: state.cvs,
      }),
    }
  )
);
