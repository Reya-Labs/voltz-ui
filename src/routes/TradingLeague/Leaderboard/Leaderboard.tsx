import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RankType } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';
import React from 'react';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { Grid } from '../../../components/layout/Grid';
import { colors } from '../../../theme';
import { Entry } from '../Entry/Entry';
import { Header } from '../Header/Header';
import { LeaderboardHeader } from '../LeaderboardHeader/LeaderboardHeader';

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

const Leaderboard: React.FunctionComponent<RankingTableProps> = ({
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
  return (
    <Box>
      <LeaderboardHeader
        loading={loading}
        seasonEndDate={seasonEndDate}
        seasonNumber={seasonNumber}
        seasonStartDate={seasonStartDate}
        userAddress={userAddress}
        userPoints={userPoints}
        userRank={userRank}
      />
      <Typography
        sx={{
          fontSize: '24px',
          marginTop: (theme) => theme.spacing(4),
          fontWeight: 700,
          display: 'flex',
          alignContent: 'center',
        }}
        variant="body2"
      >
        SEASON {seasonNumber} LEADERBOARD
      </Typography>
      <Grid
        itemsPerRow={1}
        sx={{
          marginTop: (theme) => theme.spacing(6),
          rowGap: (theme) => theme.spacing(2),
          padding: (theme) => theme.spacing(0, 4),
        }}
      >
        <Header />
        {!loading &&
          rankings.length !== 0 &&
          rankings.map((ranking) => {
            const rank = ranking.rank + 1 + page * perPage;
            return (
              <Entry
                key={ranking.address}
                address={ranking.address}
                points={ranking.points}
                rank={rank}
                variant={
                  rank === 1
                    ? 'rank1'
                    : rank === 2
                    ? 'rank2'
                    : rank === 3
                    ? 'rank3'
                    : rank === userRank + 1
                    ? 'me'
                    : 'other'
                }
              />
            );
          })}
        {loading &&
          Array.from({ length: 10 }, () => ({})).map((ranking, index) => {
            return (
              <Entry
                key={index}
                address={''}
                loading={true}
                points={index}
                rank={index}
                variant={'rank1'}
              />
            );
          })}
        {!loading &&
          userAddress &&
          !inRange(page * perPage, page * perPage + perPage, userRank) && (
            <Entry address={userAddress} points={userPoints} rank={userRank + 1} variant="me" />
          )}
      </Grid>
      {!loading && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: (theme) => theme.spacing(4) }}
        >
          <Button
            startIcon={
              <ChevronLeft sx={{ width: 14, height: 14, color: colors.lavenderWeb.base }} />
            }
            sx={{
              fontSize: '12px',
              lineHeight: '12px',
              color: colors.lavenderWeb.base,
              padding: (theme) => theme.spacing(2),
            }}
            variant={'text'}
            onClick={onPrevPage}
          >
            PREVIOUS 01
          </Button>
          <Box
            sx={{
              width: '96px',
              background: colors.lavenderWeb.darken030,
              margin: (theme) => theme.spacing(2),
            }}
          >
            <Box
              sx={{
                width: `${Math.min(((page + 1) * 100) / maxPages, 100)}%`,
                background: colors.lavenderWeb.base,
                height: '100%',
                transition: 'width 500ms ease-in',
              }}
            />
          </Box>
          <Button
            endIcon={
              <ChevronRight sx={{ width: 14, height: 14, color: colors.lavenderWeb.base }} />
            }
            sx={{
              fontSize: '12px',
              lineHeight: '12px',
              color: colors.lavenderWeb.base,
              padding: (theme) => theme.spacing(2),
            }}
            variant={'text'}
            onClick={onNextPage}
          >
            {maxPages.toString().padStart(2, '0')} NEXT
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Leaderboard;
