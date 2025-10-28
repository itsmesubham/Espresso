import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useEspressoStore } from '../store/useEspressoStore';
import { useTheme } from '../theme';

export const OfflineBanner = () => {
  const theme = useTheme();
  const isOnline = useEspressoStore((state) => state.system.isOnline);
  const offlineQueue = useEspressoStore((state) => state.system.offlineQueue);

  if (isOnline && offlineQueue.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.warning,
        },
      ]}
      accessibilityRole="alert"
    >
      <Text style={[styles.text, { color: theme.colors.text }]}>
        {isOnline
          ? `Replaying ${offlineQueue.length} offline action${offlineQueue.length === 1 ? '' : 's'}...`
          : 'Working offline. Changes will sync when reconnected.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
