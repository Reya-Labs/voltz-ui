import { CloseButton, ExternalLink, Typography } from 'brokoli-ui';
import React from 'react';

import { Wallet, WalletName } from '../../../../../../contexts/WalletContext/types';
import { WalletOptionButton } from './WalletOptionButton';
import { TitleBox, WalletOptionsBox, WalletSelectBox } from './WalletSelect.styled';
type WalletOption = {
  title: string;
  name: WalletName;
};

export type WalletSelectProps = {
  wallet: Wallet;
  onSelectWallet: (name: WalletName) => void;
  onClose: () => void;
};

export const walletOptions: WalletOption[] = [
  { title: 'Metamask', name: 'metamask' },
  { title: 'WalletConnect', name: 'walletConnect' },
];

export const WalletSelect: React.FunctionComponent<WalletSelectProps> = ({
  wallet,
  onSelectWallet,
  onClose,
}) => (
  <WalletSelectBox>
    <TitleBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Connect your wallet
      </Typography>
      <CloseButton onClick={onClose} />
    </TitleBox>
    <WalletOptionsBox>
      {walletOptions.map(({ title, name }) => (
        <WalletOptionButton
          key={title}
          disabled={name === wallet.name && wallet.status === 'connected'}
          icon={name !== 'disconnect' ? name : undefined}
          title={title}
          onClick={() => onSelectWallet(name)}
        />
      ))}
    </WalletOptionsBox>
    <ExternalLink
      colorToken="lavenderWeb"
      href="https://ethereum.org/en/wallets/"
      typographyToken="primaryBodyXSmallRegular"
    >
      Learn about wallets
    </ExternalLink>
  </WalletSelectBox>
);
