export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  category: TemplateCategory;
  tags: string[];
  colors: string[];
  isPopular: boolean;
}

export type TemplateCategory =
  | 'modern'
  | 'classic'
  | 'creative'
  | 'professional'
  | 'simple'
  | 'elegant';

export interface TemplateColor {
  name: string;
  value: string;
}

export const TEMPLATE_COLORS: TemplateColor[] = [
  { name: 'Navy Blue', value: '#002d6b' },
  { name: 'Dark Blue', value: '#0058ac' },
  { name: 'Teal', value: '#02818c' },
  { name: 'Green', value: '#00856c' },
  { name: 'Dark Green', value: '#2d5016' },
  { name: 'Red', value: '#ff3d3c' },
  { name: 'Coral', value: '#ff8873' },
  { name: 'Dark Red', value: '#8b0000' },
  { name: 'Orange', value: '#e07020' },
  { name: 'Gold', value: '#efc778' },
  { name: 'Purple', value: '#6b2fa0' },
  { name: 'Dark Gray', value: '#394d6b' },
  { name: 'Charcoal', value: '#333333' },
  { name: 'Light Blue', value: '#6bb6c2' },
  { name: 'Taupe', value: '#8b7d6b' },
  { name: 'Beige', value: '#c2a878' },
  { name: 'Blue Gray', value: '#607d8b' },
  { name: 'Dark Orange', value: '#cc5500' },
  { name: 'Light Green', value: '#4caf50' },
  { name: 'Duck Blue', value: '#006b7a' },
  { name: 'Turquoise', value: '#40e0d0' },
  { name: 'Yellow', value: '#f0c040' },
  { name: 'Ocher', value: '#cc7722' },
  { name: 'Light Red', value: '#ff6b6b' },
  { name: 'Gray', value: '#9e9e9e' },
];

export const TEMPLATES: TemplateMetadata[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a professional edge.',
    previewImage: '/images/templates/modern.svg',
    category: 'modern',
    tags: ['popular', 'ats-friendly', 'clean'],
    colors: ['#002d6b', '#0058ac', '#02818c'],
    isPopular: true,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless and traditional layout that works for any industry.',
    previewImage: '/images/templates/classic.svg',
    category: 'classic',
    tags: ['traditional', 'ats-friendly', 'formal'],
    colors: ['#333333', '#002d6b', '#8b0000'],
    isPopular: true,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design that lets your content shine.',
    previewImage: '/images/templates/minimal.svg',
    category: 'simple',
    tags: ['simple', 'ats-friendly', 'clean'],
    colors: ['#333333', '#607d8b', '#002d6b'],
    isPopular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Structured layout ideal for experienced professionals.',
    previewImage: '/images/templates/professional.svg',
    category: 'professional',
    tags: ['structured', 'ats-friendly', 'corporate'],
    colors: ['#002d6b', '#394d6b', '#0058ac'],
    isPopular: true,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Stand out with a unique design for creative industries.',
    previewImage: '/images/templates/creative.svg',
    category: 'creative',
    tags: ['creative', 'colorful', 'unique'],
    colors: ['#ff3d3c', '#6b2fa0', '#02818c'],
    isPopular: false,
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Make a strong impression with bold typography and layout.',
    previewImage: '/images/templates/bold.svg',
    category: 'modern',
    tags: ['bold', 'impactful', 'modern'],
    colors: ['#002d6b', '#ff3d3c', '#333333'],
    isPopular: true,
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated design with refined details.',
    previewImage: '/images/templates/elegant.svg',
    category: 'elegant',
    tags: ['elegant', 'refined', 'professional'],
    colors: ['#8b7d6b', '#002d6b', '#c2a878'],
    isPopular: false,
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'Straightforward layout focused on readability.',
    previewImage: '/images/templates/simple.svg',
    category: 'simple',
    tags: ['simple', 'readable', 'ats-friendly'],
    colors: ['#333333', '#002d6b', '#607d8b'],
    isPopular: false,
  },
];
