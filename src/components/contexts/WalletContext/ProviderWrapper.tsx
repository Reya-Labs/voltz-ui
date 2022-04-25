import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useMetaMask } from 'metamask-react';
import { ethers } from 'ethers';

import { useGetWalletQuery } from '@graphql';
import { selectors } from '@store';
import { useSelector } from '@hooks';
import { WalletStatus, WalletName, WalletEthereum } from './types';
import WalletContext from './WalletContext';
import { getErrorMessage } from '@utilities';

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
  const [walletError, setWalletError] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string>();
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
        try {
          return await metamaskConnect();
        } catch (error) {
          let errorMessage = getErrorMessage(error);
          if (errorMessage.endsWith(".")) {
            errorMessage = errorMessage.slice(0, -1);
          }
          setWalletError(errorMessage);
          return null;
        }
      }

      return null;
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
      try {
        const provider = new ethers.providers.Web3Provider(ethereum, 'any');
        return provider.getSigner();
      } catch (error) {
        setWalletError(getErrorMessage(error));
        return null;
      }
    }

    return null;
  }, [ethereum]);

  const pollInterval = polling ? 500 : undefined;
  const { data, loading, error, stopPolling } = useGetWalletQuery({
    variables: { id: account || '' },
    pollInterval,
  });

  const unresolvedTransactions = useSelector(selectors.unresolvedTransactionsSelector);
  const shouldPoll = unresolvedTransactions.length > 0;

  useEffect(() => {
    setPolling(shouldPoll && !error);

    if (!shouldPoll || error) {
      stopPolling();
    }
  }, [error, shouldPoll, setPolling, stopPolling]);

  useEffect(() => {
    const provider = signer?.provider;
    if (provider) {
      // See https://eth.wiki/json-rpc/API#net_version for response info
      provider.send('net_version', [])
        .then((resp: string) => {
          setNetworkId(resp);
          if(!resp || resp !== process.env.REACT_APP_METAMASK_NETWORK_ID) {
            setWalletError('Wrong network');
          }
        })
        .catch(() => {
          setNetworkId(undefined);
        })
    }
  }, [signer]);

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
    walletError,
    networkId,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default ProviderWrapper;
