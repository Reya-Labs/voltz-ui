import React from 'react';

import {
  ConnectWalletBox,
  ConnectWalletTypography,
  ContainerBox,
  Heading,
  PillBox,
  Subheading,
} from './NoVaultFound.styled';

export const NoVaultFound: React.FunctionComponent = React.memo(() => (
  <ContainerBox>
    <Heading variant="h1">🧐 OOPS</Heading>
    <Subheading variant="body2">It seems we cannot find the vault you are after!</Subheading>
    <ConnectWalletBox>
      <ConnectWalletTypography variant="body2">
        <PillBox text="¯\_(ツ)_/¯" variant="wildStrawberry" />
        Double check the page link. Perhaps there is a typo or the vault is not longer supported.
      </ConnectWalletTypography>
    </ConnectWalletBox>
  </ContainerBox>
));
