import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dayjs from 'dayjs';
import { apiClient, OfflineMutation } from '../api/client';
import {
  Broadcast,
  Guest,
  Notice,
  Offer,
  Role,
  Stats,
  Table,
  Visit,
  WaitlistEntry,
} from '../api/types';

export type AuthState = {
  role: Role | null;
  token?: string;
  guestId?: string;
  isAuthenticated: boolean;
};

export type AuthActions = {
  setRole: (role: Role) => void;
  loginGuest: (guest: Guest) => void;
  setAuthToken: (token: string, role: Role, guestId?: string) => void;
  logout: () => void;
};

export type GuestsState = {
  guests: Guest[];
  selectedGuest?: Guest;
};

export type GuestsActions = {
  searchGuests: (query: string) => Promise<void>;
  createGuest: (input: { name: string; phone: string }) => Promise<Guest>;
  selectGuest: (guest?: Guest) => void;
};

export type VisitsState = {
  visitsByGuest: Record<string, Visit[]>;
  activeVisit?: Visit;
};

export type VisitsActions = {
  fetchVisitsForGuest: (guestId: string) => Promise<void>;
  createVisit: (
    payload: Omit<Visit, 'id' | 'checkInAt'> & { checkInAt?: string }
  ) => Promise<Visit>;
  completeVisit: (visitId: string) => Promise<Visit | undefined>;
};

export type TablesState = {
  tables: Table[];
};

export type TablesActions = {
  loadTables: () => Promise<void>;
  updateTable: (tableId: string, payload: Partial<Table>) => Promise<Table | undefined>;
};

export type NoticesState = {
  publicNotices: Notice[];
  personalNotices: Notice[];
};

export type NoticesActions = {
  fetchPublicNotices: () => Promise<void>;
  fetchPersonalNotices: (guestId: string) => Promise<void>;
  postNotice: (input: Omit<Notice, 'id' | 'createdAt'>) => Promise<Notice>;
  togglePin: (noticeId: string) => void;
};

export type BroadcastState = {
  broadcasts: Broadcast[];
};

export type BroadcastActions = {
  fetchBroadcasts: () => Promise<void>;
  createBroadcast: (
    input: Omit<Broadcast, 'id' | 'createdAt' | 'approved'>
  ) => Promise<Broadcast>;
};

export type OffersState = {
  offers: Offer[];
};

export type OffersActions = {
  fetchOffers: () => Promise<void>;
  createOffer: (input: Omit<Offer, 'id' | 'sentAt'>) => Promise<Offer>;
};

export type StatsState = {
  currentStats?: Stats;
  statsHistory: Stats[];
  lastUpdated?: string;
};

export type StatsActions = {
  refreshStats: () => Promise<void>;
};

export type WaitlistState = {
  waitlist: WaitlistEntry[];
};

export type WaitlistActions = {
  loadWaitlist: () => Promise<void>;
  upsertEntry: (entry: WaitlistEntry) => Promise<void>;
  removeEntry: (entryId: string) => Promise<void>;
};

export type SystemState = {
  offlineQueue: OfflineMutation[];
  isOnline: boolean;
};

export type SystemActions = {
  setOnline: (online: boolean) => Promise<void>;
  enqueueOffline: (mutation: OfflineMutation) => Promise<void>;
  hydrateQueue: () => Promise<void>;
  clearQueue: () => Promise<void>;
};

export type EspressoStore = {
  auth: AuthState;
  guests: GuestsState;
  visits: VisitsState;
  tables: TablesState;
  notices: NoticesState;
  broadcasts: BroadcastState;
  offers: OffersState;
  stats: StatsState;
  waitlist: WaitlistState;
  system: SystemState;
} & AuthActions &
  GuestsActions &
  VisitsActions &
  TablesActions &
  NoticesActions &
  BroadcastActions &
  OffersActions &
  StatsActions &
  WaitlistActions &
  SystemActions;

const initialState: EspressoStore = {
  auth: {
    role: null,
    guestId: undefined,
    token: undefined,
    isAuthenticated: false,
  },
  guests: {
    guests: [],
    selectedGuest: undefined,
  },
  visits: {
    visitsByGuest: {},
    activeVisit: undefined,
  },
  tables: {
    tables: [],
  },
  notices: {
    publicNotices: [],
    personalNotices: [],
  },
  broadcasts: {
    broadcasts: [],
  },
  offers: {
    offers: [],
  },
  stats: {
    currentStats: undefined,
    statsHistory: [],
    lastUpdated: undefined,
  },
  waitlist: {
    waitlist: [],
  },
  system: {
    offlineQueue: [],
    isOnline: true,
  },
  setRole: () => undefined,
  loginGuest: async () => undefined,
  setAuthToken: () => undefined,
  logout: () => undefined,
  searchGuests: async () => undefined,
  createGuest: async () => {
    throw new Error('not initialized');
  },
  selectGuest: () => undefined,
  fetchVisitsForGuest: async () => undefined,
  createVisit: async () => {
    throw new Error('not initialized');
  },
  completeVisit: async () => undefined,
  loadTables: async () => undefined,
  updateTable: async () => undefined,
  fetchPublicNotices: async () => undefined,
  fetchPersonalNotices: async () => undefined,
  postNotice: async () => {
    throw new Error('not initialized');
  },
  togglePin: () => undefined,
  fetchBroadcasts: async () => undefined,
  createBroadcast: async () => {
    throw new Error('not initialized');
  },
  fetchOffers: async () => undefined,
  createOffer: async () => {
    throw new Error('not initialized');
  },
  refreshStats: async () => undefined,
  loadWaitlist: async () => undefined,
  upsertEntry: async () => undefined,
  removeEntry: async () => undefined,
  setOnline: async () => undefined,
  enqueueOffline: async () => undefined,
  hydrateQueue: async () => undefined,
  clearQueue: async () => undefined,
};

