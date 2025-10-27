import axios, { AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  mockBroadcasts,
  mockGuests,
  mockOffers,
  mockPersonalNotices,
  mockPublicNotices,
  mockStats,
  mockStatsHistory,
  mockTables,
  mockVisits,
  mockWaitlist,
} from './mock';
import {
  AuthToken,
  Broadcast,
  Guest,
  Notice,
  Offer,
  Stats,
  Table,
  Visit,
  WaitlistEntry,
} from './types';

const USE_MOCK = (globalThis.process?.env?.USE_MOCK ?? 'true') !== 'false';

const API_BASE_URL =
  globalThis.process?.env?.API_BASE_URL ?? 'https://espresso-placeholder-api.invalid';

const OFFLINE_QUEUE_KEY = 'espresso-offline-queue';

export type OfflineMutation = {
  id: string;
  endpoint: string;
  payload: Record<string, unknown>;
  createdAt: string;
};

export class ApiClient {
  private axios: AxiosInstance;

  private mockState = {
    guests: [...mockGuests],
    visits: [...mockVisits],
    publicNotices: [...mockPublicNotices],
    personalNotices: [...mockPersonalNotices],
    broadcasts: [...mockBroadcasts],
    offers: [...mockOffers],
    tables: [...mockTables],
    stats: mockStats,
    statsHistory: [...mockStatsHistory],
    waitlist: [...mockWaitlist],
  };

  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  async loginWithOtp(email: string): Promise<AuthToken> {
    if (USE_MOCK) {
      return this.withLatency<AuthToken>({
        token: `mock-token-${email}`,
        role: email.includes('owner') ? 'OWNER' : email.includes('staff') ? 'STAFF' : 'GUEST',
        guestId: this.mockState.guests[0]?.id,
        expiresAt: dayjs().add(1, 'day').toISOString(),
      });
    }

    const response = await this.axios.post<AuthToken>('/auth/otp', { email });
    return response.data;
  }

  async fetchGuests(query: string): Promise<Guest[]> {
    if (USE_MOCK) {
      const q = query.toLowerCase();
      return this.withLatency(
        this.mockState.guests.filter(
          (guest) => guest.name.toLowerCase().includes(q) || guest.phone.includes(query),
        ),
      );
    }
    const response = await this.axios.get<Guest[]>('/guests', { params: { query } });
    return response.data;
  }

  async createGuest(payload: Omit<Guest, 'id'>): Promise<Guest> {
    if (USE_MOCK) {
      const guest: Guest = { ...payload, id: `guest-${Date.now()}` };
      this.mockState.guests.push(guest);
      return this.withLatency(guest);
    }
    const response = await this.axios.post<Guest>('/guests', payload);
    return response.data;
  }

  async fetchVisits(guestId: string): Promise<Visit[]> {
    if (USE_MOCK) {
      return this.withLatency(
        this.mockState.visits
          .filter((visit) => visit.guestId === guestId)
          .sort((a, b) => dayjs(b.checkInAt).diff(dayjs(a.checkInAt))),
      );
    }
    const response = await this.axios.get<Visit[]>(`/guests/${guestId}/visits`);
    return response.data;
  }

  async createVisit(payload: Omit<Visit, 'id'>): Promise<Visit> {
    if (USE_MOCK) {
      const visit: Visit = { id: `visit-${Date.now()}`, ...payload };
      this.mockState.visits.push(visit);
      this.updateStatsForVisit(visit);
      return this.withLatency(visit);
    }
    const response = await this.axios.post<Visit>('/visits', payload);
    return response.data;
  }

  async updateVisit(visitId: string, payload: Partial<Visit>): Promise<Visit> {
    if (USE_MOCK) {
      const index = this.mockState.visits.findIndex((visit) => visit.id === visitId);
      if (index >= 0) {
        this.mockState.visits[index] = {
          ...this.mockState.visits[index],
          ...payload,
        };
      }
      return this.withLatency(this.mockState.visits[index]);
    }
    const response = await this.axios.patch<Visit>(`/visits/${visitId}`, payload);
    return response.data;
  }

  async fetchTables(): Promise<Table[]> {
    if (USE_MOCK) {
      return this.withLatency([...this.mockState.tables]);
    }
    const response = await this.axios.get<Table[]>('/tables');
    return response.data;
  }

  async updateTable(tableId: string, payload: Partial<Table>): Promise<Table> {
    if (USE_MOCK) {
      const index = this.mockState.tables.findIndex((table) => table.id === tableId);
      if (index >= 0) {
        this.mockState.tables[index] = {
          ...this.mockState.tables[index],
          ...payload,
        };
      }
      return this.withLatency(this.mockState.tables[index]);
    }
    const response = await this.axios.patch<Table>(`/tables/${tableId}`, payload);
    return response.data;
  }

