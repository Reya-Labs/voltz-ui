import { render, screen } from '@testing-library/react';
import React from 'react';

import { Header } from './Header';

describe('<Header />', () => {
  it('renders header with rank, trader, and points typography', () => {
    render(<Header />);
    expect(screen.getByText(/rank/i)).toBeInTheDocument();
    expect(screen.getByText(/trader/i)).toBeInTheDocument();
    expect(screen.getByText(/points/i)).toBeInTheDocument();
    expect(screen.getByTestId('Header-HeaderBox')).toBeInTheDocument();
  });
});
