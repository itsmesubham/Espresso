// src/screens/RoleGateScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useAuthStore } from '../store';
import { UserRole } from '../types/models';

const RoleGateScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { login } = useAuthStore();

  const handleRoleSelect = (role: UserRole) => {
    // For demo purposes, we'll create a mock user
    // In a real app, this would come from authentication
    const mockUser = {
      id: 'demo-user',
      name: `Demo ${role}`,
      role: role,
    };
    
    login('demo-token', mockUser);
    
    // Navigate based on role
    setTimeout(() => {
      navigation.replace(
        role === 'GUEST' ? 'GuestTabs' : 
        role === 'STAFF' ? 'StaffTabs' : 'OwnerTabs'
      );
    }, 500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome to Espresso
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Select your role to continue
        </Text>
        
        <View style={styles.roleOptions}>
          <TouchableOpacity
            style={[styles.roleButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleRoleSelect('GUEST')}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>
              Guest
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.roleButton, { backgroundColor: theme.colors.accent }]}
            onPress={() => handleRoleSelect('STAFF')}
          >
            <Text style={[styles.buttonText, { color: '#000' }]}>
              Staff
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.roleButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleRoleSelect('OWNER')}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>
              Owner
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.demoNote, { color: theme.colors.textSecondary }]}>
          This is a demo app. In production, authentication would determine your role.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
  },
  roleOptions: {
    width: '100%',
    gap: 16,
  },
  roleButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoNote: {
    marginTop: 40,
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default RoleGateScreen;