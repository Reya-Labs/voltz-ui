import { BigNumber, ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';

import { getErrorMessage } from '../../utilities/getErrorMessage';
import { getSentryTracker } from '../../utilities/sentry';
import {
  checkForCorrectNetwork,
  checkForRiskyWallet,
  checkForTOSSignature,
  getWalletProvider,
} from './services';
import { WalletName, WalletStatus } from './types';
import { WalletContext } from './WalletContext';

export const WalletProvider: React.FunctionComponent = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [status, setStatus] = useState<WalletStatus>('initializing');
  const [account, setAccount] = useState<string | null>(null);
  const [name, setName] = useState<WalletName | null>(null);
  const [balance, setBalance] = useState<Record<string, BigNumber>>({});
  const [required, setRequired] = useState<boolean>(false);

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
        const newProvider = await getWalletProvider(walletName);
        setStatus('connecting');

        if (newProvider) {
          const newSigner = newProvider.getSigner();
          const walletAddress = await newSigner.getAddress();

          // Do checks that could stop us allowing the wallet to connect
          const skipTOSCheck =
            process.env.REACT_APP_SKIP_TOS_CHECK &&
            process.env.REACT_APP_SKIP_TOS_CHECK !== 'UNPROVIDED';

          if (!skipTOSCheck) {
            await checkForTOSSignature(newSigner);
          }
          await checkForCorrectNetwork(newProvider);
          if (!process.env.REACT_APP_SKIP_WALLET_SCREENING) {
            await checkForRiskyWallet(walletAddress);
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
          getSentryTracker().captureException(error);
        } else {
          errorMessage = 'Failed connection';
          getSentryTracker().captureException(error);
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

  const value = {
    status,
    connect,
    disconnect,
    account,
    name,
    signer,
    provider,
    balance,
    required,
    setRequired,
    walletError,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
