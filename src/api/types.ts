export type Role = 'GUEST' | 'STAFF' | 'OWNER';

export type Guest = {
  id: string;
  name: string;
  phone: string;
  lastVisitAt?: string;
  preferences?: string[];
  fcmToken?: string;
};

export type Visit = {
  id: string;
  guestId: string;
  partySize: number;
  checkInAt: string;
  checkOutAt?: string;
  tableId?: string;
  notes?: string;
};

export type NoticeScope = 'PERSONAL' | 'PUBLIC';

export type Notice = {
  id: string;
  scope: NoticeScope;
  toGuestId?: string;
  title: string;
  body: string;
  createdAt: string;
  createdBy: string;
  pinned?: boolean;
};

export type Broadcast = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  tags?: string[];
  approved?: boolean;
};

export type OfferAudience = 'ALL' | 'TAGGED' | 'VISITED_LAST_30D';

export type Offer = {
  id: string;
  title: string;
  body: string;
  validFrom: string;
  validTo: string;
  audience: OfferAudience;
  deepLink?: string;
  sentAt?: string;
  openRate?: number;
  redemptionRate?: number;
  tags?: string[];
};

export type TableStatus = 'FREE' | 'HELD' | 'SEATED' | 'DIRTY';

export type Table = {
  id: string;
  name: string;
  capacity: number;
  status: TableStatus;
};

export type Stats = {
  currentGuests: number;
  totalVisitedToday: number;
  avgDwellMin: number;
  occupancyPct: number;
  tableUtilPct: number;
  waitlistCount: number;
  revenueEst: number;
  topItems?: string[];
};

export type WaitlistEntry = {
  id: string;
  guestName: string;
  partySize: number;
  requestedAt: string;
  etaMinutes?: number;
  notifiedAt?: string;
};

export type AuthToken = {
  token: string;
  role: Role;
  guestId?: string;
  expiresAt: string;
};
