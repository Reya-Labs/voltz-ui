import React from 'react';
import { Typography } from '@components/atomic';
import { Grid } from '@components/layout';
import { Box, Button } from '@mui/material';
import { DateTime } from 'luxon';
import { colors } from '../../../theme';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { Header } from '../Header/Header';
import { Entry } from '../Entry/Entry';
import { LeaderboardHeader } from '../LeaderboardHeader/LeaderboardHeader';
import { RankType } from '@voltz-protocol/v1-sdk/dist/types/entities';

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
        seasonNumber={seasonNumber}
        seasonStartDate={seasonStartDate}
        seasonEndDate={seasonEndDate}
        userRank={userRank}
        userAddress={userAddress}
        userPoints={userPoints}
      />
      <Typography
        variant="body2"
        sx={{
          fontSize: '24px',
          marginTop: (theme) => theme.spacing(4),
          fontWeight: 700,
          display: 'flex',
          alignContent: 'center',
        }}
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
                points={ranking.points}
                rank={rank}
                address={ranking.address}
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
                points={index}
                rank={index}
                variant={'rank1'}
                address={''}
                loading={true}
                key={index}
              />
            );
          })}
        {!loading &&
          userAddress &&
          !inRange(page * perPage, page * perPage + perPage, userRank) && (
            <Entry points={userPoints} rank={userRank + 1} address={userAddress} variant="me" />
          )}
      </Grid>
      {!loading && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: (theme) => theme.spacing(4) }}
        >
          <Button
            onClick={onPrevPage}
            variant={'text'}
            sx={{
              fontSize: '12px',
              lineHeight: '12px',
              color: colors.lavenderWeb.base,
              padding: (theme) => theme.spacing(2),
            }}
            startIcon={
              <ChevronLeft sx={{ width: 14, height: 14, color: colors.lavenderWeb.base }} />
            }
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
            onClick={onNextPage}
            variant={'text'}
            endIcon={
              <ChevronRight sx={{ width: 14, height: 14, color: colors.lavenderWeb.base }} />
            }
            sx={{
              fontSize: '12px',
              lineHeight: '12px',
              color: colors.lavenderWeb.base,
              padding: (theme) => theme.spacing(2),
            }}
          >
            {maxPages.toString().padStart(2, '0')} NEXT
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Leaderboard;
