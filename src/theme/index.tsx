import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

export type EspressoTheme = {
  mode: 'light' | 'dark';
  colors: {
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
    card: string;
  };
  spacing: (factor?: number) => number;
  radii: {
    sm: number;
    md: number;
    lg: number;
  };
  typography: {
    heading: number;
    body: number;
    caption: number;
  };
};

const espressoColors = {
  primary: '#6C3B2A',
  accent: '#F3B34C',
  surface: '#FFF8F2',
  darkSurface: '#1F1411',
  darkBackground: '#0F0907',
};

const createTheme = (mode: 'light' | 'dark'): EspressoTheme => ({
  mode,
  colors: {
    background: mode === 'light' ? espressoColors.surface : espressoColors.darkBackground,
    surface: mode === 'light' ? '#FFFFFF' : '#221815',
    surfaceAlt: mode === 'light' ? '#FFF2E5' : '#2A1E1A',
    text: mode === 'light' ? '#2D160F' : '#F8F3F1',
    textMuted: mode === 'light' ? '#6F4C3E' : '#C9B7AF',
    border: mode === 'light' ? '#E4D4C8' : '#3F2B23',
    primary: espressoColors.primary,
    accent: espressoColors.accent,
    success: '#2E8B57',
    warning: '#F3B34C',
    danger: '#CC4A3D',
    card: mode === 'light' ? '#FFFFFF' : '#2B1C17',
  },
  spacing: (factor = 1) => factor * 8,
  radii: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  typography: {
    heading: 24,
    body: 16,
    caption: 13,
  },
});

const ThemeContext = createContext<EspressoTheme>(createTheme('light'));

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const value = useMemo(() => createTheme(colorScheme === 'dark' ? 'dark' : 'light'), [
    colorScheme,
  ]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
