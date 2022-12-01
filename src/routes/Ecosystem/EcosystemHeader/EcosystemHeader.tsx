import React from 'react';

import {
  DescriptionTypography,
  EcosystemHeaderBox,
  LearnMoreLink,
  TitleTypography,
} from './EcosystemHeader.styled';

export const EcosystemHeader: React.FunctionComponent = React.memo(() => (
  <EcosystemHeaderBox>
    <TitleTypography variant="h1">LP OPTIMISER VAULTS</TitleTypography>
    <DescriptionTypography variant="body1">
      The Voltz-Mellow Vaults run automated strategies, optimizing deposits for high LP fees while
      taking away the complex math, empowering every user to become a Voltz LP.
    </DescriptionTypography>
    <LearnMoreLink
      href="https://www.voltz.xyz/resource-centre/optimizing-the-optimizooor-the-new-mellow-voltz-eth-and-stablecoin-lp-optimizers"
      target="_blank"
    >
      LEARN MORE
    </LearnMoreLink>
  </EcosystemHeaderBox>
));
