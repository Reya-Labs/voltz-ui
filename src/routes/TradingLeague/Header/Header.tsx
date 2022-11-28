import { Typography } from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';
import Box from '@mui/material/Box';
import React from 'react';

export const Header: React.FunctionComponent = () => (
  <Box
    sx={{
      display: 'flex',
      padding: (theme) => theme.spacing(0, 6),
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{
        lineHeight: '14px',
        letterSpacing: '0.02em',
        fontWeight: 400,
        fontSize: '12px',
        width: '67px',
        color: colors.lavenderWeb.darken015,
      }}
    >
      RANK
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        lineHeight: '14px',
        letterSpacing: '0.02em',
        fontWeight: 400,
        fontSize: '12px',
        flex: 1,
        color: colors.lavenderWeb.darken015,
      }}
    >
      TRADER
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        lineHeight: '14px',
        letterSpacing: '0.02em',
        fontWeight: 400,
        fontSize: '12px',
        color: colors.lavenderWeb.darken015,
      }}
    >
      POINTS
    </Typography>
  </Box>
);
