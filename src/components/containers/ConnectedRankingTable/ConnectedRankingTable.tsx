import React, { useEffect } from 'react';

import { Loading, Panel } from '@components/atomic';
import { RankingTable } from '@components/interface';
import { isUndefined } from 'lodash';
import { useWallet, useRanking } from '@hooks';
import { DateTime } from 'luxon';

export type ConnectedRankingTableProps = {
  handleInvite: () => void;
};

const ConnectedRankingTable: React.FunctionComponent<ConnectedRankingTableProps> = ({
  handleInvite,
}) => {
  const wallet = useWallet();
  const { rankings, findCurrentSeason } = useRanking(wallet);
  const { result, loading, call } = rankings;

  const season = findCurrentSeason(DateTime.local());

  useEffect(() => {
    call();
  }, [call]);

  if (!loading && result && !isUndefined(season.seasonNumber)) {
    return (
      <Panel
        variant="dark"
        padding="small"
        sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: 'transparent' }}
      >
        <RankingTable
          ranking={result}
          handleInvite={handleInvite}
          seasonNumber={season.seasonNumber + 1}
          seasonEndDate={season.seasonEndDate}
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
