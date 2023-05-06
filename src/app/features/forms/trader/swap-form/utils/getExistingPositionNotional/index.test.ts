import { getExistingPositionNotional } from './index';

describe('getExistingPositionNotional', () => {
  it('should return null when position is not fetched successfully', () => {
    const result = getExistingPositionNotional({
      position: {
        status: 'notSuccess',
      },
    } as never);
    expect(result).toBeNull();
  });

  it('should return null when position is fetched but value is null', () => {
    const result = getExistingPositionNotional({
      position: {
        status: 'success',
        value: null,
      },
    } as never);
    expect(result).toBeNull();
  });

  it('should return notional value from position', () => {
    const result = getExistingPositionNotional({
      position: {
        status: 'success',
        value: {
          notional: 42,
        },
      },
    } as never);
    expect(result).toEqual(42);
  });
});
