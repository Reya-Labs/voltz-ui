import { getRealizedPnLFromSwaps } from './index';

describe('getRealizedPnLFromSwaps', () => {
  it('should return null when position value is null', () => {
    const mockState = {
      previousPosition: null,
    };

    const result = getRealizedPnLFromSwaps(mockState as never);

    expect(result).toBeNull();
  });

  it('should return realizedPnLFromSwaps when position status is success and value is not null', () => {
    const mockRealizedPnLFromSwaps = 678.9;
    const mockState = {
      previousPosition: {
        realizedPnLFromSwaps: mockRealizedPnLFromSwaps,
      },
    };

    const result = getRealizedPnLFromSwaps(mockState as never);

    expect(result).toEqual(mockRealizedPnLFromSwaps);
  });
});
