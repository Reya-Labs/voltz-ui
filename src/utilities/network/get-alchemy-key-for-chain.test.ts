import { getAlchemyKey } from './get-alchemy-key';

describe('getAlchemyKeyForChain', () => {
  it('should return an empty string if the process environment variable is not provided', () => {
    expect(getAlchemyKey('')).toBe('');
    expect(getAlchemyKey(undefined)).toBe('');
    expect(getAlchemyKey('UNPROVIDED')).toBe('');
  });

  it('should return the alchemy key for the given chain ID', () => {
    const processEnvKeys = 'abc';
    expect(getAlchemyKey(processEnvKeys)).toBe('abc');
  });
});
