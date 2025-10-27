// src/api/config.ts
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

export const API_CONFIG = {
  BASE_URL,
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// Mock flag
export const USE_MOCK = process.env.USE_MOCK === 'true' || true; // Default to true for demo purposes