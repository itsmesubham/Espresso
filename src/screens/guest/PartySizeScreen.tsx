import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GuestHomeStackParamList } from '../../navigation/guestTypes';
import { PartySizePicker } from '../../components/PartySizePicker';
import { useTheme } from '../../theme';

export const PartySizeScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<GuestHomeStackParamList, 'PartySize'>) => {
  const guest = route.params?.guest;
  const theme = useTheme();
  const [partySize, setPartySize] = useState(guest ? 2 : 1);
  const [requests, setRequests] = useState('');

  if (!guest) {
    Alert.alert('Missing guest', 'Please start from the welcome screen.');
    navigation.popToTop();
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Hi {guest.name.split(' ')[0]}!</Text>
      <Text style={[styles.body, { color: theme.colors.textMuted }]}>How many are joining you today?</Text>

      <PartySizePicker value={partySize} onChange={setPartySize} />

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Special requests</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={requests}
          onChangeText={setRequests}
          placeholder="Window seat, allergies, celebrations..."
          style={[styles.textArea, { borderColor: theme.colors.border, color: theme.colors.text }]}
          placeholderTextColor={theme.colors.textMuted}
          accessibilityLabel="Special requests"
        />
      </View>

      <TouchableOpacity
        style={[styles.cta, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('ConfirmCheckIn', { guest, partySize, specialRequests: requests })}
        accessibilityRole="button"
      >
        <Text style={styles.ctaText}>Review check-in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
  },
  section: {
    gap: 12,
  },
  label: {
    fontWeight: '600',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  cta: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
