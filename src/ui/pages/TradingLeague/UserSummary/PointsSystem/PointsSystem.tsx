import { Typography } from 'brokoli-ui';
import React from 'react';

import { PointsSystemBox } from './PointsSystem.styled';

export const PointsSystem = React.memo(() => (
  <PointsSystemBox>
    <Typography colorToken="lavenderWeb" typographyToken="primaryHeader2Black">
      Pointz System
    </Typography>
    <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyMediumRegular">
      Earn pointz based on your trading activity on Voltz Protocol. Pointz are calculated based on
      notional traded, which is then time-weighted based on how far away your trade is from
      maturity.
    </Typography>
  </PointsSystemBox>
));