export const useEspressoStore = create<EspressoStore>()(
  devtools((set, get) => ({
    ...initialState,
    setRole: (role) =>
      set((state) => ({
        auth: {
          ...state.auth,
          role,
          isAuthenticated: true,
        },
      })),
    loginGuest: (guest) =>
      set((state) => ({
        auth: {
          ...state.auth,
          role: 'GUEST',
          guestId: guest.id,
          isAuthenticated: true,
        },
        guests: {
          ...state.guests,
          selectedGuest: guest,
        },
      })),
    setAuthToken: (token, role, guestId) =>
      set((state) => ({
        auth: {
          ...state.auth,
          token,
          role,
          guestId,
          isAuthenticated: true,
        },
      })),
    logout: () =>
      set(() => ({
        auth: {
          role: null,
          token: undefined,
          guestId: undefined,
          isAuthenticated: false,
        },
      })),
    searchGuests: async (query) => {
      const guests = await apiClient.fetchGuests(query);
      set((state) => ({ guests: { ...state.guests, guests } }));
    },
    createGuest: async ({ name, phone }) => {
      const guest = await apiClient.createGuest({
        name,
        phone,
      });
      set((state) => ({ guests: { ...state.guests, guests: [guest, ...state.guests.guests] } }));
      return guest;
    },
    selectGuest: (guest) =>
      set((state) => ({
        guests: {
          ...state.guests,
          selectedGuest: guest,
        },
      })),
    fetchVisitsForGuest: async (guestId) => {
      const visits = await apiClient.fetchVisits(guestId);
      set((state) => ({
        visits: {
          ...state.visits,
          visitsByGuest: { ...state.visits.visitsByGuest, [guestId]: visits },
          activeVisit: visits.find((visit) => !visit.checkOutAt),
        },
      }));
    },
    createVisit: async ({ checkInAt, ...payload }) => {
      const checkIn = checkInAt ?? new Date().toISOString();
      if (!get().system.isOnline) {
        const visit: Visit = {
          id: `offline-visit-${Date.now()}`,
          ...payload,
          checkInAt: checkIn,
        };
        set((state) => {
          const existing = state.visits.visitsByGuest[payload.guestId] ?? [];
          return {
            visits: {
              visitsByGuest: {
                ...state.visits.visitsByGuest,
                [payload.guestId]: [visit, ...existing],
              },
              activeVisit: visit,
            },
          };
        });
        await get().enqueueOffline({
          id: `mutation-${Date.now()}`,
          endpoint: '/visits',
          payload: { ...payload, checkInAt: checkIn },
          createdAt: new Date().toISOString(),
        });
        return visit;
      }
      const visit = await apiClient.createVisit({
        ...payload,
        checkInAt: checkIn,
      });
      set((state) => {
        const existing = state.visits.visitsByGuest[payload.guestId] ?? [];
        return {
          visits: {
            visitsByGuest: {
              ...state.visits.visitsByGuest,
              [payload.guestId]: [visit, ...existing],
            },
            activeVisit: visit,
          },
        };
      });
      return visit;
    },
    completeVisit: async (visitId) => {
      const visit = await apiClient.updateVisit(visitId, {
        checkOutAt: new Date().toISOString(),
      });
      set((state) => {
        if (!visit) {
          return {};
        }
        const guestVisits = state.visits.visitsByGuest[visit.guestId] ?? [];
        const next = guestVisits.map((existing) => (existing.id === visit.id ? visit : existing));
        return {
          visits: {
            visitsByGuest: {
              ...state.visits.visitsByGuest,
              [visit.guestId]: next,
            },
            activeVisit:
              state.visits.activeVisit?.id === visit.id ? undefined : state.visits.activeVisit,
          },
        };
      });
      return visit;
    },
    loadTables: async () => {
      const tables = await apiClient.fetchTables();
      set((state) => ({ tables: { ...state.tables, tables } }));
    },
    updateTable: async (tableId, payload) => {
      const updated = await apiClient.updateTable(tableId, payload);
      if (!updated) {
        return undefined;
      }
      set((state) => ({
        tables: {
          tables: state.tables.tables.map((table) =>
            table.id === tableId ? { ...table, ...updated } : table,
          ),
        },
      }));
      return updated;
    },
    fetchPublicNotices: async () => {
      const notices = await apiClient.fetchPublicNotices();
      set((state) => ({ notices: { ...state.notices, publicNotices: notices } }));
    },
    fetchPersonalNotices: async (guestId) => {
      const notices = await apiClient.fetchPersonalNotices(guestId);
      set((state) => ({ notices: { ...state.notices, personalNotices: notices } }));
    },
    postNotice: async (input) => {
      if (!get().system.isOnline) {
        const notice: Notice = {
          id: `offline-notice-${Date.now()}`,
          createdAt: new Date().toISOString(),
          ...input,
        };
        set((state) => {
          if (notice.scope === 'PUBLIC') {
            return {
              notices: {
                ...state.notices,
                publicNotices: [notice, ...state.notices.publicNotices],
              },
            };
          }
          return {
            notices: {
              ...state.notices,
              personalNotices: [notice, ...state.notices.personalNotices],
            },
          };
        });
        await get().enqueueOffline({
          id: `mutation-${Date.now()}`,
          endpoint: '/notices',
          payload: input,
          createdAt: new Date().toISOString(),
        });
        return notice;
      }
      const notice = await apiClient.postNotice(input);
      set((state) => {
        if (notice.scope === 'PUBLIC') {
          return {
            notices: {
              ...state.notices,
              publicNotices: [notice, ...state.notices.publicNotices],
            },
          };
        }
        return {
          notices: {
            ...state.notices,
            personalNotices: [notice, ...state.notices.personalNotices],
          },
        };
      });
      return notice;
    },
    togglePin: (noticeId) =>
      set((state) => ({
        notices: {
          ...state.notices,
          publicNotices: state.notices.publicNotices.map((notice) =>
            notice.id === noticeId ? { ...notice, pinned: !notice.pinned } : notice,
          ),
        },
      })),
    fetchBroadcasts: async () => {
      const broadcasts = await apiClient.fetchBroadcasts();
      set({ broadcasts: { broadcasts } });
    },
    createBroadcast: async (input) => {
      if (!get().system.isOnline) {
        const broadcast: Broadcast = {
          id: `offline-broadcast-${Date.now()}`,
          createdAt: new Date().toISOString(),
          approved: false,
          ...input,
        };
        set((state) => ({
          broadcasts: {
            broadcasts: [broadcast, ...state.broadcasts.broadcasts],
          },
        }));
        await get().enqueueOffline({
          id: `mutation-${Date.now()}`,
          endpoint: '/broadcasts',
          payload: input,
          createdAt: new Date().toISOString(),
        });
        return broadcast;
      }
      const broadcast = await apiClient.createBroadcast(input);
      set((state) => ({
        broadcasts: {
          broadcasts: [broadcast, ...state.broadcasts.broadcasts],
        },
      }));
      return broadcast;
    },
    fetchOffers: async () => {
      const offers = await apiClient.fetchOffers();
      set({ offers: { offers } });
    },
    createOffer: async (input) => {
      const offer = await apiClient.createOffer(input);
      set((state) => ({ offers: { offers: [offer, ...state.offers.offers] } }));
      return offer;
    },
    refreshStats: async () => {
      const { current, history } = await apiClient.fetchStats();
      set({
        stats: {
          currentStats: current,
          statsHistory: history,
          lastUpdated: dayjs().toISOString(),
        },
      });
    },
    loadWaitlist: async () => {
      const waitlist = await apiClient.fetchWaitlist();
      set({ waitlist: { waitlist } });
    },
    upsertEntry: async (entry) => {
      const waitlist = await apiClient.upsertWaitlist(entry);
      set({ waitlist: { waitlist } });
    },
    removeEntry: async (entryId) => {
      const waitlist = await apiClient.removeWaitlistEntry(entryId);
      set({ waitlist: { waitlist } });
    },
    setOnline: async (online) => {
      set((state) => ({
        system: {
          ...state.system,
          isOnline: online,
        },
      }));
      if (online) {
        const queue = await apiClient.readOfflineQueue();
        await apiClient.clearOfflineQueue();
        set((state) => ({
          system: {
            ...state.system,
            offlineQueue: queue,
          },
        }));
      }
    },
    enqueueOffline: async (mutation) => {
      const queue = await apiClient.queueOfflineMutation(mutation);
      set((state) => ({
        system: {
          ...state.system,
          offlineQueue: queue,
        },
      }));
    },
    hydrateQueue: async () => {
      const queue = await apiClient.readOfflineQueue();
      set((state) => ({
        system: {
          ...state.system,
          offlineQueue: queue,
        },
      }));
    },
    clearQueue: async () => {
      await apiClient.clearOfflineQueue();
      set((state) => ({
        system: {
          ...state.system,
          offlineQueue: [],
        },
      }));
    },
  })),
);
