/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useCallback, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';

import { useGetWalletQuery } from '@graphql';
import { selectors, WindowWithWallet } from '@store';
import { useSelector } from '@hooks';
import { WalletName, WalletStatus } from './types';
import WalletContext from './WalletContext';
import { getErrorMessage } from '@utilities';
import * as services from './services';
import { Token } from '@voltz-protocol/v1-sdk';

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

  const disconnect = useCallback((errorMessage: string | null = null) => {
    (window as WindowWithWallet).wallet = undefined;
    setProvider(null);
    setSigner(null);
    setName(null);
    localStorage.removeItem('connectedWalletName');
    setAccount(null);
    setBalance({});
    setStatus('notConnected');
    setWalletError(errorMessage);
  }, [setAccount, setBalance, setStatus]);

  const connect = useCallback(
    async (walletName: WalletName) => {
      try {
        setStatus('connecting');
        const newProvider = await services.getWalletProvider(walletName);

        if(newProvider) {
          const newSigner = newProvider.getSigner();
          const walletAddress = await newSigner.getAddress();
                             
          // Do checks that could stop us allowing the wallet to connect
          if(!process.env.REACT_APP_SKIP_TOS_CHECK) {
            await services.checkForTOSSignature(newSigner, walletAddress);
          }
          await services.checkForCorrectNetwork(newProvider);
          if(!process.env.REACT_APP_SKIP_WALLET_SCREENING) {
            await services.checkForRiskyWallet(walletAddress);
          }
            
          // IMPORTANT! - Set the provider and signer globally so that the redux store can use them
          (window as WindowWithWallet).wallet = {
            provider: newProvider,
            signer: newSigner
          };

          setProvider(newProvider);
          setSigner(newSigner);
          setName(walletName);
          localStorage.setItem('connectedWalletName', walletName);
          setAccount(walletAddress.toLowerCase()); // metamask wallet data will not load unless walletAddress is all lower case - why?
          setBalance({});
          setStatus('connected');
          setWalletError(null);
        }
        else {
          setStatus('notConnected');
        }
      } 
      catch (error) {
        let errorMessage = getErrorMessage(error).trim();
        if (errorMessage.endsWith(".")) {
          errorMessage = errorMessage.slice(0, -1);
        }

        disconnect(errorMessage || null);
      }
    }, 
  [disconnect, setAccount, setBalance, setStatus]);

  // Reconnect wallet on page load
  useEffect(() => {
    const walletName = localStorage.getItem('connectedWalletName') as WalletName;
    if (walletName) {
      connect(walletName)
    }
  }, []);

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
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default ProviderWrapper;