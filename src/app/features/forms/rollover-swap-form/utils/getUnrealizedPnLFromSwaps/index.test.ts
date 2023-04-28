import { getUnrealizedPnLFromSwaps } from './index';

describe('getUnrealizedPnLFromSwaps', () => {
  it('should return null when position status is not success', () => {
    const mockState = {
      position: {
        status: 'error',
      },
    };

    const result = getUnrealizedPnLFromSwaps(mockState as never);

    expect(result).toBeNull();
  });

  it('should return null when position value is null', () => {
    const mockState = {
      position: {
        status: 'success',
        value: null,
      },
    };

    const result = getUnrealizedPnLFromSwaps(mockState as never);

    expect(result).toBeNull();
  });

  it('should return unrealizedPnLFromSwaps when position status is success and value is not null', () => {
    const mockUnrealizedPnLFromSwaps = 123.45;
    const mockState = {
      position: {
        status: 'success',
        value: {
          unrealizedPnLFromSwaps: mockUnrealizedPnLFromSwaps,
        },
      },
    };

    const result = getUnrealizedPnLFromSwaps(mockState as never);

    expect(result).toEqual(mockUnrealizedPnLFromSwaps);
  });
});
