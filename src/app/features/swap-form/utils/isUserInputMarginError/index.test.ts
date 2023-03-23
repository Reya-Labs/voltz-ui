import { isUserInputMarginError } from './index';

describe('isUserInputMarginError', () => {
  it('should return true when margin amount has an error', () => {
    const result = isUserInputMarginError({
      userInput: {
        marginAmount: {
          error: 'error!',
        },
      },
    } as never);
    expect(result).toEqual(true);
  });

  it('should return false when margin amount does not have an error', () => {
    const result = isUserInputMarginError({
      userInput: {
        marginAmount: {
          error: null,
        },
      },
    } as never);
    expect(result).toEqual(false);
  });
});
