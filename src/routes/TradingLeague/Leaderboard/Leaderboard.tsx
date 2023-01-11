import Box from '@mui/material/Box';
import { RankType } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';
import React from 'react';

import { Entry, EntryProps } from '../Entry/Entry';
import { Header } from '../Header/Header';
import { LeaderboardHeader } from '../LeaderboardHeader/LeaderboardHeader';
import { Pagination } from '../Pagination/Pagination';
import { LeaderboardGrid, SeasonTypography } from './Leaderboard.styled';

export type RankingTableProps = {
  rankings: RankType[];
  seasonNumber: string;
  seasonStartDate: DateTime;
  seasonEndDate: DateTime;
  maxPages: number;
  page: number;
  userRank: number;
  userPoints: number;
  userAddress: string;
  loading: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  perPage: number;
};

const inRange = (start: number, end: number, num: number) => start <= num && num <= end;
const entryVariant: Record<number, EntryProps['variant']> = {
  1: 'rank1',
  2: 'rank2',
  3: 'rank3',
};
export const Leaderboard: React.FunctionComponent<RankingTableProps> = ({
  rankings,
  seasonNumber,
  seasonStartDate,
  seasonEndDate,
  maxPages,
  userRank,
  userAddress,
  userPoints,
  loading,
  page,
  onNextPage,
  onPrevPage,
  perPage,
}) => {
  const slicedRankings = rankings.slice(page * perPage, page * perPage + perPage);
  return (
    <Box data-testid="Leaderboard-Box">
      <LeaderboardHeader
        loading={loading}
        seasonEndDate={seasonEndDate}
        seasonNumber={seasonNumber}
        seasonStartDate={seasonStartDate}
        userAddress={userAddress}
        userPoints={userPoints}
        userRank={userRank}
      />
      <SeasonTypography data-testid="Leaderboard-SeasonTypography" variant="body2">
        SEASON {seasonNumber} LEADERBOARD
      </SeasonTypography>
      <LeaderboardGrid itemsPerRow={1}>
        <Header />
        {!loading &&
          slicedRankings.length !== 0 &&
          slicedRankings.map((ranking) => {
            const rank = ranking.rank + 1;
            return (
              <Entry
                key={ranking.address}
                address={ranking.address}
                points={ranking.points}
                rank={rank}
                variant={entryVariant[rank] || (rank === userRank + 1 ? 'me' : 'other')}
              />
            );
          })}
        {loading &&
          Array.from({ length: 10 }, () => ({})).map((ranking, index) => (
            <Entry
              key={index}
              address={''}
              loading={true}
              points={index}
              rank={index}
              variant="rank1"
            />
          ))}
        {!loading &&
          userAddress &&
          !inRange(page * perPage, page * perPage + perPage, userRank) && (
            <Entry address={userAddress} points={userPoints} rank={userRank + 1} variant="me" />
          )}
      </LeaderboardGrid>
      {!loading && (
        <Pagination
          maxPages={maxPages}
          page={page}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
      )}
    </Box>
  );
};
