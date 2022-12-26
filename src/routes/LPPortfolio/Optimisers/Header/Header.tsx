import React from 'react';

import {
  APYTypography,
  AutomaticRolloverTypography,
  BalanceTypography,
  HeaderBox,
  NameTypography,
} from './Header.styled';

export const Header: React.FunctionComponent = () => (
  <HeaderBox>
    <NameTypography>LP OPTIMISER</NameTypography>
    <BalanceTypography>CURRENT BALANCE</BalanceTypography>
    <APYTypography>APY</APYTypography>
    <AutomaticRolloverTypography>AUTOMATIC ROLLOVER</AutomaticRolloverTypography>
  </HeaderBox>
);
