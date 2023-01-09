import { render, screen } from '@testing-library/react';
import React from 'react';

import { Header } from './Header';

test('renders header with rank, trader, and points typography', () => {
  render(<Header />);
  const rankElement = screen.getByText(/rank/i);
  const traderElement = screen.getByText(/trader/i);
  const pointsElement = screen.getByText(/points/i);
  expect(rankElement).toBeInTheDocument();
  expect(traderElement).toBeInTheDocument();
  expect(pointsElement).toBeInTheDocument();
});
