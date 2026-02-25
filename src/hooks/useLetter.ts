'use client';

import { useCallback, useEffect } from 'react';
import { useLetterStore } from '@/store/letterStore';
import { useUIStore } from '@/store/uiStore';
import { LetterData } from '@/types/letter';

export const useLetter = () => {
  const store = useLetterStore();
  const { addToast, showConfirmDialog, hideConfirmDialog } = useUIStore();

  // Auto-save functionality
  useEffect(() => {
    if (!store.currentLetter) return;

    const autoSaveTimer = setInterval(() => {
      store.saveCurrentLetter();
    }, 30000);

    return () => clearInterval(autoSaveTimer);
  }, [store.currentLetter, store]);

  // Create new letter with toast
  const createNewLetter = useCallback(
    (templateId?: string, colorScheme?: string) => {
      try {
        const letter = store.createLetter(templateId, colorScheme);
        addToast({
          type: 'success',
          message: 'New cover letter created!',
        });
        return letter;
      } catch (error) {
        addToast({
          type: 'error',
          message: 'Failed to create cover letter',
        });
        return null;
      }
    },
    [store, addToast]
  );

  // Delete letter with confirmation
  const deleteLetter = useCallback(
    (id: string, title: string) => {
      showConfirmDialog(
        'Delete Cover Letter',
        `Are you sure you want to delete "${title}"?`,
        () => {
          store.deleteLetter(id);
          addToast({
            type: 'success',
            message: 'Cover letter deleted',
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

  // Duplicate letter with toast
  const duplicateLetter = useCallback(
    (id: string) => {
      const duplicate = store.duplicateLetter(id);
      if (duplicate) {
        addToast({
          type: 'success',
          message: 'Cover letter duplicated!',
        });
      }
      return duplicate;
    },
    [store, addToast]
  );

  // Save current letter with toast
  const saveLetter = useCallback(() => {
    store.saveCurrentLetter();
    addToast({
      type: 'success',
      message: 'Cover letter saved!',
      duration: 2000,
    });
  }, [store, addToast]);

  // Check if letter is ready to download
  const isReadyToDownload = useCallback((letter: LetterData): boolean => {
    const hasBasicInfo =
      letter.personalInfo.firstName.trim() !== '' &&
      letter.personalInfo.lastName.trim() !== '';

    const hasContent =
      letter.content.body.trim() !== '' || letter.content.opening.trim() !== '';

    return hasBasicInfo && hasContent;
  }, []);

  // Get sorted letters
  const sortedLetters = [...store.letters].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return {
    // State
    letters: sortedLetters,
    currentLetter: store.currentLetter,
    currentStep: store.currentStep,
    isLoading: store.isLoading,
    isSaving: store.isSaving,

    // Letter Management
    createNewLetter,
    loadLetter: store.loadLetter,
    saveLetter,
    deleteLetter,
    duplicateLetter,

    // Current Letter Updates
    setCurrentLetter: store.setCurrentLetter,
    updateCurrentLetter: store.updateCurrentLetter,
    resetCurrentLetter: store.resetCurrentLetter,

    // Personal Info
    updatePersonalInfo: store.updatePersonalInfo,

    // Recipient Info
    updateRecipientInfo: store.updateRecipientInfo,

    // Content
    updateContent: store.updateContent,

    // Template & Styling
    setTemplate: store.setTemplate,
    setColorScheme: store.setColorScheme,

    // Step Navigation
    setCurrentStep: store.setCurrentStep,
    nextStep: store.nextStep,
    prevStep: store.prevStep,

    // Utilities
    isReadyToDownload,
    clearAll: store.clearAll,
  };
};
