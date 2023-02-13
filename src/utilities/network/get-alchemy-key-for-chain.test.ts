import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getAlchemyKeyForChain } from './get-alchemy-key-for-chain';

describe('getAlchemyKeyForChain', () => {
  it('should return an empty string if the process environment variable is not provided', () => {
    expect(getAlchemyKeyForChain(SupportedChainId.mainnet, '')).toBe('');
    expect(getAlchemyKeyForChain(SupportedChainId.mainnet, undefined)).toBe('');
    expect(getAlchemyKeyForChain(SupportedChainId.mainnet, 'UNPROVIDED')).toBe('');
  });

  it('should return the alchemy key for the given chain ID', () => {
    const processEnvKeys = 'mainnet/abc,goerli/def,arbitrum/ghi';
    expect(getAlchemyKeyForChain(SupportedChainId.goerli, processEnvKeys)).toBe('def');
    expect(getAlchemyKeyForChain(SupportedChainId.arbitrum, processEnvKeys)).toBe('ghi');
  });

  it('should return an empty string if the chain ID is not supported', () => {
    expect(getAlchemyKeyForChain(9999 as SupportedChainId)).toBe('');
  });
});
