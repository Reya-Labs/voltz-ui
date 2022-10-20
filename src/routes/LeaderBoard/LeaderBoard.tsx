import React, { useEffect } from 'react';

import Box from '@mui/material/Box';

import { setPageTitle } from '@utilities';

import { Page } from '@components/interface';
import ConnectedRankingTable from '../../components/containers/ConnectedRankingTable/ConnectedRankingTable';

const LeaderBoard: React.FunctionComponent = () => {
  useEffect(() => {
    setPageTitle('Leaderboard');
  }, []);

  return (
    <Page>
      <Box sx={{ backdropFilter: 'blur(8px)', height: '100%', paddingBottom: '200px' }}>
        <ConnectedRankingTable />
      </Box>
    </Page>
  );
};

export default LeaderBoard;
