/**
 * It takes an Ethereum network identifier and a transaction ID and returns a link to etherscan.io
 * @param {'goerli' | 'homestead'} [ethereumNetworkIdentifier] - The identifier of the Ethereum network you're using.
 * @param {string} [transactionId] - The transaction ID of the transaction you want to link to.
 * @returns A string that is a link to etherscan.io
 */
export const getViewOnEtherScanLink = (
  ethereumNetworkIdentifier?: 'goerli' | 'homestead' | string,
  transactionId?: string,
) => {
  if (!ethereumNetworkIdentifier || !transactionId) {
    return 'https://etherscan.io/';
  }
  if (ethereumNetworkIdentifier === 'goerli') {
    return `https://goerli.etherscan.io/tx/${transactionId}`;
  }

  if (ethereumNetworkIdentifier === 'homestead') {
    return `https://etherscan.io/tx/${transactionId}`;
  }
  return 'https://etherscan.io/';
};
