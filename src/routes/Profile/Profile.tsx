import React from 'react';
import { Panel, Typography } from '@components/atomic';
import { SystemStyleObject, Theme } from '@theme';
import Box from '@mui/material/Box';
import { Page } from '@components/interface';

const labelStyles: SystemStyleObject<Theme> = {
  textTransform: 'uppercase',
  fontWeight: 400,
  fontSize: 14,
  color: '#B3AFC6',
};

const titleStyles: SystemStyleObject<Theme> = {
  fontSize: '40px',
  lineHeight: '1.2',
  marginTop: (theme) => theme.spacing(2),
};

const Profile: React.FunctionComponent = () => {
  return (
    <Page>
      <Box sx={{ backdropFilter: 'blur(8px)', height: '100%', paddingBottom: '200px' }}>
        <Panel
          variant="dark"
          padding="small"
          sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: 'transparent' }}
        >
          <Box sx={{ textTransform: 'uppercase' }}>
            <Typography variant="h1" sx={titleStyles}>
              VOLTZ COMMUNITY ON CHAIN
            </Typography>
            <Typography variant="subtitle1" sx={labelStyles}>
              Compete against other traders for rewards by trading or bringing people to the
              platform.
            </Typography>
          </Box>
        </Panel>
      </Box>
    </Page>
  );
};

export default Profile;
