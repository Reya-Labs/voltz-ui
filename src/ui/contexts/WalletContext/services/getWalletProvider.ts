import { WalletName } from '../types';
import { getWalletProviderMetamask } from './getWalletProviderMetamask';
import { getWalletProviderWalletConnect } from './getWalletProviderWalletConnect';

/**
 * Attempts to get an ethers-wrapped provider for the given wallet name
 * @param name - The wallet name (E.G: metamask)
 */
export const getWalletProvider = async (name: WalletName) => {
  switch (name) {
    case 'metamask':
      return await getWalletProviderMetamask();
    case 'walletConnect':
      return await getWalletProviderWalletConnect();
  }
};
