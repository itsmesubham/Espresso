// src/__tests__/App.test.tsx
import 'react-native';
import React from 'react';
import App from '../../App';
import { render } from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('App', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('has welcome message', () => {
    const { getByText } = render(<App />);
    // Since our App now renders the RoleGateScreen as the first screen
    expect(getByText('Welcome to Espresso')).toBeTruthy();
  });
});