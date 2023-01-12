import React from 'react';

import { elideAddress } from '../../../../utilities/elideAddress';
import { Icon } from '../../../atomic/Icon/Icon';
import {
  ButtonBox,
  ChangeWalletButton,
  ConnectedWithTypography,
  ContentBox,
  DescriptionTypography,
  DisconnectButton,
  HeaderBox,
} from './WalletDisplay.styled';

export type WalletDisplayProps = {
  walletName?: 'metamask' | 'walletConnect' | null;
  onChangeWallet: () => void;
  onDisconnectWallet: () => void;
  account?: string | null;
};

export const WalletDisplay: React.FunctionComponent<WalletDisplayProps> = ({
  walletName,
  onChangeWallet,
  onDisconnectWallet,
  account,
}) => {
  if (!walletName) {
    return null;
  }

  return (
    <ContentBox data-testid="WalletDisplay-ContentBox">
      <HeaderBox>
        <ConnectedWithTypography variant="h2">
          CONNECTED WITH {walletName.toUpperCase()}
        </ConnectedWithTypography>
        <Icon name={walletName} />
      </HeaderBox>
      <DescriptionTypography data-testid="WalletDisplay-DescriptionTypography">
        Hey <b>{elideAddress(account)}!</b> Start trading with another <b>wallet</b>! Use the
        options below.
      </DescriptionTypography>
      <ButtonBox>
        <ChangeWalletButton data-testid="WalletDisplay-ChangeWalletButton" onClick={onChangeWallet}>
          CHANGE
        </ChangeWalletButton>
        <DisconnectButton data-testid="WalletDisplay-DisconnectButton" onClick={onDisconnectWallet}>
          DISCONNECT
        </DisconnectButton>
      </ButtonBox>
    </ContentBox>
  );
};
