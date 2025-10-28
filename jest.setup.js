/* eslint-env jest */
import 'react-native-gesture-handler/jestSetup';
import mockRNReanimated from 'react-native-reanimated/mock';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn().mockReturnValue(() => {}),
}));

jest.mock('react-native-reanimated', () => mockRNReanimated);

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-gesture-handler', () => {
  const actual = jest.requireActual('react-native-gesture-handler');
  return {
    ...actual,
    GestureHandlerRootView: ({ children }) => children,
  };
});

