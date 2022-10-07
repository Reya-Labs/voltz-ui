import React from 'react';

import Box from '@mui/material/Box';
import { Page } from '@components/interface';

const Profile: React.FunctionComponent = () => {
  return (
    <Page>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        }}
      >
        Profile
      </Box>
    </Page>
  );
};

export default Profile;
