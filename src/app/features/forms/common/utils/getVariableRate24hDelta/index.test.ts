import { formatNumber, stringToBigFloat } from '../../../../../../utilities/number';
import { getVariableRate24hDelta } from '.';

jest.mock('../../../../../../utilities/number');

describe('getVariableRate24hDelta', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('calls formatNumber and stringToBigFloat with the correct arguments', () => {
    const amm = {
      variableApy: 150,
      variableApy24Ago: 100,
    };
    (formatNumber as jest.Mock).mockReturnValueOnce('50');
    getVariableRate24hDelta(amm as never);

    expect(formatNumber).toHaveBeenCalledWith(50, 0, 3);
    expect(stringToBigFloat).toHaveBeenCalledWith('50');
  });

  it('returns undefined if amm is null', () => {
    expect(getVariableRate24hDelta(null as never)).toBeUndefined();
  });

  it('returns the correct value', () => {
    (formatNumber as jest.Mock).mockReturnValueOnce('50');
    (stringToBigFloat as jest.Mock).mockReturnValueOnce(50);

    const amm = {
      variableApy: 150,
      variableApy24Ago: 100,
    };

    expect(getVariableRate24hDelta(amm as never)).toEqual(50);
  });
});
