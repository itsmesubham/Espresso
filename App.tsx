/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#111827' : '#f9fafb' },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDarkMode ? '#f9fafb' : '#111827' }]}>
          Welcome to Espresso
        </Text>
        <Text style={[styles.body, { color: isDarkMode ? '#d1d5db' : '#374151' }]}>
          This starter project keeps things simple by relying only on the core
          React Native dependencies so you can build without native setup
          headaches.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});

export default App;
