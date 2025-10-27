// src/theme/colors.ts
export const colors = {
  // Brand colors
  primary: '#6C3B2A', // Espresso
  accent: '#F3B34C', // Gold accent
  surface: '#FFF8F2', // Light cream background

  // Common colors
  text: '#1A1A1A',
  textSecondary: '#666666',
  background: '#FFFFFF',
  backgroundSecondary: '#F8F8F8',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  // Table status colors
  tableFree: '#4CAF50',
  tableHeld: '#FFC107',
  tableSeated: '#F44336',
  tableDirty: '#9E9E9E',

  // Status indicators
  statusActive: '#4CAF50',
  statusInactive: '#9E9E9E',
};

export const darkColors = {
  ...colors,
  primary: '#A87C6D', // Lighter version for dark mode
  accent: '#F8C77E', // Lighter gold for dark mode
  surface: '#2C221F', // Dark espresso background
  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
  background: '#121212',
  backgroundSecondary: '#1E1E1E',
  border: '#333333',
};