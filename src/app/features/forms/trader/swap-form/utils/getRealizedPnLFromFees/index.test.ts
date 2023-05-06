import { getRealizedPnLFromFees } from './index';

describe('getRealizedPnLFromFees', () => {
  it('should return null when position status is not success', () => {
    const mockState = {
      position: {
        status: 'error',
      },
    };

    const result = getRealizedPnLFromFees(mockState as never);

    expect(result).toBeNull();
  });

  it('should return null when position value is null', () => {
    const mockState = {
      position: {
        status: 'success',
        value: null,
      },
    };

    const result = getRealizedPnLFromFees(mockState as never);

    expect(result).toBeNull();
  });

  it('should return realizedPnLFromFeesPaid when position status is success and value is not null', () => {
    const mockRealizedPnLFromFeesPaid = 123.45;
    const mockState = {
      position: {
        status: 'success',
        value: {
          realizedPnLFromFeesPaid: mockRealizedPnLFromFeesPaid,
        },
      },
    };

    const result = getRealizedPnLFromFees(mockState as never);

    expect(result).toEqual(mockRealizedPnLFromFeesPaid);
  });
});
