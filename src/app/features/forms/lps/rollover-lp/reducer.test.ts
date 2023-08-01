import { stringToBigFloat } from '../../../../../utilities/number';
import { checkLowLeverageNotification } from '../../common';
import {
  closeRolloverConfirmationFlowAction,
  openRolloverConfirmationFlowAction,
  resetStateAction,
  rolloverLpFormReducer,
  setLeverageAction,
  setMarginAmountAction,
  setNotionalAmountAction,
  setSignerForRolloverLpFormAction,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
} from './reducer';
import { initialState } from './state';
import {
  approveUnderlyingTokenThunk,
  confirmLpRolloverThunk,
  getInfoPostLpThunk,
  getPoolLpInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getWalletBalanceThunk,
  initializeAMMsAndPositionsForRolloverThunk,
} from './thunks';

jest.mock('./analytics');
jest.mock('./utils');
jest.mock('../../common');
jest.mock('../../../../../utilities/number');
jest.mock('../../../../../utilities/amm');
describe('rolloverLpFormReducer', () => {
  it('should return the initial state', () => {
    expect(rolloverLpFormReducer(undefined, {} as never)).toEqual(initialState);
  });

  it('should handle resetStateAction', () => {
    const action = resetStateAction();
    const state = {
      ...initialState,
      userInput: {
        ...initialState.userInput,
        notionalAmount: { value: 100 },
      },
    } as never;
    expect(rolloverLpFormReducer(state, action)).toEqual(initialState);
  });

  it('should handle setNotionalAmountAction', () => {
    const value = 1000;
    const action = setNotionalAmountAction({ value });
    const expectedState = {
      ...initialState,
      userInput: {
        ...initialState.userInput,
        notionalAmount: { ...initialState.userInput.notionalAmount, value },
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setMarginAmountAction', () => {
    const value = 500;
    const action = setMarginAmountAction({ value });
    const expectedState = {
      ...initialState,
      userInput: {
        ...initialState.userInput,
        marginAmount: { ...initialState.userInput.marginAmount, value },
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setLeverageAction', () => {
    const value = 5;
    (stringToBigFloat as jest.Mock).mockReturnValue(15);
    (checkLowLeverageNotification as jest.Mock).mockReturnValue(false);
    const action = setLeverageAction({ value, account: '0x123', changeType: 'input' });
    const expectedState = {
      ...initialState,
      userInput: {
        ...initialState.userInput,
        leverage: value,
        marginAmount: {
          ...initialState.userInput.marginAmount,
          value: 15,
        },
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setUserInputFixedLowerAction', () => {
    const value = 0.5;
    const action = setUserInputFixedLowerAction({ value });
    const state = {
      ...initialState,
      amm: {
        getNextUsableFixedRate: jest.fn().mockReturnValue(value),
      },
    };
    const expectedState = {
      ...state,
      userInput: {
        ...state.userInput,
        fixedRange: {
          ...state.userInput.fixedRange,
          lower: value,
          updateCount: state.userInput.fixedRange.updateCount + 1,
        },
      },
    };

    expect(rolloverLpFormReducer(state as never, action)).toEqual(expectedState);
  });

  it('should handle setUserInputFixedUpperAction', () => {
    const value = 0.8;
    const action = setUserInputFixedUpperAction({ value });
    const state = {
      ...initialState,
      amm: {
        getNextUsableFixedRate: jest.fn().mockReturnValue(value),
      },
    };
    const expectedState = {
      ...state,
      userInput: {
        ...state.userInput,
        fixedRange: {
          ...state.userInput.fixedRange,
          upper: value,
          updateCount: state.userInput.fixedRange.updateCount + 1,
        },
      },
    };

    expect(rolloverLpFormReducer(state as never, action)).toEqual(expectedState);
  });

  it('should handle openRolloverConfirmationFlowAction', () => {
    const action = openRolloverConfirmationFlowAction();
    const expectedState = {
      ...initialState,
      lpConfirmationFlow: {
        step: 'rolloverConfirmation',
        error: null,
        txHash: null,
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle closeRolloverConfirmationFlowAction', () => {
    const action = closeRolloverConfirmationFlowAction();
    const state = {
      ...initialState,
      lpConfirmationFlow: {
        step: 'rolloverConfirmation',
        error: 'Error message',
        txHash: '0x123456789',
      },
    } as never;
    const expectedState = {
      ...initialState,
      lpConfirmationFlow: {
        step: null,
        error: null,
        txHash: null,
      },
    };

    expect(rolloverLpFormReducer(state, action)).toEqual(expectedState);
  });

  it('should handle setSignerForRolloverLpFormAction', () => {
    const signer = { name: 'Signer' } as never;
    const action = setSignerForRolloverLpFormAction({ signer });
    const state = {
      ...initialState,
      amm: {
        signer: null,
      },
      previousAMM: {
        signer: null,
      },
    } as never;
    const expectedState = {
      ...initialState,
      amm: {
        signer,
      },
      previousAMM: {
        signer,
      },
    };

    expect(rolloverLpFormReducer(state, action)).toEqual(expectedState);
  });

  it('should handle getWalletBalanceThunk.pending', () => {
    const action = { type: getWalletBalanceThunk.pending };
    const expectedState = {
      ...initialState,
      walletBalance: {
        value: 0,
        status: 'pending',
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getWalletBalanceThunk.rejected', () => {
    const action = { type: getWalletBalanceThunk.rejected };
    const expectedState = {
      ...initialState,
      walletBalance: {
        value: 0,
        status: 'error',
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getWalletBalanceThunk.fulfilled', () => {
    const payload = 100;
    const action = { type: getWalletBalanceThunk.fulfilled, payload };
    const expectedState = {
      ...initialState,
      walletBalance: {
        value: payload,
        status: 'success',
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getUnderlyingTokenAllowanceThunk.pending', () => {
    const action = { type: getUnderlyingTokenAllowanceThunk.pending };
    const expectedState = {
      ...initialState,
      walletTokenAllowance: {
        value: 0,
        status: 'pending',
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getUnderlyingTokenAllowanceThunk.rejected', () => {
    const action = { type: getUnderlyingTokenAllowanceThunk.rejected };
    const expectedState = {
      ...initialState,
      walletTokenAllowance: {
        value: 0,
        status: 'error',
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getUnderlyingTokenAllowanceThunk.fulfilled', () => {
    const payload = 100;
    const action = { type: getUnderlyingTokenAllowanceThunk.fulfilled, payload };
    const expectedState = {
      ...initialState,
      walletTokenAllowance: {
        value: payload,
        status: 'success',
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle approveUnderlyingTokenThunk.pending', () => {
    const action = { type: approveUnderlyingTokenThunk.pending };
    const expectedState = {
      ...initialState,
      submitButton: {
        state: 'approving',
        disabled: true,
        message: {
          text: 'Waiting for confirmation...',
          type: 'info',
        },
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle approveUnderlyingTokenThunk.rejected', () => {
    const payload = 'Error message';
    const action = { type: approveUnderlyingTokenThunk.rejected, payload };
    const expectedState = {
      ...initialState,
      submitButton: {
        state: 'approve',
        disabled: false,
        message: {
          text: payload,
          type: 'error',
        },
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle approveUnderlyingTokenThunk.fulfilled', () => {
    const payload = 100;
    const action = { type: approveUnderlyingTokenThunk.fulfilled, payload };
    const expectedState = {
      ...initialState,
      walletTokenAllowance: {
        value: payload,
        status: 'success',
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getPoolLpInfoThunk.pending', () => {
    const action = { type: getPoolLpInfoThunk.pending };
    const expectedState = {
      ...initialState,
      poolLpInfo: {
        maxLeverage: 0,
        status: 'pending',
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getPoolLpInfoThunk.rejected', () => {
    const action = { type: getPoolLpInfoThunk.rejected };
    const expectedState = {
      ...initialState,
      poolLpInfo: {
        maxLeverage: 0,
        status: 'error',
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getPoolLpInfoThunk.fulfilled', () => {
    const payload = {
      maxLeverage: 10,
    };
    const action = { type: getPoolLpInfoThunk.fulfilled, payload };
    const expectedState = {
      ...initialState,
      poolLpInfo: {
        maxLeverage: 9,
        status: 'success',
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getInfoPostLpThunk.pending', () => {
    const action = { type: getInfoPostLpThunk.pending };
    const expectedState = {
      ...initialState,
      prospectiveLp: {
        ...initialState.prospectiveLp,
        infoPostLp: {
          value: initialState.prospectiveLp.infoPostLp.value,
          status: 'pending',
        },
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getInfoPostLpThunk.rejected', () => {
    const action = { type: getInfoPostLpThunk.rejected };
    const expectedState = {
      ...initialState,
      prospectiveLp: {
        ...initialState.prospectiveLp,
        infoPostLp: {
          value: initialState.prospectiveLp.infoPostLp.value,
          status: 'error',
        },
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getInfoPostLpThunk.fulfilled with earlyReturn=true', () => {
    const payload = {
      infoPostLp: null,
      earlyReturn: true,
    };
    const action = { type: getInfoPostLpThunk.fulfilled, payload };
    const expectedState = {
      ...initialState,
      prospectiveLp: {
        ...initialState.prospectiveLp,
        infoPostLp: {
          value: initialState.prospectiveLp.infoPostLp.value,
          status: 'idle',
        },
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getInfoPostLpThunk.fulfilled with earlyReturn=false', () => {
    const payload = {
      infoPostLp: {
        marginRequirement: 100,
        maxMarginWithdrawable: 1000,
        gasFee: 0.01,
      },
      earlyReturn: false,
    };
    const action = { type: getInfoPostLpThunk.fulfilled, payload };
    const expectedState = {
      ...initialState,
      prospectiveLp: {
        ...initialState.prospectiveLp,
        infoPostLp: {
          value: {
            marginRequirement: 101,
            maxMarginWithdrawable: 1000,
            gasFee: 0.01,
          },
          status: 'success',
        },
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle initializeAMMsAndPositionsForRolloverThunk.pending', () => {
    const action = { type: initializeAMMsAndPositionsForRolloverThunk.pending };
    const state = {
      ...initialState,
      amm: {},
      previousAMM: {},
    };
    const expectedState = {
      ...state,
      previousPosition: null,
      amm: {
        signer: null,
      },
      previousAMM: {
        signer: null,
      },
    };

    expect(rolloverLpFormReducer(state as never, action)).toEqual(expectedState);
  });

  it('should handle initializeAMMsAndPositionsForRolloverThunk.rejected', () => {
    const action = { type: initializeAMMsAndPositionsForRolloverThunk.rejected };
    const state = {
      ...initialState,
      amm: {},
      previousAMM: {},
    };
    const expectedState = {
      ...state,
      previousPosition: null,
      amm: {
        signer: null,
      },
      previousAMM: {
        signer: null,
      },
    };

    expect(rolloverLpFormReducer(state as never, action)).toEqual(expectedState);
  });

  it('should handle initializeAMMsAndPositionsForRolloverThunk.fulfilled', () => {
    const mockPreviousPosition = {
      name: 'Previous Position',
      fixedRateLower: { toNumber: () => 2 },
      fixedRateUpper: { toNumber: () => 5 },
    };
    const payload = {
      signer: { name: 'Signer' },
      aMM: { name: 'AMM' },
      previousPosition: mockPreviousPosition,
      previousAMM: {
        name: 'Previous AMM',
      },
    };
    const action = { type: initializeAMMsAndPositionsForRolloverThunk.fulfilled, payload };
    const state = {
      ...initialState,
      amm: {},
      previousAMM: {},
    };
    const expectedState = {
      ...state,
      amm: {
        name: 'AMM',
        signer: { name: 'Signer' },
      },
      previousAMM: {
        name: 'Previous AMM',
        signer: { name: 'Signer' },
      },
      previousPosition: mockPreviousPosition,
      userInput: {
        ...state.userInput,
        fixedRange: {
          ...state.userInput.fixedRange,
          lower: 2,
          upper: 5,
        },
      },
    };

    expect(rolloverLpFormReducer(state as never, action)).toEqual(expectedState);
  });

  it('should handle confirmLpRolloverThunk.pending', () => {
    const action = { type: confirmLpRolloverThunk.pending };
    const expectedState = {
      ...initialState,
      lpConfirmationFlow: {
        step: 'waitingForRolloverConfirmation',
        error: null,
        txHash: null,
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle confirmLpRolloverThunk.rejected', () => {
    const payload = 'Error message';
    const action = { type: confirmLpRolloverThunk.rejected, payload };
    const expectedState = {
      ...initialState,
      lpConfirmationFlow: {
        step: 'rolloverConfirmation',
        error: payload,
        txHash: null,
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle confirmLpRolloverThunk.fulfilled', () => {
    const payload = {
      transactionHash: '0x123456789',
    };
    const action = { type: confirmLpRolloverThunk.fulfilled, payload };
    const expectedState = {
      ...initialState,
      lpConfirmationFlow: {
        step: 'rolloverCompleted',
        error: null,
        txHash: payload.transactionHash,
      },
    };

    expect(rolloverLpFormReducer(initialState, action)).toEqual(expectedState);
  });
});
