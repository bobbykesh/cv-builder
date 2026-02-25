'use client';

import { useState, useEffect } from 'react';
import { breakpoints } from '@/styles/breakpoints';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

// Predefined breakpoint hooks
export const useIsMobile = (): boolean => {
  return !useMediaQuery(`(min-width: ${breakpoints.md})`);
};

export const useIsTablet = (): boolean => {
  const isMinMd = useMediaQuery(`(min-width: ${breakpoints.md})`);
  const isMaxLg = !useMediaQuery(`(min-width: ${breakpoints.lg})`);
  return isMinMd && isMaxLg;
};

export const useIsDesktop = (): boolean => {
  return useMediaQuery(`(min-width: ${breakpoints.lg})`);
};

export const useIsLargeDesktop = (): boolean => {
  return useMediaQuery(`(min-width: ${breakpoints.xl})`);
};

// Hook for getting current breakpoint
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const useBreakpoint = (): Breakpoint => {
  const isXxl = useMediaQuery(`(min-width: ${breakpoints.xxl})`);
  const isXl = useMediaQuery(`(min-width: ${breakpoints.xl})`);
  const isLg = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  const isMd = useMediaQuery(`(min-width: ${breakpoints.md})`);
  const isSm = useMediaQuery(`(min-width: ${breakpoints.sm})`);

  if (isXxl) return 'xxl';
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'xs';
};

// Hook for window dimensions
export const useWindowSize = (): { width: number; height: number } => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
