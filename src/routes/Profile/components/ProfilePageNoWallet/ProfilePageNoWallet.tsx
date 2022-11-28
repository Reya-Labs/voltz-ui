import React from 'react';

import {
  ConnectWalletBox,
  ConnectWalletTypography,
  ContainerBox,
  Heading,
  PillBox,
  Subheading,
} from './ProfilePageNoWallet.styled';

export const ProfilePageNoWallet: React.FunctionComponent = React.memo(() => (
  <ContainerBox>
    <Heading variant="h1">WELCOME TO VOLTZ COMMUNITY</Heading>
    <Subheading variant="body2">Please connect your wallet</Subheading>
    <ConnectWalletBox>
      <ConnectWalletTypography variant="body2">
        <PillBox text="¯\_(ツ)_/¯" variant="wildStrawberry" />
        CONNECT YOUR WALLET TO SEE YOUR BADGE COLLECTION
      </ConnectWalletTypography>
    </ConnectWalletBox>
  </ContainerBox>
));
