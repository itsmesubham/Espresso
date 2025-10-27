/**
<<<<<<< HEAD
 * Espresso Restaurant Management App
 * Customer check-in screen with enhanced UI/UX
 */

import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
  SafeAreaView,
} from 'react-native';

// Custom storage implementation for restaurant name
const restaurantStorage = {
  store: {} as { [key: string]: string },
  
  getItem(key: string): string | null {
    return this.store[key] || null;
  },
  
  setItem(key: string, value: string): void {
    this.store[key] = value;
  },
  
  removeItem(key: string): void {
    delete this.store[key];
  }
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // State for customer information
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [wantsSpecialArea, setWantsSpecialArea] = useState(false);
  const [restaurantName, setRestaurantName] = useState('Filter Cafe'); // Hardcoded restaurant name

  // Simulate loading restaurant name from preferences
  useEffect(() => {
    // In a real app, we would get the restaurant name from storage
    const savedName = restaurantStorage.getItem('restaurantName');
    if (savedName) {
      setRestaurantName(savedName);
    } else {
      // Set the hardcoded value
      restaurantStorage.setItem('restaurantName', 'Filter Cafe');
      setRestaurantName('Filter Cafe');
    }
  }, []);

  // Handle form submission
  const handleSubmit = () => {
    // Validate inputs
    if (!customerName.trim()) {
      Alert.alert('Invalid Input', 'Please enter your name');
      return;
    }
    
    if (!phoneNumber.trim()) {
      Alert.alert('Invalid Input', 'Please enter your phone number');
      return;
    }
    
    if (isNaN(parseInt(partySize, 10)) || parseInt(partySize, 10) <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of people');
      return;
    }

    // Confirmation alert with the restaurant name
    Alert.alert(
      'Confirm Details',
      `Name: ${customerName}\nPhone: ${phoneNumber}\nParty Size: ${partySize}\nSpecial Area: ${wantsSpecialArea ? 'Yes' : 'No'}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // In a real app, this would send data to your backend
            Alert.alert(
              'Welcome to ' + restaurantName, 
              `Thank you, ${customerName}! Your information has been submitted. A staff member will assist you shortly.`
            );
            
            // Reset form
            setCustomerName('');
            setPhoneNumber('');
            setPartySize('2');
            setWantsSpecialArea(false);
          }
        }
      ]
    );
  };

  // Dark mode styles
  const containerStyle = {
    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
  };

  const inputStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    color: isDarkMode ? '#f8fafc' : '#0f172a',
    borderColor: isDarkMode ? '#475569' : '#cbd5e1',
  };

  const titleStyle = {
    color: isDarkMode ? '#f8fafc' : '#0f172a',
  };

  const subtitleStyle = {
    color: isDarkMode ? '#94a3b8' : '#64748b',
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    shadowColor: isDarkMode ? '#000' : '#64748b',
  };

  const specialAreaCardStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    borderColor: isDarkMode ? '#60a5fa' : '#3b82f6',
  };

  return (
    <SafeAreaView style={[styles.safeArea, containerStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Restaurant Logo/Header Section */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <View style={[styles.logo, isDarkMode ? styles.logoDark : styles.logoLight]}>
                <Text style={[styles.logoText, titleStyle]}>☕</Text>
              </View>
            </View>
            
            <Text style={[styles.restaurantName, titleStyle]}>{restaurantName}</Text>
            <Text style={styles.tagline}>Restaurant Management System</Text>
          </View>

          {/* Welcome Message */}
          <View style={styles.welcomeCard}>
            <Text style={[styles.welcomeTitle, titleStyle]}>Welcome!</Text>
            <Text style={[styles.welcomeText, subtitleStyle]}>
              Please provide your information below to check in.
            </Text>
          </View>

          {/* Form Container */}
          <View style={[styles.formContainer, cardStyle]}>
            <Text style={[styles.formTitle, titleStyle]}>Guest Information</Text>
            
            {/* Customer Name Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, subtitleStyle]}>Full Name</Text>
              <View style={[styles.inputContainer, { borderColor: inputStyle.borderColor }]}>
                <TextInput
                  style={[styles.input, inputStyle]}
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholder="Enter your full name"
                  placeholderTextColor={isDarkMode ? '#64748b' : '#94a3b8'}
                  autoCapitalize="words"
                  selectionColor={isDarkMode ? '#93c5fd' : '#60a5fa'}
                />
              </View>
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, subtitleStyle]}>Phone Number</Text>
              <View style={[styles.inputContainer, { borderColor: inputStyle.borderColor }]}>
                <TextInput
                  style={[styles.input, inputStyle]}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Enter your phone number"
                  placeholderTextColor={isDarkMode ? '#64748b' : '#94a3b8'}
                  keyboardType="phone-pad"
                  selectionColor={isDarkMode ? '#93c5fd' : '#60a5fa'}
                />
              </View>
            </View>

            {/* Party Size Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, subtitleStyle]}>Number of People</Text>
              <View style={[styles.inputContainer, { borderColor: inputStyle.borderColor }]}>
                <TextInput
                  style={[styles.input, inputStyle]}
                  value={partySize}
                  onChangeText={setPartySize}
                  placeholder="How many people in your party?"
                  placeholderTextColor={isDarkMode ? '#64748b' : '#94a3b8'}
                  keyboardType="numeric"
                  selectionColor={isDarkMode ? '#93c5fd' : '#60a5fa'}
                />
              </View>
            </View>

            {/* Special Area Card */}
            <View style={[styles.specialAreaCard, specialAreaCardStyle]}>
              <View style={styles.toggleContainer}>
                <View style={styles.toggleContent}>
                  <Text style={[styles.toggleTitle, titleStyle]}>Special Area</Text>
                  <Text style={[styles.toggleSubtitle, subtitleStyle]}>
                    Would you like to be seated in our premium special area?
                  </Text>
                </View>
                <Switch
                  value={wantsSpecialArea}
                  onValueChange={setWantsSpecialArea}
                  trackColor={{ false: isDarkMode ? '#475569' : '#cbd5e1', true: isDarkMode ? '#3b82f6' : '#3b82f6' }}
                  thumbColor={isDarkMode ? '#f8fafc' : '#ffffff'}
                  ios_backgroundColor={isDarkMode ? '#475569' : '#cbd5e1'}
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              style={[styles.submitButton, isDarkMode ? styles.submitButtonDark : styles.submitButtonLight]} 
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Check In Now</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Information */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, subtitleStyle]}>
              Your information is secure and will only be used for seating purposes.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    marginBottom: 15,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  logoText: {
    fontSize: 36,
  },
  restaurantName: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  welcomeCard: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '400',
  },
  specialAreaCard: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleContent: {
    flex: 1,
    marginRight: 12,
  },
  toggleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  toggleSubtitle: {
    fontSize: 14,
  },
  submitButton: {
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  logoDark: {
    backgroundColor: '#1e293b',
  },
  logoLight: {
    backgroundColor: '#e2e8f0',
  },
  submitButtonDark: {
    backgroundColor: '#3b82f6',
  },
  submitButtonLight: {
    backgroundColor: '#2563eb',
  },
});
=======
 * Espresso - Restaurant Ops & Guest App
 * Main App Component
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeProvider';
import MainNavigator from './src/navigation';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />
        <MainNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};
>>>>>>> b1f91fa (local commits)

export default App;
