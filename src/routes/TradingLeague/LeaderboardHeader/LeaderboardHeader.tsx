import Box from '@mui/material/Box';
import { DateTime } from 'luxon';

import { TradingLeagueHeader } from '../TradingLeagueHeader/TradingLeagueHeader';
import { UserSummary } from '../UserSummary/UserSummary';

export type RankingTableHeaderProps = {
  loading: boolean;
  seasonNumber: string;
  seasonStartDate: DateTime;
  seasonEndDate: DateTime;
  userRank: number;
  userAddress: string;
  userPoints: number;
};

export const LeaderboardHeader = ({
  loading,
  seasonNumber,
  seasonStartDate,
  seasonEndDate,
  userAddress,
  userRank,
  userPoints,
}: RankingTableHeaderProps) => (
  <Box data-testid="LeaderboardHeader-Box">
    <TradingLeagueHeader />
    <UserSummary
      loading={loading}
      seasonEndDate={seasonEndDate}
      seasonNumber={seasonNumber}
      seasonStartDate={seasonStartDate}
      userAddress={userAddress}
      userPoints={userPoints}
      userRank={userRank + 1}
    />
  </Box>
);
