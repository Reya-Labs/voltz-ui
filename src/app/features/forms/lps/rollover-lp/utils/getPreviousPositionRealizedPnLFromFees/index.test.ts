import { getPreviousPositionRealizedPnLFromFees } from './index';

describe('getPreviousPositionRealizedPnLFromFees', () => {
  it('should return null when position value is null', () => {
    const mockState = {
      previousPosition: null,
    };

    const result = getPreviousPositionRealizedPnLFromFees(mockState as never);

    expect(result).toBeNull();
  });

  it('should return realizedPnLFromFeesPaid when position status is success and value is not null', () => {
    const mockFees = 123.45;
    const mockState = {
      previousPosition: {
        fees: mockFees,
      },
    };

    const result = getPreviousPositionRealizedPnLFromFees(mockState as never);

    expect(result).toEqual(mockFees);
  });
});
