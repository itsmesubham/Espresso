import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export const formatPercent = (value: number, fractionDigits = 0) =>
  `${(value * 100).toFixed(fractionDigits)}%`;

export const formatShortDate = (iso: string) => dayjs(iso).format('MMM D, h:mm A');

export const formatRelativeTime = (iso?: string) =>
  iso ? dayjs(iso).fromNow() : 'Unknown';

export const formatDuration = (minutes: number) => `${Math.round(minutes)} min`;
