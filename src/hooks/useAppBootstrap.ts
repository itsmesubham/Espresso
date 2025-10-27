import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';
import { useEspressoStore } from '../store/useEspressoStore';

export const useAppBootstrap = () => {
  const hydrateQueue = useEspressoStore((state) => state.hydrateQueue);
  const setOnline = useEspressoStore((state) => state.setOnline);

  useEffect(() => {
    hydrateQueue();

    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });

    const requestPermission = async () => {
      try {
        await messaging().requestPermission();
      } catch (error) {
        console.warn('FCM permission rejected', error);
      }
    };

    requestPermission();

    const unsubscribeTokenRefresh = messaging().onTokenRefresh((token) => {
      console.log('Refreshed FCM token', token);
    });

    return () => {
      unsubscribeNetInfo();
      unsubscribeTokenRefresh();
    };
  }, [hydrateQueue, setOnline]);
};
