import { act } from '@testing-library/react-native';
import { useEspressoStore } from '../src/store/useEspressoStore';

jest.mock('@react-native-firebase/messaging', () => () => ({
  requestPermission: jest.fn().mockResolvedValue(true),
  onTokenRefresh: jest.fn().mockReturnValue(() => {}),
}));

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn().mockReturnValue(() => {}),
}));

describe('Espresso store', () => {
  it('creates a visit and sets active visit', async () => {
    let guestId = '';

    await act(async () => {
      const guest = await useEspressoStore.getState().createGuest({ name: 'Test Guest', phone: '000' });
      guestId = guest.id;
    });

    await act(async () => {
      const created = await useEspressoStore.getState().createVisit({
        guestId,
        partySize: 2,
        notes: 'Testing visit',
      });
      expect(created.guestId).toBe(guestId);
    });

    const active = useEspressoStore.getState().visits.activeVisit;
    expect(active?.guestId).toBe(guestId);
  });
});
