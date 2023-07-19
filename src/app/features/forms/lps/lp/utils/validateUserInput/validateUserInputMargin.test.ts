import { isUserInputNotionalError } from '../../../../common';
import { getAvailableMargin } from '../getAvailableMargin';
import { hasExistingPosition } from '../hasExistingPosition';
import { validateUserInputMargin } from './validateUserInputMargin';

jest.mock('../getAvailableMargin');
jest.mock('../hasExistingPosition');
jest.mock('../../../../common', () => ({
  isUserInputNotionalError: jest.fn(),
}));

describe('validateUserInputMargin', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should set an error if margin amount is greater than available margin in add mode', () => {
    const availableMargin = 100;
    const state = {
      userInput: {
        marginAmount: {
          editMode: 'add',
          value: availableMargin + 1,
          error: null,
        },
      },
      prospectiveLp: {
        infoPostLp: {
          status: 'success',
          value: {
            marginRequirement: 100,
          },
        },
      },
    };
    (getAvailableMargin as jest.Mock).mockReturnValue(availableMargin);
    (hasExistingPosition as jest.Mock).mockReturnValue(false);
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);

    validateUserInputMargin(state as never);

    // Expect that an error is set
    expect(state.userInput.marginAmount.error).toBe('WLT');
  });

  it('should set an error if margin amount is lower than required in add mode after swap', () => {
    const state = {
      prospectiveLp: {
        infoPostLp: {
          status: 'success',
          value: {
            marginRequirement: 100,
          },
        },
      },
      userInput: {
        marginAmount: {
          editMode: 'add',
          value: 99,
          error: null,
        },
      },
    };
    (getAvailableMargin as jest.Mock).mockReturnValue(null);
    (hasExistingPosition as jest.Mock).mockReturnValue(false);
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);

    validateUserInputMargin(state as never);

    expect(state.userInput.marginAmount.error).toBe('Margin too low. Additional margin required:');
  });

  it('should set an error if margin amount is greater than available margin in remove mode with existing position', () => {
    const availableMargin = 100;
    const state = {
      userInput: {
        marginAmount: {
          editMode: 'remove',
          value: availableMargin + 1,
          error: null,
        },
      },
      prospectiveLp: {
        infoPostLp: {
          status: 'idle',
          value: {
            marginRequirement: 0,
            maxMarginWithdrawable: 0,
            averageFixedRate: 0,
            variableTokenDeltaBalance: 0,
            fee: 0,
            gasFeeETH: 0,
          },
        },
      },
    };
    (getAvailableMargin as jest.Mock).mockReturnValue(availableMargin);
    (hasExistingPosition as jest.Mock).mockReturnValue(true);
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);

    validateUserInputMargin(state as never);

    expect(state.userInput.marginAmount.error).toBe('Not enough margin. Available margin:');
  });

  it('should set an error if margin amount is zero and additional margin is required in remove mode with existing position', () => {
    const marginRequirement = 100;
    const state = {
      prospectiveLp: {
        infoPostLp: {
          status: 'success',
          value: {
            marginRequirement: marginRequirement,
          },
        },
      },
      userInput: {
        marginAmount: {
          editMode: 'remove',
          value: 0,
          error: null,
        },
      },
    };
    (getAvailableMargin as jest.Mock).mockReturnValue(0);
    (hasExistingPosition as jest.Mock).mockReturnValue(true);
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);

    validateUserInputMargin(state as never);

    expect(state.userInput.marginAmount.error).toBe('You must add margin. Available margin:');
  });
});
