import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';

export const WaitlistScreen = () => {
  const theme = useTheme();
  const loadWaitlist = useEspressoStore((state) => state.loadWaitlist);
  const upsertEntry = useEspressoStore((state) => state.upsertEntry);
  const removeEntry = useEspressoStore((state) => state.removeEntry);
  const waitlist = useEspressoStore((state) => state.waitlist.waitlist);
  const [name, setName] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [eta, setEta] = useState('15');

  useEffect(() => {
    loadWaitlist();
  }, [loadWaitlist]);

  const addEntry = async () => {
    if (!name.trim()) {
      Alert.alert('Guest name required');
      return;
    }
    await upsertEntry({
      id: `waitlist-${Date.now()}`,
      guestName: name.trim(),
      partySize: Number(partySize) || 2,
      requestedAt: new Date().toISOString(),
      etaMinutes: Number(eta) || undefined,
    });
    setName('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Waitlist</Text>
      <View style={styles.formRow}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Guest name"
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          placeholderTextColor={theme.colors.textMuted}
        />
        <TextInput
          value={partySize}
          onChangeText={setPartySize}
          keyboardType="number-pad"
          placeholder="Size"
          style={[styles.sizeInput, { borderColor: theme.colors.border, color: theme.colors.text }]}
        />
        <TextInput
          value={eta}
          onChangeText={setEta}
          keyboardType="number-pad"
          placeholder="ETA"
          style={[styles.sizeInput, { borderColor: theme.colors.border, color: theme.colors.text }]}
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={addEntry}
        >
          <Text style={styles.addLabel}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={waitlist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderColor: theme.colors.border }]}
            accessibilityRole="summary"
          >
            <View>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.guestName}</Text>
              <Text style={{ color: theme.colors.textMuted }}>
                Party of {item.partySize} • {item.etaMinutes ? `${item.etaMinutes} min` : 'Ready'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeEntry(item.id)} accessibilityLabel="Remove from waitlist">
              <Text style={{ color: theme.colors.danger }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sizeInput: {
    width: 70,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  addButton: {
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
  },
  addLabel: {
    color: '#fff',
    fontWeight: '700',
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
