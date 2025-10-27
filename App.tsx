/**
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

export default App;
