import React from 'react';

import { isEnvVarProvided } from '../../../../utilities/isEnvVarProvided';
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
    {isEnvVarProvided(process.env.REACT_APP_AUTOROLLOVER_LP) ? (
      <AutomaticRolloverTypography>AUTOMATIC ROLLOVER</AutomaticRolloverTypography>
    ) : null}
  </HeaderBox>
));
