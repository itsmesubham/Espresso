// src/screens/guest/PartySizeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

const PartySizeScreen = ({ route, navigation }: any) => {
  const { theme } = useTheme();
  const { guestInfo } = route.params;
  const [partySize, setPartySize] = useState<number | null>(null);
  const [specialRequests, setSpecialRequests] = useState('');

  const partySizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleConfirm = () => {
    if (!partySize) {
      Alert.alert('Error', 'Please select a party size');
      return;
    }

    navigation.navigate('ConfirmCheckIn', { 
      guestInfo, 
      partySize, 
      specialRequests 
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            How many people are in your party?
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Select the number of guests
          </Text>
        </View>
        
        <View style={styles.partySizeGrid}>
          {partySizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                {
                  backgroundColor: partySize === size 
                    ? theme.colors.primary 
                    : theme.colors.surface,
                  borderColor: partySize === size 
                    ? theme.colors.primary 
                    : theme.colors.border,
                },
              ]}
              onPress={() => setPartySize(size)}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  { 
                    color: partySize === size 
                      ? '#fff' 
                      : theme.colors.text,
                  },
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
            style={[
              styles.sizeButton,
              {
                backgroundColor: partySize && partySize > 12 
                  ? theme.colors.primary 
                  : theme.colors.surface,
                borderColor: partySize && partySize > 12 
                  ? theme.colors.primary 
                  : theme.colors.border,
              },
            ]}
            onPress={() => {
              const customSize = prompt('Enter party size:', '13');
              const parsedSize = parseInt(customSize || '0', 10);
              if (!isNaN(parsedSize) && parsedSize > 12) {
                setPartySize(parsedSize);
              }
            }}
          >
            <Text
              style={[
                styles.sizeButtonText,
                { 
                  color: partySize && partySize > 12 
                    ? '#fff' 
                    : theme.colors.text,
                },
              ]}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.requestsContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Special Requests (Optional)
          </Text>
          <TextInput
            style={[styles.textArea, { 
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            }]}
            placeholder="E.g., window seat, high chair, allergies..."
            placeholderTextColor={theme.colors.textSecondary}
            value={specialRequests}
            onChangeText={setSpecialRequests}
            multiline
            numberOfLines={4}
          />
        </View>
        
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleConfirm}
          disabled={!partySize}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  partySizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
  },
  sizeButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  requestsContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
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
  disabledButton: {
    opacity: 0.5,
  },
});

export default PartySizeScreen;