import { getRealizedPnLFromSwaps } from './index';

describe('getRealizedPnLFromSwaps', () => {
  it('should return null when position status is not success', () => {
    const mockState = {
      position: {
        status: 'error',
      },
    };

    const result = getRealizedPnLFromSwaps(mockState as never);

    expect(result).toBeNull();
  });

  it('should return null when position value is null', () => {
    const mockState = {
      position: {
        status: 'success',
        value: null,
      },
    };

    const result = getRealizedPnLFromSwaps(mockState as never);

    expect(result).toBeNull();
  });

  it('should return realizedPnLFromSwaps when position status is success and value is not null', () => {
    const mockRealizedPnLFromSwaps = 678.9;
    const mockState = {
      position: {
        status: 'success',
        value: {
          realizedPnLFromSwaps: mockRealizedPnLFromSwaps,
        },
      },
    };

    const result = getRealizedPnLFromSwaps(mockState as never);

    expect(result).toEqual(mockRealizedPnLFromSwaps);
  });
});
