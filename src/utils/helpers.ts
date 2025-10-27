// src/utils/helpers.ts
import { Guest, Visit, Stats } from '../types/models';

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const calculateDwellTime = (checkIn: string, checkOut?: string): string => {
  const checkInTime = new Date(checkIn).getTime();
  const checkOutTime = checkOut ? new Date(checkOut).getTime() : Date.now();
  const diffMs = checkOutTime - checkInTime;
  const diffMins = Math.floor(diffMs / 60000);
  return `${diffMins} min`;
};

export const getGuestStatus = (visit: Visit): 'active' | 'completed' | 'pending' => {
  if (visit.checkOutAt) return 'completed';
  if (visit.checkInAt) return 'active';
  return 'pending';
};

export const generateMockStats = (): Stats => {
  return {
    currentGuests: Math.floor(Math.random() * 100),
    totalVisitedToday: Math.floor(Math.random() * 200),
    avgDwellMin: Math.floor(Math.random() * 120),
    occupancyPct: Math.floor(Math.random() * 100),
    tableUtilPct: Math.floor(Math.random() * 100),
    waitlistCount: Math.floor(Math.random() * 20),
    revenueEst: parseFloat((Math.random() * 5000).toFixed(2)),
  };
};

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};