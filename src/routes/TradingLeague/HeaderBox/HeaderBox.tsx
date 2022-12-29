import Box from '@mui/material/Box';
import React from 'react';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';

export const HeaderBox = React.memo(() => (
  <Box>
    <Typography
      sx={{
        fontSize: '40px',
        lineHeight: '120%',
        fontWeight: 700,
      }}
      variant="h1"
    >
      VOLTZ TRADING LEAGUE
    </Typography>
    <Typography
      sx={{
        fontWeight: 400,
        lineHeight: '160%',
        marginTop: (theme) => theme.spacing(2),
        color: colors.lavenderWeb.darken015,
        fontSize: '14px',
        fontFamily: 'DM Sans',
      }}
      variant="subtitle1"
    >
      Compete against other traderz in the Voltz Trading League. The more active you are, the more
      pointz you earn. Pointz reset at the end of each season, with the Top Traderz earning
      legendary status forever...
    </Typography>
  </Box>
));
