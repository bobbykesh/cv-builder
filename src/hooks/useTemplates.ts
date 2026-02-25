'use client';

import { useMemo, useCallback } from 'react';
import { 
  TEMPLATES, 
  TEMPLATE_COLORS, 
  TemplateMetadata,
  TemplateCategory 
} from '@/types/template';

export const useTemplates = () => {
  // Get all templates
  const templates = useMemo(() => TEMPLATES, []);

  // Get all colors
  const colors = useMemo(() => TEMPLATE_COLORS, []);

  // Get template by ID
  const getTemplateById = useCallback(
    (id: string): TemplateMetadata | undefined => {
      return templates.find((t) => t.id === id);
    },
    [templates]
  );

  // Get templates by category
  const getTemplatesByCategory = useCallback(
    (category: TemplateCategory): TemplateMetadata[] => {
      return templates.filter((t) => t.category === category);
    },
    [templates]
  );

  // Get popular templates
  const popularTemplates = useMemo(() => {
    return templates.filter((t) => t.isPopular);
  }, [templates]);

  // Get templates by tag
  const getTemplatesByTag = useCallback(
    (tag: string): TemplateMetadata[] => {
      return templates.filter((t) => t.tags.includes(tag));
    },
    [templates]
  );

  // Get ATS-friendly templates
  const atsFriendlyTemplates = useMemo(() => {
    return templates.filter((t) => t.tags.includes('ats-friendly'));
  }, [templates]);

  // Get color by value
  const getColorByValue = useCallback(
    (value: string) => {
      return colors.find((c) => c.value === value);
    },
    [colors]
  );

  // Get color name
  const getColorName = useCallback(
    (value: string): string => {
      const color = colors.find((c) => c.value === value);
      return color?.name || 'Custom';
    },
    [colors]
  );

  // Search templates
  const searchTemplates = useCallback(
    (query: string): TemplateMetadata[] => {
      const lowerQuery = query.toLowerCase();
      return templates.filter(
        (t) =>
          t.name.toLowerCase().includes(lowerQuery) ||
          t.description.toLowerCase().includes(lowerQuery) ||
          t.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    },
    [templates]
  );

  // Get unique categories
  const categories = useMemo((): TemplateCategory[] => {
    const cats = new Set(templates.map((t) => t.category));
    return Array.from(cats);
  }, [templates]);

  // Get unique tags
  const tags = useMemo((): string[] => {
    const allTags = new Set(templates.flatMap((t) => t.tags));
    return Array.from(allTags);
  }, [templates]);

  return {
    templates,
    colors,
    popularTemplates,
    atsFriendlyTemplates,
    categories,
    tags,
    getTemplateById,
    getTemplatesByCategory,
    getTemplatesByTag,
    getColorByValue,
    getColorName,
    searchTemplates,
  };
};
