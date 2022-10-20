import React, { useEffect } from 'react';

import Box from '@mui/material/Box';

import { setPageTitle } from '@utilities';

import { Page } from '@components/interface';
import ConnectedRankingTable from '../../components/containers/ConnectedRankingTable/ConnectedRankingTable';
import { useCurrentSeason, useRanking } from '@hooks';

const TradingLeague: React.FunctionComponent = () => {
  useEffect(() => {
    setPageTitle('Trading League');
  }, []);

  return (
    <Page>
      <Box
        sx={{
          width: '724px',
          margin: '0 auto',
          background: 'transparent',
        }}
      >
        <ConnectedRankingTable />
      </Box>
    </Page>
  );
};

export default TradingLeague;
