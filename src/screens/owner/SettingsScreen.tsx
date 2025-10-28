import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../theme';

export const SettingsScreen = () => {
  const theme = useTheme();
  const [name, setName] = useState('Espresso HQ');
  const [hours, setHours] = useState('Mon-Sun 8a-11p');
  const [topics, setTopics] = useState('restaurant/1/broadcasts, offers/vip');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Restaurant settings</Text>
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
        />
      </View>
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Hours</Text>
        <TextInput
          value={hours}
          onChangeText={setHours}
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
        />
      </View>
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Push topics</Text>
        <TextInput
          value={topics}
          onChangeText={setTopics}
          multiline
          style={[styles.input, styles.textArea, { borderColor: theme.colors.border, color: theme.colors.text }]}
        />
      </View>
      <Text style={{ color: theme.colors.textMuted }}>
        Configure which Firebase topics staff and guests are subscribed to. Use comma separated list.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
