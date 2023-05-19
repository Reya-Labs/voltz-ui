import { getInfuraKey } from './index';

describe('getInfuraKey', () => {
  it('should return an empty string if the process environment variable is not provided', () => {
    expect(getInfuraKey('')).toBe('');
    expect(getInfuraKey(undefined)).toBe('');
    expect(getInfuraKey('UNPROVIDED')).toBe('');
  });

  it('should return the alchemy key for the given chain ID', () => {
    const processEnvKeys = 'abc';
    expect(getInfuraKey(processEnvKeys)).toBe('abc');
  });
});
