import React from 'react';
import { colors } from '@theme';
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';

const RankingHeaderBox = () => (
  <Box>
    <Typography
      variant="h1"
      sx={{
        fontSize: '40px',
        lineHeight: '120%',
        fontWeight: 700,
      }}
    >
      VOLTZ TRADING LEAGUE
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 400,
        lineHeight: '160%',
        marginTop: (theme) => theme.spacing(2),
        color: colors.lavenderWeb.darken015,
        fontSize: '14px',
        fontFamily: 'DM Sans',
      }}
    >
      Compete against other traders for rewards by trading.
    </Typography>
  </Box>
);

export default RankingHeaderBox;
