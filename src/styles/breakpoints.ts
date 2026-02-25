export const breakpoints = {
  xs: '360px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
} as const;

export const media = {
  xs: `@media screen and (min-width: ${breakpoints.xs})`,
  sm: `@media screen and (min-width: ${breakpoints.sm})`,
  md: `@media screen and (min-width: ${breakpoints.md})`,
  lg: `@media screen and (min-width: ${breakpoints.lg})`,
  xl: `@media screen and (min-width: ${breakpoints.xl})`,
  xxl: `@media screen and (min-width: ${breakpoints.xxl})`,

  maxXs: `@media screen and (max-width: ${breakpoints.xs})`,
  maxSm: `@media screen and (max-width: ${breakpoints.sm})`,
  maxMd: `@media screen and (max-width: ${breakpoints.md})`,
  maxLg: `@media screen and (max-width: ${breakpoints.lg})`,
  maxXl: `@media screen and (max-width: ${breakpoints.xl})`,
} as const;
