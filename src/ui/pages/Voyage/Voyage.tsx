import React from 'react';

import { useAppSelector } from '../../../app';
import { selectChainId } from '../../../app/features/network';
import { ConnectWallet } from '../../components/ConnectWallet';
import { useWallet } from '../../hooks/useWallet';
import { VoyageWalletConnected } from './VoyageWalletConnected';

export const Voyage: React.FunctionComponent = () => {
  const wallet = useWallet();
  const chainId = useAppSelector(selectChainId);

  if (!chainId) {
    return null;
  }

  if (!wallet.account) {
    return (
      <ConnectWallet
        heading="Welcome to the Voltz Voyage"
        subheading="Please connect your wallet"
      />
    );
  }
  return (
    <VoyageWalletConnected
      account={wallet.account}
      accountENS={wallet.accountENS || wallet.account}
      chainId={chainId}
    />
  );
};
