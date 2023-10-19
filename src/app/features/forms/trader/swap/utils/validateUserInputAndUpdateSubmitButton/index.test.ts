import { validateUserInputAndUpdateSubmitButton } from '.';

// Mock the dependencies
jest.mock('../validateUserInput');
jest.mock('../getProspectiveSwapMode');
jest.mock('../getProspectiveSwapNotional');
jest.mock('../../../../common');

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
        notionalAmount: {
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
        notionalAmount: {
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
