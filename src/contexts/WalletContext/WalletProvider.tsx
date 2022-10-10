import React, { useEffect, useState } from 'react';

import { WalletName, WalletStatus } from './types';
import ProviderWrapper from './ProviderWrapper';
import { BigNumber } from 'ethers';

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
  const [balance, setBalance] = useState<Record<string, BigNumber>>({});
  const [required, setRequired] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    setSessionId((Math.random()).toString(20).substring(2, 10));
  }, [account]);


  return (
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
      sessionId={sessionId}
    >
      {children}
    </ProviderWrapper>
  );
};

export default WalletProvider;
