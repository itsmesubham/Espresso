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
  const [activeTile, setActiveTile] = useState<string | null>(null);
  
  // Restaurant metrics mock data
  const [metrics] = useState({
    availableTables: 8,
    occupiedTables: 12,
    pendingOrders: 5,
    todayRevenue: 2450,
    reservationsToday: 3
  });
  

  
  const quickActions = [
    { id: 'quick-checkin', title: 'Quick Check-In', icon: '🏃', action: () => onNavigate('check-in') },
    { id: 'view-orders', title: 'View Orders', icon: '👀', action: () => onNavigate('orders') },
    { id: 'manage-tables', title: 'Manage Tables', icon: '🪑', action: () => onNavigate('tables') },
  ];
  
  const titleStyle = {
    color: isDarkMode ? '#f8fafc' : '#0f172a',
  };
  
  const subtitleStyle = {
    color: isDarkMode ? '#cbd5e1' : '#64748b',
  };
  
  const containerStyle = {
    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
  };

  return (
    <SafeAreaView style={[styles.screenContainer, containerStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView 
        contentContainerStyle={styles.screenContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant Card with Status */}
        <View style={[
          styles.restaurantCard,
          isDarkMode ? styles.restaurantCardDark : styles.restaurantCardLight
        ]}>
          <View style={styles.restaurantCardContent}>
            <View style={styles.restaurantStatusIndicator}>
              <View style={styles.statusCircleOpen} />
              <Text style={styles.statusText}>Open Now</Text>
            </View>
            <Text style={styles.restaurantIcon}>☕</Text>
            <Text style={styles.restaurantName}>Filter Cafe</Text>
            <Text style={styles.restaurantSubtitle}>Restaurant Management System</Text>
          </View>
        </View>
        
        {/* Quick Stats Card */}
        <View style={[
          styles.statsCard,
          isDarkMode ? styles.statsCardDark : styles.statsCardLight
        ]}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{metrics.availableTables}</Text>
            <Text style={[styles.statLabel, subtitleStyle]}>Available</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{metrics.pendingOrders}</Text>
            <Text style={[styles.statLabel, subtitleStyle]}>Orders</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>$ {metrics.todayRevenue}</Text>
            <Text style={[styles.statLabel, subtitleStyle]}>Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{metrics.reservationsToday}</Text>
            <Text style={[styles.statLabel, subtitleStyle]}>Reservations</Text>
          </View>
        </View>
        
        {/* Today's Summary */}
        <View style={[
          styles.todaySummaryCard,
          isDarkMode ? styles.todaySummaryCardDark : styles.todaySummaryCardLight
        ]}>
          <View style={styles.todaySummaryHeader}>
            <Text style={[styles.todaySummaryTitle, titleStyle]}>Today's Summary</Text>
            <Text style={[styles.todaySummaryDate, subtitleStyle]}>Today</Text>
          </View>
          
          <View style={styles.todaySummaryContent}>
            <View style={styles.todaySummaryItem}>
              <Text style={styles.todaySummaryValue}>18</Text>
              <Text style={[styles.todaySummaryLabel, subtitleStyle]}>Guests served</Text>
            </View>
            <View style={styles.todaySummaryItem}>
              <Text style={styles.todaySummaryValue}>$1,420</Text>
              <Text style={[styles.todaySummaryLabel, subtitleStyle]}>Revenue</Text>
            </View>
            <View style={styles.todaySummaryItem}>
              <Text style={styles.todaySummaryValue}>38m</Text>
              <Text style={[styles.todaySummaryLabel, subtitleStyle]}>Avg wait</Text>
            </View>
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={[styles.quickActionsTitle, titleStyle]}>Quick Actions</Text>
          <View style={styles.quickActionsList}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                style={[
                  styles.quickActionItem,
                  isDarkMode ? styles.quickActionItemDark : styles.quickActionItemLight
                ]}
                onPress={action.action}
                activeOpacity={0.7}
              >
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={[styles.quickActionTitle, titleStyle]}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Staff on Duty */}
        <View style={[
          styles.staffCard,
          isDarkMode ? styles.staffCardDark : styles.staffCardLight
        ]}>
          <View style={styles.staffHeader}>
            <Text style={[styles.staffTitle, titleStyle]}>Staff on Duty</Text>
            <Text style={[styles.staffCount, subtitleStyle]}>3 of 5</Text>
          </View>
          <View style={styles.staffList}>
            <View style={styles.staffItem}>
              <View style={styles.staffAvatar}>
                <Text style={styles.staffInitial}>JD</Text>
              </View>
              <View style={styles.staffInfo}>
                <Text style={[styles.staffName, titleStyle]}>John D.</Text>
                <Text style={[styles.staffRole, subtitleStyle]}>Manager</Text>
              </View>
              <View style={styles.staffStatusActive} />
            </View>
            <View style={styles.staffItem}>
              <View style={styles.staffAvatar}>
                <Text style={styles.staffInitial}>SM</Text>
              </View>
              <View style={styles.staffInfo}>
                <Text style={[styles.staffName, titleStyle]}>Sarah M.</Text>
                <Text style={[styles.staffRole, subtitleStyle]}>Waitress</Text>
              </View>
              <View style={styles.staffStatusActive} />
            </View>
            <View style={styles.staffItem}>
              <View style={styles.staffAvatar}>
                <Text style={styles.staffInitial}>MR</Text>
              </View>
              <View style={styles.staffInfo}>
                <Text style={[styles.staffName, titleStyle]}>Mike R.</Text>
                <Text style={[styles.staffRole, subtitleStyle]}>Cook</Text>
              </View>
              <View style={styles.staffStatusInactive} />
            </View>
          </View>
        </View>
        
        <View style={styles.managementSection}>
          <Text style={[styles.sectionTitle, titleStyle]}>Management</Text>
          
          {/* Operations Group */}
          <View style={styles.groupContainer}>
            <Text style={[styles.groupTitle, titleStyle]}>Operations</Text>
            <View style={styles.groupGrid}>
              {/* Customer Check-In */}
              <TouchableOpacity
                key="check-in"
                style={[
                  styles.groupTile,
                  isDarkMode ? styles.groupTileDark : styles.groupTileLight,
                  styles.checkInTile,
                  activeTile === 'check-in' ? styles.tilePressed : null
                ]}
                onPress={() => onNavigate('check-in')}
                activeOpacity={0.85}
                onPressIn={() => setActiveTile('check-in')}
                onPressOut={() => setActiveTile(null)}
              >
                <View style={[styles.groupTileHeader, styles.checkInHeader]}>
                  <View style={styles.tileIconContainer}>
                    <Text style={styles.tileIcon}>👤</Text>
                  </View>
                </View>
                <View style={styles.groupTileContent}>
                  <Text style={[styles.tileTitle, titleStyle]}>Check-In</Text>
                  <Text style={[styles.tileSubtitle, subtitleStyle]}>Register guests</Text>
                </View>
              </TouchableOpacity>
              
              {/* Table Management */}
              <TouchableOpacity
                key="tables"
                style={[
                  styles.groupTile,
                  isDarkMode ? styles.groupTileDark : styles.groupTileLight,
                  styles.tablesTile,
                  activeTile === 'tables' ? styles.tilePressed : null
                ]}
                onPress={() => onNavigate('tables')}
                activeOpacity={0.85}
                onPressIn={() => setActiveTile('tables')}
                onPressOut={() => setActiveTile(null)}
              >
                <View style={[styles.groupTileHeader, styles.tablesHeader]}>
                  <View style={styles.tileIconContainer}>
                    <Text style={styles.tileIcon}>🍽️</Text>
                  </View>
                  <View style={styles.tileBadge}>
                    <Text style={styles.tileBadgeText}>{metrics.availableTables}</Text>
                  </View>
                </View>
                <View style={styles.groupTileContent}>
                  <Text style={[styles.tileTitle, titleStyle]}>Tables</Text>
                  <Text style={[styles.tileSubtitle, subtitleStyle]}>Manage seats</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Orders & Reservations Group */}
          <View style={styles.groupContainer}>
            <Text style={[styles.groupTitle, titleStyle]}>Orders & Reservations</Text>
            <View style={styles.groupGrid}>
              {/* Order Management */}
              <TouchableOpacity
                key="orders"
                style={[
                  styles.groupTile,
                  isDarkMode ? styles.groupTileDark : styles.groupTileLight,
                  styles.ordersTile,
                  activeTile === 'orders' ? styles.tilePressed : null
                ]}
                onPress={() => onNavigate('orders')}
                activeOpacity={0.85}
                onPressIn={() => setActiveTile('orders')}
                onPressOut={() => setActiveTile(null)}
              >
                <View style={[styles.groupTileHeader, styles.ordersHeader]}>
                  <View style={styles.tileIconContainer}>
                    <Text style={styles.tileIcon}>📋</Text>
                  </View>
                  <View style={styles.tileBadge}>
                    <Text style={styles.tileBadgeText}>{metrics.pendingOrders}</Text>
                  </View>
                </View>
                <View style={styles.groupTileContent}>
                  <Text style={[styles.tileTitle, titleStyle]}>Orders</Text>
                  <Text style={[styles.tileSubtitle, subtitleStyle]}>Track orders</Text>
                </View>
              </TouchableOpacity>
              
              {/* Reservations */}
              <TouchableOpacity
                key="reservations"
                style={[
                  styles.groupTile,
                  isDarkMode ? styles.groupTileDark : styles.groupTileLight,
                  styles.reservationsTile,
                  activeTile === 'reservations' ? styles.tilePressed : null
                ]}
                onPress={() => onNavigate('reservations')}
                activeOpacity={0.85}
                onPressIn={() => setActiveTile('reservations')}
                onPressOut={() => setActiveTile(null)}
              >
                <View style={[styles.groupTileHeader, styles.reservationsHeader]}>
                  <View style={styles.tileIconContainer}>
                    <Text style={styles.tileIcon}>📅</Text>
                  </View>
                  <View style={styles.tileBadge}>
                    <Text style={styles.tileBadgeText}>{metrics.reservationsToday}</Text>
                  </View>
                </View>
                <View style={styles.groupTileContent}>
                  <Text style={[styles.tileTitle, titleStyle]}>Reservations</Text>
                  <Text style={[styles.tileSubtitle, subtitleStyle]}>Book tables</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Analytics & Settings Group */}
          <View style={styles.groupContainer}>
            <Text style={[styles.groupTitle, titleStyle]}>Analytics & Settings</Text>
            <View style={styles.groupGrid}>
              {/* Reports */}
              <TouchableOpacity
                key="reports"
                style={[
                  styles.groupTile,
                  isDarkMode ? styles.groupTileDark : styles.groupTileLight,
                  styles.reportsTile,
                  activeTile === 'reports' ? styles.tilePressed : null
                ]}
                onPress={() => onNavigate('reports')}
                activeOpacity={0.85}
                onPressIn={() => setActiveTile('reports')}
                onPressOut={() => setActiveTile(null)}
              >
                <View style={[styles.groupTileHeader, styles.reportsHeader]}>
                  <View style={styles.tileIconContainer}>
                    <Text style={styles.tileIcon}>📊</Text>
                  </View>
                </View>
                <View style={styles.groupTileContent}>
                  <Text style={[styles.tileTitle, titleStyle]}>Reports</Text>
                  <Text style={[styles.tileSubtitle, subtitleStyle]}>Analytics</Text>
                </View>
              </TouchableOpacity>
              
              {/* Settings */}
              <TouchableOpacity
                key="settings"
                style={[
                  styles.groupTile,
                  isDarkMode ? styles.groupTileDark : styles.groupTileLight,
                  styles.settingsTile,
                  activeTile === 'settings' ? styles.tilePressed : null
                ]}
                onPress={() => onNavigate('settings')}
                activeOpacity={0.85}
                onPressIn={() => setActiveTile('settings')}
                onPressOut={() => setActiveTile(null)}
              >
                <View style={[styles.groupTileHeader, styles.settingsHeader]}>
                  <View style={styles.tileIconContainer}>
                    <Text style={styles.tileIcon}>⚙️</Text>
                  </View>
                </View>
                <View style={styles.groupTileContent}>
                  <Text style={[styles.tileTitle, titleStyle]}>Settings</Text>
                  <Text style={[styles.tileSubtitle, subtitleStyle]}>Configure</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={[
          styles.welcomeCard,
          isDarkMode ? styles.welcomeCardDark : styles.welcomeCardLight
        ]}>
          <Text style={[styles.welcomeTitle, titleStyle]}>Welcome Back!</Text>
          <Text style={[styles.welcomeSubtitle, subtitleStyle]}>Ready to manage your restaurant operations?</Text>
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
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  restaurantCard: {
    width: '100%',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  restaurantCardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    opacity: 0.9,
  },
  restaurantCardContent: {
    zIndex: 1,
    alignItems: 'center',
  },
  restaurantStatusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusCircleOpen: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  restaurantIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  restaurantName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  restaurantSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  restaurantCardLight: {
    backgroundColor: '#3b82f6',
    shadowColor: '#3b82f6',
  },
  restaurantCardDark: {
    backgroundColor: '#1e293b',
    shadowColor: '#000',
  },
  welcomeCardLight: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  welcomeCardDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderColor: 'rgba(30, 41, 59, 0.3)',
  },
  tileEven: {
    marginLeft: 0,
    marginRight: 8,
  },
  tileOdd: {
    marginLeft: 8,
    marginRight: 0,
  },
  tilePressed: {
    transform: [{ scale: 0.95 }],
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  statsCardLight: {
    backgroundColor: '#ffffff',
  },
  statsCardDark: {
    backgroundColor: '#1e293b',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickActionsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionItemLight: {
    backgroundColor: '#ffffff',
  },
  quickActionItemDark: {
    backgroundColor: '#1e293b',
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  tileBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  tileBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  todaySummaryCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  todaySummaryCardLight: {
    backgroundColor: '#ffffff',
  },
  todaySummaryCardDark: {
    backgroundColor: '#1e293b',
  },
  todaySummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  todaySummaryTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  todaySummaryDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  todaySummaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todaySummaryItem: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  todaySummaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
  },
  todaySummaryLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  staffCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  staffCardLight: {
    backgroundColor: '#ffffff',
  },
  staffCardDark: {
    backgroundColor: '#1e293b',
  },
  staffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  staffTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  staffCount: {
    fontSize: 14,
  },
  staffList: {
    flexDirection: 'column',
  },
  staffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  staffAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  staffInitial: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 14,
    fontWeight: '600',
  },
  staffRole: {
    fontSize: 12,
  },
  staffStatusActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10b981',
  },
  staffStatusInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#94a3b8',
  },
  managementSection: {
    marginBottom: 20,
  },
  managementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  managementTile: {
    width: '48%',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tileTopGradient: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  groupGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupTile: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  groupTileHeader: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  groupTileContent: {
    padding: 12,
    alignItems: 'center',
  },
  groupTileLight: {
    backgroundColor: '#ffffff',
  },
  groupTileDark: {
    backgroundColor: '#1e293b',
  },
  checkInTile: {
    shadowColor: '#3b82f6',
  },
  tablesTile: {
    shadowColor: '#10b981',
  },
  ordersTile: {
    shadowColor: '#8b5cf6',
  },
  reservationsTile: {
    shadowColor: '#f59e0b',
  },
  reportsTile: {
    shadowColor: '#ef4444',
  },
  settingsTile: {
    shadowColor: '#6b7280',
  },
  checkInHeader: {
    backgroundColor: '#3b82f6',
  },
  tablesHeader: {
    backgroundColor: '#10b981',
  },
  ordersHeader: {
    backgroundColor: '#8b5cf6',
  },
  reservationsHeader: {
    backgroundColor: '#f59e0b',
  },
  reportsHeader: {
    backgroundColor: '#ef4444',
  },
  settingsHeader: {
    backgroundColor: '#6b7280',
  },
  tileIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
    marginBottom: 30,
  },
  excitinTile: {
    width: '48%',
    aspectRatio: 1.1,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  tileGradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 4,
  },
  tileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tileTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  tileIcon: {
    fontSize: 36,
  },
  tileTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  tileSubtitle: {
    fontSize: 12,
  },
  tileArrow: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  tileArrowText: {
    fontSize: 20,
    color: '#ffffff',
    opacity: 0.8,
  },
  welcomeCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
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
