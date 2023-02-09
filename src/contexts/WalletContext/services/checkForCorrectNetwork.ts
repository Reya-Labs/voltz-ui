import { detectNetworkWithChainId } from '@voltz-protocol/v1-sdk';
import { ethers } from 'ethers';

/**
 * Will throw an error if the connected ethereum network does not match required network set in .env file
 * @param provider - The ethers-wrapped provider
 */
export const checkForCorrectNetwork = async (provider: ethers.providers.JsonRpcProvider) => {
  const network = await provider.getNetwork();
  const networkValidation = detectNetworkWithChainId(network.chainId);
  if (!networkValidation.isSupported) {
    throw new Error('Wrong network');
  }
};
