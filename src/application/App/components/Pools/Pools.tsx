import React from 'react';
import Box from '@mui/material/Box';

import { Typography } from '@components/atomic';
import { Page } from '@components/interface';

const Pools: React.FunctionComponent = () => {
  return (
    <Page>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h1">Watch this spools</Typography>
      </Box>
    </Page>
  );
};

export default Pools;
