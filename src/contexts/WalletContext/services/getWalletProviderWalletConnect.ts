import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { ethers } from 'ethers';

import { getAllowedChainIds } from '../../../app/features/network';
import { isEnvVarProvided } from '../../../utilities/isEnvVarProvided';
import { getSentryTracker } from '../../../utilities/sentry';

/**
 * Returns an ethers Web3Provider, which wraps the WalletConnect instance
 */
export const getWalletProviderWalletConnect = async () => {
  window.localStorage.removeItem('walletconnect');
  const projectId = process.env.REACT_APP_WALLECTCONNECT_PROJECT_ID;
  if (!projectId || !isEnvVarProvided(projectId)) {
    // projectId not provided, we cannot perform WalletConnect operations
    throw new Error('WalletConnect not available');
  }
  let provider;

  // Try to init WalletConnect - could fail if INFURA_ID is incorrect
  try {
    provider = await EthereumProvider.init({
      projectId,
      chains: getAllowedChainIds(),
      showQrModal: true,
    } as never);
  } catch (error) {
    getSentryTracker().captureException(error);
    throw new Error('WalletConnect not available');
  }

  // Now try and get the user to log into their wallet
  try {
    //  Enable session (triggers QR Code modal)
    await provider.connect();
  } catch (error) {
    getSentryTracker().captureException(error);
    // assume user cancelled login
    return undefined;
  }

  if (provider) {
    return new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
  }

  return undefined;
};
