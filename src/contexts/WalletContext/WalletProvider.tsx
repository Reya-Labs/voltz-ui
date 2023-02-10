import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';

import { selectChainId } from '../../app/features/network';
import { setChainIdThunk } from '../../app/features/network/thunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getDefaultChainId } from '../../components/interface/NetworkSelector/get-default-chain-id';
import { getErrorMessage } from '../../utilities/getErrorMessage';
import { detectIfNetworkSupported } from '../../utilities/network/detect-if-network-supported';
import { getSentryTracker } from '../../utilities/sentry';
import { checkForRiskyWallet, checkForTOSSignature, getWalletProvider } from './services';
import { WalletName, WalletStatus } from './types';
import { WalletContext } from './WalletContext';

export const WalletProvider: React.FunctionComponent = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [status, setStatus] = useState<WalletStatus>('initializing');
  const [account, setAccount] = useState<string | null>(null);
  const [name, setName] = useState<WalletName | null>(null);
  const [required, setRequired] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const chainId = useAppSelector(selectChainId);

  const disconnect = useCallback(
    (errorMessage: string | null = null) => {
      window.wallet = undefined;
      setProvider(null);
      setSigner(null);
      setName(null);
      localStorage.removeItem('connectedWalletName');
      setAccount(null);
      setStatus('notConnected');
      setWalletError(errorMessage);
    },
    [dispatch],
  );

  const handleError = (error: unknown) => {
    let errorMessage = getErrorMessage(error).trim();
    if (errorMessage.includes('Wrong network')) {
      errorMessage = 'Wrong network';
    } else if (errorMessage.includes('Risky Account Detected')) {
      errorMessage = 'Risky Account Detected';
      getSentryTracker().captureException(error);
    } else if (errorMessage.includes('underlying network changed')) {
      errorMessage = '';
    } else {
      errorMessage = 'Failed connection';
      getSentryTracker().captureException(error);
    }

    disconnect(errorMessage || null);
  };

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
          const providerNetwork = await newProvider.getNetwork();
          const networkValidation = detectIfNetworkSupported(providerNetwork.chainId);
          if (!networkValidation.isSupported || !networkValidation.chainId) {
            await dispatch(
              setChainIdThunk({
                chainId: getDefaultChainId(),
                isSupportedChain: false,
              }),
            );
            throw new Error('Wrong network');
          } else {
            await dispatch(
              setChainIdThunk({
                chainId: networkValidation.chainId,
                isSupportedChain: true,
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

          setProvider(newProvider);
          setSigner(newSigner);
          setName(walletName);
          localStorage.setItem('connectedWalletName', walletName);
          setAccount(walletAddress.toLowerCase()); // metamask wallet data will not load unless walletAddress is all lower case - why?
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
    name,
    signer,
    provider,
    required,
    setRequired,
    walletError,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
