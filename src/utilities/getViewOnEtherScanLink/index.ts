/**
 * It takes an Ethereum network identifier and a transaction ID and returns a link to etherscan.io
 * @param {'goerli' | 'homestead'} [ethereumNetworkIdentifier] - The identifier of the Ethereum network you're using.
 * @param {string} [transactionId] - The transaction ID of the transaction you want to link to.
 * @returns A string that is a link to etherscan.io
 */
import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

// TODO: Alex move this to SDK, seems as candidate for SDK
export const getViewOnEtherScanLink = (
  ethereumNetworkIdentifier?: SupportedNetworksEnum,
  transactionId?: string,
) => {
  if (!ethereumNetworkIdentifier || !transactionId) {
    return 'https://etherscan.io/';
  }
  if (ethereumNetworkIdentifier === SupportedNetworksEnum.goerli) {
    return `https://goerli.etherscan.io/tx/${transactionId}`;
  }

  if (ethereumNetworkIdentifier === SupportedNetworksEnum.mainnet) {
    return `https://etherscan.io/tx/${transactionId}`;
  }

  if (ethereumNetworkIdentifier === SupportedNetworksEnum.arbitrum) {
    return `https://arbiscan.io/tx/${transactionId}`;
  }

  if (ethereumNetworkIdentifier === SupportedNetworksEnum.arbitrumGoerli) {
    return `https://goerli.arbiscan.io/tx/${transactionId}`;
  }
  return 'https://etherscan.io/';
};
