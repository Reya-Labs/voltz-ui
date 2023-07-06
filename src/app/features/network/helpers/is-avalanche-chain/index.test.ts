import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { isAvalancheChain } from '.';

describe('isAvalancheChain', () => {
  it('should return true for Avalanche chain ID', () => {
    expect(isAvalancheChain(SupportedChainId.avalanche)).toBe(true);
    expect(isAvalancheChain(SupportedChainId.avalancheFuji)).toBe(true);
  });

  it('should return false for non-Avalanche chain ID', () => {
    expect(isAvalancheChain(SupportedChainId.mainnet)).toBe(false);
    expect(isAvalancheChain(null)).toBe(false);
  });
});
