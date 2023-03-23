import { isUserInputNotionalError } from './index';

describe('isUserInputNotionalError', () => {
  it('should return true when notional amount has an error', () => {
    const result = isUserInputNotionalError({
      userInput: {
        notionalAmount: {
          error: 'error!',
        },
      },
    } as never);
    expect(result).toEqual(true);
  });

  it('should return false when notional amount does not have an error', () => {
    const result = isUserInputNotionalError({
      userInput: {
        notionalAmount: {
          error: null,
        },
      },
    } as never);
    expect(result).toEqual(false);
  });
});
