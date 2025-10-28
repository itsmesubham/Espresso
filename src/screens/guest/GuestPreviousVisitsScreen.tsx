import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { GuestHomeStackParamList } from '../../navigation/guestTypes';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { GuestVisitList } from '../../components/GuestVisitList';

export const GuestPreviousVisitsScreen = ({
  route,
}: NativeStackScreenProps<GuestHomeStackParamList, 'GuestPreviousVisits'>) => {
  const { guest } = route.params;
  const theme = useTheme();
  const fetchVisits = useEspressoStore((state) => state.fetchVisitsForGuest);
  const visits = useEspressoStore((state) => state.visits.visitsByGuest[guest.id] ?? []);

  useEffect(() => {
    fetchVisits(guest.id);
  }, [fetchVisits, guest.id]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Recent visits</Text>
      <Text style={[styles.subheading, { color: theme.colors.textMuted }]}>Last five check-ins</Text>
      {visits.length === 0 ? <ActivityIndicator color={theme.colors.primary} /> : null}
      <GuestVisitList visits={visits.slice(0, 5)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 16,
  },
  subheading: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
});
