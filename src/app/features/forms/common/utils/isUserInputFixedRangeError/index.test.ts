import { isUserInputFixedRangeError } from '.';

describe('isUserInputFixedRangeError', () => {
  it('should return false when userInput.fixedRange.error is null', () => {
    const state = { userInput: { fixedRange: { error: null } } };
    const result = isUserInputFixedRangeError(state as never);
    expect(result).toEqual(false);
  });

  it('should return true when userInput.fixedRange.error is not null', () => {
    const error = new Error('Invalid fixed range');
    const state = { userInput: { fixedRange: { error } } };
    const result = isUserInputFixedRangeError(state as never);
    expect(result).toEqual(true);
  });
});