  async postNotice(payload: Omit<Notice, 'id' | 'createdAt'>): Promise<Notice> {
    const notice: Notice = {
      ...payload,
      id: `notice-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    if (USE_MOCK) {
      if (notice.scope === 'PUBLIC') {
        this.mockState.publicNotices.unshift(notice);
      } else {
        this.mockState.personalNotices.unshift(notice);
      }
      return this.withLatency(notice);
    }
    const response = await this.axios.post<Notice>('/notices', payload);
    return response.data;
  }

  async fetchPublicNotices(): Promise<Notice[]> {
    if (USE_MOCK) {
      const sorted = [...this.mockState.publicNotices].sort((a, b) => {
        if (a.pinned && !b.pinned) {
          return -1;
        }
        if (!a.pinned && b.pinned) {
          return 1;
        }
        return dayjs(b.createdAt).diff(dayjs(a.createdAt));
      });
      return this.withLatency(sorted);
    }
    const response = await this.axios.get<Notice[]>('/notices', { params: { scope: 'PUBLIC' } });
    return response.data;
  }

  async fetchPersonalNotices(guestId: string): Promise<Notice[]> {
    if (USE_MOCK) {
      return this.withLatency(
        this.mockState.personalNotices.filter((notice) => notice.toGuestId === guestId),
      );
    }
    const response = await this.axios.get<Notice[]>('/notices', {
      params: { scope: 'PERSONAL', guestId },
    });
    return response.data;
  }

  async fetchBroadcasts(): Promise<Broadcast[]> {
    if (USE_MOCK) {
      return this.withLatency([...this.mockState.broadcasts]);
    }
    const response = await this.axios.get<Broadcast[]>('/broadcasts');
    return response.data;
  }

  async createBroadcast(payload: Omit<Broadcast, 'id' | 'createdAt' | 'approved'>): Promise<Broadcast> {
    const broadcast: Broadcast = {
      ...payload,
      id: `broadcast-${Date.now()}`,
      createdAt: new Date().toISOString(),
      approved: Platform.OS === 'ios' ? false : true,
    };
    if (USE_MOCK) {
      this.mockState.broadcasts.unshift(broadcast);
      return this.withLatency(broadcast);
    }
    const response = await this.axios.post<Broadcast>('/broadcasts', payload);
    return response.data;
  }

  async fetchOffers(): Promise<Offer[]> {
    if (USE_MOCK) {
      return this.withLatency([...this.mockState.offers]);
    }
    const response = await this.axios.get<Offer[]>('/offers');
    return response.data;
  }

  async createOffer(payload: Omit<Offer, 'id' | 'sentAt'>): Promise<Offer> {
    const offer: Offer = {
      ...payload,
      id: `offer-${Date.now()}`,
      sentAt: payload.validFrom,
    };
    if (USE_MOCK) {
      this.mockState.offers.unshift(offer);
      return this.withLatency(offer);
    }
    const response = await this.axios.post<Offer>('/offers', payload);
    return response.data;
  }

  async fetchStats(): Promise<{ current: Stats; history: Stats[] }> {
    if (USE_MOCK) {
      const jittered = {
        ...this.mockState.stats,
        currentGuests: this.mockState.stats.currentGuests + Math.round(Math.random() * 4 - 2),
        waitlistCount: this.mockState.waitlist.length,
      };
      this.mockState.stats = jittered;
      this.mockState.statsHistory.push(jittered);
      if (this.mockState.statsHistory.length > 24) {
        this.mockState.statsHistory.shift();
      }
      return this.withLatency({ current: jittered, history: [...this.mockState.statsHistory] });
    }
    const response = await this.axios.get<{ current: Stats; history: Stats[] }>('/stats/today');
    return response.data;
  }

  async fetchWaitlist(): Promise<WaitlistEntry[]> {
    if (USE_MOCK) {
      return this.withLatency([...this.mockState.waitlist]);
    }
    const response = await this.axios.get<WaitlistEntry[]>('/waitlist');
    return response.data;
  }

  async upsertWaitlist(entry: WaitlistEntry): Promise<WaitlistEntry[]> {
    if (USE_MOCK) {
      const index = this.mockState.waitlist.findIndex((item) => item.id === entry.id);
      if (index >= 0) {
        this.mockState.waitlist[index] = entry;
      } else {
        this.mockState.waitlist.push(entry);
      }
      return this.withLatency([...this.mockState.waitlist]);
    }
    const response = await this.axios.post<WaitlistEntry[]>('/waitlist', entry);
    return response.data;
  }

  async removeWaitlistEntry(entryId: string): Promise<WaitlistEntry[]> {
    if (USE_MOCK) {
      this.mockState.waitlist = this.mockState.waitlist.filter((entry) => entry.id !== entryId);
      return this.withLatency([...this.mockState.waitlist]);
    }
    const response = await this.axios.post<WaitlistEntry[]>('/waitlist/remove', { id: entryId });
    return response.data;
  }

  async queueOfflineMutation(mutation: OfflineMutation) {
    const existingRaw = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    const parsed: OfflineMutation[] = existingRaw ? JSON.parse(existingRaw) : [];
    const next = [...parsed, mutation];
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(next));
    return next;
  }

  async readOfflineQueue(): Promise<OfflineMutation[]> {
    const raw = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  async clearOfflineQueue(): Promise<void> {
    await AsyncStorage.removeItem(OFFLINE_QUEUE_KEY);
  }

  private async withLatency<T>(value: T, delay = 300): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return value;
  }

  private updateStatsForVisit(visit: Visit) {
    this.mockState.stats.currentGuests += 1;
    this.mockState.stats.totalVisitedToday += 1;
    if (visit.tableId) {
      const table = this.mockState.tables.find((t) => t.id === visit.tableId);
      if (table) {
        table.status = 'SEATED';
      }
    }
  }
}

export const apiClient = new ApiClient();
