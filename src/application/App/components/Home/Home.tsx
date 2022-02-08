import React from 'react';
import Box from '@mui/material/Box';

import { Typography } from '@components/atomic';
import { Page } from '@components/interface';

const Home: React.FunctionComponent = () => {
  return (
    <Page>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h1">Watch this space</Typography>
      </Box>
    </Page>
  );
};

export default Home;
