import React, { useEffect } from 'react';

import Box from '@mui/material/Box';

import { setPageTitle } from '@utilities';

import { Page } from '@components/interface';
import ConnectedRankingTable from '../../components/containers/ConnectedRankingTable/ConnectedRankingTable';
import { useWallet } from '@hooks';

const TradingLeague: React.FunctionComponent = () => {
  const { account } = useWallet();
  useEffect(() => {
    setPageTitle('Trading League', account);
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
