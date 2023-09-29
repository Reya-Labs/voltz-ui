import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { filterByChain } from '.';

describe('filterByChain', () => {
  const chainId = SupportedChainId.mainnet;

  it('should return false when appliedFilters is empty', () => {
    const appliedFilters = {};
    const result = filterByChain(chainId, appliedFilters as never);
    expect(result).toBe(false);
  });

  it('should return true when chainId matches the selected filter', () => {
    const appliedFilters = {
      ethereum: true,
    };
    const result = filterByChain(chainId, appliedFilters as never);
    expect(result).toBe(true);
  });

  it('should return false when chainId does not match the selected filter', () => {
    const appliedFilters = {
      arbitrum: true,
    };
    const result = filterByChain(chainId, appliedFilters as never);
    expect(result).toBe(false);
  });

  it('should return true when multiple filters are selected and chainId matches one of them', () => {
    const appliedFilters = {
      ethereum: true,
      arbitrum: true,
    };
    const result = filterByChain(chainId, appliedFilters as never);
    expect(result).toBe(true);
  });

  it('should return false when multiple filters are selected and chainId does not match any of them', () => {
    const appliedFilters = {
      avalanche: true,
      arbitrum: true,
    };
    const result = filterByChain(chainId, appliedFilters as never);
    expect(result).toBe(false);
  });

  it('should return false when appliedFilters contains an unsupported chain', () => {
    const appliedFilters = {
      unsupportedChain: true,
    };
    const result = filterByChain(chainId, appliedFilters as never);
    expect(result).toBe(false);
  });
});
