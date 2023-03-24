import React from 'react';

import { HeaderBox, PointsTypography, RankTypography, TraderTypography } from './Header.styled';

export const Header: React.FunctionComponent = React.memo(() => (
  <HeaderBox data-testid="Header-HeaderBox">
    <RankTypography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
      Rank
    </RankTypography>
    <TraderTypography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
      Trader
    </TraderTypography>
    <PointsTypography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
      Points
    </PointsTypography>
  </HeaderBox>
));
