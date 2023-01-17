import React from 'react';

import {
  AutomaticRolloverTypography,
  BalanceTypography,
  HeaderBox,
  NameTypography,
} from './Header.styled';

export const Header: React.FunctionComponent = React.memo(() => (
  <HeaderBox data-testid="Header-HeaderBox">
    <NameTypography>LP OPTIMISER</NameTypography>
    <BalanceTypography>CURRENT BALANCE</BalanceTypography>
    <AutomaticRolloverTypography>AUTOMATIC ROLLOVER</AutomaticRolloverTypography>
  </HeaderBox>
));
