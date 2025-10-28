import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stats } from '../api/types';
import { useTheme } from '../theme';

export const Sparkline = ({ history, field }: { history: Stats[]; field: keyof Stats }) => {
  const theme = useTheme();
  const values = useMemo(() => history.map((item) => Number(item[field]) || 0), [field, history]);
  const max = Math.max(...values, 1);

  return (
    <View style={styles.container} accessibilityLabel={`Trend for ${String(field)}`}>
      {values.map((value, index) => (
        <View
          key={`${field}-${index}`}
          style={{
            flex: 1,
            marginHorizontal: 1,
            height: 40,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              height: Math.max(6, (value / max) * 40),
              borderRadius: 8,
              backgroundColor: theme.colors.accent,
            }}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    marginTop: 12,
  },
});
