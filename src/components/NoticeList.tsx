import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Notice } from '../api/types';
import { useTheme } from '../theme';
import { formatRelativeTime } from '../utils/format';

export type NoticeListProps = {
  notices: Notice[];
  emptyState?: string;
  onPressNotice?: (notice: Notice) => void;
};

export const NoticeList: React.FC<NoticeListProps> = ({ notices, emptyState, onPressNotice }) => {
  const theme = useTheme();

  return (
    <FlatList
      data={notices}
      ListEmptyComponent={() => (
        <Text style={[styles.empty, { color: theme.colors.textMuted }]}>{emptyState ?? 'No notices yet.'}</Text>
      )}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          accessibilityRole="button"
          accessibilityLabel={`${item.title}. ${item.body}`}
          onTouchEnd={() => onPressNotice?.(item)}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.timestamp, { color: theme.colors.textMuted }]}>
              {formatRelativeTime(item.createdAt)}
            </Text>
          </View>
          <Text style={[styles.body, { color: theme.colors.text }]}>{item.body}</Text>
          <Text style={[styles.meta, { color: theme.colors.textMuted }]}>By {item.createdBy}</Text>
        </View>
      )}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
  },
  body: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  meta: {
    marginTop: 8,
    fontSize: 12,
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
  },
  content: {
    padding: 16,
  },
});
