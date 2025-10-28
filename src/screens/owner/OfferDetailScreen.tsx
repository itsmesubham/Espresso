import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { formatPercent, formatShortDate } from '../../utils/format';

export const OfferDetailScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'OfferDetail'>) => {
  const theme = useTheme();
  const fetchOffers = useEspressoStore((state) => state.fetchOffers);
  const offers = useEspressoStore((state) => state.offers.offers);
  const offer = offers.find((item) => item.id === route.params.offerId);

  useEffect(() => {
    if (!offer) {
      fetchOffers();
    }
  }, [fetchOffers, offer]);

  if (!offer) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>Loading offer…</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
      accessibilityRole="summary"
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>{offer.title}</Text>
      <Text style={{ color: theme.colors.text }}>{offer.body}</Text>
      <Text style={{ color: theme.colors.textMuted }}>
        Valid {formatShortDate(offer.validFrom)} – {formatShortDate(offer.validTo)}
      </Text>
      <Text style={{ color: theme.colors.textMuted }}>
        Opens {formatPercent(offer.openRate ?? 0)} • Redemptions {formatPercent(offer.redemptionRate ?? 0)}
      </Text>
      {offer.tags?.length ? (
        <Text style={{ color: theme.colors.textMuted }}>Tags: {offer.tags.join(', ')}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
