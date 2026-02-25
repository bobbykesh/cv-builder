import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long')
    .optional()
    .or(z.literal('')),
  address: z.string().max(100, 'Address must be less than 100 characters').optional().or(z.literal('')),
  city: z.string().max(50, 'City must be less than 50 characters').optional().or(z.literal('')),
  country: z.string().max(50, 'Country must be less than 50 characters').optional().or(z.literal('')),
  postcode: z.string().max(20, 'Postcode must be less than 20 characters').optional().or(z.literal('')),
  linkedin: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  photo: z.string().nullable().optional(),
  jobTitle: z.string().max(100, 'Job title must be less than 100 characters').optional().or(z.literal('')),
});

export const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, 'Job title is required').max(100),
  company: z.string().min(1, 'Company name is required').max(100),
  city: z.string().max(50).optional().or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  current: z.boolean(),
  description: z.string().max(2000).optional().or(z.literal('')),
  bullets: z.array(z.string().max(500)),
});

export const educationSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, 'Degree is required').max(100),
  school: z.string().min(1, 'School name is required').max(100),
  city: z.string().max(50).optional().or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  description: z.string().max(1000).optional().or(z.literal('')),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required').max(50),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Language is required').max(50),
  proficiency: z.enum(['basic', 'conversational', 'fluent', 'native']),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certification name is required').max(100),
  issuer: z.string().max(100).optional().or(z.literal('')),
  date: z.string().optional().or(z.literal('')),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type SkillFormData = z.infer<typeof skillSchema>;
export type LanguageFormData = z.infer<typeof languageSchema>;
export type CertificationFormData = z.infer<typeof certificationSchema>;
