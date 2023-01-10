import React from 'react';

import { BalanceTypography, HeaderBox, NameTypography } from './Header.styled';

export const Header: React.FunctionComponent = React.memo(() => (
  <HeaderBox data-testid="Header-HeaderBox">
    <NameTypography>LP OPTIMISER</NameTypography>
    <BalanceTypography>CURRENT BALANCE</BalanceTypography>
  </HeaderBox>
));
