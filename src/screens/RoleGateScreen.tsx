import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useEspressoStore } from '../store/useEspressoStore';
import { useTheme } from '../theme';

const roles = [
  { label: 'Guest', target: 'Guest' as const, role: 'GUEST' as const },
  { label: 'Staff', target: 'Staff' as const, role: 'STAFF' as const },
  { label: 'Owner', target: 'Owner' as const, role: 'OWNER' as const },
];

export const RoleGateScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'RoleGate'>) => {
  const setRole = useEspressoStore((state) => state.setRole);
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Espresso Role Switcher</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
        Choose a role to explore demo flows.
      </Text>
      <View style={styles.buttons}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.target}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              setRole(role.role);
              navigation.replace(role.target);
            }}
            accessibilityRole="button"
            accessibilityLabel={`Enter ${role.label} experience`}
          >
            <Text style={styles.buttonText}>{role.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center',
  },
  buttons: {
    marginTop: 32,
    width: '100%',
    gap: 16,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
});
