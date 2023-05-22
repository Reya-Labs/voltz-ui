import React from 'react';

import { selectChainId } from '../../../app/features/network';
import { useAppSelector } from '../../../app/hooks';
import { useWallet } from '../../../hooks/useWallet';
import { ConnectWallet } from '../../components/ConnectWallet';
import { VoyagePageWalletConnected } from './VoyagePageWalletConnected';

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
    <VoyagePageWalletConnected
      account={wallet.account}
      accountENS={wallet.accountENS || wallet.account}
      chainId={chainId}
    />
  );
};
