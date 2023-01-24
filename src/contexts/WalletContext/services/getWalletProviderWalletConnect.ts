import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { ethers } from 'ethers';

import { getSentryTracker } from '../../../utilities/sentry';

/**
 * Returns an ethers Web3Provider, which wraps the WalletConnect instance
 */
export const getWalletProviderWalletConnect = async () => {
  window.localStorage.removeItem('walletconnect');
  let provider;

  // Try to init WalletConnect - could fail if INFURA_ID is incorrect
  try {
    provider = new WalletConnectProvider({
      infuraId: process.env.REACT_APP_WALLETCONNECT_INFURA_ID,
    });
  } catch (error) {
    getSentryTracker().captureException(error);
    throw new Error('WalletConnect not available');
  }

  // Now try and get the user to log into their wallet
  try {
    await provider.connect(); //  Enable session (triggers QR Code modal)
  } catch (error) {
    getSentryTracker().captureException(error);
    return undefined; // assume user cancelled login
  }

  if (provider) {
    return new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
  }

  return undefined;
};
