import React from 'react';

import { useWallet } from '../../../../../hooks/useWallet';
import {
  ConnectWalletBox,
  ConnectWalletTypography,
  ContainerBox,
  Heading,
  PillBox,
  Subheading,
} from './ConnectWallet.styled';

export const ConnectWallet: React.FunctionComponent = React.memo(() => {
  const { setRequired } = useWallet();
  return (
    <ContainerBox onClick={() => setRequired(true)}>
      <Heading variant="h1">🚫 PROHIBITED</Heading>
      <Subheading variant="body2">Your wallet needs to be connected before proceeding.</Subheading>
      <ConnectWalletBox>
        <ConnectWalletTypography variant="body2">
          <PillBox text="¯\_(ツ)_/¯" variant="wildStrawberry" />
          CONNECT YOUR WALLET
        </ConnectWalletTypography>
      </ConnectWalletBox>
    </ContainerBox>
  );
});
