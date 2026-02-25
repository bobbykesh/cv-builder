'use client';

import { useCallback, useEffect } from 'react';
import { useCVStore } from '@/store/cvStore';
import { useUIStore } from '@/store/uiStore';
import { CVData } from '@/types/cv';
import { calculateCVCompleteness } from '@/lib/utils/helpers';

export const useCV = () => {
  const store = useCVStore();
  const { addToast, showConfirmDialog, hideConfirmDialog } = useUIStore();

  // Auto-save functionality
  useEffect(() => {
    if (!store.currentCV) return;

    const autoSaveTimer = setInterval(() => {
      store.saveCurrentCV();
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveTimer);
  }, [store.currentCV, store]);

  // Create new CV with toast notification
  const createNewCV = useCallback(
    (templateId?: string, colorScheme?: string) => {
      try {
        const cv = store.createCV(templateId, colorScheme);
        addToast({
          type: 'success',
          message: 'New CV created successfully!',
        });
        return cv;
      } catch (error) {
        addToast({
          type: 'error',
          message: error instanceof Error ? error.message : 'Failed to create CV',
        });
        return null;
      }
    },
    [store, addToast]
  );

  // Delete CV with confirmation
  const deleteCV = useCallback(
    (id: string, title: string) => {
      showConfirmDialog(
        'Delete CV',
        `Are you sure you want to delete "${title}"? This action cannot be undone.`,
        () => {
          store.deleteCV(id);
          addToast({
            type: 'success',
            message: 'CV deleted successfully',
          });
          hideConfirmDialog();
        },
        () => {
          hideConfirmDialog();
        }
      );
    },
    [store, addToast, showConfirmDialog, hideConfirmDialog]
  );

  // Duplicate CV with toast
  const duplicateCV = useCallback(
    (id: string) => {
      const duplicate = store.duplicateCV(id);
      if (duplicate) {
        addToast({
          type: 'success',
          message: 'CV duplicated successfully!',
        });
      } else {
        addToast({
          type: 'error',
          message: 'Failed to duplicate CV',
        });
      }
      return duplicate;
    },
    [store, addToast]
  );

  // Save current CV with toast
  const saveCV = useCallback(() => {
    store.saveCurrentCV();
    addToast({
      type: 'success',
      message: 'CV saved successfully!',
      duration: 2000,
    });
  }, [store, addToast]);

  // Get completeness percentage
  const getCompleteness = useCallback((cv: CVData): number => {
    return calculateCVCompleteness(cv);
  }, []);

  // Check if CV is complete enough to download
  const isReadyToDownload = useCallback((cv: CVData): boolean => {
    const hasBasicInfo = 
      cv.personalInfo.firstName.trim() !== '' &&
      cv.personalInfo.lastName.trim() !== '' &&
      cv.personalInfo.email.trim() !== '';
    
    const hasContent = 
      cv.experience.length > 0 || 
      cv.education.length > 0 || 
      cv.summary.trim() !== '';

    return hasBasicInfo && hasContent;
  }, []);

  // Get sorted CVs (most recent first)
  const sortedCVs = [...store.cvs].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return {
    // State
    cvs: sortedCVs,
    currentCV: store.currentCV,
    currentStep: store.currentStep,
    isLoading: store.isLoading,
    isSaving: store.isSaving,

    // CV Management
    createNewCV,
    loadCV: store.loadCV,
    saveCV,
    deleteCV,
    duplicateCV,

    // Current CV Updates
    setCurrentCV: store.setCurrentCV,
    updateCurrentCV: store.updateCurrentCV,
    resetCurrentCV: store.resetCurrentCV,

    // Personal Info
    updatePersonalInfo: store.updatePersonalInfo,

    // Summary
    updateSummary: store.updateSummary,

    // Experience
    addExperience: store.addExperience,
    updateExperience: store.updateExperience,
    removeExperience: store.removeExperience,
    reorderExperience: store.reorderExperience,

    // Education
    addEducation: store.addEducation,
    updateEducation: store.updateEducation,
    removeEducation: store.removeEducation,
    reorderEducation: store.reorderEducation,

    // Skills
    addSkill: store.addSkill,
    updateSkill: store.updateSkill,
    removeSkill: store.removeSkill,

    // Languages
    addLanguage: store.addLanguage,
    updateLanguage: store.updateLanguage,
    removeLanguage: store.removeLanguage,

    // Certifications
    addCertification: store.addCertification,
    updateCertification: store.updateCertification,
    removeCertification: store.removeCertification,

    // Custom Sections
    addCustomSection: store.addCustomSection,
    updateCustomSection: store.updateCustomSection,
    removeCustomSection: store.removeCustomSection,
    addCustomSectionItem: store.addCustomSectionItem,
    updateCustomSectionItem: store.updateCustomSectionItem,
    removeCustomSectionItem: store.removeCustomSectionItem,

    // Template & Styling
    setTemplate: store.setTemplate,
    setColorScheme: store.setColorScheme,
    setIncludePhoto: store.setIncludePhoto,

    // Step Navigation
    setCurrentStep: store.setCurrentStep,
    nextStep: store.nextStep,
    prevStep: store.prevStep,

    // Utilities
    getCompleteness,
    isReadyToDownload,
    clearAll: store.clearAll,
  };
};
