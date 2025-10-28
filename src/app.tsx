import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './theme';
import { RootNavigator } from './navigation/RootNavigator';
import { OfflineBanner } from './components/OfflineBanner';
import { useAppBootstrap } from './hooks/useAppBootstrap';

const App = () => {
  const colorScheme = useColorScheme();
  useAppBootstrap();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
          <OfflineBanner />
          <RootNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
