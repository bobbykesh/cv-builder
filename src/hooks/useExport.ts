'use client';

import { useState, useCallback } from 'react';
import { CVData } from '@/types/cv';
import { LetterData } from '@/types/letter';
import { useUIStore } from '@/store/uiStore';
import { downloadBlob, getFileExtension } from '@/lib/utils/helpers';
import { ExportFormat } from '@/types/common';

interface ExportOptions {
  format: ExportFormat;
  filename?: string;
}

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const { addToast } = useUIStore();

  // Export CV to TXT
  const exportCVToTxt = useCallback((cv: CVData): string => {
    const lines: string[] = [];

    // Header
    lines.push('=' .repeat(50));
    lines.push(`${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`);
    if (cv.personalInfo.jobTitle) {
      lines.push(cv.personalInfo.jobTitle);
    }
    lines.push('='.repeat(50));
    lines.push('');

    // Contact Info
    lines.push('CONTACT INFORMATION');
    lines.push('-'.repeat(30));
    if (cv.personalInfo.email) lines.push(`Email: ${cv.personalInfo.email}`);
    if (cv.personalInfo.phone) lines.push(`Phone: ${cv.personalInfo.phone}`);
    if (cv.personalInfo.address || cv.personalInfo.city) {
      const location = [
        cv.personalInfo.address,
        cv.personalInfo.city,
        cv.personalInfo.country,
        cv.personalInfo.postcode,
      ]
        .filter(Boolean)
        .join(', ');
      lines.push(`Location: ${location}`);
    }
    if (cv.personalInfo.linkedin) lines.push(`LinkedIn: ${cv.personalInfo.linkedin}`);
    if (cv.personalInfo.website) lines.push(`Website: ${cv.personalInfo.website}`);
    lines.push('');

    // Summary
    if (cv.summary) {
      lines.push('PROFESSIONAL SUMMARY');
      lines.push('-'.repeat(30));
      lines.push(cv.summary);
      lines.push('');
    }

    // Experience
    if (cv.experience.length > 0) {
      lines.push('WORK EXPERIENCE');
      lines.push('-'.repeat(30));
      cv.experience.forEach((exp) => {
        lines.push(`${exp.jobTitle} at ${exp.company}`);
        const dates = exp.current
          ? `${exp.startDate} - Present`
          : `${exp.startDate} - ${exp.endDate}`;
        lines.push(dates);
        if (exp.city) lines.push(exp.city);
        if (exp.description) lines.push(exp.description);
        exp.bullets.forEach((bullet) => {
          lines.push(`• ${bullet}`);
        });
        lines.push('');
      });
    }

    // Education
    if (cv.education.length > 0) {
      lines.push('EDUCATION');
      lines.push('-'.repeat(30));
      cv.education.forEach((edu) => {
        lines.push(`${edu.degree}`);
        lines.push(`${edu.school}`);
        const dates = `${edu.startDate} - ${edu.endDate}`;
        lines.push(dates);
        if (edu.city) lines.push(edu.city);
        if (edu.description) lines.push(edu.description);
        lines.push('');
      });
    }

    // Skills
    if (cv.skills.length > 0) {
      lines.push('SKILLS');
      lines.push('-'.repeat(30));
      const skillNames = cv.skills.map((s) => s.name).join(', ');
      lines.push(skillNames);
      lines.push('');
    }

    // Languages
    if (cv.languages.length > 0) {
      lines.push('LANGUAGES');
      lines.push('-'.repeat(30));
      cv.languages.forEach((lang) => {
        lines.push(`${lang.name} - ${lang.proficiency}`);
      });
      lines.push('');
    }

    // Certifications
    if (cv.certifications.length > 0) {
      lines.push('CERTIFICATIONS');
      lines.push('-'.repeat(30));
      cv.certifications.forEach((cert) => {
        let line = cert.name;
        if (cert.issuer) line += ` - ${cert.issuer}`;
        if (cert.date) line += ` (${cert.date})`;
        lines.push(line);
      });
      lines.push('');
    }

    // Custom Sections
    cv.customSections.forEach((section) => {
      lines.push(section.title.toUpperCase());
      lines.push('-'.repeat(30));
      section.items.forEach((item) => {
        if (item.heading) lines.push(item.heading);
        if (item.description) lines.push(item.description);
      });
      lines.push('');
    });

    return lines.join('\n');
  }, []);

  // Export Letter to TXT
  const exportLetterToTxt = useCallback((letter: LetterData): string => {
    const lines: string[] = [];

    // Sender Info
    lines.push(`${letter.personalInfo.firstName} ${letter.personalInfo.lastName}`);
    if (letter.personalInfo.address) lines.push(letter.personalInfo.address);
    if (letter.personalInfo.city) {
      const location = [
        letter.personalInfo.city,
        letter.personalInfo.country,
        letter.personalInfo.postcode,
      ]
        .filter(Boolean)
        .join(', ');
      lines.push(location);
    }
    if (letter.personalInfo.email) lines.push(letter.personalInfo.email);
    if (letter.personalInfo.phone) lines.push(letter.personalInfo.phone);
    lines.push('');

    // Date
    lines.push(new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }));
    lines.push('');

    // Recipient Info
    if (letter.recipientInfo.name) lines.push(letter.recipientInfo.name);
    if (letter.recipientInfo.title) lines.push(letter.recipientInfo.title);
    if (letter.recipientInfo.company) lines.push(letter.recipientInfo.company);
    if (letter.recipientInfo.address) lines.push(letter.recipientInfo.address);
    if (letter.recipientInfo.city) {
      const location = [
        letter.recipientInfo.city,
        letter.recipientInfo.country,
        letter.recipientInfo.postcode,
      ]
        .filter(Boolean)
        .join(', ');
      lines.push(location);
    }
    lines.push('');

    // Content
    if (letter.content.opening) lines.push(letter.content.opening);
    lines.push('');
    if (letter.content.body) lines.push(letter.content.body);
    lines.push('');
    if (letter.content.closing) lines.push(letter.content.closing);
    lines.push('');
    if (letter.content.signature) lines.push(letter.content.signature);

    return lines.join('\n');
  }, []);

  // Main export function for CV
  const exportCV = useCallback(
    async (cv: CVData, options: ExportOptions) => {
      setIsExporting(true);
      setExportProgress(0);

      try {
        const filename =
          options.filename ||
          `${cv.personalInfo.firstName}_${cv.personalInfo.lastName}_CV${getFileExtension(options.format)}`;

        setExportProgress(30);

        let content: string;
        let mimeType: string;

        switch (options.format) {
          case 'txt':
            content = exportCVToTxt(cv);
            mimeType = 'text/plain';
            break;
          case 'pdf':
            // PDF generation will be handled by React-PDF
            // For now, we'll use TXT as fallback
            content = exportCVToTxt(cv);
            mimeType = 'text/plain';
            addToast({
              type: 'info',
              message: 'PDF export - using TXT format for now',
            });
            break;
          case 'word':
            // Word generation will be handled by docx library
            // For now, we'll use TXT as fallback
            content = exportCVToTxt(cv);
            mimeType = 'text/plain';
            addToast({
              type: 'info',
              message: 'Word export - using TXT format for now',
            });
            break;
          default:
            throw new Error('Unsupported format');
        }

        setExportProgress(70);

        const blob = new Blob([content], { type: mimeType });
        downloadBlob(blob, filename.replace(/\.[^.]+$/, '.txt'));

        setExportProgress(100);

        addToast({
          type: 'success',
          message: `CV exported as ${options.format.toUpperCase()}!`,
        });
      } catch (error) {
        console.error('Export error:', error);
        addToast({
          type: 'error',
          message: 'Failed to export CV',
        });
      } finally {
        setIsExporting(false);
        setExportProgress(0);
      }
    },
    [exportCVToTxt, addToast]
  );

  // Main export function for Letter
  const exportLetter = useCallback(
    async (letter: LetterData, options: ExportOptions) => {
      setIsExporting(true);
      setExportProgress(0);

      try {
        const filename =
          options.filename ||
          `${letter.personalInfo.firstName}_${letter.personalInfo.lastName}_Cover_Letter${getFileExtension(options.format)}`;

        setExportProgress(30);

        const content = exportLetterToTxt(letter);
        const mimeType = 'text/plain';

        setExportProgress(70);

        const blob = new Blob([content], { type: mimeType });
        downloadBlob(blob, filename.replace(/\.[^.]+$/, '.txt'));

        setExportProgress(100);

        addToast({
          type: 'success',
          message: `Cover letter exported!`,
        });
      } catch (error) {
        console.error('Export error:', error);
        addToast({
          type: 'error',
          message: 'Failed to export cover letter',
        });
      } finally {
        setIsExporting(false);
        setExportProgress(0);
      }
    },
    [exportLetterToTxt, addToast]
  );

  return {
    isExporting,
    exportProgress,
    exportCV,
    exportLetter,
    exportCVToTxt,
    exportLetterToTxt,
  };
};
