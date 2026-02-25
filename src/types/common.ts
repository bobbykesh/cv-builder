export interface ReviewData {
  id: string;
  name: string;
  heading: string;
  comment: string;
  time: string;
  rating: number;
  url: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  alt: string;
  src: string;
  width: number;
  height: number;
}

export interface PreWrittenContent {
  jobTitle: string;
  industry: string;
  section: 'summary' | 'experience' | 'skills';
  bullets: string[];
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
  isExternal: boolean;
}

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'link';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export type ExportFormat = 'pdf' | 'word' | 'txt';
