import { getRealizedPnLFromFees } from './index';

describe('getRealizedPnLFromFees', () => {
  it('should return null when position value is null', () => {
    const mockState = {
      previousPosition: null,
    };

    const result = getRealizedPnLFromFees(mockState as never);

    expect(result).toBeNull();
  });

  it('should return realizedPnLFromFeesPaid when position status is success and value is not null', () => {
    const mockRealizedPnLFromFeesPaid = 123.45;
    const mockState = {
      previousPosition: {
        realizedPnLFromFeesPaid: mockRealizedPnLFromFeesPaid,
      },
    };

    const result = getRealizedPnLFromFees(mockState as never);

    expect(result).toEqual(mockRealizedPnLFromFeesPaid);
  });
});
