import { formatUnderlyingTokenName } from '.';

describe('formatUnderlyingTokenName', () => {
  it('returns an empty string when pool is undefined', () => {
    const result = formatUnderlyingTokenName(undefined);
    expect(result).toBe('');
  });

  it('returns an empty string when pool is null', () => {
    const result = formatUnderlyingTokenName(null);
    expect(result).toBe('');
  });

  it('returns formatted maturity timestamp when pool is an AMM', () => {
    const pool = {
      underlyingToken: { name: 'eth' },
    };
    const result = formatUnderlyingTokenName(pool as never);
    expect(result).toBe(' ETH');
  });
});
