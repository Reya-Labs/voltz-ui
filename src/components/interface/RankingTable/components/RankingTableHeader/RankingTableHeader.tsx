import { Panel } from '@components/atomic';
import RankingHeaderBox from './RankingHeaderBox';
import RankingUserSummary from './RankingUserSummary';
import { DateTime } from 'luxon';

export type RankingTableHeaderProps = {
  loading?: boolean;
  seasonNumber: string;
  seasonStartDate: DateTime;
  seasonEndDate: DateTime;
  userRank?: number;
  userAddress?: string;
  userPoints?: number;
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
  <Panel
    borderRadius="large"
    padding="container"
    sx={{ paddingTop: 0, paddingBottom: 0, background: 'transparent' }}
  >
    <RankingHeaderBox loading={loading} season={seasonNumber} />

    <RankingUserSummary
      loading={loading}
      seasonNumber={seasonNumber}
      seasonStartDate={seasonStartDate}
      seasonEndDate={seasonEndDate}
      userRank={userRank}
      userAddress={userAddress}
      userPoints={userPoints}
      invitedTraders={1}
    />
  </Panel>
);

export default RankingTableHeader;
