/**
 * Espresso Restaurant Management App
 * Multi-screen tile-based UI
 */

import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  TextInput,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
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

// Screen components
const HomeScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const isDarkMode = useColorScheme() === 'dark';
  
  const tiles = [
    { id: 'check-in', title: 'Customer Check-In', icon: '👤', color: '#3b82f6' },
    { id: 'tables', title: 'Table Management', icon: '🍽️', color: '#10b981' },
    { id: 'orders', title: 'Order Management', icon: '📋', color: '#8b5cf6' },
    { id: 'reservations', title: 'Reservations', icon: '📅', color: '#f59e0b' },
    { id: 'reports', title: 'Reports', icon: '📊', color: '#ef4444' },
    { id: 'settings', title: 'Settings', icon: '⚙️', color: '#6b7280' },
  ];
  
  const titleStyle = {
    color: isDarkMode ? '#f8fafc' : '#0f172a',
  };
  
  const containerStyle = {
    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
  };

  return (
    <SafeAreaView style={[styles.screenContainer, containerStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.screenContent}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, titleStyle]}>Filter Cafe</Text>
          <Text style={styles.headerSubtitle}>Restaurant Management System</Text>
        </View>
        
        <View style={styles.tilesContainer}>
          {tiles.map((tile) => (
            <TouchableOpacity
              key={tile.id}
              style={[styles.tile, { backgroundColor: tile.color }]}
              onPress={() => onNavigate(tile.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.tileIcon}>{tile.icon}</Text>
              <Text style={styles.tileTitle}>{tile.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CustomerCheckInScreen = ({ onGoBack }: { onGoBack: () => void }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [wantsSpecialArea, setWantsSpecialArea] = useState(false);

  const containerStyle = {
    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    shadowColor: isDarkMode ? '#000' : '#64748b',
  };

  const inputStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    color: isDarkMode ? '#f8fafc' : '#0f172a',
    borderColor: isDarkMode ? '#475569' : '#cbd5e1',
  };

  const titleStyle = {
    color: isDarkMode ? '#f8fafc' : '#0f172a',
  };

  const labelStyle = {
    color: isDarkMode ? '#94a3b8' : '#64748b',
  };

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

    // Confirmation alert
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
              'Thank You!',
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

  return (
    <SafeAreaView style={[styles.screenContainer, containerStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={[styles.headerTitle, titleStyle]}>Customer Check-In</Text>
          </View>

          <View style={[styles.formContainer, cardStyle]}>
            {/* Customer Name Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, labelStyle]}>Full Name</Text>
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
              <Text style={[styles.label, labelStyle]}>Phone Number</Text>
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
              <Text style={[styles.label, labelStyle]}>Number of People</Text>
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

            {/* Special Area Toggle */}
            <View style={styles.toggleGroup}>
              <View style={styles.toggleContainer}>
                <View style={styles.toggleContent}>
                  <Text style={[styles.toggleTitle, titleStyle]}>Special Area</Text>
                  <Text style={[styles.toggleSubtitle, labelStyle]}>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const TableManagementScreen = ({ onGoBack }: { onGoBack: () => void }) => {
  const isDarkMode = useColorScheme() === 'dark';
  
  // Mock table data
  const [tables] = useState([
    { id: 1, number: '1', status: 'available', capacity: 2 },
    { id: 2, number: '2', status: 'occupied', capacity: 4 },
    { id: 3, number: '3', status: 'reserved', capacity: 6 },
    { id: 4, number: '4', status: 'available', capacity: 2 },
    { id: 5, number: '5', status: 'occupied', capacity: 8 },
    { id: 6, number: '6', status: 'available', capacity: 4 },
  ]);

  const containerStyle = {
    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    shadowColor: isDarkMode ? '#000' : '#64748b',
  };

  const titleStyle = {
    color: isDarkMode ? '#f8fafc' : '#0f172a',
  };

  const statusColors = {
    available: { bg: '#10b981', text: '#065f46' },
    occupied: { bg: '#ef4444', text: '#7f1d1d' },
    reserved: { bg: '#f59e0b', text: '#78350f' },
  };

  return (
    <SafeAreaView style={[styles.screenContainer, containerStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.screenContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, titleStyle]}>Table Management</Text>
        </View>

        <View style={[styles.formContainer, cardStyle]}>
          <Text style={[styles.formTitle, titleStyle]}>Available Tables</Text>
          
          <View style={styles.tablesGrid}>
            {tables.map((table) => (
              <View 
                key={table.id}
                style={[
                  styles.tableCard, 
                  { backgroundColor: statusColors[table.status as keyof typeof statusColors].bg + '20' },
                  { borderColor: statusColors[table.status as keyof typeof statusColors].bg }
                ]}
              >
                <Text style={styles.tableNumber}>Table {table.number}</Text>
                <Text style={[
                  styles.tableStatus, 
                  { color: statusColors[table.status as keyof typeof statusColors].text }
                ]}>
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </Text>
                <Text style={styles.tableCapacity}>Seats: {table.capacity}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const OrderManagementScreen = ({ onGoBack }: { onGoBack: () => void }) => {
  const isDarkMode = useColorScheme() === 'dark';
  
  // Mock order data
  const [orders] = useState([
    { id: 1, table: '2', items: ['Coffee', 'Croissant'], status: 'pending', time: '10:30 AM' },
    { id: 2, table: '5', items: ['Salad', 'Water'], status: 'preparing', time: '10:45 AM' },
    { id: 3, table: '3', items: ['Burger', 'Fries'], status: 'ready', time: '11:00 AM' },
    { id: 4, table: '1', items: ['Tea', 'Cake'], status: 'served', time: '11:15 AM' },
  ]);

  const containerStyle = {
    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    shadowColor: isDarkMode ? '#000' : '#64748b',
  };

  const titleStyle = {
    color: isDarkMode ? '#f8fafc' : '#0f172a',
  };

  const statusColors = {
    pending: { bg: '#f59e0b', text: '#78350f' },
    preparing: { bg: '#f59e0b', text: '#78350f' },
    ready: { bg: '#10b981', text: '#065f46' },
    served: { bg: '#6b7280', text: '#374151' },
  };

  return (
    <SafeAreaView style={[styles.screenContainer, containerStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.screenContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, titleStyle]}>Order Management</Text>
        </View>

        <View style={[styles.formContainer, cardStyle]}>
          <Text style={[styles.formTitle, titleStyle]}>Active Orders</Text>
          
          {orders.map((order) => (
            <View 
              key={order.id}
              style={[
                styles.orderCard, 
                { 
                  backgroundColor: statusColors[order.status as keyof typeof statusColors].bg + '10',
                  borderColor: statusColors[order.status as keyof typeof statusColors].bg
                }
              ]}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.orderTable}>Table {order.table}</Text>
                <Text style={styles.orderTime}>{order.time}</Text>
              </View>
              
              <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <Text key={index} style={styles.orderItem}>• {item}</Text>
                ))}
              </View>
              
              <View style={styles.orderFooter}>
                <Text style={[
                  styles.orderStatus, 
                  { color: statusColors[order.status as keyof typeof statusColors].text }
                ]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Text>
                <TouchableOpacity style={styles.orderAction}>
                  <Text style={styles.orderActionText}>
                    {order.status === 'pending' ? 'Start' : order.status === 'preparing' ? 'Ready' : 'Complete'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ReservationScreen = ({ onGoBack }: { onGoBack: () => void }) => {
  const isDarkMode = useColorScheme() === 'dark';
  
  // Mock reservation data
  const [reservations] = useState([
    { id: 1, name: 'John Smith', date: 'Today', time: '7:00 PM', partySize: 2, status: 'confirmed' },
    { id: 2, name: 'Sarah Johnson', date: 'Today', time: '7:30 PM', partySize: 4, status: 'confirmed' },
    { id: 3, name: 'Michael Brown', date: 'Tomorrow', time: '8:00 PM', partySize: 6, status: 'pending' },
    { id: 4, name: 'Emma Davis', date: 'Nov 5', time: '6:30 PM', partySize: 2, status: 'confirmed' },
  ]);

  const containerStyle = {
    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    shadowColor: isDarkMode ? '#000' : '#64748b',
  };

  const titleStyle = {
    color: isDarkMode ? '#f8fafc' : '#0f172a',
  };

  const statusColors = {
    confirmed: { bg: '#10b981', text: '#065f46' },
    pending: { bg: '#f59e0b', text: '#78350f' },
    cancelled: { bg: '#ef4444', text: '#7f1d1d' },
  };

  return (
    <SafeAreaView style={[styles.screenContainer, containerStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.screenContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, titleStyle]}>Reservations</Text>
        </View>

        <View style={[styles.formContainer, cardStyle]}>
          <Text style={[styles.formTitle, titleStyle]}>Upcoming Reservations</Text>
          
          {reservations.map((reservation) => (
            <View 
              key={reservation.id} 
              style={[
                styles.reservationCard, 
                { 
                  backgroundColor: statusColors[reservation.status as keyof typeof statusColors].bg + '10',
                  borderColor: statusColors[reservation.status as keyof typeof statusColors].bg
                }
              ]}
            >
              <View style={styles.reservationHeader}>
                <Text style={styles.reservationName}>{reservation.name}</Text>
                <Text style={[
                  styles.reservationStatus, 
                  { color: statusColors[reservation.status as keyof typeof statusColors].text }
                ]}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </Text>
              </View>
              
              <View style={styles.reservationDetails}>
                <Text style={styles.reservationDetail}>Date: {reservation.date}</Text>
                <Text style={styles.reservationDetail}>Time: {reservation.time}</Text>
                <Text style={styles.reservationDetail}>Party: {reservation.partySize}</Text>
              </View>
              
              <View style={styles.reservationActions}>
                <TouchableOpacity style={styles.reservationActionButton}>
                  <Text style={styles.reservationActionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reservationActionButton}>
                  <Text style={styles.reservationActionText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'check-in' | 'tables' | 'orders' | 'reservations' | 'reports' | 'settings'>('home');
  const [restaurantName] = useState('Filter Cafe');

  useEffect(() => {
    // Store restaurant name in custom storage
    restaurantStorage.setItem('restaurantName', restaurantName);
  }, [restaurantName]);

  const navigateToScreen = (screen: string) => {
    switch(screen) {
      case 'check-in':
        setCurrentScreen('check-in');
        break;
      case 'tables':
        setCurrentScreen('tables');
        break;
      case 'orders':
        setCurrentScreen('orders');
        break;
      case 'reservations':
        setCurrentScreen('reservations');
        break;
      case 'reports':
        Alert.alert('Reports', 'Reports functionality coming soon!');
        break;
      case 'settings':
        Alert.alert('Settings', 'Settings functionality coming soon!');
        break;
      default:
        setCurrentScreen('home');
    }
  };

  const goBackToHome = () => {
    setCurrentScreen('home');
  };

  return (
    <>
      {currentScreen === 'home' && <HomeScreen onNavigate={navigateToScreen} />}
      {currentScreen === 'check-in' && <CustomerCheckInScreen onGoBack={goBackToHome} />}
      {currentScreen === 'tables' && <TableManagementScreen onGoBack={goBackToHome} />}
      {currentScreen === 'orders' && <OrderManagementScreen onGoBack={goBackToHome} />}
      {currentScreen === 'reservations' && <ReservationScreen onGoBack={goBackToHome} />}
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  screenContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3b82f6',
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tileIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  tileTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  formContainer: {
    borderRadius: 16,
    padding: 24,
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
  toggleGroup: {
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
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
  scrollContainer: {
    padding: 20,
  },
  tablesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tableCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: 'center',
  },
  tableNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  tableStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  tableCapacity: {
    fontSize: 12,
    color: '#64748b',
  },
  orderCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderTable: {
    fontSize: 16,
    fontWeight: '600',
  },
  orderTime: {
    fontSize: 14,
    color: '#64748b',
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderAction: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  orderActionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  reservationCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reservationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reservationName: {
    fontSize: 16,
    fontWeight: '600',
  },
  reservationStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  reservationDetails: {
    marginBottom: 12,
  },
  reservationDetail: {
    fontSize: 14,
    marginBottom: 4,
    color: '#64748b',
  },
  reservationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  reservationActionButton: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  reservationActionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  submitButtonDark: {
    backgroundColor: '#3b82f6',
  },
  submitButtonLight: {
    backgroundColor: '#2563eb',
  },
});

export default App;
