import { Panel } from '@components/atomic';
import RankingHeaderBox from './RankingHeaderBox';
import RankingUserSummary from './RankingUserSummary';
import { DateTime } from 'luxon';

export type RankingTableHeaderProps = {
  loading?: boolean;
  handleInvite: () => void;
  seasonNumber: number;
  seasonStartDate: DateTime;
  seasonEndDate: DateTime;
  userRank?: number;
  userAddress?: string;
  userPoints?: number;
};

const RankingTableHeader = ({
  loading,
  handleInvite,
  seasonNumber,
  seasonStartDate,
  seasonEndDate,
  userAddress,
  userRank,
  userPoints,
}: RankingTableHeaderProps) => {
  return (
    <>
      <Panel
        borderRadius="large"
        padding="container"
        sx={{ paddingTop: 0, paddingBottom: 0, background: 'transparent' }}
      >
        <RankingHeaderBox loading={loading} season={seasonNumber} />

        <RankingUserSummary
          handleInvite={handleInvite}
          seasonNumber={seasonNumber}
          seasonStartDate={seasonStartDate}
          seasonEndDate={seasonEndDate}
          userRank={userRank}
          userAddress={userAddress}
          userPoints={userPoints}
          invitedTraders={1}
        />
      </Panel>
    </>
  );
};

export default RankingTableHeader;
