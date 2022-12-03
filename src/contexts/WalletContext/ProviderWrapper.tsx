/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BigNumber, ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';

import { useGetWalletQuery } from '../../graphql';
import { selectors } from '../../store';
import { useAppSelector } from '../../store/hooks';
import { getErrorMessage } from '../../utilities/getErrorMessage';
import * as services from './services';
import { WalletName, WalletStatus } from './types';
import { WalletContext } from './WalletContext';

export type ProviderWrapperProps = {
  status: WalletStatus;
  setStatus: React.Dispatch<React.SetStateAction<WalletStatus>>;
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
  name: WalletName | null;
  setName: React.Dispatch<React.SetStateAction<WalletName | null>>;
  balance: Record<string, BigNumber>;
  setBalance: React.Dispatch<React.SetStateAction<Record<string, BigNumber>>>;
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
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);

  const disconnect = useCallback(
    (errorMessage: string | null = null) => {
      window.wallet = undefined;
      setProvider(null);
      setSigner(null);
      setName(null);
      localStorage.removeItem('connectedWalletName');
      setAccount(null);
      setBalance({});
      setStatus('notConnected');
      setWalletError(errorMessage);
    },
    [setAccount, setBalance, setStatus],
  );

  const connect = useCallback(
    async (walletName: WalletName) => {
      try {
        const newProvider = await services.getWalletProvider(walletName);
        setStatus('connecting');

        if (newProvider) {
          const newSigner = newProvider.getSigner();
          const walletAddress = await newSigner.getAddress();

          // Do checks that could stop us allowing the wallet to connect
          const skipTOSCheck =
            process.env.REACT_APP_SKIP_TOS_CHECK &&
            process.env.REACT_APP_SKIP_TOS_CHECK !== 'UNPROVIDED';

          if (!skipTOSCheck) {
            await services.checkForTOSSignature(newSigner);
          }
          await services.checkForCorrectNetwork(newProvider);
          if (!process.env.REACT_APP_SKIP_WALLET_SCREENING) {
            await services.checkForRiskyWallet(walletAddress);
          }

          window.wallet = {
            provider: newProvider,
            signer: newSigner,
          };

          setProvider(newProvider);
          setSigner(newSigner);
          setName(walletName);
          localStorage.setItem('connectedWalletName', walletName);
          setAccount(walletAddress.toLowerCase()); // metamask wallet data will not load unless walletAddress is all lower case - why?
          setBalance({});
          setStatus('connected');
          setWalletError(null);
        } else {
          setStatus('notConnected');
        }
      } catch (error) {
        let errorMessage = getErrorMessage(error).trim();
        if (errorMessage.includes('Wrong network')) {
          errorMessage = 'Wrong network';
        } else if (errorMessage.includes('Risky Account Detected')) {
          errorMessage = 'Risky Account Detected';
        } else {
          errorMessage = 'Failed connection';
        }

        disconnect(errorMessage || null);
      }
    },
    [disconnect, setAccount, setBalance, setStatus],
  );

  // Reconnect wallet on page load
  useEffect(() => {
    const walletName = localStorage.getItem('connectedWalletName') as WalletName;
    if (walletName) {
      connect(walletName);
    }
  }, []);

  const pollInterval = polling ? 500 : undefined;
  const { data, loading, error, stopPolling, refetch } = useGetWalletQuery({
    variables: { id: account || '' },
    pollInterval,
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const doRefetch = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const unresolvedTransactions = useAppSelector(selectors.unresolvedTransactionsSelector);
  const shouldPoll = unresolvedTransactions.length > 0;

  useEffect(() => {
    setPolling(shouldPoll && !error);

    if (!shouldPoll || error) {
      stopPolling();
    }
  }, [error, shouldPoll, setPolling, stopPolling]);

  const value = {
    status,
    connect,
    disconnect,
    account,
    name,
    signer,
    provider,
    balance,
    wallet: data && data.wallet ? data.wallet : null,
    loading,
    error: !!error,
    required,
    setRequired,
    walletError,
    refetch: doRefetch,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default ProviderWrapper;
