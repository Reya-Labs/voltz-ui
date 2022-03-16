import React, { useState } from 'react';
import { MetaMaskProvider } from 'metamask-react';

import { WalletStatus, WalletName } from './types';
import ProviderWrapper from './ProviderWrapper';

export type WalletProviderProps = {
  accountOverride?: string;
};

const WalletProvider: React.FunctionComponent<WalletProviderProps> = ({
  children,
  accountOverride,
}) => {
  const [status, setStatus] = useState<WalletStatus>('initializing');
  const [account, setAccount] = useState<string | null>(accountOverride || null);
  const [name, setName] = useState<WalletName | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [required, setRequired] = useState<boolean>(false);

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
        required={required}
        setRequired={setRequired}
      >
        {children}
      </ProviderWrapper>
    </MetaMaskProvider>
  );
};

export default WalletProvider;
