import React from 'react';

import { HeaderBox, PointsTypography, RankTypography, TraderTypography } from './Header.styled';

export const Header: React.FunctionComponent = React.memo(() => (
  <HeaderBox data-testid="Header-HeaderBox">
    <RankTypography variant="subtitle1">RANK</RankTypography>
    <TraderTypography variant="subtitle1">TRADER</TraderTypography>
    <PointsTypography variant="subtitle1">POINTS</PointsTypography>
  </HeaderBox>
));
