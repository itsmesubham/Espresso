import { Guest } from '../api/types';

export type GuestHomeStackParamList = {
  GuestWelcome: undefined;
  PartySize: { guest: Guest } | undefined;
  ConfirmCheckIn: {
    guest: Guest;
    partySize: number;
    specialRequests?: string;
  };
  GuestPreviousVisits: { guest: Guest };
};
