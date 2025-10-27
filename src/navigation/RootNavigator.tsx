import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import { RootStackParamList } from './types';
import { GuestHomeStackParamList } from './guestTypes';
import { StaffHomeStackParamList } from './staffTypes';
import { RoleGateScreen } from '../screens/RoleGateScreen';
import { GuestWelcomeScreen } from '../screens/guest/GuestWelcomeScreen';
import { PartySizeScreen } from '../screens/guest/PartySizeScreen';
import { ConfirmCheckInScreen } from '../screens/guest/ConfirmCheckInScreen';
import { GuestPreviousVisitsScreen } from '../screens/guest/GuestPreviousVisitsScreen';
import { GuestOffersScreen } from '../screens/guest/GuestOffersScreen';
import { GuestProfileScreen } from '../screens/guest/GuestProfileScreen';
import { StaffHomeScreen } from '../screens/staff/StaffHomeScreen';
import { PersonalNoticeComposerScreen } from '../screens/staff/PersonalNoticeComposerScreen';
import { PublicNoticeBoardScreen } from '../screens/staff/PublicNoticeBoardScreen';
import { BroadcastCenterScreen } from '../screens/staff/BroadcastCenterScreen';
import { LiveFloorScreen } from '../screens/staff/LiveFloorScreen';
import { WaitlistScreen } from '../screens/staff/WaitlistScreen';
import { StaffInboxScreen } from '../screens/staff/StaffInboxScreen';
import { OwnerDashboardScreen } from '../screens/owner/OwnerDashboardScreen';
import { VisitsTodayScreen } from '../screens/owner/VisitsTodayScreen';
import { OffersAnalyticsScreen } from '../screens/owner/OffersAnalyticsScreen';
import { SettingsScreen } from '../screens/owner/SettingsScreen';
import { OfferDetailScreen } from '../screens/owner/OfferDetailScreen';
import { VisitDetailScreen } from '../screens/owner/VisitDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const GuestTabs = createBottomTabNavigator();
const StaffTabs = createBottomTabNavigator();
const OwnerTabs = createBottomTabNavigator();
const GuestHomeStack = createNativeStackNavigator<GuestHomeStackParamList>();
const StaffHomeStack = createNativeStackNavigator<StaffHomeStackParamList>();

const GuestHomeNavigator = () => (
  <GuestHomeStack.Navigator screenOptions={{ headerShown: false }}>
    <GuestHomeStack.Screen name="GuestWelcome" component={GuestWelcomeScreen} />
    <GuestHomeStack.Screen name="PartySize" component={PartySizeScreen} />
    <GuestHomeStack.Screen name="ConfirmCheckIn" component={ConfirmCheckInScreen} />
    <GuestHomeStack.Screen name="GuestPreviousVisits" component={GuestPreviousVisitsScreen} />
  </GuestHomeStack.Navigator>
);

const GuestNavigator = () => (
  <GuestTabs.Navigator screenOptions={{ headerShown: false }}>
    <GuestTabs.Screen name="GuestHome" component={GuestHomeNavigator} options={{ title: 'Home' }} />
    <GuestTabs.Screen name="GuestOffers" component={GuestOffersScreen} options={{ title: 'Offers' }} />
    <GuestTabs.Screen name="GuestProfile" component={GuestProfileScreen} options={{ title: 'Profile' }} />
  </GuestTabs.Navigator>
);

const StaffHomeNavigator = () => (
  <StaffHomeStack.Navigator screenOptions={{ headerShown: false }}>
    <StaffHomeStack.Screen name="StaffHomeMain" component={StaffHomeScreen} />
    <StaffHomeStack.Screen
      name="PersonalNoticeComposer"
      component={PersonalNoticeComposerScreen}
    />
    <StaffHomeStack.Screen name="BroadcastCenter" component={BroadcastCenterScreen} />
    <StaffHomeStack.Screen name="StaffInbox" component={StaffInboxScreen} />
  </StaffHomeStack.Navigator>
);

const StaffNavigator = () => (
  <StaffTabs.Navigator screenOptions={{ headerShown: false }}>
    <StaffTabs.Screen name="StaffHome" component={StaffHomeNavigator} options={{ title: 'Home' }} />
    <StaffTabs.Screen name="StaffFloor" component={LiveFloorScreen} options={{ title: 'Floor' }} />
    <StaffTabs.Screen name="StaffNotices" component={PublicNoticeBoardScreen} options={{ title: 'Notices' }} />
    <StaffTabs.Screen name="StaffWaitlist" component={WaitlistScreen} options={{ title: 'Waitlist' }} />
  </StaffTabs.Navigator>
);

const OwnerNavigator = () => (
  <OwnerTabs.Navigator screenOptions={{ headerShown: false }}>
    <OwnerTabs.Screen name="OwnerDashboard" component={OwnerDashboardScreen} options={{ title: 'Dashboard' }} />
    <OwnerTabs.Screen name="OwnerVisits" component={VisitsTodayScreen} options={{ title: 'Visits' }} />
    <OwnerTabs.Screen name="OwnerOffers" component={OffersAnalyticsScreen} options={{ title: 'Offers' }} />
    <OwnerTabs.Screen name="OwnerSettings" component={SettingsScreen} options={{ title: 'Settings' }} />
  </OwnerTabs.Navigator>
);

const linking = {
  prefixes: ['espresso://'],
  config: {
    screens: {
      OfferDetail: 'offer/:offerId',
      VisitDetail: 'visit/:visitId',
    },
  },
};

export const RootNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer linking={linking} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RoleGate" component={RoleGateScreen} />
        <Stack.Screen name="Guest" component={GuestNavigator} />
        <Stack.Screen name="Staff" component={StaffNavigator} />
        <Stack.Screen name="Owner" component={OwnerNavigator} />
        <Stack.Screen name="OfferDetail" component={OfferDetailScreen} />
        <Stack.Screen name="VisitDetail" component={VisitDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
