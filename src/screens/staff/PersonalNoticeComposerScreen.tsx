import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { StaffHomeStackParamList } from '../../navigation/staffTypes';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';

const schema = z.object({
  title: z.string().min(2),
  body: z.string().min(2),
});

export const PersonalNoticeComposerScreen = ({
  navigation,
}: NativeStackScreenProps<StaffHomeStackParamList, 'PersonalNoticeComposer'>) => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const searchGuests = useEspressoStore((state) => state.searchGuests);
  const guests = useEspressoStore((state) => state.guests.guests);
  const postNotice = useEspressoStore((state) => state.postNotice);
  const [selectedGuestId, setSelectedGuestId] = useState<string | undefined>();

  const { control, handleSubmit, formState } = useForm<{ title: string; body: string }>({
    resolver: zodResolver(schema),
  });

  const sendNotice = handleSubmit(async (values) => {
    if (!selectedGuestId) {
      Alert.alert('Select guest', 'Choose a guest to send the notice to.');
      return;
    }
    await postNotice({
      scope: 'PERSONAL',
      toGuestId: selectedGuestId,
      title: values.title,
      body: values.body,
      createdBy: 'Staff Member',
    });
    Alert.alert('Sent', 'Guest has been notified via push and inbox.');
    navigation.goBack();
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Personal notice</Text>
      <View style={styles.searchRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search guest by name or phone"
          style={[styles.searchInput, { borderColor: theme.colors.border, color: theme.colors.text }]}
          placeholderTextColor={theme.colors.textMuted}
        />
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => searchGuests(query)}
        >
          <Text style={styles.searchButtonLabel}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={guests}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.guestList}
        renderItem={({ item }) => {
          const selected = item.id === selectedGuestId;
          return (
            <TouchableOpacity
              style={[
                styles.guestChip,
                {
                  backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setSelectedGuestId(item.id)}
            >
              <Text style={{ color: selected ? '#fff' : theme.colors.text }}>{item.name}</Text>
              <Text style={{ color: selected ? '#fff' : theme.colors.textMuted, fontSize: 12 }}>
                {item.phone}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.formField}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Title</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
            />
          )}
        />
      </View>
      <View style={styles.formField}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Message</Text>
        <Controller
          control={control}
          name="body"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              multiline
              style={[styles.input, styles.textArea, { borderColor: theme.colors.border, color: theme.colors.text }]}
            />
          )}
        />
      </View>

      <TouchableOpacity
        style={[styles.cta, { backgroundColor: theme.colors.primary }]}
        onPress={sendNotice}
        disabled={formState.isSubmitting}
      >
        <Text style={styles.ctaLabel}>{formState.isSubmitting ? 'Sending…' : 'Send notice'}</Text>
      </TouchableOpacity>
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
  searchRow: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchButton: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 12,
  },
  searchButtonLabel: {
    color: '#fff',
    fontWeight: '700',
  },
  guestList: {
    gap: 12,
  },
  guestChip: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 14,
    marginRight: 12,
    width: 160,
  },
  formField: {
    gap: 8,
  },
  label: {
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  cta: {
    marginTop: 'auto',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  ctaLabel: {
    color: '#fff',
    fontWeight: '700',
  },
});
