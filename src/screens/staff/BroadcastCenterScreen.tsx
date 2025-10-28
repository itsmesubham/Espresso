import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { StaffHomeStackParamList } from '../../navigation/staffTypes';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';

const schema = z.object({
  title: z.string().min(2),
  body: z.string().min(4),
  tags: z.string().optional(),
});

export const BroadcastCenterScreen = ({
  navigation,
}: NativeStackScreenProps<StaffHomeStackParamList, 'BroadcastCenter'>) => {
  const theme = useTheme();
  const createBroadcast = useEspressoStore((state) => state.createBroadcast);
  const { control, handleSubmit, formState } = useForm<{ title: string; body: string; tags?: string }>({
    resolver: zodResolver(schema),
  });

  const submit = handleSubmit(async (values) => {
    await createBroadcast({
      title: values.title,
      body: values.body,
      tags: values.tags?.split(',').map((tag) => tag.trim()).filter(Boolean),
    });
    Alert.alert('Broadcast queued', 'Owner will review and approve.');
    navigation.goBack();
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Broadcast</Text>
      <View style={styles.field}>
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
      <View style={styles.field}>
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
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Tags</Text>
        <Controller
          control={control}
          name="tags"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="happy-hour, vip"
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholderTextColor={theme.colors.textMuted}
            />
          )}
        />
      </View>

      <TouchableOpacity
        style={[styles.cta, { backgroundColor: theme.colors.primary }]}
        onPress={submit}
        disabled={formState.isSubmitting}
      >
        <Text style={styles.ctaLabel}>{formState.isSubmitting ? 'Sending…' : 'Preview & send'}</Text>
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
  field: {
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
    minHeight: 140,
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
