import { getVariableRate } from '.';

describe('getVariableRate', () => {
  it('should return null when variableRate status is not success', () => {
    const mockState = {
      amm: null,
    };

    const result = getVariableRate(mockState as never);

    expect(result).toBeNull();
  });

  it('should return the variableRate value when variableRate status is success', () => {
    const mockVariableRate = 0.0123;
    const mockState = {
      amm: {
        variableApy: mockVariableRate,
      },
    };

    const result = getVariableRate(mockState as never);

    expect(result).toEqual(mockVariableRate);
  });
});
