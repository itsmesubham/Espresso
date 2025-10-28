import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { formatPercent } from '../../utils/format';

export const OffersAnalyticsScreen = () => {
  const theme = useTheme();
  const fetchOffers = useEspressoStore((state) => state.fetchOffers);
  const offers = useEspressoStore((state) => state.offers.offers);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      data={offers}
      keyExtractor={(offer) => offer.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}
          accessibilityRole="summary"
        >
          <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
          <Text style={{ color: theme.colors.textMuted }}>{item.body}</Text>
          <View style={styles.row}>
            <Text style={{ color: theme.colors.text }}>Opens {formatPercent(item.openRate ?? 0.0, 0)}</Text>
            <Text style={{ color: theme.colors.text }}>Redeem {formatPercent(item.redemptionRate ?? 0.0, 0)}</Text>
          </View>
          {item.tags?.length ? (
            <Text style={{ color: theme.colors.textMuted }}>Tags: {item.tags.join(', ')}</Text>
          ) : null}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
