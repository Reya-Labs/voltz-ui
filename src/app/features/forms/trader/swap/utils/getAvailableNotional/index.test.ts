import { getAvailableNotional } from '.';

describe('getAvailableNotional', () => {
  it('should return available notional', () => {
    const result = getAvailableNotional({
      maxNotionalAvailable: {
        value: 100,
        status: 'success',
      },
    } as never);

    expect(result).toEqual(100);
  });
});
