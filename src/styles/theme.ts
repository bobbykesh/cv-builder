export const theme = {
  colors: {
    primary: '#002d6b',
    primaryLight: '#0058ac',
    primaryDark: '#092347',

    secondary: '#ff3d3c',
    secondaryLight: '#ff8873',
    secondaryDark: '#cc2a2a',

    accent: '#02818c',
    accentLight: '#6bb6c2',
    accentDark: '#015e66',

    gold: '#efc778',
    goldDark: '#c2a878',

    success: '#00856c',
    successLight: '#009e81',
    warning: '#e07020',
    error: '#ff3d3c',
    info: '#0058ac',

    background: '#ffffff',
    backgroundAlt: '#f6f5f0',
    backgroundDark: '#092347',
    backgroundFooter: '#394d6b',

    text: '#002d6b',
    textLight: '#68778b',
    textMuted: '#ccc6bf',
    textWhite: '#ffffff',
    textDark: '#082e67',

    border: '#ccc6bf',
    borderLight: '#d7dde2',
    borderDark: '#394d6b',

    cardBg: '#f6f5f0',
    inputBg: '#ffffff',
    inputBorder: '#ccc6bf',

    disabled: 'rgba(0, 0, 0, 0.4)',
  },

  fonts: {
    primary: "'Nunito', 'Nunito Fallback', sans-serif",
    heading: "'Domine', 'Domine Fallback', serif",
  },

  fontSizes: {
    xs: '1rem',
    sm: '1.2rem',
    base: '1.4rem',
    md: '1.6rem',
    lg: '1.8rem',
    xl: '2rem',
    '2xl': '2.6rem',
    '3xl': '3.2rem',
    '4xl': '4rem',
    '5xl': '4.6rem',
    '6xl': '5.8rem',
  },

  lineHeights: {
    xs: '1.4rem',
    sm: '1.8rem',
    base: '2.1rem',
    md: '2.4rem',
    lg: '2.8rem',
    xl: '3rem',
    '2xl': '3.1rem',
    '3xl': '3.8rem',
    '4xl': '4.8rem',
    '5xl': '5.8rem',
    '6xl': '7rem',
  },

  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
    extraBold: 800,
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '40px',
    '5xl': '60px',
    '6xl': '80px',
  },

  borderRadius: {
    sm: '6px',
    md: '11px',
    lg: '16px',
    xl: '26.4px',
    '2xl': '30px',
    '3xl': '50px',
    full: '50%',
    topLeft: '70px 0 0 0',
    rounded: '120px',
  },

  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 25px rgba(0, 0, 0, 0.15)',
    button: '0 8px 0',
  },

  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    button: '1s',
  },

  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    modal: 100,
    tooltip: 200,
  },
} as const;

export type Theme = typeof theme;
