import React, { useEffect } from 'react';

import { Loading, Panel } from '@components/atomic';
import { RankingTable } from '@components/interface';
import { useRanking, useCurrentSeason } from '@hooks';

const ConnectedRankingTable: React.FunctionComponent = () => {
  const { rankings } = useRanking();
  const { result, loading, call } = rankings;
  const season = useCurrentSeason();

  useEffect(() => {
    call();
  }, [call]);

  if (!loading && result && season) {
    return (
      <Panel
        variant="dark"
        padding="small"
        sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: 'transparent' }}
      >
        <RankingTable
          ranking={result}
          seasonNumber={season.id.toString().padStart(2, '0')}
          seasonStartDate={season.startDate}
          seasonEndDate={season.endDate}
        />
      </Panel>
    );
  }

  return (
    <Panel
      variant="grey-dashed"
      padding="small"
      sx={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        background: 'transparent',
        marginBottom: '600px',
      }}
    >
      <Loading sx={{ margin: '0 auto' }} />
    </Panel>
  );
};

export default ConnectedRankingTable;
