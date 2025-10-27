import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { RootStackParamList } from '../../navigation/types';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { formatShortDate } from '../../utils/format';

export const VisitDetailScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'VisitDetail'>) => {
  const theme = useTheme();
  const searchGuests = useEspressoStore((state) => state.searchGuests);
  const guests = useEspressoStore((state) => state.guests.guests);
  const fetchVisits = useEspressoStore((state) => state.fetchVisitsForGuest);
  const visitsByGuest = useEspressoStore((state) => state.visits.visitsByGuest);

  const visit = Object.values(visitsByGuest).flat().find((item) => item.id === route.params.visitId);

  useEffect(() => {
    if (!visit) {
      searchGuests('');
      guests.forEach((guest) => fetchVisits(guest.id));
    }
  }, [fetchVisits, guests, searchGuests, visit]);

  if (!visit) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>Loading visit…</Text>
      </View>
    );
  }

  const guest = guests.find((g) => g.id === visit.guestId);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
      accessibilityRole="summary"
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>Visit detail</Text>
      <Text style={{ color: theme.colors.text }}>Guest: {guest?.name ?? visit.guestId}</Text>
      <Text style={{ color: theme.colors.text }}>Party size: {visit.partySize}</Text>
      <Text style={{ color: theme.colors.text }}>Check-in: {formatShortDate(visit.checkInAt)}</Text>
      <Text style={{ color: theme.colors.text }}>Check-out: {visit.checkOutAt ? formatShortDate(visit.checkOutAt) : 'In progress'}</Text>
      <Text style={{ color: theme.colors.text }}>Table: {visit.tableId ?? 'Not assigned'}</Text>
      {visit.notes ? <Text style={{ color: theme.colors.text }}>Notes: {visit.notes}</Text> : null}
      <Text style={{ color: theme.colors.textMuted }}>
        Dwell time {visit.checkOutAt ? dayjs(visit.checkOutAt).diff(dayjs(visit.checkInAt), 'minute') : '—'} min
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
