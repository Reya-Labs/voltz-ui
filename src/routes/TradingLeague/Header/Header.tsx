import Box from '@mui/material/Box';
import React from 'react';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';

export const Header: React.FunctionComponent = () => (
  <Box
    sx={{
      display: 'flex',
      padding: (theme) => theme.spacing(0, 6),
    }}
  >
    <Typography
      sx={{
        lineHeight: '14px',
        letterSpacing: '0.02em',
        fontWeight: 400,
        fontSize: '12px',
        width: '67px',
        color: colors.lavenderWeb.darken015,
      }}
      variant="subtitle1"
    >
      RANK
    </Typography>
    <Typography
      sx={{
        lineHeight: '14px',
        letterSpacing: '0.02em',
        fontWeight: 400,
        fontSize: '12px',
        flex: 1,
        color: colors.lavenderWeb.darken015,
      }}
      variant="subtitle1"
    >
      TRADER
    </Typography>
    <Typography
      sx={{
        lineHeight: '14px',
        letterSpacing: '0.02em',
        fontWeight: 400,
        fontSize: '12px',
        color: colors.lavenderWeb.darken015,
      }}
      variant="subtitle1"
    >
      POINTS
    </Typography>
  </Box>
);
