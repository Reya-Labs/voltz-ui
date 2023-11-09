import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import {
  detectIfNetworkSupported,
  getDefaultChainId,
  selectChainId,
  setChainIdThunk,
} from '../../../app/features/network';
import { resetPortfolioStateAction } from '../../../app/features/portfolio';
import { getENSDetails } from '../../../utilities/getENSDetails';
import { getErrorMessage } from '../../../utilities/getErrorMessage';
import { getReferrer } from '../../../utilities/referrer-store';
import { getSentryTracker } from '../../../utilities/sentry';
import { checkForRiskyWallet, checkForTOSSignature, getWalletProvider } from './services';
import { WalletName, WalletStatus } from './types';
import { WalletContext } from './WalletContext';

export const WalletProvider: React.FunctionComponent = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [status, setStatus] = useState<WalletStatus>('initializing');
  const [account, setAccount] = useState<string | null>(null);
  const [accountENS, setAccountENS] = useState<string | null>(null);
  const [name, setName] = useState<WalletName | null>(null);
  const [required, setRequired] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const chainId = useAppSelector(selectChainId);

  const disconnect = useCallback(
    (errorMessage: string | null = null) => {
      window.wallet = undefined;
      localStorage.removeItem('connectedWalletName');
      setProvider(null);
      setSigner(null);
      setName(null);
      setAccount(null);
      setAccountENS(null);
      setStatus('notConnected');
      setWalletError(errorMessage);
      dispatch(resetPortfolioStateAction());
    },
    [dispatch],
  );

  const handleError = (error: unknown) => {
    let errorMessage = getErrorMessage(error).trim();
    let shouldDisconnect = true;
    if (errorMessage === 'Metamask not installed') {
      errorMessage = 'Metamask not installed';
      window.open('https://metamask.io', '_blank')?.focus();
    } else if (errorMessage.includes('Wrong network')) {
      errorMessage = 'Wrong network';
    } else if (errorMessage.includes('Risky Account Detected')) {
      errorMessage = 'Risky Account Detected';
      getSentryTracker().captureException(error);
    } else if (errorMessage.includes('underlying network changed')) {
      errorMessage = '';
      shouldDisconnect = false;
    } else {
      errorMessage = 'Failed connection';
      getSentryTracker().captureException(error);
    }

    // don't disconnect when underlying network changes...
    // a page reload will happen and another connect happens
    if (shouldDisconnect) {
      disconnect(errorMessage || null);
    }
  };

  const connect = useCallback(
    async (walletName: WalletName) => {
      try {
        setStatus('connecting');
        const newProvider = await getWalletProvider(walletName);

        if (newProvider) {
          const newSigner = newProvider.getSigner();
          const walletAddress = await newSigner.getAddress();

          // Do checks that could stop us allowing the wallet to connect
          const skipTOSCheck =
            process.env.REACT_APP_SKIP_TOS_CHECK &&
            process.env.REACT_APP_SKIP_TOS_CHECK !== 'UNPROVIDED';

          if (!skipTOSCheck) {
            const referralCode = getReferrer() || '';
            await checkForTOSSignature({ signer: newSigner, referralCode });
          }
          const providerNetwork = await newProvider.getNetwork();
          const networkValidation = detectIfNetworkSupported(providerNetwork.chainId);
          if (!networkValidation.isSupported || !networkValidation.chainId) {
            await dispatch(
              setChainIdThunk({
                chainId: getDefaultChainId(),
                isSupportedChain: false,
                triggerApprovalFlow: false,
                reloadPage: true,
              }),
            );
            throw new Error('Wrong network');
          } else {
            await dispatch(
              setChainIdThunk({
                chainId: networkValidation.chainId,
                isSupportedChain: true,
                triggerApprovalFlow: false,
                reloadPage: true,
              }),
            );
          }

          if (!process.env.REACT_APP_SKIP_WALLET_SCREENING) {
            await checkForRiskyWallet(walletAddress);
          }

          window.wallet = {
            provider: newProvider,
            signer: newSigner,
          };

          const walletAddressAccount = walletAddress.toLowerCase();
          const details = await getENSDetails(walletAddressAccount);

          setProvider(newProvider);
          setSigner(newSigner);
          setName(walletName);
          localStorage.setItem('connectedWalletName', walletName);
          setAccount(walletAddressAccount); // metamask wallet data will not load unless walletAddress is all lower case - why?
          setAccountENS(details?.name || walletAddressAccount); // ENS details
          setStatus('connected');
          setWalletError(null);
        } else {
          setStatus('notConnected');
        }
      } catch (error) {
        handleError(error);
      }
    },
    [disconnect, dispatch],
  );

  const reconnect = useCallback(
    async (walletName: WalletName) => {
      try {
        setStatus('connecting');
        const newProvider = await getWalletProvider(walletName);

        if (newProvider) {
          const newSigner = newProvider.getSigner();
          const walletAddress = await newSigner.getAddress();

          window.wallet = {
            provider: newProvider,
            signer: newSigner,
          };

          const walletAddressAccount = walletAddress.toLowerCase();
          const details = await getENSDetails(walletAddressAccount);

          setProvider(newProvider);
          setSigner(newSigner);
          setName(walletName);
          localStorage.setItem('connectedWalletName', walletName);
          setAccount(walletAddressAccount); // metamask wallet data will not load unless walletAddress is all lower case - why?
          setAccountENS(details?.name || walletAddressAccount); // ENS details
          setStatus('connected');
          setWalletError(null);
        } else {
          setStatus('notConnected');
        }
      } catch (error) {
        handleError(error);
      }
    },
    [disconnect, dispatch],
  );

  // Reconnect wallet on page load
  useEffect(() => {
    const walletName = localStorage.getItem('connectedWalletName') as WalletName;
    if (walletName) {
      void connect(walletName);
    }
  }, []);

  const onChainChangeConnectedWallet = async () => {
    if (!provider || !chainId) {
      return;
    }

    try {
      const providerNetwork = await provider.getNetwork();
      const chainValidation = providerNetwork.chainId === chainId;

      if (!chainValidation) {
        throw new Error('Wrong network');
      }
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    void onChainChangeConnectedWallet();
  }, [provider, chainId]);

  const value = {
    status,
    connect,
    disconnect,
    account,
    accountENS,
    name,
    signer,
    provider,
    required,
    setRequired,
    walletError,
    reconnect,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
