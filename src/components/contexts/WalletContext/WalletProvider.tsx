import React, { useState } from 'react';
import { MetaMaskProvider } from 'metamask-react';

import { WalletStatus, WalletName } from './types';
import ProviderWrapper from './ProviderWrapper';

const WalletProvider: React.FunctionComponent = ({ children }) => {
  const [status, setStatus] = useState<WalletStatus>('initializing');
  const [account, setAccount] = useState<string | null>(null);
  const [name, setName] = useState<WalletName | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  return (
    <MetaMaskProvider>
      <ProviderWrapper
        status={status}
        setStatus={setStatus}
        account={account}
        setAccount={setAccount}
        name={name}
        setName={setName}
        balance={balance}
        setBalance={setBalance}
      >
        {children}
      </ProviderWrapper>
    </MetaMaskProvider>
  );
};

export default WalletProvider;
