import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { GuestHomeStackParamList } from '../../navigation/guestTypes';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().min(10, 'Phone required'),
});

export const GuestWelcomeScreen = ({
  navigation,
}: NativeStackScreenProps<GuestHomeStackParamList, 'GuestWelcome'>) => {
  const theme = useTheme();
  const loginGuest = useEspressoStore((state) => state.loginGuest);
  const createGuest = useEspressoStore((state) => state.createGuest);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ name: string; phone: string }>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const guest = await createGuest(values);
      loginGuest(guest);
      navigation.navigate('PartySize', { guest });
    } catch (error) {
      console.warn('Failed to create guest', error);
      Alert.alert('Check-in failed', 'Please try again.');
    }
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Welcome to Espresso</Text>
      <Text style={[styles.body, { color: theme.colors.textMuted }]}>Let us get you checked in.</Text>
      <View style={styles.form}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Full name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Jamie Guest"
              placeholderTextColor={theme.colors.textMuted}
              accessibilityLabel="Guest full name"
            />
          )}
        />
        {errors.name ? <Text style={styles.error}>{errors.name.message}</Text> : null}

        <Text style={[styles.label, { color: theme.colors.text }]}>Mobile number</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="+1 (555) 000-0000"
              placeholderTextColor={theme.colors.textMuted}
              accessibilityLabel="Guest phone number"
            />
          )}
        />
        {errors.phone ? <Text style={styles.error}>{errors.phone.message}</Text> : null}
      </View>

      <TouchableOpacity
        style={[styles.cta, { backgroundColor: theme.colors.primary }]} 
        onPress={onSubmit}
        disabled={isSubmitting}
        accessibilityRole="button"
      >
        <Text style={styles.ctaText}>{isSubmitting ? 'Starting…' : 'Start Visit'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          const guest = useEspressoStore.getState().guests.selectedGuest;
          if (guest) {
            navigation.navigate('GuestPreviousVisits', { guest });
          } else {
            Alert.alert('No previous visits', 'Check in to see your history.');
          }
        }}
        style={styles.secondary}
      >
        <Text style={[styles.secondaryText, { color: theme.colors.primary }]}>View previous visits</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
  },
  form: {
    gap: 12,
  },
  label: {
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
  },
  error: {
    color: '#D0312D',
  },
  cta: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  secondary: {
    alignItems: 'center',
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
