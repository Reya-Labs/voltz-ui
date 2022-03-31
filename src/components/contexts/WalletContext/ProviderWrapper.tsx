import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useMetaMask } from 'metamask-react';
import { ethers } from 'ethers';

import { useGetWalletQuery } from '@graphql';
import { selectors } from '@store';
import { useSelector } from '@hooks';
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
  required: boolean;
  setRequired: React.Dispatch<React.SetStateAction<boolean>>;
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
  required,
  setRequired,
  children,
}) => {
  const [polling, setPolling] = useState(false);
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
  const signer = useMemo((): ethers.providers.JsonRpcSigner | null => {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, 'any');

      return provider.getSigner();
    }

    return null;
  }, [ethereum]);

  const pollInterval = polling ? 500 : undefined;
  const { data, loading, error } = useGetWalletQuery({
    variables: { id: account || '' },
    pollInterval,
  });

  const activeTransactions = useSelector(selectors.transactionsSelector);
  const shouldPoll = activeTransactions.length > 0;

  useEffect(() => {
    setPolling(shouldPoll);
  }, [shouldPoll, setPolling]);

  const value = {
    status,
    connect,
    account,
    name,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ethereum,
    signer,
    balance,
    setBalance,
    wallet: data && data.wallet ? data.wallet : null,
    loading,
    error: !!error,
    required,
    setRequired,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default ProviderWrapper;
