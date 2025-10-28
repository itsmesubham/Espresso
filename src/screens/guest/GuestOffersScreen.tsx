import React, { useEffect, useState } from 'react';
import { Switch, StyleSheet, Text, View } from 'react-native';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { Card } from '../../components/Card';
import { formatShortDate } from '../../utils/format';

export const GuestOffersScreen = () => {
  const theme = useTheme();
  const fetchOffers = useEspressoStore((state) => state.fetchOffers);
  const offers = useEspressoStore((state) => state.offers.offers);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
      accessibilityLabel="Guest offers screen"
    >
      <View style={[styles.header, { borderColor: theme.colors.border }]}
        accessibilityRole="summary"
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>Exclusive offers</Text>
        <View style={styles.switchRow}>
          <Text style={{ color: theme.colors.text }}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ true: theme.colors.primary, false: theme.colors.border }}
          />
        </View>
      </View>

      {offers.map((offer) => (
        <Card key={offer.id} accessibilityLabel={`${offer.title} valid until ${formatShortDate(offer.validTo)}`}>
          <Text style={[styles.offerTitle, { color: theme.colors.text }]}>{offer.title}</Text>
          <Text style={[styles.offerBody, { color: theme.colors.text }]}>{offer.body}</Text>
          <Text style={[styles.offerMeta, { color: theme.colors.textMuted }]}>Valid {formatShortDate(offer.validFrom)} - {formatShortDate(offer.validTo)}</Text>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  header: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  switchRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  offerBody: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
  },
  offerMeta: {
    marginTop: 12,
    fontSize: 13,
  },
});
