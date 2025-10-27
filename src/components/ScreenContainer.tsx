import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../theme';

export const ScreenContainer: React.FC<ViewProps> = ({ children, style, ...props }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={[styles.content, style]}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
  },
});
