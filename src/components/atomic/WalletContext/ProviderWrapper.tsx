import React, { useCallback, useEffect } from 'react';
import { useMetaMask } from 'metamask-react';

import { WalletStatus, WalletName } from './types';
import WalletContext from './WalletContext';

export type ProviderWrapperProps = {
  status: WalletStatus;
  setStatus: React.Dispatch<React.SetStateAction<WalletStatus>>;
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
  name: WalletName | null;
  setName: React.Dispatch<React.SetStateAction<WalletName | null>>;
};

const ProviderWrapper: React.FunctionComponent<ProviderWrapperProps> = ({
  status,
  setStatus,
  account,
  setAccount,
  name,
  setName,
  children,
}) => {
  const {
    status: metamaskStatus,
    connect: metamaskConnect,
    account: metamaskAccount,
  } = useMetaMask();

  useEffect(() => {
    if (name === 'metamask') {
      setStatus(metamaskStatus);
    }
  }, [metamaskStatus]);

  useEffect(() => {
    if (name === 'metamask') {
      setAccount(metamaskAccount);
    }
  }, [metamaskAccount]);

  const connect = useCallback(
    async (walletName: WalletName) => {
      setName(walletName);

      if (walletName === 'metamask') {
        return metamaskConnect();
      }

      return Promise.resolve(null);
    },
    [setStatus, setName, setAccount],
  );

  const value = {
    status,
    connect,
    account,
    name,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default ProviderWrapper;
