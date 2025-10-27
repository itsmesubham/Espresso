// src/api/client.ts
import axios from 'axios';
import { API_CONFIG, USE_MOCK } from './config';
import { Guest, Visit, Notice, Broadcast, Offer, Table, Stats } from '../types/models';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Add auth token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Replace with actual storage method
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Mock data generators
const mockGuests: Guest[] = [
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
];

const mockVisits: Visit[] = [
  {
    id: '1',
    guestId: '1',
    partySize: 2,
    checkInAt: new Date().toISOString(),
    tableId: 'T1',
  },
  {
    id: '2',
    guestId: '2',
    partySize: 4,
    checkInAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    checkOutAt: new Date().toISOString(),
    tableId: 'T3',
  },
];

const mockTables: Table[] = [
  { id: 'T1', name: 'Table 1', capacity: 2, status: 'FREE' },
  { id: 'T2', name: 'Table 2', capacity: 4, status: 'SEATED' },
  { id: 'T3', name: 'Table 3', capacity: 6, status: 'DIRTY' },
  { id: 'T4', name: 'Table 4', capacity: 8, status: 'HELD' },
  { id: 'T5', name: 'Table 5', capacity: 2, status: 'FREE' },
];

const mockNotices: Notice[] = [
  {
    id: '1',
    scope: 'PUBLIC',
    title: 'Happy Hour',
    body: 'Happy hour starts now! Enjoy 20% off all drinks.',
    createdAt: new Date().toISOString(),
    createdBy: 'owner',
  },
  {
    id: '2',
    scope: 'PERSONAL',
    toGuestId: '1',
    title: 'Welcome back!',
    body: 'Thank you for choosing us again! Enjoy 10% off your meal.',
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
    createdBy: 'staff',
  },
];

const mockBroadcasts: Broadcast[] = [
  {
    id: '1',
    title: 'Live Music Tonight',
    body: 'Join us for live music starting at 8 PM with local band.',
    createdAt: new Date().toISOString(),
    tags: ['event', 'music'],
  },
];

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Monday Special',
    body: 'Buy one entree, get second 50% off',
    validFrom: new Date().toISOString(),
    validTo: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
    audience: 'ALL',
    deepLink: 'espresso://offer/1',
  },
];

const mockStats: Stats = {
  currentGuests: 42,
  totalVisitedToday: 87,
  avgDwellMin: 45,
  occupancyPct: 78,
  tableUtilPct: 92,
  waitlistCount: 5,
  revenueEst: 2450.75,
};

// Mock API functions
const mockApi = {
  // Auth endpoints
  auth: {
    otp: async (email: string, phone: string): Promise<{ token: string }> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { token: 'mock-token' };
    },
  },

  // Guest endpoints
  guests: {
    search: async (query: string): Promise<Guest[]> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockGuests.filter(g => 
        g.name.toLowerCase().includes(query.toLowerCase()) || 
        g.phone.includes(query)
      );
    },
    get: async (id: string): Promise<Guest> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const guest = mockGuests.find(g => g.id === id);
      if (!guest) throw new Error('Guest not found');
      return guest;
    },
    create: async (guest: Omit<Guest, 'id'>): Promise<Guest> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newGuest: Guest = {
        ...guest,
        id: `${mockGuests.length + 1}`,
      };
      mockGuests.push(newGuest);
      return newGuest;
    },
    getVisits: async (guestId: string): Promise<Visit[]> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockVisits.filter(v => v.guestId === guestId);
    },
  },

  // Visit endpoints
  visits: {
    create: async (visit: Omit<Visit, 'id'>): Promise<Visit> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newVisit: Visit = {
        ...visit,
        id: `${mockVisits.length + 1}`,
      };
      mockVisits.push(newVisit);
      return newVisit;
    },
    update: async (id: string, updates: Partial<Visit>): Promise<Visit> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockVisits.findIndex(v => v.id === id);
      if (index === -1) throw new Error('Visit not found');
      mockVisits[index] = { ...mockVisits[index], ...updates };
      return mockVisits[index];
    },
  },

  // Table endpoints
  tables: {
    get: async (): Promise<Table[]> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [...mockTables];
    },
    update: async (id: string, updates: Partial<Table>): Promise<Table> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockTables.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Table not found');
      mockTables[index] = { ...mockTables[index], ...updates };
      return mockTables[index];
    },
  },

  // Notice endpoints
  notices: {
    create: async (notice: Omit<Notice, 'id' | 'createdAt'>): Promise<Notice> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newNotice: Notice = {
        ...notice,
        id: `${mockNotices.length + 1}`,
        createdAt: new Date().toISOString(),
      };
      mockNotices.push(newNotice);
      return newNotice;
    },
    getPublic: async (): Promise<Notice[]> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockNotices.filter(n => n.scope === 'PUBLIC');
    },
  },

  // Broadcast endpoints
  broadcasts: {
    create: async (broadcast: Omit<Broadcast, 'id' | 'createdAt'>): Promise<Broadcast> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newBroadcast: Broadcast = {
        ...broadcast,
        id: `${mockBroadcasts.length + 1}`,
        createdAt: new Date().toISOString(),
      };
      mockBroadcasts.push(newBroadcast);
      return newBroadcast;
    },
  },

  // Stats endpoints
  stats: {
    getToday: async (): Promise<Stats> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { ...mockStats }; // Return a copy to avoid mutations
    },
  },

  // Offer endpoints
  offers: {
    get: async (): Promise<Offer[]> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [...mockOffers];
    },
    create: async (offer: Omit<Offer, 'id'>): Promise<Offer> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newOffer: Offer = {
        ...offer,
        id: `${mockOffers.length + 1}`,
      };
      mockOffers.push(newOffer);
      return newOffer;
    },
  },
};

