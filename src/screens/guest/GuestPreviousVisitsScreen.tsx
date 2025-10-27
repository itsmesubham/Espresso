// src/screens/guest/GuestPreviousVisitsScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useGuestsStore } from '../../store';
import { Visit } from '../../types/models';

const GuestPreviousVisitsScreen = () => {
  const { theme } = useTheme();
  const { fetchGuests } = useGuestsStore();
  // In a real app, we would use useVisitsStore to fetch visits for the current guest
  // For this demo, we'll use mock data

  // Mock data for previous visits
  const mockVisits: Visit[] = [
    {
      id: '1',
      guestId: '1',
      partySize: 2,
      checkInAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      checkOutAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      tableId: 'T3',
      notes: 'Window seat requested',
    },
    {
      id: '2',
      guestId: '1',
      partySize: 4,
      checkInAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      checkOutAt: new Date(Date.now() - 129600000).toISOString(), // 36 hours ago
      tableId: 'T5',
    },
    {
      id: '3',
      guestId: '1',
      partySize: 3,
      checkInAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      checkOutAt: new Date(Date.now() - 216000000).toISOString(), // 60 hours ago
      tableId: 'T2',
    },
  ];

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    // In a real app: fetchVisits for the current guest
    fetchGuests('');
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // In a real app: fetch updated visits
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderVisitItem = ({ item }: { item: Visit }) => (
    <TouchableOpacity style={[styles.visitCard, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.visitHeader}>
        <Text style={[styles.visitDate, { color: theme.colors.text }]}>
          {formatDateTime(item.checkInAt)}
        </Text>
        <Text style={[styles.partySize, { color: theme.colors.accent, fontWeight: 'bold' }]}>
          Party of {item.partySize}
        </Text>
      </View>
      
      <View style={styles.visitDetails}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Check-in:</Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            {formatDateTime(item.checkInAt)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Check-out:</Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            {item.checkOutAt ? formatDateTime(item.checkOutAt) : 'N/A'}
          </Text>
        </View>
        
        {item.tableId && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Table:</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.tableId}
            </Text>
          </View>
        )}
        
        {item.notes && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Notes:</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.notes}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Your Previous Visits
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          History of your past visits
        </Text>
      </View>
      
      <FlatList
        data={mockVisits}
        renderItem={renderVisitItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No previous visits found
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
              Your visit history will appear here after your first visit
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  visitCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  visitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingBottom: 8,
  },
  visitDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  partySize: {
    fontSize: 16,
  },
  visitDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default GuestPreviousVisitsScreen;