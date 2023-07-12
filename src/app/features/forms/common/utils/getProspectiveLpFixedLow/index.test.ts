import { isUserInputFixedRangeError } from '../isUserInputFixedRangeError';
import { getProspectiveLpFixedLow } from '.';

jest.mock('../isUserInputFixedRangeError');
describe('getProspectiveLpFixedLow', () => {
  it('should return null if isUserInputFixedRangeError returns true', () => {
    const state = {
      userInput: {
        fixedRange: {
          lower: 100,
        },
      },
    };
    (isUserInputFixedRangeError as jest.Mock).mockReturnValueOnce(true);
    expect(getProspectiveLpFixedLow(state as never)).toBeNull();
  });

  it('should return the lower value of userInput.fixedRange if isUserInputFixedRangeError returns false', () => {
    const state = {
      userInput: {
        fixedRange: {
          lower: 100,
        },
      },
    };
    (isUserInputFixedRangeError as jest.Mock).mockReturnValueOnce(false);
    expect(getProspectiveLpFixedLow(state as never)).toBe(100);
  });
});
