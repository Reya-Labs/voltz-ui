import Box from '@mui/material/Box';
import { DateTime } from 'luxon';

import { HeaderBox } from '../HeaderBox/HeaderBox';
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
  <Box>
    <HeaderBox />
    <UserSummary
      invitedTraders={1}
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
