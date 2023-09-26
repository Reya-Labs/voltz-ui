import { validateUserInputAndUpdateSubmitButton } from '.';

// Mock the dependencies
jest.mock('../hasExistingPosition', () => ({
  hasExistingPosition: jest.fn(),
}));
jest.mock('../validateUserInput', () => ({
  validateUserInput: jest.fn(),
}));
jest.mock('../getProspectiveSwapMode', () => ({
  getProspectiveSwapMode: jest.fn(),
}));
jest.mock('../getProspectiveSwapNotional', () => ({
  getProspectiveSwapNotional: jest.fn(),
}));
jest.mock('../../../../common', () => ({
  isUserInputMarginError: jest.fn(),
  isUserInputNotionalError: jest.fn(),
}));

describe('validateUserInputAndUpdateSubmitButton', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should update the submit button state to connect-wallet if pool is null', () => {
    const state = {
      pool: null,
      maxNotionalAvailable: {
        status: 'success',
        value: 1000,
      },
      walletTokenAllowance: {
        status: 'success',
        value: 500,
      },
      prospectiveSwap: {
        swapSimulation: {
          status: 'success',
          value: {
            fee: 10,
            variableTokenDeltaBalance: 100,
          },
        },
      },
      userInput: {
        marginAmount: {
          editMode: 'add',
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
        type: 'info',
      },
    };
    validateUserInputAndUpdateSubmitButton(state as never);
    expect(state.submitButton).toEqual(expected);
  });

  it('should update the submit button state to connect-wallet if signer is null', () => {
    const state = {
      pool: {},
      signer: null,
      maxNotionalAvailable: {
        status: 'success',
        value: 1000,
      },
      walletTokenAllowance: {
        status: 'success',
        value: 500,
      },
      prospectiveSwap: {
        swapSimulation: {
          status: 'success',
          value: {
            fee: 10,
            variableTokenDeltaBalance: 100,
          },
        },
      },
      userInput: {
        marginAmount: {
          editMode: 'add',
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
        type: 'info',
      },
    };
    validateUserInputAndUpdateSubmitButton(state as never);
    expect(state.submitButton).toEqual(expected);
  });
});
