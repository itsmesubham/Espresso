// src/utils/seedData.ts

// Sample seed data for demo purposes
export const seedGuests = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1234567890',
    lastVisitAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    preferences: ['non-smoking', 'window seat'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+1987654321',
    lastVisitAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    preferences: ['quiet corner'],
  },
  {
    id: '3',
    name: 'Robert Johnson',
    phone: '+15551234567',
    lastVisitAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    preferences: ['high chair', 'accessible'],
  },
];

export const seedVisits = [
  {
    id: '1',
    guestId: '1',
    partySize: 2,
    checkInAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    checkOutAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    tableId: 'T1',
    notes: 'Requested window seat',
  },
  {
    id: '2',
    guestId: '2',
    partySize: 4,
    checkInAt: new Date().toISOString(), // now
    tableId: 'T3',
    notes: 'Celebrating anniversary',
  },
  {
    id: '3',
    guestId: '1',
    partySize: 1,
    checkInAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    checkOutAt: new Date(Date.now() - 82800000).toISOString(), // 11 hours ago
    tableId: 'T5',
  },
];

export const seedTables = [
  { id: 'T1', name: 'Table 1', capacity: 2, status: 'FREE' },
  { id: 'T2', name: 'Table 2', capacity: 4, status: 'SEATED' },
  { id: 'T3', name: 'Table 3', capacity: 6, status: 'DIRTY' },
  { id: 'T4', name: 'Table 4', capacity: 8, status: 'HELD' },
  { id: 'T5', name: 'Table 5', capacity: 2, status: 'FREE' },
  { id: 'T6', name: 'Table 6', capacity: 4, status: 'FREE' },
  { id: 'T7', name: 'Table 7', capacity: 4, status: 'FREE' },
  { id: 'T8', name: 'Table 8', capacity: 6, status: 'SEATED' },
];

export const seedNotices = [
  {
    id: '1',
    scope: 'PUBLIC',
    title: 'Happy Hour',
    body: 'Happy hour starts now! Enjoy 20% off all drinks from 4-7 PM daily.',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    createdBy: 'owner',
  },
  {
    id: '2',
    scope: 'PERSONAL',
    toGuestId: '1',
    title: 'Welcome back!',
    body: 'Thank you for choosing us again! Enjoy 10% off your meal today.',
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
    createdBy: 'staff',
  },
  {
    id: '3',
    scope: 'PUBLIC',
    title: 'New Menu Items',
    body: 'We just added 5 new items to our menu. Come try our new lobster risotto!',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    createdBy: 'owner',
  },
];

export const seedBroadcasts = [
  {
    id: '1',
    title: 'Live Music Tonight',
    body: 'Join us for live music starting at 8 PM with the local band "The Mellowtones".',
    createdAt: new Date().toISOString(),
    tags: ['event', 'music'],
  },
  {
    id: '2',
    title: 'Weekend Brunch Special',
    body: 'Every Saturday and Sunday: Bottomless mimosas with any brunch entree.',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    tags: ['food', 'weekend'],
  },
];

export const seedOffers = [
  {
    id: '1',
    title: 'Monday Special',
    body: 'Buy one entree, get second 50% off. Valid this week only.',
    validFrom: new Date().toISOString(),
    validTo: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
    audience: 'ALL',
    deepLink: 'espresso://offer/1',
  },
  {
    id: '2',
    title: 'Frequent Diner Reward',
    body: 'Get your 10th visit free! Ask your server for details.',
    validFrom: new Date().toISOString(),
    validTo: new Date(Date.now() + 86400000 * 30).toISOString(), // 30 days from now
    audience: 'VISITED_LAST_30D',
    deepLink: 'espresso://offer/2',
  },
];

export const seedStats = {
  currentGuests: 42,
  totalVisitedToday: 87,
  avgDwellMin: 45,
  occupancyPct: 78,
  tableUtilPct: 92,
  waitlistCount: 5,
  revenueEst: 2450.75,
};

// Function to initialize demo data
export const initializeDemoData = () => {
  // In a real implementation, this would populate the stores with seed data
  console.log('Demo data initialized');
  return {
    guests: seedGuests,
    visits: seedVisits,
    tables: seedTables,
    notices: seedNotices,
    broadcasts: seedBroadcasts,
    offers: seedOffers,
    stats: seedStats,
  };
};