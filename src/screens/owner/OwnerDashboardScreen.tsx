// src/screens/owner/OwnerDashboardScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useStatsStore } from '../../store';

const OwnerDashboardScreen = () => {
  const { theme } = useTheme();
  const { stats, fetchStats, loading } = useStatsStore();
  
  useEffect(() => {
    // Fetch stats when component mounts
    fetchStats();
    
    // Set up polling to refresh stats every 10 seconds
    const interval = setInterval(() => {
      fetchStats();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  };

  // Mock data for sparklines (in a real app, this would come from the API)
  const mockSparklineData = [65, 59, 80, 81, 56, 55, 40, 59, 65, 70, 60, 75];

  const StatCard = ({ title, value, unit, change, color }: { 
    title: string; 
    value: number | string; 
    unit?: string; 
    change?: number; 
    color?: string; 
  }) => (
    <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.statTitle, { color: theme.colors.textSecondary }]}>{title}</Text>
      <View style={styles.statValueContainer}>
        <Text style={[styles.statValue, { color: theme.colors.text }]}>
          {value}{unit ? ` ${unit}` : ''}
        </Text>
        {change !== undefined && (
          <Text style={[
            styles.statChange, 
            { color: change >= 0 ? '#4CAF50' : '#F44336' }
          ]}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </Text>
        )}
      </View>
      <View style={styles.sparkline}>
        {mockSparklineData.map((point, index) => (
          <View 
            key={index} 
            style={[
              styles.sparklineBar, 
              { 
                height: `${point}%`, 
                backgroundColor: color || theme.colors.primary 
              }
            ]} 
          />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Restaurant Dashboard
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Real-time metrics and insights
        </Text>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.statsGrid}>
          {stats ? (
            <>
              <StatCard 
                title="Current Guests" 
                value={stats.currentGuests} 
                change={2.3}
                color={theme.colors.primary}
              />
              
              <StatCard 
                title="Total Visited Today" 
                value={stats.totalVisitedToday} 
                change={5.1}
                color={theme.colors.accent}
              />
              
              <StatCard 
                title="Avg Dwell Time" 
                value={stats.avgDwellMin} 
                unit="min" 
                change={-1.2}
                color={theme.colors.primary}
              />
              
              <StatCard 
                title="Occupancy" 
                value={stats.occupancyPct} 
                unit="%" 
                change={3.4}
                color={theme.colors.accent}
              />
              
              <StatCard 
                title="Table Utilization" 
                value={stats.tableUtilPct} 
                unit="%" 
                change={4.7}
                color={theme.colors.primary}
              />
              
              <StatCard 
                title="Waitlist" 
                value={stats.waitlistCount} 
                change={-8.2}
                color={theme.colors.accent}
              />
              
              <StatCard 
                title="Revenue Est." 
                value={`$${stats.revenueEst}`} 
                change={7.8}
                color={theme.colors.primary}
              />
            </>
          ) : (
            <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
              Loading stats...
            </Text>
          )}
        </View>
        
        <View style={styles.infoSection}>
          <Text style={[styles.infoTitle, { color: theme.colors.text }]}>
            Business Insights
          </Text>
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
            • Current guests are 12% higher than this time yesterday
            {'\n'}• Table turnover rate has improved by 8% this week
            {'\n'}• Peak hours: 12pm-2pm and 7pm-9pm
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: '48%', // Two cards per row on larger screens
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statChange: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sparkline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    gap: 2,
  },
  sparklineBar: {
    flex: 1,
    borderRadius: 2,
    minWidth: 4,
  },
  infoSection: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
});

export default OwnerDashboardScreen;