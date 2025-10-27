// Data Models
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

export type Notice = {
  id: string;
  scope: 'PERSONAL' | 'PUBLIC';
  toGuestId?: string;
  title: string;
  body: string;
  createdAt: string;
  createdBy: string;
};

export type Broadcast = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  tags?: string[];
};

export type Offer = {
  id: string;
  title: string;
  body: string;
  validFrom: string;
  validTo: string;
  audience: 'ALL' | 'TAGGED' | 'VISITED_LAST_30D';
  deepLink?: string;
};

export type Table = {
  id: string;
  name: string;
  capacity: number;
  status: 'FREE' | 'HELD' | 'SEATED' | 'DIRTY';
};

export type Stats = {
  currentGuests: number;
  totalVisitedToday: number;
  avgDwellMin: number;
  occupancyPct: number;
  tableUtilPct: number;
  waitlistCount: number;
  revenueEst: number;
};

// Role type
export type UserRole = 'GUEST' | 'STAFF' | 'OWNER';

// Authentication
export type AuthCredentials = {
  email: string;
  phone: string;
};

export type AuthToken = {
  token: string;
  role: UserRole;
  expiresAt: string;
};