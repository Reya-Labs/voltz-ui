import React from 'react';

import { Icon } from '../../../atomic/Icon/Icon';
import { SupportedIcons } from '../../../atomic/Icon/types';
import { AvatarAddress } from '../../AvatarAddress/AvatarAddress';
import { ButtonBox, IndicatorCircleIcon, WalletButton } from './WalletConnectButton.styled';

export type WalletConnectButtonProps = {
  onClick?: () => void;
  walletName?: 'metamask' | 'walletConnect' | null;
  account?: string | null;
  error?: string | null;
};

export const WalletConnectButton: React.FunctionComponent<WalletConnectButtonProps> = ({
  onClick,
  walletName,
  account,
  error,
}) => {
  if (error) {
    return (
      <ButtonBox data-testid="WalletConnectButton-WalletError">
        <WalletButton
          data-testid="WalletConnectButton-WalletError-WalletButton"
          startIcon={<IndicatorCircleIcon />}
          variant="red"
          onClick={onClick}
        >
          {error}
        </WalletButton>
      </ButtonBox>
    );
  }

  if (account) {
    return (
      <ButtonBox data-testid="WalletConnectButton-WalletConnected">
        <WalletButton
          data-testid="WalletConnectButton-WalletConnected-WalletButton"
          endIcon={walletName && <Icon name={walletName as SupportedIcons} sx={{ width: 16 }} />}
          variant="dark"
          onClick={onClick}
        >
          <AvatarAddress
            address={account}
            nameSx={{
              fontSize: '16px',
              lineHeight: '14px',
            }}
            size={16}
          />
        </WalletButton>
      </ButtonBox>
    );
  }

  return (
    <ButtonBox data-testid="WalletConnectButton-WalletConnect">
      <WalletButton
        data-testid="WalletConnectButton-WalletConnect-WalletButton"
        startIcon={<IndicatorCircleIcon />}
        variant="dark"
        onClick={onClick}
      >
        Connect wallet
      </WalletButton>
    </ButtonBox>
  );
};
