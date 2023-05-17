import { validateUserInputFixedRange } from './validateUserInputFixedRange';

describe('validateUserInputFixedRange', () => {
  it('should set error message when fixedLower is equal to fixedUpper', () => {
    const state = {
      userInput: {
        fixedRange: {
          lower: 2,
          upper: 2,
          error: null,
        },
      },
    };

    validateUserInputFixedRange(state as never);

    expect(state.userInput.fixedRange.error).toEqual(
      'Fixed rate lower cannot be equal or higher than fixed upper',
    );
  });

  it('should set error message when fixedLower is higher than fixedUpper', () => {
    const state = {
      userInput: {
        fixedRange: {
          lower: 5,
          upper: 3,
          error: null,
        },
      },
    };

    validateUserInputFixedRange(state as never);

    expect(state.userInput.fixedRange.error).toEqual(
      'Fixed rate lower cannot be equal or higher than fixed upper',
    );
  });

  it('should not set an error message when fixedLower is lower than fixedUpper', () => {
    const state = {
      userInput: {
        fixedRange: {
          lower: 1,
          upper: 3,
          error: null,
        },
      },
    };

    validateUserInputFixedRange(state as never);

    expect(state.userInput.fixedRange.error).toEqual(null);
  });

  it('should not set an error message when fixedLower is null', () => {
    const state = {
      userInput: {
        fixedRange: {
          lower: null,
          upper: 3,
          error: null,
        },
      },
    };

    validateUserInputFixedRange(state as never);

    expect(state.userInput.fixedRange.error).toEqual(null);
  });

  it('should not set an error message when fixedUpper is null', () => {
    const state = {
      userInput: {
        fixedRange: {
          lower: 1,
          upper: null,
          error: null,
        },
      },
    };

    validateUserInputFixedRange(state as never);

    expect(state.userInput.fixedRange.error).toEqual(null);
  });
});
