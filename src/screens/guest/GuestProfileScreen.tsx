import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { formatRelativeTime } from '../../utils/format';

export const GuestProfileScreen = () => {
  const theme = useTheme();
  const guest = useEspressoStore((state) => state.guests.selectedGuest);
  const activeVisit = useEspressoStore((state) => state.visits.activeVisit);
  const completeVisit = useEspressoStore((state) => state.completeVisit);

  const handleCheckout = async () => {
    if (!activeVisit) {
      Alert.alert('No active visit');
      return;
    }
    await completeVisit(activeVisit.id);
    Alert.alert('Thank you!', 'Your visit has been ended.');
  };

  if (!guest) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.message, { color: theme.colors.textMuted }]}>Sign in to view your profile.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { borderColor: theme.colors.border }]}
        accessibilityRole="summary"
      >
        <Text style={[styles.name, { color: theme.colors.text }]}>{guest.name}</Text>
        <Text style={{ color: theme.colors.textMuted }}>{guest.phone}</Text>
        {guest.preferences?.length ? (
          <Text style={[styles.preferences, { color: theme.colors.text }]}>Preferences: {guest.preferences.join(', ')}</Text>
        ) : null}
      </View>

      {activeVisit ? (
        <View style={[styles.card, { borderColor: theme.colors.border }]}
          accessibilityRole="summary"
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active visit</Text>
          <Text style={{ color: theme.colors.text }}>Party of {activeVisit.partySize}</Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Checked in {formatRelativeTime(activeVisit.checkInAt)}
          </Text>
          <TouchableOpacity
            style={[styles.cta, { backgroundColor: theme.colors.primary }]}
            onPress={handleCheckout}
            accessibilityRole="button"
          >
            <Text style={styles.ctaText}>End visit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ color: theme.colors.textMuted }}>No active visit right now.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  preferences: {
    fontSize: 14,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cta: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  message: {
    textAlign: 'center',
    marginTop: 48,
  },
});
