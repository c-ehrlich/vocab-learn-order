import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Contains the App div', () => {
  render(<App />);
  expect(screen.getByTestId('App')).toBeInTheDocument();
});
