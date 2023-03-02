import { AvatarAddress, Button, CloseButton, Typography } from 'brokoli-ui';
import React from 'react';

import {
  AvatarAddressBox,
  ButtonsBox,
  TitleBox,
  WalletConnectedBox,
} from './WalletConnected.styled';

export type WalletConnectedProps = {
  walletName?: 'metamask' | 'walletConnect' | null;
  onChangeWallet: () => void;
  onDisconnectWallet: () => void;
  onCloseClick: () => void;
  account?: string | null;
};

export const WalletConnected: React.FunctionComponent<WalletConnectedProps> = ({
  walletName,
  onChangeWallet,
  onDisconnectWallet,
  account,
  onCloseClick,
}) => {
  if (!walletName) {
    return null;
  }

  return (
    <WalletConnectedBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Connected with {`${walletName[0].toUpperCase()}${walletName.substring(1)}`}
        </Typography>
        <CloseButton onClick={onCloseClick} />
      </TitleBox>
      <AvatarAddressBox>
        <AvatarAddress
          address={account}
          avatarSize="small"
          typographyToken="primaryBodyLargeRegular"
        />
      </AvatarAddressBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Change your wallet if you would like to start trading with a different one, or disconnect
        here.
      </Typography>
      <ButtonsBox>
        <Button variant="primary" onClick={onChangeWallet}>
          Change
        </Button>
        <Button variant="secondary" onClick={onDisconnectWallet}>
          Disconnect
        </Button>
      </ButtonsBox>
    </WalletConnectedBox>
  );
};
