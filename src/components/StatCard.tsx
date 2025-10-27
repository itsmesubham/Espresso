import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stats } from '../api/types';
import { useTheme } from '../theme';

export type StatCardProps = {
  label: string;
  value: string;
  trend?: string;
  accessibilityLabel?: string;
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, accessibilityLabel }) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }]}
      accessibilityRole="summary"
      accessibilityLabel={accessibilityLabel ?? `${label}: ${value}`}
    >
      <Text style={[styles.label, { color: theme.colors.textMuted }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.colors.primary }]}>{value}</Text>
      {trend ? <Text style={[styles.trend, { color: theme.colors.textMuted }]}>{trend}</Text> : null}
    </View>
  );
};

export const StatsGrid = ({ stats }: { stats: Stats }) => {
  const entries: Array<{ key: keyof Stats; label: string }> = [
    { key: 'currentGuests', label: 'Guests on site' },
    { key: 'totalVisitedToday', label: 'Visits today' },
    { key: 'waitlistCount', label: 'Waitlist' },
    { key: 'avgDwellMin', label: 'Avg dwell (min)' },
    { key: 'occupancyPct', label: 'Occupancy' },
    { key: 'tableUtilPct', label: 'Table util.' },
    { key: 'revenueEst', label: 'Revenue est.' },
  ];
  return (
    <View style={styles.grid}>
      {entries.map((entry) => {
        const value = stats[entry.key];
        return (
          <StatCard
            key={entry.key}
            label={entry.label}
            value={typeof value === 'number' ? value.toString() : String(value)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: '700',
  },
  trend: {
    marginTop: 6,
    fontSize: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
});
