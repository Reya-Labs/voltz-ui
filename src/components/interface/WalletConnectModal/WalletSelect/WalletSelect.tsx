import IconButton from '@mui/material/IconButton';
import React from 'react';

import { Wallet, WalletName } from '../../../../contexts/WalletContext/types';
import { SupportedIcons } from '../../../atomic/Icon/types';
import { WalletOptionButton } from './WalletOptionButton/WalletOptionButton';
import {
  CloseWalletSelect,
  ConnectWalletTypography,
  ContentBox,
  HeaderBox,
  MoreOptionsTypography,
  WalletOptionsBox,
} from './WalletSelect.styled';
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
  <ContentBox>
    <HeaderBox>
      <ConnectWalletTypography variant="h2">CONNECT WALLET 💰</ConnectWalletTypography>
      <IconButton data-testid="WalletSelect-CloseWalletSelect" onClick={onClose}>
        <CloseWalletSelect />
      </IconButton>
    </HeaderBox>
    <WalletOptionsBox>
      {walletOptions.map(({ title, name }) => (
        <WalletOptionButton
          key={title}
          disabled={name === wallet.name && wallet.status === 'connected'}
          icon={name as SupportedIcons}
          title={title}
          onClick={() => onSelectWallet(name)}
        />
      ))}
    </WalletOptionsBox>
    <MoreOptionsTypography variant="h4">MORE OPTIONS COMING s00n</MoreOptionsTypography>
  </ContentBox>
);
