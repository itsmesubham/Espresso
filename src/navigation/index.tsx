// src/navigation/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/ThemeProvider';
import { UserRole } from '../types/models';

// Guest Screens
import RoleGateScreen from '../screens/RoleGateScreen';
import GuestWelcomeScreen from '../screens/guest/GuestWelcomeScreen';
import PartySizeScreen from '../screens/guest/PartySizeScreen';
import ConfirmCheckInScreen from '../screens/guest/ConfirmCheckInScreen';
import GuestPreviousVisitsScreen from '../screens/guest/GuestPreviousVisitsScreen';
import GuestOffersScreen from '../screens/guest/GuestOffersScreen';

// Staff Screens
import StaffHomeScreen from '../screens/staff/StaffHomeScreen';
import PersonalNoticeComposerScreen from '../screens/staff/PersonalNoticeComposerScreen';
import PublicNoticeBoardScreen from '../screens/staff/PublicNoticeBoardScreen';
import BroadcastCenterScreen from '../screens/staff/BroadcastCenterScreen';
import LiveFloorScreen from '../screens/staff/LiveFloorScreen';
import WaitlistScreen from '../screens/staff/WaitlistScreen';
import StaffInboxScreen from '../screens/staff/StaffInboxScreen';

// Owner Screens
import OwnerDashboardScreen from '../screens/owner/OwnerDashboardScreen';
import VisitsTodayScreen from '../screens/owner/VisitsTodayScreen';
import OffersAnalyticsScreen from '../screens/owner/OffersAnalyticsScreen';
import SettingsScreen from '../screens/owner/SettingsScreen';

// Import store
import { useAuthStore } from '../store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Guest Tab Navigator
const GuestTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={GuestWelcomeScreen} />
      <Tab.Screen name="Visits" component={GuestPreviousVisitsScreen} />
      <Tab.Screen name="Offers" component={GuestOffersScreen} />
    </Tab.Navigator>
  );
};

// Staff Tab Navigator
const StaffTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={StaffHomeScreen} />
      <Tab.Screen name="Floor" component={LiveFloorScreen} />
      <Tab.Screen name="Notices" component={PublicNoticeBoardScreen} />
      <Tab.Screen name="Waitlist" component={WaitlistScreen} />
    </Tab.Navigator>
  );
};

// Owner Tab Navigator
const OwnerTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={OwnerDashboardScreen} />
      <Tab.Screen name="Visits" component={VisitsTodayScreen} />
      <Tab.Screen name="Offers" component={OffersAnalyticsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Main Navigator
const MainNavigator = () => {
  const { theme } = useTheme();
  const { user } = useAuthStore();

  return (
    <NavigationContainer theme={{
      dark: false,
      colors: {
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.accent,
      }
    }}>
      <Stack.Navigator initialRouteName="RoleGate">
        <Stack.Screen 
          name="RoleGate" 
          component={RoleGateScreen} 
          options={{ headerShown: false }} 
        />
        
        {user?.role === 'GUEST' && (
          <Stack.Screen 
            name="GuestTabs" 
            component={GuestTabNavigator} 
            options={{ headerShown: false }} 
          />
        )}
        
        {user?.role === 'STAFF' && (
          <Stack.Screen 
            name="StaffTabs" 
            component={StaffTabNavigator} 
            options={{ headerShown: false }} 
          />
        )}
        
        {user?.role === 'OWNER' && (
          <Stack.Screen 
            name="OwnerTabs" 
            component={OwnerTabNavigator} 
            options={{ headerShown: false }} 
          />
        )}
        
        {/* Guest Flow Screens */}
        <Stack.Screen name="PartySize" component={PartySizeScreen} />
        <Stack.Screen name="ConfirmCheckIn" component={ConfirmCheckInScreen} />
        
        {/* Staff Flow Screens */}
        <Stack.Screen name="PersonalNoticeComposer" component={PersonalNoticeComposerScreen} />
        <Stack.Screen name="BroadcastCenter" component={BroadcastCenterScreen} />
        <Stack.Screen name="StaffInbox" component={StaffInboxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;