import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { formatShortDate } from '../../utils/format';

export const VisitsTodayScreen = () => {
  const theme = useTheme();
  const searchGuests = useEspressoStore((state) => state.searchGuests);
  const guests = useEspressoStore((state) => state.guests.guests);
  const fetchVisits = useEspressoStore((state) => state.fetchVisitsForGuest);
  const visitsByGuest = useEspressoStore((state) => state.visits.visitsByGuest);

  useEffect(() => {
    searchGuests('');
  }, [searchGuests]);

  useEffect(() => {
    guests.forEach((guest) => fetchVisits(guest.id));
  }, [guests, fetchVisits]);

  const rows = Object.values(visitsByGuest)
    .flat()
    .filter((visit) => dayjs(visit.checkInAt).isSame(dayjs(), 'day'));

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      data={rows}
      keyExtractor={(visit) => visit.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={() => (
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, { color: theme.colors.text }]}>Guest</Text>
          <Text style={[styles.headerCell, { color: theme.colors.text }]}>Party</Text>
          <Text style={[styles.headerCell, { color: theme.colors.text }]}>Check-in</Text>
          <Text style={[styles.headerCell, { color: theme.colors.text }]}>Table</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={[styles.row, { borderColor: theme.colors.border }]}
          accessibilityRole="text"
        >
          <Text style={[styles.cell, { color: theme.colors.text }]}>{guests.find((guest) => guest.id === item.guestId)?.name ?? item.guestId}</Text>
          <Text style={[styles.cell, { color: theme.colors.text }]}>{item.partySize}</Text>
          <Text style={[styles.cell, { color: theme.colors.text }]}>{formatShortDate(item.checkInAt)}</Text>
          <Text style={[styles.cell, { color: theme.colors.text }]}>{item.tableId ?? '—'}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
  },
});
