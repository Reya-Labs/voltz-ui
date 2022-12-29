import React from 'react';

import { SubtitleTypography, TitleTypography } from './PointsSystem.styled';

export const PointsSystem = React.memo(() => (
  <>
    <TitleTypography variant="h1">POINTZ SYSTEM</TitleTypography>
    <SubtitleTypography variant="subtitle1">
      Earn pointz based on your trading activity on Voltz Protocol. Pointz are calculated based on
      notional traded, which is then time-weighted based on how far away your trade is from
      maturity.
    </SubtitleTypography>
  </>
));
