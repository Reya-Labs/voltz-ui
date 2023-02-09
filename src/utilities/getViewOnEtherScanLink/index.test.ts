import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { getViewOnEtherScanLink } from './';

describe('getViewOnEtherScanLink', () => {
  it('returns a link to goerli.etherscan.io when ethereumNetworkIdentifier is "goerli"', () => {
    const result = getViewOnEtherScanLink(SupportedNetworksEnum.goerli, '0x12345');
    expect(result).toBe('https://goerli.etherscan.io/tx/0x12345');
  });

  it('returns a link to etherscan.io when ethereumNetworkIdentifier is "homestead"', () => {
    const result = getViewOnEtherScanLink(SupportedNetworksEnum.mainnet, '0x12345');
    expect(result).toBe('https://etherscan.io/tx/0x12345');
  });

  it('returns a link to arbiscan.etherscan.io when ethereumNetworkIdentifier is "arbitrum"', () => {
    const result = getViewOnEtherScanLink(SupportedNetworksEnum.arbitrum, '0x12345');
    expect(result).toBe('https://arbiscan.io/tx/0x12345');
  });

  it('returns a link to goerli.arbiscan.io when ethereumNetworkIdentifier is "arbitrumGoerli"', () => {
    const result = getViewOnEtherScanLink(SupportedNetworksEnum.arbitrumGoerli, '0x12345');
    expect(result).toBe('https://goerli.arbiscan.io/tx/0x12345');
  });

  it('returns undefined when ethereumNetworkIdentifier is not "goerli" or "homestead"', () => {
    const result = getViewOnEtherScanLink('testnet' as never, '0x12345');
    expect(result).toBe('https://etherscan.io/');
  });

  it('returns undefined when transactionId is not provided', () => {
    const result = getViewOnEtherScanLink(SupportedNetworksEnum.goerli);
    expect(result).toBe('https://etherscan.io/');
  });
});
