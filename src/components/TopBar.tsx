import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';

export type TopBarProps = {
  title: string;
  subtitle?: string;
  rightAdornment?: React.ReactNode;
};

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle, rightAdornment }) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
      accessibilityRole="header"
    >
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]} accessibilityRole="text">
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>{subtitle}</Text>
        ) : null}
      </View>
      {rightAdornment}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
  },
});
