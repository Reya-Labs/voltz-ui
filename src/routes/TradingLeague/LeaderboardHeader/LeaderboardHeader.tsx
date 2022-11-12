import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import UserSummary from '../UserSummary/UserSummary';
import HeaderBox from '../HeaderBox/HeaderBox';

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
      loading={loading}
      seasonNumber={seasonNumber}
      seasonStartDate={seasonStartDate}
      seasonEndDate={seasonEndDate}
      userRank={userRank + 1}
      userAddress={userAddress}
      userPoints={userPoints}
      invitedTraders={1}
    />
  </Box>
);
