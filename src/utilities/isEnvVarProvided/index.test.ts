import { isEnvVarProvided } from './index';

describe('isEnvVarProvided', () => {
  it('returns true if envVarValue is provided', () => {
    expect(isEnvVarProvided('foo')).toBe(true);
  });

  it('returns false if envVarValue is "UNPROVIDED"', () => {
    expect(isEnvVarProvided('UNPROVIDED')).toBe(false);
  });

  it('returns false if envVarValue is undefined or null', () => {
    expect(isEnvVarProvided(undefined)).toBe(false);
    expect(isEnvVarProvided(null)).toBe(false);
  });
});
