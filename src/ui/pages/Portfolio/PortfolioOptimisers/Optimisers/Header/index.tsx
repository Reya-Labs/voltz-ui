import { Typography } from 'brokoli-ui';
import React from 'react';

import { AutomaticRolloverBox, CurrentBalanceBox, HeaderBox, RightBox } from './Header.styled';

export const Header: React.FunctionComponent = React.memo(() => (
  <HeaderBox data-testid="Header-HeaderBox">
    <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
      Vault
    </Typography>
    <RightBox>
      <CurrentBalanceBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
          Current Balance
        </Typography>
      </CurrentBalanceBox>
      <AutomaticRolloverBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
          Automatic Rollover
        </Typography>
      </AutomaticRolloverBox>
    </RightBox>
  </HeaderBox>
));
