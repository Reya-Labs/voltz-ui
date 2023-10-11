import { getMaxAvailableNotional } from '.';

describe('getAvailableNotional', () => {
  it('should return available notional', () => {
    const result = getMaxAvailableNotional({
      maxNotionalAvailable: {
        value: 100,
        status: 'success',
      },
    } as never);

    expect(result).toEqual(100);
  });
});
