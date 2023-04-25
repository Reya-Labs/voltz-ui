import { roundIntegerNumber, stringToBigFloat } from '../../../../../../utilities/number';
import { calculateLeverageOptions } from '.';

// Mock the roundIntegerNumber and stringToBigFloat functions
jest.mock('../../../../../../utilities/number', () => ({
  roundIntegerNumber: jest.fn(),
  stringToBigFloat: jest.fn(),
}));

describe('calculateLeverageOptions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns an array of zeros when maxLeverage is "--"', () => {
    expect(calculateLeverageOptions('--')).toEqual([0, 0, 0]);
  });

  it('calculates the correct leverage options when maxLeverage is not "--"', () => {
    // Mock the roundIntegerNumber and stringToBigFloat functions to return the expected values
    (roundIntegerNumber as jest.Mock).mockReturnValueOnce(123);
    (stringToBigFloat as jest.Mock).mockReturnValueOnce(456);

    expect(calculateLeverageOptions('789')).toEqual([30, 61, 123]);

    // Check that roundIntegerNumber and stringToBigFloat were called with the expected arguments
    expect(roundIntegerNumber).toHaveBeenCalledWith(456, 1);
    expect(stringToBigFloat).toHaveBeenCalledWith('789');
  });
});
