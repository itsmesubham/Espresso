// src/components/StatCard.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  unit, 
  change, 
  onPress, 
  containerStyle 
}) => {
  const { theme } = useTheme();

  const cardContent = (
    <>
      <Text style={[styles.title, { color: theme.colors.textSecondary }]}>
        {title}
      </Text>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: theme.colors.text }]}>
          {value}
          {unit && <Text style={[styles.unit, { color: theme.colors.textSecondary }]}> {unit}</Text>}
        </Text>
        {change !== undefined && (
          <Text style={[
            styles.change,
            { 
              color: change >= 0 ? theme.colors.success : theme.colors.error 
            }
          ]}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </Text>
        )}
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: theme.colors.surface },
          containerStyle,
        ]}
        onPress={onPress}
      >
        {cardContent}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface },
        containerStyle,
      ]}
    >
      {cardContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 14,
  },
  change: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default StatCard;