// API service
const ApiService = {
  // Auth
  auth: {
    otp: (email: string, phone: string) => 
      USE_MOCK ? mockApi.auth.otp(email, phone) : apiClient.post('/auth/otp', { email, phone }),
  },

  // Guests
  guests: {
    search: (query: string) => 
      USE_MOCK ? mockApi.guests.search(query) : apiClient.get(`/guests?query=${query}`),
    get: (id: string) => 
      USE_MOCK ? mockApi.guests.get(id) : apiClient.get(`/guests/${id}`),
    create: (guest: Omit<Guest, 'id'>) => 
      USE_MOCK ? mockApi.guests.create(guest) : apiClient.post('/guests', guest),
    getVisits: (guestId: string) => 
      USE_MOCK ? mockApi.guests.getVisits(guestId) : apiClient.get(`/guests/${guestId}/visits`),
  },

  // Visits
  visits: {
    create: (visit: Omit<Visit, 'id'>) => 
      USE_MOCK ? mockApi.visits.create(visit) : apiClient.post('/visits', visit),
    update: (id: string, updates: Partial<Visit>) => 
      USE_MOCK ? mockApi.visits.update(id, updates) : apiClient.patch(`/visits/${id}`, updates),
  },

  // Tables
  tables: {
    get: () => 
      USE_MOCK ? mockApi.tables.get() : apiClient.get('/tables'),
    update: (id: string, updates: Partial<Table>) => 
      USE_MOCK ? mockApi.tables.update(id, updates) : apiClient.patch(`/tables/${id}`, updates),
  },

  // Notices
  notices: {
    create: (notice: Omit<Notice, 'id' | 'createdAt'>) => 
      USE_MOCK ? mockApi.notices.create(notice) : apiClient.post('/notices', notice),
    getPublic: () => 
      USE_MOCK ? mockApi.notices.getPublic() : apiClient.get('/notices?scope=PUBLIC'),
  },

  // Broadcasts
  broadcasts: {
    create: (broadcast: Omit<Broadcast, 'id' | 'createdAt'>) => 
      USE_MOCK ? mockApi.broadcasts.create(broadcast) : apiClient.post('/broadcasts', broadcast),
  },

  // Stats
  stats: {
    getToday: () => 
      USE_MOCK ? mockApi.stats.getToday() : apiClient.get('/stats/today'),
  },

  // Offers
  offers: {
    get: () => 
      USE_MOCK ? mockApi.offers.get() : apiClient.get('/offers'),
    create: (offer: Omit<Offer, 'id'>) => 
      USE_MOCK ? mockApi.offers.create(offer) : apiClient.post('/offers', offer),
  },
};

export default ApiService;