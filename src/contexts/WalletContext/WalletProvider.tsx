import { BigNumber } from 'ethers';
import React, { useState } from 'react';

import ProviderWrapper from './ProviderWrapper';
import { WalletName, WalletStatus } from './types';

export type WalletProviderProps = {
  accountOverride?: string;
};

export const WalletProvider: React.FunctionComponent<WalletProviderProps> = ({
  children,
  accountOverride,
}) => {
  const [status, setStatus] = useState<WalletStatus>('initializing');
  const [account, setAccount] = useState<string | null>(accountOverride || null);
  const [name, setName] = useState<WalletName | null>(null);
  const [balance, setBalance] = useState<Record<string, BigNumber>>({});
  const [required, setRequired] = useState<boolean>(false);

  return (
    <ProviderWrapper
      account={account}
      balance={balance}
      name={name}
      required={required}
      setAccount={setAccount}
      setBalance={setBalance}
      setName={setName}
      setRequired={setRequired}
      setStatus={setStatus}
      status={status}
    >
      {children}
    </ProviderWrapper>
  );
};
