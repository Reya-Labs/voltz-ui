import { ExternalLink, Typography } from 'brokoli-ui';
import React from 'react';

import { HeaderBox } from './Header.styled';

export const Header: React.FunctionComponent = React.memo(() => (
  <HeaderBox>
    <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Bold">
      LP Optimiser Vaults
    </Typography>
    <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyLargeRegular">
      The Voltz-Mellow Vaults run automated strategies, optimizing deposits for high LP fees while
      taking away the complex math, empowering every user to become a Voltz LP.
    </Typography>
    <ExternalLink
      colorToken="skyBlueCrayola"
      href="https://www.voltz.xyz/resource-centre/optimizing-the-optimizooor-the-new-mellow-voltz-eth-and-stablecoin-lp-optimizers"
      typographyToken="primaryBodyMediumRegular"
    >
      LEARN MORE
    </ExternalLink>
  </HeaderBox>
));
