import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { isArbitrumChain } from '.';

describe('isArbitrumChain', () => {
  it('should return true for Arbitrum chain ID', () => {
    expect(isArbitrumChain(SupportedChainId.arbitrum)).toBe(true);
    expect(isArbitrumChain(SupportedChainId.arbitrumGoerli)).toBe(true);
  });

  it('should return false for non-Arbitrum chain ID', () => {
    expect(isArbitrumChain(SupportedChainId.mainnet)).toBe(false);
    expect(isArbitrumChain(null)).toBe(false);
  });
});
