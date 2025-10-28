import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import { GuestHomeStackParamList } from '../../navigation/guestTypes';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';

export const ConfirmCheckInScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<GuestHomeStackParamList, 'ConfirmCheckIn'>) => {
  const { guest, partySize, specialRequests } = route.params;
  const theme = useTheme();
  const createVisit = useEspressoStore((state) => state.createVisit);
  const fetchVisits = useEspressoStore((state) => state.fetchVisitsForGuest);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    try {
      setSubmitting(true);
      await createVisit({
        guestId: guest.id,
        partySize,
        notes: specialRequests,
        checkInAt: new Date().toISOString(),
      });
      await fetchVisits(guest.id);
      navigation.replace('GuestPreviousVisits', { guest });
    } catch (error) {
      console.warn('Failed to complete check-in', error);
      Alert.alert('Unable to check in', 'Please try again shortly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Confirm your visit</Text>
      <View style={[styles.summary, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
        accessibilityRole="summary"
      >
        <Text style={[styles.row, { color: theme.colors.text }]}>Guest: {guest.name}</Text>
        <Text style={[styles.row, { color: theme.colors.text }]}>Party size: {partySize}</Text>
        <Text style={[styles.row, { color: theme.colors.text }]}>Check-in time: {dayjs().format('h:mm A')}</Text>
        {specialRequests ? (
          <Text style={[styles.row, { color: theme.colors.text }]}>Requests: {specialRequests}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.cta, { backgroundColor: theme.colors.primary }]}
        onPress={handleConfirm}
        disabled={isSubmitting}
        accessibilityRole="button"
      >
        <Text style={styles.ctaText}>{isSubmitting ? 'Checking in…' : 'Check in'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary} onPress={() => navigation.goBack()}>
        <Text style={[styles.secondaryText, { color: theme.colors.textMuted }]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  summary: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    gap: 12,
  },
  row: {
    fontSize: 16,
  },
  cta: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondary: {
    alignItems: 'center',
  },
  secondaryText: {
    fontSize: 16,
  },
});
