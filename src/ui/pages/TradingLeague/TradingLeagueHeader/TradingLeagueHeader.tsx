import { Typography } from 'brokoli-ui';
import React from 'react';

import { TradingLeagueHeaderBox } from './TradingLeagueHeader.styled';

export const TradingLeagueHeader = React.memo(() => (
  <TradingLeagueHeaderBox data-testid="TradingLeagueHeader-TradingLeagueHeaderBox">
    <Typography
      colorToken="lavenderWeb"
      data-testid="TradingLeagueHeader-Typography-Title"
      typographyToken="primaryHeader1Black"
    >
      Voltz Trading League
    </Typography>
    <Typography
      colorToken="lavenderWeb3"
      data-testid="TradingLeagueHeader-Typography-Subtitle"
      typographyToken="primaryBodyMediumRegular"
    >
      Compete against other traderz in the Voltz Trading League. The more active you are, the more
      pointz you earn. Pointz reset at the end of each season, with the Top Traderz earning
      legendary status forever...
    </Typography>
  </TradingLeagueHeaderBox>
));
