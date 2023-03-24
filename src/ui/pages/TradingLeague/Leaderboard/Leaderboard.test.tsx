import { render, screen } from '@testing-library/react';
import { RankType } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { Leaderboard } from './Leaderboard';

describe('<Leaderboard />', () => {
  it('renders Leaderboard with correct elements', () => {
    const rankings: RankType[] = [
      {
        address: '0x1234567890abcdef',
        points: 100,
        rank: 0,
      },
      {
        address: '0xfedcba0987654321',
        points: 50,
        rank: 1,
      },
      {
        address: '0x1111111111111111',
        points: 25,
        rank: 2,
      },
    ];

    const seasonNumber = '1';
    const userRank = -1;
    const userAddress = '0xMyAddress123';
    const userPoints = 100;
    const loading = false;
    const onPrevPageMock = jest.fn();
    const onNextPageMock = jest.fn();

    render(
      <Leaderboard
        loading={loading}
        maxPages={2}
        page={0}
        perPage={2}
        rankings={rankings}
        seasonNumber={seasonNumber}
        userAddress={userAddress}
        userPoints={userPoints}
        userRank={userRank}
        onNextPage={onNextPageMock}
        onPrevPage={onPrevPageMock}
      />,
    );

    // Check if header is in page
    expect(screen.getByTestId('LeaderboardHeader-Box')).toBeInTheDocument();
    // Check if pagination element is in page
    expect(screen.getByTestId('Pagination-PaginationBox')).toBeInTheDocument();
    // Check contents of Leaderboard-SeasonTypography
    expect(screen.getByTestId('Leaderboard-SeasonTypography')).toBeInTheDocument();
    expect(screen.getByTestId('Leaderboard-SeasonTypography').textContent).toBe(
      'Season 1 Leaderboard',
    );
    // Check if ranking header is in page
    expect(screen.getAllByTestId('Header-HeaderBox')).toHaveLength(2);
    // Check if rankings are in page
    expect(screen.getByTestId(`RankingEntry-1-rank1`)).toBeInTheDocument();
    expect(screen.getByTestId(`RankingEntry-2-rank2`)).toBeInTheDocument();
    // since perPage is 2 not showing 3rd place
    expect(screen.queryByTestId(`RankingEntry-3-rank3`)).not.toBeInTheDocument();
    expect(screen.getAllByTestId(`RankingEntry-0-me`)).toHaveLength(2);
  });
});
