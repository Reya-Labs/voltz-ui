import { formatTimestamp } from '../../../../../utilities/date';
import { formatPoolMaturity } from '.';

describe('formatPoolMaturity', () => {
  it('returns an empty string when pool is undefined', () => {
    const result = formatPoolMaturity(undefined);
    expect(result).toBe('');
  });

  it('returns an empty string when pool is null', () => {
    const result = formatPoolMaturity(null);
    expect(result).toBe('');
  });

  it('returns formatted maturity timestamp when pool is an AMM', () => {
    const pool = {
      termEndTimestampInMS: 1629139200000, // Sample timestamp
    };
    const formattedTimestamp = formatTimestamp(pool.termEndTimestampInMS);
    const result = formatPoolMaturity(pool as never);
    expect(result).toBe(formattedTimestamp);
  });
});
