import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Visit } from '../api/types';
import { useTheme } from '../theme';
import { formatRelativeTime, formatShortDate } from '../utils/format';

export const GuestVisitList = ({ visits }: { visits: Visit[] }) => {
  const theme = useTheme();

  return (
    <FlatList
      data={visits}
      keyExtractor={(visit) => visit.id}
      ListEmptyComponent={() => (
        <Text style={[styles.empty, { color: theme.colors.textMuted }]}>No visits yet.</Text>
      )}
      renderItem={({ item }) => (
        <View
          style={[styles.row, { borderColor: theme.colors.border }]}
          accessibilityRole="summary"
        >
          <View style={styles.rowContent}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Party of {item.partySize}</Text>
            <Text style={[styles.meta, { color: theme.colors.textMuted }]}>
              {formatShortDate(item.checkInAt)}
            </Text>
            {item.notes ? (
              <Text style={[styles.notes, { color: theme.colors.text }]}>{item.notes}</Text>
            ) : null}
          </View>
          <Text style={[styles.meta, { color: theme.colors.textMuted }]}>
            {formatRelativeTime(item.checkInAt)}
          </Text>
        </View>
      )}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  row: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  rowContent: {
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    fontSize: 13,
  },
  notes: {
    marginTop: 4,
    fontSize: 14,
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
  },
});
