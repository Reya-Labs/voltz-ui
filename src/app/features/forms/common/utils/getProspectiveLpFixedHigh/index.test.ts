import { isUserInputFixedRangeError } from '../isUserInputFixedRangeError';
import { getProspectiveLpFixedHigh } from '.';

jest.mock('../isUserInputFixedRangeError');
describe('getProspectiveLpFixedHigh', () => {
  it('should return null if isUserInputFixedRangeError returns true', () => {
    const state = {
      userInput: {
        fixedRange: {
          upper: 100,
        },
      },
    };
    (isUserInputFixedRangeError as jest.Mock).mockReturnValueOnce(true);
    expect(getProspectiveLpFixedHigh(state as never)).toBeNull();
  });

  it('should return the upper value of userInput.fixedRange if isUserInputFixedRangeError returns false', () => {
    const state = {
      userInput: {
        fixedRange: {
          upper: 100,
        },
      },
    };
    (isUserInputFixedRangeError as jest.Mock).mockReturnValueOnce(false);
    expect(getProspectiveLpFixedHigh(state as never)).toBe(100);
  });
});
