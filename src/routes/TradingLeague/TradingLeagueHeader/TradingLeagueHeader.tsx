import Box from '@mui/material/Box';
import React from 'react';

import { SubtitleTypography, TitleTypography } from './TradingLeagueHeader.styled';

export const TradingLeagueHeader = React.memo(() => (
  <Box>
    <TitleTypography variant="h1">VOLTZ TRADING LEAGUE</TitleTypography>
    <SubtitleTypography variant="subtitle1">
      Compete against other traderz in the Voltz Trading League. The more active you are, the more
      pointz you earn. Pointz reset at the end of each season, with the Top Traderz earning
      legendary status forever...
    </SubtitleTypography>
  </Box>
));
