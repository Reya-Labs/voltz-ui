import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { isSpruceChain } from '.';

describe('isSpruceChain', () => {
  it('should return true for Spruce chain ID', () => {
    expect(isSpruceChain(SupportedChainId.spruce)).toBe(true);
  });

  it('should return false for non-Spruce chain ID', () => {
    expect(isSpruceChain(SupportedChainId.mainnet)).toBe(false);
    expect(isSpruceChain(null)).toBe(false);
  });
});
