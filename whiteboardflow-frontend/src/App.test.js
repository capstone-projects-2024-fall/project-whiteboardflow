import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react';
import '@testing-library/jest-dom';



test('renders welcome text', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/welcome to whiteboard assistant/i);
  expect(welcomeElement).toBeInTheDocument();
});

