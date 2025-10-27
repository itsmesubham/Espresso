import dayjs from 'dayjs';
import {
  Broadcast,
  Guest,
  Notice,
  Offer,
  Stats,
  Table,
  Visit,
  WaitlistEntry,
} from './types';

const now = dayjs();

export const mockGuests: Guest[] = [
  {
    id: 'guest-1',
    name: 'Alex Morgan',
    phone: '+15550000001',
    lastVisitAt: now.subtract(3, 'day').toISOString(),
    preferences: ['Window seating', 'Oat milk latte'],
  },
  {
    id: 'guest-2',
    name: 'Jamie Lee',
    phone: '+15550000002',
    lastVisitAt: now.subtract(12, 'day').toISOString(),
    preferences: ['Low gluten'],
  },
  {
    id: 'guest-3',
    name: 'Chris Johnson',
    phone: '+15550000003',
    lastVisitAt: now.subtract(30, 'minute').toISOString(),
  },
];

export const mockVisits: Visit[] = [
  {
    id: 'visit-1',
    guestId: 'guest-1',
    partySize: 2,
    checkInAt: now.subtract(3, 'day').toISOString(),
    checkOutAt: now.subtract(3, 'day').add(90, 'minute').toISOString(),
    tableId: 'table-2',
    notes: 'Celebrated anniversary',
  },
  {
    id: 'visit-2',
    guestId: 'guest-2',
    partySize: 4,
    checkInAt: now.subtract(12, 'day').toISOString(),
    checkOutAt: now.subtract(12, 'day').add(120, 'minute').toISOString(),
    tableId: 'table-4',
  },
  {
    id: 'visit-3',
    guestId: 'guest-3',
    partySize: 1,
    checkInAt: now.subtract(30, 'minute').toISOString(),
    tableId: 'bar-1',
  },
];

export const mockTables: Table[] = [
  { id: 'table-1', name: 'Bar 1', capacity: 1, status: 'HELD' },
  { id: 'table-2', name: 'Table 2', capacity: 2, status: 'FREE' },
  { id: 'table-3', name: 'Table 3', capacity: 4, status: 'SEATED' },
  { id: 'table-4', name: 'Patio 1', capacity: 4, status: 'DIRTY' },
  { id: 'table-5', name: 'Booth 5', capacity: 6, status: 'FREE' },
];

export const mockPublicNotices: Notice[] = [
  {
    id: 'notice-1',
    scope: 'PUBLIC',
    title: 'Live Jazz Tonight',
    body: 'The trio starts at 7pm in the lounge.',
    createdAt: now.subtract(2, 'hour').toISOString(),
    createdBy: 'Taylor (Owner)',
    pinned: true,
  },
  {
    id: 'notice-2',
    scope: 'PUBLIC',
    title: 'Pumpkin Spice Returns',
    body: 'Limited run for fall weekends only.',
    createdAt: now.subtract(1, 'day').toISOString(),
    createdBy: 'Jordan (Staff)',
  },
];

export const mockPersonalNotices: Notice[] = [
  {
    id: 'notice-3',
    scope: 'PERSONAL',
    toGuestId: 'guest-1',
    title: 'Welcome Back!',
    body: 'We saved your favorite table by the window.',
    createdAt: now.subtract(15, 'minute').toISOString(),
    createdBy: 'Morgan (Host)',
  },
];

export const mockBroadcasts: Broadcast[] = [
  {
    id: 'broadcast-1',
    title: 'Happy Hour Starts Now',
    body: 'Half off espresso martinis until 6pm.',
    createdAt: now.subtract(5, 'minute').toISOString(),
    tags: ['happy-hour'],
    approved: true,
  },
];

export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    title: 'Free Dessert with Two Entrées',
    body: 'Show this screen to redeem during weekdays.',
    validFrom: now.subtract(1, 'day').toISOString(),
    validTo: now.add(6, 'day').toISOString(),
    audience: 'VISITED_LAST_30D',
    deepLink: 'espresso://offer/offer-1',
    sentAt: now.subtract(1, 'day').toISOString(),
    openRate: 0.56,
    redemptionRate: 0.18,
  },
  {
    id: 'offer-2',
    title: 'VIP Chef Tasting',
    body: 'Reserve a seat at the chef counter this weekend.',
    validFrom: now.toISOString(),
    validTo: now.add(3, 'day').toISOString(),
    audience: 'TAGGED',
    tags: ['vip'],
    deepLink: 'espresso://offer/offer-2',
    sentAt: now.subtract(2, 'day').toISOString(),
    openRate: 0.74,
    redemptionRate: 0.33,
  },
];

export const mockStatsHistory: Stats[] = Array.from({ length: 12 }).map((_, index) => ({
  currentGuests: 36 + index,
  totalVisitedToday: 120 + index * 3,
  avgDwellMin: 78 - index,
  occupancyPct: 0.72 + index * 0.01,
  tableUtilPct: 0.68 + index * 0.012,
  waitlistCount: Math.max(0, 6 - index),
  revenueEst: 12450 + index * 180,
  topItems: ['Espresso Martini', 'Truffle Fries', 'Seasonal Salad'],
}));

export const mockWaitlist: WaitlistEntry[] = [
  {
    id: 'waitlist-1',
    guestName: 'Jordan P',
    partySize: 2,
    requestedAt: now.subtract(10, 'minute').toISOString(),
    etaMinutes: 15,
  },
  {
    id: 'waitlist-2',
    guestName: 'Taylor R',
    partySize: 5,
    requestedAt: now.subtract(25, 'minute').toISOString(),
    etaMinutes: 20,
  },
];

export const mockStats: Stats = {
  currentGuests: mockStatsHistory.at(-1)?.currentGuests ?? 0,
  totalVisitedToday: 156,
  avgDwellMin: 74,
  occupancyPct: 0.83,
  tableUtilPct: 0.79,
  waitlistCount: mockWaitlist.length,
  revenueEst: 14680,
  topItems: ['Espresso Martini', 'Seasonal Flatbread', 'Affogato'],
};
