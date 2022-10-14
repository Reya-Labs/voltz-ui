import React from 'react';
import { Pill, Page, Typography } from '../../../components';
import Box from '@mui/material/Box';
import colors from '../../../theme/colors';

export const ProfilePageNoWallet: React.FunctionComponent = React.memo(() => (
  <Page>
    <Box
      sx={{
        width: '724px',
        margin: '0 auto',
        background: 'transparent',
      }}
    >
      <Typography variant="h1">WELCOME TO VOLTZ COMMUNITY</Typography>
      <Typography
        variant="body2"
        sx={{
          marginTop: (theme) => theme.spacing(2),
          lineHeight: '160%',
          fontSize: '14px',
          fontFamily: 'DM Sans',
          fontWeight: 400,
          color: colors.lavenderWeb.darken015,
        }}
      >
        Please connect your wallet
      </Typography>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(6),
          backgroundColor: '#19152A',
          borderRadius: '8px',
          padding: (theme) => theme.spacing(2, 4),
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: colors.lavenderWeb.darken015,
          }}
        >
          <Pill
            text="¯\_(ツ)_/¯"
            variant="wildStrawberry"
            sx={{
              marginRight: (theme) => theme.spacing(2),
            }}
          />
          CONNECT YOUR WALLET TO SEE YOUR BADGE COLLECTION
        </Typography>
      </Box>
    </Box>
  </Page>
));
