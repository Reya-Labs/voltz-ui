import React from 'react';

import { HeaderBox, PointsTypography, RankTypography, TraderTypography } from './Header.styled';

export const Header: React.FunctionComponent = React.memo(() => (
  <HeaderBox data-testid="Header-HeaderBox">
    <RankTypography colorToken="white400" typographyToken="primaryBodyXSmallRegular">
      Rank
    </RankTypography>
    <TraderTypography colorToken="white400" typographyToken="primaryBodyXSmallRegular">
      Trader
    </TraderTypography>
    <PointsTypography colorToken="white400" typographyToken="primaryBodyXSmallRegular">
      Points
    </PointsTypography>
  </HeaderBox>
));
