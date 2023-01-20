import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

import { getSentryTracker } from '../../../utilities/sentry';

/**
 * Returns an ethers Web3Provider, which wraps the Metamask instance
 */
export const getWalletProviderMetamask = async () => {
  const externalProvider = await detectEthereumProvider();
  if (externalProvider) {
    try {
      const provider = new ethers.providers.Web3Provider(
        externalProvider as ethers.providers.ExternalProvider,
      );

      // There is a login issue with metamask: https://github.com/MetaMask/metamask-extension/issues/10085

      // Triggers metamask login window, but always asks for permissions to allow site to use wallet. However, it handles
      // the user closing the login modal correctly (cancels login request so modal pops up next time).
      // await provider.send("wallet_requestPermissions", [{ eth_accounts: {} }]);

      // Triggers login modal, but if the user closes the login modal, the request isn't cancelled, so the modal
      // does not pop up again the next time they choose login with metamask (unless they refresh the page).
      await provider.send('eth_requestAccounts', []);

      return provider;
    } catch (error) {
      getSentryTracker().captureException(error);
      return undefined; // Assume user cancelled
    }
  }
  throw new Error('Metamask not installed');
};
