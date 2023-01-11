import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import React from 'react';

import { formatDateTime } from '../../../utilities/date';
import { UserSummary } from './UserSummary';

describe('<UserSummary />', () => {
  it('renders UserSummary with correct elements', () => {
    const seasonNumber = '1';
    const seasonStartDate = DateTime.local();
    const seasonEndDate = DateTime.local().plus({ days: 30 });
    const userRank = 1;
    const userAddress = '0x123';
    const userPoints = 100;
    const loading = false;

    render(
      <UserSummary
        loading={loading}
        seasonEndDate={seasonEndDate}
        seasonNumber={seasonNumber}
        seasonStartDate={seasonStartDate}
        userAddress={userAddress}
        userPoints={userPoints}
        userRank={userRank}
      />,
    );

    // Check that the season number is displayed
    expect(screen.getByTestId('UserSummary-SeasonBox').textContent).toEqual('SEASON 1');

    // Check that the season start and end dates are displayed
    expect(screen.getByText(`Ends: ${formatDateTime(seasonEndDate)}`)).toBeInTheDocument();

    // Check that the percentage is displayed
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
