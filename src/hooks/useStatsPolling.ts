import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useEspressoStore } from '../store/useEspressoStore';

export const useStatsPolling = (intervalMs = 10000) => {
  const refreshStats = useEspressoStore((state) => state.refreshStats);

  useEffect(() => {
    let mounted = true;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const tick = async () => {
      if (!mounted) return;
      await refreshStats();
      timeout = setTimeout(tick, intervalMs);
    };

    tick();

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        refreshStats();
      }
    });

    return () => {
      mounted = false;
      if (timeout) clearTimeout(timeout);
      subscription.remove();
    };
  }, [intervalMs, refreshStats]);
};
