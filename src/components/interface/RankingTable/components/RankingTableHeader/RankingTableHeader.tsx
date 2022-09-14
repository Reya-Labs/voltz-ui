import { Panel } from '@components/atomic';
import RankingHeaderBox from './RankingHeaderBox';
import RankingUserSummary from './RankingUserSummary';
import { SystemStyleObject, Theme } from '@theme';
import { DateTime } from 'luxon';

export type RankingTableHeaderProps = {
  loading?: boolean;
  handleInvite: () => void;
};

const RankingTableHeader = ({ 
  loading,
  handleInvite
}: RankingTableHeaderProps) => {
  return (
    <>
    <Panel borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0, background: "transparent"}}>
      <RankingHeaderBox
        loading={loading}
        season={1}/>

        <RankingUserSummary handleInvite={handleInvite} seasonNumber={1} seasonEndDate={DateTime.local()} userRank={21} userAddress={"0xgerard.eth"} userPoints={1276} invitedTraders={1}/>
    </Panel>
      
    </>
  )
};

export default RankingTableHeader;

  