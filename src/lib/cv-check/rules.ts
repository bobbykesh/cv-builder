import { CVData, CVCheckRule, CVCheckIssue } from '@/types/cv';

export const analyzeCV = (cv: CVData): { score: number; issues: CVCheckIssue[]; passed: CVCheckRule[] } => {
  const issues: CVCheckIssue[] = [];
  const passed: CVCheckRule[] = [];
  let score = 100;

  // Rule 1: Contact Info
  if (!cv.personalInfo.email || !cv.personalInfo.phone) {
    score -= 10;
    issues.push({
      id: 'contact',
      category: 'content',
      severity: 'error',
      title: 'Missing Contact Information',
      description: 'Your CV is missing an email address or phone number.',
      suggestion: 'Add your contact details in the Personal Info section.',
    });
  } else {
    passed.push({
      id: 'contact',
      category: 'content',
      title: 'Contact Information',
      description: 'Contact details are present.',
    });
  }

  // Rule 2: Summary Length
  if (!cv.summary || cv.summary.length < 50) {
    score -= 15;
    issues.push({
      id: 'summary',
      category: 'impact',
      severity: 'warning',
      title: 'Summary is too short',
      description: 'A professional summary should be at least 50 characters long.',
      suggestion: 'Expand your summary to highlight your key achievements and goals.',
    });
  } else {
    passed.push({
      id: 'summary',
      category: 'impact',
      title: 'Professional Summary',
      description: 'Summary length is good.',
    });
  }

  // Rule 3: Experience
  if (cv.experience.length === 0) {
    score -= 20;
    issues.push({
      id: 'experience',
      category: 'content',
      severity: 'error',
      title: 'No Work Experience',
      description: 'Employers look for work history first.',
      suggestion: 'Add at least one previous job or internship.',
    });
  } else {
    passed.push({
      id: 'experience',
      category: 'content',
      title: 'Work Experience',
      description: 'Work history included.',
    });
  }

  // Rule 4: Bullet Points
  const shortBullets = cv.experience.some(exp => exp.bullets.some(b => b.length < 10));
  if (shortBullets) {
    score -= 5;
    issues.push({
      id: 'bullets',
      category: 'formatting',
      severity: 'warning',
      title: 'Weak Bullet Points',
      description: 'Some of your experience bullet points are very short.',
      suggestion: 'Use the STAR method (Situation, Task, Action, Result) to flesh them out.',
    });
  }

  // Rule 5: Skills
  if (cv.skills.length < 3) {
    score -= 10;
    issues.push({
      id: 'skills',
      category: 'content',
      severity: 'warning',
      title: 'Not Enough Skills',
      description: 'Listing skills helps with ATS ranking.',
      suggestion: 'Add at least 3-5 relevant skills.',
    });
  } else {
    passed.push({
      id: 'skills',
      category: 'content',
      title: 'Skills Section',
      description: 'Good number of skills listed.',
    });
  }

  // Rule 6: Email Professionalism
  if (cv.personalInfo.email && !cv.personalInfo.email.includes('@gmail') && !cv.personalInfo.email.includes('@outlook') && !cv.personalInfo.email.includes('@yahoo') && !cv.personalInfo.email.includes('@icloud') && !cv.personalInfo.email.includes('.')) {
     // Loose check for custom domains or potentially unprofessional emails could go here
  }

  return { 
    score: Math.max(0, score), 
    issues, 
    passed 
  };
};
