import { isUserInputMarginError } from '../../../../common';
import { getProspectiveSwapMargin } from '../getProspectiveSwapMargin';
import { getProspectiveSwapMode } from '../getProspectiveSwapMode';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';
import { validateUserInput } from '../validateUserInput';
import { validateUserInputAndUpdateSubmitButton } from './index';

// Mock the dependencies
jest.mock('../validateUserInput', () => ({
  validateUserInput: jest.fn(),
}));
jest.mock('../getProspectiveSwapMargin', () => ({
  getProspectiveSwapMargin: jest.fn(),
}));
jest.mock('../getProspectiveSwapMode', () => ({
  getProspectiveSwapMode: jest.fn(),
}));
jest.mock('../getProspectiveSwapNotional', () => ({
  getProspectiveSwapNotional: jest.fn(),
}));
jest.mock('../../../../common', () => ({
  isUserInputMarginError: jest.fn(),
}));

describe('validateUserInputAndUpdateSubmitButton', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should update the submit button state to connect-wallet if amm is null', () => {
    const state = {
      amm: null,
      walletBalance: {
        status: 'success',
        value: 1000,
      },
      walletTokenAllowance: {
        status: 'success',
        value: 500,
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            fee: 10,
            variableTokenDeltaBalance: 100,
          },
        },
      },
      userInput: {
        marginAmount: {
          value: 600,
        },
      },
      submitButton: {
        state: 'swap',
        disabled: true,
        message: {
          text: 'Almost ready',
          isError: false,
        },
      },
    };
    const expected = {
      state: 'connect-wallet',
      disabled: true,
      message: {
        text: 'Almost ready',
        isError: false,
      },
    };
    validateUserInputAndUpdateSubmitButton(state as never);
    expect(state.submitButton).toEqual(expected);
  });

  it('should update the submit button state to connect-wallet if signer is null', () => {
    const state = {
      amm: {
        signer: null,
      },
      walletBalance: {
        status: 'success',
        value: 1000,
      },
      walletTokenAllowance: {
        status: 'success',
        value: 500,
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            fee: 10,
            variableTokenDeltaBalance: 100,
          },
        },
      },
      userInput: {
        marginAmount: {
          value: 600,
        },
      },
      submitButton: {
        state: 'swap',
        disabled: true,
        message: {
          text: 'Almost ready',
          isError: false,
        },
      },
    };
    const expected = {
      state: 'connect-wallet',
      disabled: true,
      message: {
        text: 'Almost ready',
        isError: false,
      },
    };
    validateUserInputAndUpdateSubmitButton(state as never);
    expect(state.submitButton).toEqual(expected);
  });

  it('should update the submit button state to approve if margin amount needs approval', () => {
    (isUserInputMarginError as jest.Mock).mockReturnValue(false);
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(100);
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(200);
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('variable');
    (validateUserInput as jest.Mock).mockReturnValue(undefined);
    const state = {
      amm: {
        underlyingToken: {
          name: 'usdc',
          symbol: 'USDC',
        },
        signer: jest.fn(),
      },
      walletBalance: {
        status: 'success',
        value: 1000,
      },
      walletTokenAllowance: {
        status: 'success',
        value: 500,
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            fee: 10,
            variableTokenDeltaBalance: 100,
          },
        },
      },
      userInput: {
        marginAmount: {
          value: 600,
        },
      },
      submitButton: {
        state: 'swap',
        disabled: true,
        message: {
          text: 'Almost ready',
          isError: false,
        },
      },
    };

    validateUserInputAndUpdateSubmitButton(state as never);

    expect(state.submitButton).toEqual({
      state: 'approve',
      disabled: false,
      message: {
        text: 'Please approve USDC',
        isError: false,
      },
    });
  });

  it('should update the submit button state to not-enough-balance if there is insufficient balance', () => {
    (isUserInputMarginError as jest.Mock).mockReturnValue(false);
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(0);
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(200);
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('fixed');
    (validateUserInput as jest.Mock).mockReturnValue(undefined);
    const state = {
      previousPosition: {
        settlementCashflow: 50,
        margin: 20,
        fees: 30,
      },
      amm: {
        underlyingToken: {
          name: 'usdc',
          symbol: 'USDC',
        },
        signer: jest.fn(),
      },
      walletBalance: {
        status: 'success',
        value: 1000,
      },
      walletTokenAllowance: {
        status: 'success',
        value: 2000,
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            fee: 10,
            variableTokenDeltaBalance: 100,
          },
        },
      },
      userInput: {
        marginAmount: {
          value: 1500,
        },
      },
      submitButton: {
        state: 'swap',
        disabled: true,
        message: {
          text: 'Almost ready',
          isError: false,
        },
      },
    };

    validateUserInputAndUpdateSubmitButton(state as never);

    expect(state.submitButton).toEqual({
      state: 'not-enough-balance',
      disabled: true,
      message: {
        text: '',
        isError: false,
      },
    });
  });

  it('should update the submit button state to approve with a message about the required approval amount', () => {
    (isUserInputMarginError as jest.Mock).mockReturnValue(false);
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(100);
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(200);
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('variable');
    (validateUserInput as jest.Mock).mockReturnValue(undefined);
    const state = {
      amm: {
        underlyingToken: {
          name: 'usdc',
          symbol: 'USDC',
        },
        signer: jest.fn(),
      },
      walletBalance: {
        status: 'success',
        value: 1000,
      },
      walletTokenAllowance: {
        status: 'success',
        value: 400,
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            fee: 10,
            variableTokenDeltaBalance: 100,
          },
        },
      },
      userInput: {
        marginAmount: {
          value: 400,
        },
      },
      submitButton: {
        state: 'swap',
        disabled: true,
        message: {
          text: 'Almost ready',
          isError: false,
        },
      },
    };

    validateUserInputAndUpdateSubmitButton(state as never);

    expect(state.submitButton).toEqual({
      state: 'approve',
      disabled: false,
      message: {
        text: 'Please approve USDC. Approval amount must cover for both the margin and the fees.',
        isError: false,
      },
    });
  });

  it('should update the submit button state to swap if all conditions are true', () => {
    (isUserInputMarginError as jest.Mock).mockReturnValue(false);
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(100);
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(200);
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('variable');
    (validateUserInput as jest.Mock).mockReturnValue(undefined);
    const state = {
      previousPosition: {
        settlementCashflow: 100,
      },
      amm: {
        underlyingToken: {
          name: 'usdc',
          symbol: 'USDC',
        },
        signer: jest.fn(),
      },
      walletBalance: {
        status: 'success',
        value: 500,
      },
      walletTokenAllowance: {
        status: 'success',
        value: 500,
      },
      prospectiveSwap: {
        infoPostSwap: {
          status: 'success',
          value: {
            fee: 10,
            variableTokenDeltaBalance: 100,
          },
        },
      },
      userInput: {
        marginAmount: {
          value: 300,
        },
      },
      submitButton: {
        state: 'swap',
        disabled: true,
        message: {
          text: 'Almost ready',
          isError: false,
        },
      },
    };

    validateUserInputAndUpdateSubmitButton(state as never);

    expect(state.submitButton).toEqual({
      state: 'rollover',
      disabled: false,
      message: {
        text: "Token approved, let's trade",
        isError: false,
      },
    });
  });
});
