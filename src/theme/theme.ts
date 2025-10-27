// src/theme/theme.ts
import { colors, darkColors } from './colors';

export type Theme = {
  colors: typeof colors;
  spacing: Spacing;
  typography: Typography;
  borderRadius: BorderRadius;
  shadow: Shadow;
};

export type Spacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type Typography = {
  h1: { fontSize: number; fontWeight: 'bold' };
  h2: { fontSize: number; fontWeight: 'bold' };
  h3: { fontSize: number; fontWeight: 'bold' };
  body: { fontSize: number; fontWeight: 'normal' };
  bodyBold: { fontSize: number; fontWeight: 'bold' };
  caption: { fontSize: number; fontWeight: 'normal' };
};

export type BorderRadius = {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
};

export type Shadow = {
  small: object;
  medium: object;
  large: object;
};

const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const typography: Typography = {
  h1: { fontSize: 28, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: 'bold' },
  body: { fontSize: 16, fontWeight: 'normal' },
  bodyBold: { fontSize: 16, fontWeight: 'bold' },
  caption: { fontSize: 14, fontWeight: 'normal' },
};

const borderRadius: BorderRadius = {
  small: 4,
  medium: 8,
  large: 16, // As specified in requirements
  xlarge: 24,
};

const shadow: Shadow = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const lightTheme: Theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadow,
};

export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  typography,
  borderRadius,
  shadow,
};