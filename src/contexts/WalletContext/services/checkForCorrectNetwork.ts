import { ethers } from 'ethers';

/**
 * Will throw an error if the connected ethereum network does not match required network set in .env file
 * @param provider - The ethers-wrapped provider
 */
export const checkForCorrectNetwork = async (provider: ethers.providers.JsonRpcProvider) => {
  try {
    const network = await provider.getNetwork();
    if (
      !!process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK &&
      network.name !== process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK
    ) {
      throw new Error(
        `Connected to '${network.name}' instead of '${
          process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK || '<unknown>'
        }`,
      );
    }
  } catch (e) {
    throw new Error('Wrong network');
  }
};
