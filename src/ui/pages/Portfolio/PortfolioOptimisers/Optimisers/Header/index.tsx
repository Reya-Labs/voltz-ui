import { Typography } from 'brokoli-ui';
import React from 'react';

import { HeaderBox } from './Header.styled';

export const Header: React.FunctionComponent = React.memo(() => (
  <HeaderBox data-testid="Header-HeaderBox">
    <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
      Vault
    </Typography>
    <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
      Current Balance
    </Typography>
    <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
      Automatic Rollover
    </Typography>
  </HeaderBox>
));
