import { getViewOnEtherScanLink } from './';

describe('getViewOnEtherScanLink', () => {
  it('returns a link to goerli.etherscan.io when ethereumNetworkIdentifier is "goerli"', () => {
    const result = getViewOnEtherScanLink('goerli', '0x12345');
    expect(result).toBe('https://goerli.etherscan.io/tx/0x12345');
  });

  it('returns a link to etherscan.io when ethereumNetworkIdentifier is "homestead"', () => {
    const result = getViewOnEtherScanLink('homestead', '0x12345');
    expect(result).toBe('https://etherscan.io/tx/0x12345');
  });

  it('returns undefined when ethereumNetworkIdentifier is not "goerli" or "homestead"', () => {
    const result = getViewOnEtherScanLink('testnet', '0x12345');
    expect(result).toBe('https://etherscan.io/');
  });

  it('returns undefined when transactionId is not provided', () => {
    const result = getViewOnEtherScanLink('goerli');
    expect(result).toBe('https://etherscan.io/');
  });
});
