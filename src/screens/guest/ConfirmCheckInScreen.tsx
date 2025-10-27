// src/screens/guest/ConfirmCheckInScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useVisitsStore } from '../../store';

const ConfirmCheckInScreen = ({ route, navigation }: any) => {
  const { theme } = useTheme();
  const { guestInfo, partySize, specialRequests } = route.params;
  const { createVisit } = useVisitsStore();

  const handleConfirmCheckIn = async () => {
    try {
      // Create a new visit
      await createVisit({
        guestId: guestInfo.id || `guest-${Date.now()}`, // In demo mode
        partySize: partySize,
        checkInAt: new Date().toISOString(),
        notes: specialRequests || undefined,
      });
      
      Alert.alert(
        'Success',
        'You have successfully checked in!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('GuestTabs', { screen: 'Home' }),
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to check in. Please try again.');
      console.error('Check in error:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Confirm Check In
        </Text>
        
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Name
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {guestInfo.name}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Phone
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {guestInfo.phone}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Party Size
            </Text>
            <Text style={[styles.value, { color: theme.colors.text, fontSize: 18, fontWeight: 'bold' }]}>
              {partySize}
            </Text>
          </View>
          
          {specialRequests ? (
            <View style={styles.summaryItem}>
              <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                Special Requests
              </Text>
              <Text style={[styles.value, { color: theme.colors.text }]}>
                {specialRequests}
              </Text>
            </View>
          ) : null}
        </View>
        
        <View style={styles.infoBox}>
          <Text style={[styles.infoText, { color: theme.colors.text }]}>
            By checking in, you agree to follow our restaurant policies and 
            guidelines during your visit.
          </Text>
        </View>
        
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleConfirmCheckIn}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Confirm Check In
          </Text>
        </TouchableOpacity>
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
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  summaryItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmCheckInScreen;