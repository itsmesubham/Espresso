import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { Table } from '../../api/types';

const statusColors: Record<Table['status'], string> = {
  FREE: '#2E8B57',
  HELD: '#F3B34C',
  SEATED: '#6C3B2A',
  DIRTY: '#CC4A3D',
};

export const LiveFloorScreen = () => {
  const theme = useTheme();
  const loadTables = useEspressoStore((state) => state.loadTables);
  const updateTable = useEspressoStore((state) => state.updateTable);
  const tables = useEspressoStore((state) => state.tables.tables);

  useEffect(() => {
    loadTables();
  }, [loadTables]);

  const cycleStatus = (status: Table['status']): Table['status'] => {
    const order: Table['status'][] = ['FREE', 'HELD', 'SEATED', 'DIRTY'];
    const index = order.indexOf(status);
    return order[(index + 1) % order.length];
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      data={tables}
      numColumns={2}
      contentContainerStyle={styles.list}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const nextStatus = cycleStatus(item.status);
        return (
          <TouchableOpacity
            style={[styles.tile, { backgroundColor: theme.colors.surface, borderColor: statusColors[item.status] }]}
            onLongPress={() => updateTable(item.id, { status: nextStatus })}
            accessibilityHint="Long press to change status"
          >
            <Text style={[styles.title, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={{ color: statusColors[item.status], fontWeight: '700' }}>{item.status}</Text>
            <Text style={{ color: theme.colors.textMuted }}>Seats {item.capacity}</Text>
            <Text style={styles.statusHint}>Hold to mark as {nextStatus}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 12,
    gap: 12,
  },
  tile: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    margin: 6,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusHint: {
    marginTop: 8,
    fontSize: 12,
    color: '#6F4C3E',
  },
});
