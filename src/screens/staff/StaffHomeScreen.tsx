// src/screens/staff/StaffHomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

const StaffHomeScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  const quickActions = [
    {
      title: 'New Personal Notice',
      description: 'Send a notice to a specific guest',
      icon: '📧',
      onPress: () => navigation.navigate('PersonalNoticeComposer'),
    },
    {
      title: 'Post Public Notice',
      description: 'Share an announcement with all guests',
      icon: '📢',
      onPress: () => console.log('Post Public Notice'),
    },
    {
      title: 'Broadcast Now',
      description: 'Send a broadcast to all subscribers',
      icon: '📡',
      onPress: () => navigation.navigate('BroadcastCenter'),
    },
    {
      title: 'Seat Table',
      description: 'Assign a table to a guest',
      icon: '🪑',
      onPress: () => console.log('Seat Table'),
    },
    {
      title: 'Start/End Visit',
      description: 'Check a guest in or out',
      icon: '⏱️',
      onPress: () => console.log('Start/End Visit'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Staff Dashboard
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Welcome back! What would you like to do?
        </Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
            onPress={action.onPress}
          >
            <View style={styles.actionContent}>
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <View style={styles.actionTextContainer}>
                <Text style={[styles.actionTitle, { color: theme.colors.text }]}>
                  {action.title}
                </Text>
                <Text style={[styles.actionDescription, { color: theme.colors.textSecondary }]}>
                  {action.description}
                </Text>
              </View>
              <Text style={[styles.chevron, { color: theme.colors.textSecondary }]}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
  actionCard: {
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  chevron: {
    fontSize: 24,
  },
});

export default StaffHomeScreen;