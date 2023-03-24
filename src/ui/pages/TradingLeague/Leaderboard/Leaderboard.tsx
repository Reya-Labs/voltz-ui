import { RankType } from '@voltz-protocol/v1-sdk';
import { Typography } from 'brokoli-ui';
import React from 'react';

import { Entry, EntryProps } from '../Entry/Entry';
import { Header } from '../Header/Header';
import { LeaderboardHeader } from '../LeaderboardHeader/LeaderboardHeader';
import { Pagination } from '../Pagination/Pagination';
import { LeaderboardBox, LeaderboardGrid, LeaderboardGridBox } from './Leaderboard.styled';

export type RankingTableProps = {
  rankings: RankType[];
  seasonNumber: string;
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
    <LeaderboardBox data-testid="Leaderboard-Box">
      <LeaderboardHeader
        loading={loading}
        seasonNumber={seasonNumber}
        userAddress={userAddress}
        userPoints={userPoints}
        userRank={userRank}
      />
      <LeaderboardGridBox data-testid="Leaderboard-LeaderboardGridBox">
        <Typography
          colorToken="lavenderWeb"
          data-testid="Leaderboard-SeasonTypography"
          typographyToken="primaryHeader2Black"
        >
          Season {seasonNumber} Leaderboard
        </Typography>
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
      </LeaderboardGridBox>
    </LeaderboardBox>
  );
};
