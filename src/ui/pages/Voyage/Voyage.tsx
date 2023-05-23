import React from 'react';

import { selectChainId } from '../../../app/features/network';
import { useAppSelector } from '../../../app/hooks';
import { useWallet } from '../../../hooks/useWallet';
import { isVoyageNextEnabled } from '../../../utilities/isEnvVarProvided/is-voyage-next-enabled';
import { ConnectWallet } from '../../components/ConnectWallet';
import { DeprecatedVoyageWalletConnected } from './DeprecatedVoyageWalletConnected';
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
  if (isVoyageNextEnabled()) {
    return (
      <VoyageWalletConnected
        account={wallet.account}
        accountENS={wallet.accountENS || wallet.account}
        chainId={chainId}
      />
    );
  }

  return (
    <DeprecatedVoyageWalletConnected
      account={wallet.account}
      accountENS={wallet.accountENS || wallet.account}
      chainId={chainId}
    />
  );
};
