// src/store/index.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Guest, Visit, Notice, Broadcast, Offer, Table, Stats, UserRole } from '../types/models';

// Auth slice
interface AuthState {
  user: { id: string; name: string; role: UserRole } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: { id: string; name: string; role: UserRole }) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
      setRole: (role) => set((state) => ({ 
        user: state.user ? { ...state.user, role } : null 
      })),
    }),
    { name: 'auth-store' }
  )
);

// Guests slice
interface GuestsState {
  guests: Guest[];
  loading: boolean;
  error: string | null;
  fetchGuests: (query: string) => Promise<void>;
  addGuest: (guest: Omit<Guest, 'id'>) => Promise<void>;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
}

export const useGuestsStore = create<GuestsState>()(
  devtools(
    (set) => ({
      guests: [],
      loading: false,
      error: null,
      fetchGuests: async (query) => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.guests.search(query);
          // For now using mock data
          const mockGuests = [
            { id: '1', name: 'John Doe', phone: '+1234567890' },
            { id: '2', name: 'Jane Smith', phone: '+1987654321' },
          ] as Guest[];
          set({ guests: mockGuests, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
      addGuest: async (guest) => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.guests.create(guest);
          const newGuest = { ...guest, id: Date.now().toString() } as Guest;
          set((state) => ({ guests: [...state.guests, newGuest], loading: false }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
      updateGuest: (id, updates) => {
        set((state) => ({
          guests: state.guests.map(guest => 
            guest.id === id ? { ...guest, ...updates } : guest
          )
        }));
      },
    }),
    { name: 'guests-store' }
  )
);

// Visits slice
interface VisitsState {
  visits: Visit[];
  loading: boolean;
  error: string | null;
  createVisit: (visit: Omit<Visit, 'id'>) => Promise<void>;
  updateVisit: (id: string, updates: Partial<Visit>) => Promise<void>;
  endVisit: (id: string) => Promise<void>;
}

export const useVisitsStore = create<VisitsState>()(
  devtools(
    (set) => ({
      visits: [],
      loading: false,
      error: null,
      createVisit: async (visit) => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.visits.create(visit);
          const newVisit = { ...visit, id: Date.now().toString() } as Visit;
          set((state) => ({ visits: [...state.visits, newVisit], loading: false }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
      updateVisit: async (id, updates) => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.visits.update(id, updates);
          set((state) => ({
            visits: state.visits.map(visit => 
              visit.id === id ? { ...visit, ...updates } : visit
            ),
            loading: false
          }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
      endVisit: async (id) => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.visits.update(id, { checkOutAt: new Date().toISOString() });
          set((state) => ({
            visits: state.visits.map(visit => 
              visit.id === id ? { ...visit, checkOutAt: new Date().toISOString() } : visit
            ),
            loading: false
          }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    { name: 'visits-store' }
  )
);

// Tables slice
interface TablesState {
  tables: Table[];
  loading: boolean;
  error: string | null;
  fetchTables: () => Promise<void>;
  updateTable: (id: string, updates: Partial<Table>) => Promise<void>;
}

export const useTablesStore = create<TablesState>()(
  devtools(
    (set) => ({
      tables: [],
      loading: false,
      error: null,
      fetchTables: async () => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.tables.get();
          const mockTables = [
            { id: '1', name: 'Table 1', capacity: 2, status: 'FREE' },
            { id: '2', name: 'Table 2', capacity: 4, status: 'SEATED' },
            { id: '3', name: 'Table 3', capacity: 6, status: 'DIRTY' },
          ] as Table[];
          set({ tables: mockTables, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
      updateTable: async (id, updates) => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.tables.update(id, updates);
          set((state) => ({
            tables: state.tables.map(table => 
              table.id === id ? { ...table, ...updates } : table
            ),
            loading: false
          }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    { name: 'tables-store' }
  )
);

// Notices slice
interface NoticesState {
  notices: Notice[];
  loading: boolean;
  error: string | null;
  fetchNotices: () => Promise<void>;
  sendNotice: (notice: Omit<Notice, 'id' | 'createdAt'>) => Promise<void>;
}

export const useNoticesStore = create<NoticesState>()(
  devtools(
    (set) => ({
      notices: [],
      loading: false,
      error: null,
      fetchNotices: async () => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.notices.getPublic();
          const mockNotices = [
            { 
              id: '1', 
              scope: 'PUBLIC', 
              title: 'Happy Hour', 
              body: 'Happy hour starts now!', 
              createdAt: new Date().toISOString(),
              createdBy: 'staff'
            },
          ] as Notice[];
          set({ notices: mockNotices, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
      sendNotice: async (notice) => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.notices.create(notice);
          const newNotice = { 
            ...notice, 
            id: Date.now().toString(), 
            createdAt: new Date().toISOString() 
          } as Notice;
          set((state) => ({ notices: [...state.notices, newNotice], loading: false }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    { name: 'notices-store' }
  )
);

// Broadcasts slice
interface BroadcastsState {
  broadcasts: Broadcast[];
  loading: boolean;
  error: string | null;
  fetchBroadcasts: () => Promise<void>;
  sendBroadcast: (broadcast: Omit<Broadcast, 'id' | 'createdAt'>) => Promise<void>;
}

export const useBroadcastsStore = create<BroadcastsState>()(
  devtools(
    (set) => ({
      broadcasts: [],
      loading: false,
      error: null,
      fetchBroadcasts: async () => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.broadcasts.get();
          const mockBroadcasts = [
            { 
              id: '1', 
              title: 'Special Event', 
              body: 'Join us for our grand opening!', 
              createdAt: new Date().toISOString(),
              tags: ['event', 'special']
            },
          ] as Broadcast[];
          set({ broadcasts: mockBroadcasts, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
      sendBroadcast: async (broadcast) => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.broadcasts.create(broadcast);
          const newBroadcast = { 
            ...broadcast, 
            id: Date.now().toString(), 
            createdAt: new Date().toISOString() 
          } as Broadcast;
          set((state) => ({ broadcasts: [...state.broadcasts, newBroadcast], loading: false }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    { name: 'broadcasts-store' }
  )
);

// Offers slice
interface OffersState {
  offers: Offer[];
  loading: boolean;
  error: string | null;
  fetchOffers: () => Promise<void>;
  createOffer: (offer: Omit<Offer, 'id'>) => Promise<void>;
}

export const useOffersStore = create<OffersState>()(
  devtools(
    (set) => ({
      offers: [],
      loading: false,
      error: null,
      fetchOffers: async () => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.offers.get();
          const mockOffers = [
            { 
              id: '1', 
              title: 'Monday Special', 
              body: '20% off all mains', 
              validFrom: new Date().toISOString(),
              validTo: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days
              audience: 'ALL'
            },
          ] as Offer[];
          set({ offers: mockOffers, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
      createOffer: async (offer) => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.offers.create(offer);
          const newOffer = { 
            ...offer, 
            id: Date.now().toString() 
          } as Offer;
          set((state) => ({ offers: [...state.offers, newOffer], loading: false }));
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    { name: 'offers-store' }
  )
);

// Stats slice
interface StatsState {
  stats: Stats | null;
  loading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

export const useStatsStore = create<StatsState>()(
  devtools(
    (set) => ({
      stats: null,
      loading: false,
      error: null,
      fetchStats: async () => {
        set({ loading: true, error: null });
        try {
          // In real app: const response = await ApiService.stats.getToday();
          const mockStats = {
            currentGuests: 42,
            totalVisitedToday: 87,
            avgDwellMin: 45,
            occupancyPct: 78,
            tableUtilPct: 92,
            waitlistCount: 5,
            revenueEst: 2450.75,
          } as Stats;
          set({ stats: mockStats, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    { name: 'stats-store' }
  )
);