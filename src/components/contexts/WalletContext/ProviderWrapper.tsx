import React, { useMemo, useCallback, useEffect } from 'react';
import { useMetaMask } from 'metamask-react';

import { useGetWalletQuery } from '@graphql';
import { WalletStatus, WalletName, WalletEthereum } from './types';
import WalletContext from './WalletContext';

export type ProviderWrapperProps = {
  status: WalletStatus;
  setStatus: React.Dispatch<React.SetStateAction<WalletStatus>>;
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
  name: WalletName | null;
  setName: React.Dispatch<React.SetStateAction<WalletName | null>>;
  balance: number | null;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;
};

const ProviderWrapper: React.FunctionComponent<ProviderWrapperProps> = ({
  status,
  setStatus,
  account,
  setAccount,
  name,
  setName,
  balance,
  setBalance,
  children,
}) => {
  const {
    status: metamaskStatus,
    connect: metamaskConnect,
    account: metamaskAccount,

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ethereum: metamaskEthereum,
  } = useMetaMask();

  useEffect(() => {
    if (name === 'metamask') {
      setStatus(metamaskStatus);
    }
  }, [name, setStatus, metamaskStatus]);

  useEffect(() => {
    if (name === 'metamask') {
      setAccount(metamaskAccount);
    }
  }, [name, setAccount, metamaskAccount]);

  const connect = useCallback(
    async (walletName: WalletName) => {
      setName(walletName);

      if (walletName === 'metamask') {
        return metamaskConnect();
      }

      return Promise.resolve(null);
    },
    [setName, metamaskConnect],
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ethereum = useMemo((): WalletEthereum | null => {
    switch (name) {
      case 'metamask':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return metamaskEthereum as WalletEthereum;

      default:
        return null;
    }
  }, [name, metamaskEthereum]);

  const { data } = useGetWalletQuery({ variables: { id: account || '' } });

  const value = {
    status,
    connect,
    account,
    name,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ethereum,
    balance,
    data: data && data.wallet ? data.wallet : null,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default ProviderWrapper;
