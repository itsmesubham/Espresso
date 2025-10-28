import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useEspressoStore } from '../store/useEspressoStore';
import { mockPushNotifications } from '../services/pushNotifications';

export const useAppBootstrap = () => {
  const hydrateQueue = useEspressoStore((state) => state.hydrateQueue);
  const setOnline = useEspressoStore((state) => state.setOnline);

  useEffect(() => {
    hydrateQueue();

    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });

    mockPushNotifications
      .requestPermission()
      .catch((error) => console.warn('Mock push permission rejected', error));

    const unsubscribeTokenRefresh = mockPushNotifications.onTokenRefresh((token) => {
      console.log('Mock push token', token);
    });

    return () => {
      unsubscribeNetInfo();
      unsubscribeTokenRefresh();
    };
  }, [hydrateQueue, setOnline]);
};
