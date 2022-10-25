import RankingHeaderBox from './RankingHeaderBox';
import RankingUserSummary from './RankingUserSummary';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';

export type RankingTableHeaderProps = {
  loading: boolean;
  seasonNumber: string;
  seasonStartDate: DateTime;
  seasonEndDate: DateTime;
  userRank: number;
  userAddress: string;
  userPoints: number;
};

const RankingTableHeader = ({
  loading,
  seasonNumber,
  seasonStartDate,
  seasonEndDate,
  userAddress,
  userRank,
  userPoints,
}: RankingTableHeaderProps) => (
  <Box>
    <RankingHeaderBox />
    <RankingUserSummary
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

export default RankingTableHeader;
