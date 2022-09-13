import { Panel } from '@components/atomic';
import RankingHeaderBox from './RankingHeaderBox';
import RankingUserSummary from './RankingUserSummary';
import { SystemStyleObject, Theme } from '@theme';
import { DateTime } from 'luxon';

export type RankingTableHeaderProps = {
  loading?: boolean;
};

const RankingTableHeader = ({ 
  loading
}: RankingTableHeaderProps) => {
  return (
    <>
    <Panel borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0, background: "transparent"}}>
      <RankingHeaderBox
        loading={loading}
        season={1}/>

        <RankingUserSummary seasonNumber={1} seasonEndDate={DateTime.local()} userRank={21} userAddress={"0xgerard.eth"} userPoints={1276} invitedTraders={1}/>
    </Panel>
      
    </>
  )
};

export default RankingTableHeader;

  