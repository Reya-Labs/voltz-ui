import { getGasInfoFormatted } from '.';

describe('getGasInfoFormatted', () => {
  it('should return formatted gas fee and token when gas details and status are provided', () => {
    const gasDetails = {
      value: 0.00123456,
      token: 'ETH',
    };
    const status = 'success';

    const result = getGasInfoFormatted({ gasDetails, status } as never);

    expect(result.gasFeeFormatted).toEqual('0.0012');
    expect(result.gasTokenFormatted).toEqual(' ETH');
  });

  it('should return "--" when gas details and status are not provided', () => {
    const gasDetails = null;
    const status = 'idle';

    const result = getGasInfoFormatted({ gasDetails, status } as never);

    expect(result.gasFeeFormatted).toEqual('--');
    expect(result.gasTokenFormatted).toEqual('--');
  });

  it('should return "--" when status is not "success"', () => {
    const gasDetails = {
      value: 0.00123456,
      token: 'ETH',
    };
    const status = 'pending';

    const result = getGasInfoFormatted({ gasDetails, status } as never);

    expect(result.gasFeeFormatted).toEqual('--');
    expect(result.gasTokenFormatted).toEqual('--');
  });
});
