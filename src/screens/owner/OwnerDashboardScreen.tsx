import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { useStatsPolling } from '../../hooks/useStatsPolling';
import { formatCurrency, formatPercent } from '../../utils/format';
import { Sparkline } from '../../components/Sparkline';

export const OwnerDashboardScreen = () => {
  const theme = useTheme();
  const stats = useEspressoStore((state) => state.stats.currentStats);
  const history = useEspressoStore((state) => state.stats.statsHistory);
  const refreshStats = useEspressoStore((state) => state.refreshStats);
  const waitlist = useEspressoStore((state) => state.waitlist.waitlist);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  useStatsPolling();

  if (!stats) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.colors.background }]}> 
        <Text style={{ color: theme.colors.text }}>Loading metrics…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Today at a glance</Text>
      <View style={styles.grid}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}
          accessibilityRole="summary"
        >
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Guests on site</Text>
          <Text style={[styles.value, { color: theme.colors.primary }]}>{stats.currentGuests}</Text>
          <Sparkline history={history} field="currentGuests" />
        </View>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}
          accessibilityRole="summary"
        >
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Revenue est.</Text>
          <Text style={[styles.value, { color: theme.colors.primary }]}>{formatCurrency(stats.revenueEst)}</Text>
          <Sparkline history={history} field="revenueEst" />
        </View>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}
          accessibilityRole="summary"
        >
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Occupancy</Text>
          <Text style={[styles.value, { color: theme.colors.primary }]}>{formatPercent(stats.occupancyPct, 0)}</Text>
          <Sparkline history={history} field="occupancyPct" />
        </View>
      </View>

      <View style={[styles.fullCard, { backgroundColor: theme.colors.surface }]}
        accessibilityRole="summary"
      >
        <Text style={[styles.label, { color: theme.colors.textMuted }]}>Top items</Text>
        <Text style={{ color: theme.colors.text, marginTop: 8 }}>
          {stats.topItems?.join(', ') ?? 'No sales yet'}
        </Text>
      </View>

      <View style={[styles.fullCard, { backgroundColor: theme.colors.surfaceAlt }]}
        accessibilityRole="summary"
      >
        <Text style={[styles.label, { color: theme.colors.textMuted }]}>Waitlist</Text>
        {waitlist.map((entry) => (
          <Text key={entry.id} style={{ color: theme.colors.text }}>
            {entry.guestName} • {entry.partySize} ppl • {entry.etaMinutes ?? 'Ready'} min
          </Text>
        ))}
        {waitlist.length === 0 ? (
          <Text style={{ color: theme.colors.textMuted }}>No guests waiting.</Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 16,
    gap: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
  },
  grid: {
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  fullCard: {
    padding: 16,
    borderRadius: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
});
