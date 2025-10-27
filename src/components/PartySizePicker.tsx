import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme';

export const PartySizePicker = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const theme = useTheme();
  const options = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      accessibilityRole="adjustable"
    >
      {options.map((option) => {
        const selected = option === value;
        return (
          <TouchableOpacity
            key={option}
            style={[
              styles.chip,
              {
                backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
                borderColor: selected ? theme.colors.primary : theme.colors.border,
              },
            ]}
            onPress={() => onChange(option)}
            accessibilityRole="button"
            accessibilityLabel={`Party size ${option}`}
          >
            <Text
              style={{
                color: selected ? '#FFFFFF' : theme.colors.text,
                fontWeight: '600',
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={[styles.chip, { borderColor: theme.colors.border }]}
        onPress={() => onChange(value + 1)}
        accessibilityLabel="Increase party size"
      >
        <Text style={{ color: theme.colors.text }}>+ Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    alignItems: 'center',
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
  },
});
