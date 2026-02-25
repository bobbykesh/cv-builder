export interface LetterData {
  id: string;
  title: string;
  templateId: string;
  colorScheme: string;
  personalInfo: LetterPersonalInfo;
  recipientInfo: RecipientInfo;
  content: LetterContent;
  status: 'draft' | 'complete';
  createdAt: string;
  updatedAt: string;
}

export interface LetterPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
}

export interface RecipientInfo {
  name: string;
  title: string;
  company: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
}

export interface LetterContent {
  opening: string;
  body: string;
  closing: string;
  signature: string;
}

export const DEFAULT_LETTER_DATA: Omit<LetterData, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Untitled Cover Letter',
  templateId: 'modern',
  colorScheme: '#002d6b',
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postcode: '',
  },
  recipientInfo: {
    name: '',
    title: '',
    company: '',
    address: '',
    city: '',
    country: '',
    postcode: '',
  },
  content: {
    opening: '',
    body: '',
    closing: '',
    signature: '',
  },
  status: 'draft',
};
