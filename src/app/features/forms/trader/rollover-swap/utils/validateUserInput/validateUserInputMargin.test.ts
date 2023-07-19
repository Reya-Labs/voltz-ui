import { isUserInputNotionalError } from '../../../../common';
import { getAvailableMargin } from '../getAvailableMargin';
import { validateUserInputMargin } from './validateUserInputMargin';

jest.mock('../getAvailableMargin');
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
          value: availableMargin + 1,
          error: null,
        },
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            marginRequirement: 100,
          },
        },
      },
    };
    (getAvailableMargin as jest.Mock).mockReturnValue(availableMargin);
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);

    validateUserInputMargin(state as never);

    // Expect that an error is set
    expect(state.userInput.marginAmount.error).toBe('WLT');
  });

  it('should set an error if margin amount is lower than required in add mode after swap', () => {
    const state = {
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            marginRequirement: 100,
          },
        },
      },
      userInput: {
        marginAmount: {
          value: 99,
          error: null,
        },
      },
    };
    (getAvailableMargin as jest.Mock).mockReturnValue(null);
    (isUserInputNotionalError as jest.Mock).mockReturnValue(false);

    validateUserInputMargin(state as never);

    expect(state.userInput.marginAmount.error).toBe('Margin too low. Additional margin required:');
  });
});
