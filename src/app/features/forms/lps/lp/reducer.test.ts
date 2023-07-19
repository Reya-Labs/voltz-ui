import { PayloadAction } from '@reduxjs/toolkit';
import { AMM, PoolLpInfo } from '@voltz-protocol/v1-sdk';

import { stringToBigFloat } from '../../../../../utilities/number';
import { checkLowLeverageNotification, formLimitAndFormatNumber } from '../../common';
import { pushPageViewEvent } from './analytics';
import {
  closeLpConfirmationFlowAction,
  closeMarginUpdateConfirmationFlowAction,
  lpFormReducer,
  openLpConfirmationFlowAction,
  openMarginUpdateConfirmationFlowAction,
  resetStateAction,
  setLeverageAction,
  setLpFormAMMAction,
  setMarginAmountAction,
  setNotionalAmountAction,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
  trackPageViewAction,
} from './reducer';
import { initialState } from './state';
import {
  approveUnderlyingTokenThunk,
  confirmLpThunk,
  confirmMarginUpdateThunk,
  getInfoPostLpThunk,
  getPoolLpInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getWalletBalanceThunk,
  setSignerAndGetPositionsForLPThunk,
} from './thunks';
jest.mock('./analytics');
jest.mock('./utils');
jest.mock('../../common');
jest.mock('../../../../../utilities/number');
jest.mock('../../../../../utilities/amm');

describe('lpFormReducer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Helper function to create a mock state for testing
  const createState = (overrides?: Partial<typeof initialState>) => {
    return {
      ...initialState,
      ...overrides,
    };
  };

  it('should handle resetStateAction', () => {
    const state = createState();

    const newState = lpFormReducer(state, resetStateAction());

    expect(newState).toEqual(initialState);
  });

  it('should handle openLpConfirmationFlowAction', () => {
    const state = createState();

    const newState = lpFormReducer(state, openLpConfirmationFlowAction());

    expect(newState.lpConfirmationFlow.step).toBe('lpConfirmation');
  });

  it('should handle closeLpConfirmationFlowAction', () => {
    const state = createState({
      lpConfirmationFlow: {
        step: 'lpConfirmation',
        error: 'Error message',
        txHash: '0x1234567890abcdef',
      },
    });

    const newState = lpFormReducer(state, closeLpConfirmationFlowAction());

    expect(newState.lpConfirmationFlow.step).toBe(null);
    expect(newState.lpConfirmationFlow.error).toBe(null);
    expect(newState.lpConfirmationFlow.txHash).toBe(null);
  });

  it('should handle openMarginUpdateConfirmationFlowAction', () => {
    const state = createState();

    const newState = lpFormReducer(state, openMarginUpdateConfirmationFlowAction());

    expect(newState.marginUpdateConfirmationFlow.step).toBe('marginUpdateConfirmation');
  });

  it('should handle closeMarginUpdateConfirmationFlowAction', () => {
    const state = createState({
      marginUpdateConfirmationFlow: {
        step: 'marginUpdateConfirmation',
        error: 'Error message',
        txHash: '0x1234567890abcdef',
      },
    });

    const newState = lpFormReducer(state, closeMarginUpdateConfirmationFlowAction());

    expect(newState.marginUpdateConfirmationFlow.step).toBe(null);
    expect(newState.marginUpdateConfirmationFlow.error).toBe(null);
    expect(newState.marginUpdateConfirmationFlow.txHash).toBe(null);
  });

  it('should handle setUserInputFixedLowerAction', () => {
    const state = createState({
      amm: {
        getNextUsableFixedRate: jest.fn().mockReturnValue(5),
      },
      userInput: {
        fixedRange: {
          lower: 1,
          upper: 10,
          updateCount: 0,
        },
      },
    } as never);

    const action: PayloadAction<{ value: number | null }> = {
      type: setUserInputFixedLowerAction.type,
      payload: { value: 5 },
    };

    const newState = lpFormReducer(state, action);

    expect(newState.userInput.fixedRange.lower).toBe(5);
    expect(newState.userInput.fixedRange.updateCount).toBe(1);
  });

  it('should handle setUserInputFixedUpperAction', () => {
    const state = createState({
      amm: {
        getNextUsableFixedRate: jest.fn().mockReturnValue(8),
      },
      userInput: {
        fixedRange: {
          lower: 1,
          upper: 10,
          updateCount: 0,
        },
      },
    } as never);

    const action: PayloadAction<{ value: number | null }> = {
      type: setUserInputFixedUpperAction.type,
      payload: { value: 8 },
    };

    const newState = lpFormReducer(state, action);

    expect(newState.userInput.fixedRange.upper).toBe(8);
    expect(newState.userInput.fixedRange.updateCount).toBe(1);
  });

  it('should handle setNotionalAmountAction', () => {
    const state = createState({
      userInput: {
        notionalAmount: {
          value: 1000,
          editMode: 'add',
        },
      },
    } as never);

    const action: PayloadAction<{
      value?: number;
      editMode?: 'add' | 'remove';
    }> = {
      type: setNotionalAmountAction.type,
      payload: { value: 2000, editMode: 'remove' },
    };

    const newState = lpFormReducer(state, action);

    expect(newState.userInput.notionalAmount.value).toBe(2000);
    expect(newState.userInput.notionalAmount.editMode).toBe('remove');
  });

  it('should handle setMarginAmountAction', () => {
    const state = createState({
      userInput: {
        marginAmount: {
          value: 1000,
          editMode: 'add',
        },
      },
    } as never);

    const action: PayloadAction<{
      value?: number;
      editMode?: 'add' | 'remove';
    }> = {
      type: setMarginAmountAction.type,
      payload: { value: 2000, editMode: 'remove' },
    };

    const newState = lpFormReducer(state, action);

    expect(newState.userInput.marginAmount.value).toBe(2000);
    expect(newState.userInput.marginAmount.editMode).toBe('remove');
  });

  it('should handle setLeverageAction when value is 0', () => {
    const state = createState({
      userInput: {
        leverage: 2,
        marginAmount: {
          value: 1000,
          editMode: 'add',
        },
      },
      showLowLeverageNotification: false,
    } as never);

    const action: PayloadAction<{ value: number }> = {
      type: setLeverageAction.type,
      payload: { value: 0 },
    };

    const newState = lpFormReducer(state, action);

    expect(newState.userInput.leverage).toBe(null);
    expect(newState.userInput.marginAmount.value).toBe(0);
    expect(newState.showLowLeverageNotification).toBe(false);
  });

  it('should handle setLeverageAction when value is not 0', () => {
    const state = createState({
      userInput: {
        leverage: null,
        marginAmount: {
          value: 0,
          editMode: 'add',
        },
      },
      showLowLeverageNotification: false,
    } as never);

    (checkLowLeverageNotification as jest.Mock).mockReturnValue(true);

    const action: PayloadAction<{ value: number }> = {
      type: setLeverageAction.type,
      payload: { value: 2 },
    };

    const newState = lpFormReducer(state, action);

    expect(newState.userInput.leverage).toBe(2);
    expect(newState.userInput.marginAmount.value).toBe(
      stringToBigFloat(formLimitAndFormatNumber(0 / 2, 'ceil')),
    );
    expect(newState.showLowLeverageNotification).toBe(true);
  });

  it('should handle setLpFormAMMAction', () => {
    const state = createState();

    const amm = {};
    const action: PayloadAction<{ amm: AMM | null }> = {
      type: setLpFormAMMAction.type,
      payload: { amm: {} },
    } as never;

    const newState = lpFormReducer(state, action);

    expect(newState.amm).toEqual(amm);
  });

  it('should handle trackPageViewAction', () => {
    const state = createState();

    const action: PayloadAction<{ isEdit: boolean; account: string }> = {
      type: trackPageViewAction.type,
      payload: { isEdit: true, account: '0x1234567890abcdef' },
    };

    lpFormReducer(state, action);

    expect(pushPageViewEvent).toHaveBeenCalledWith({ account: '0x1234567890abcdef', isEdit: true });
  });

  it('should handle getWalletBalanceThunk.pending', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: getWalletBalanceThunk.pending,
    });

    expect(newState.walletBalance.value).toBe(0);
    expect(newState.walletBalance.status).toBe('pending');
  });

  it('should handle getWalletBalanceThunk.rejected', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: getWalletBalanceThunk.rejected,
    });

    expect(newState.walletBalance.value).toBe(0);
    expect(newState.walletBalance.status).toBe('error');
  });

  it('should handle getWalletBalanceThunk.fulfilled', () => {
    const state = createState();

    const payload = 1000;
    const newState = lpFormReducer(state, {
      type: getWalletBalanceThunk.fulfilled,
      payload,
    });

    expect(newState.walletBalance.value).toBe(payload);
    expect(newState.walletBalance.status).toBe('success');
  });

  it('should handle getUnderlyingTokenAllowanceThunk.pending', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: getUnderlyingTokenAllowanceThunk.pending,
    });

    expect(newState.walletTokenAllowance.value).toBe(0);
    expect(newState.walletTokenAllowance.status).toBe('pending');
  });

  it('should handle getUnderlyingTokenAllowanceThunk.rejected', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: getUnderlyingTokenAllowanceThunk.rejected,
    });

    expect(newState.walletTokenAllowance.value).toBe(0);
    expect(newState.walletTokenAllowance.status).toBe('error');
  });

  it('should handle getUnderlyingTokenAllowanceThunk.fulfilled', () => {
    const state = createState();

    const payload = 1000;
    const newState = lpFormReducer(state, {
      type: getUnderlyingTokenAllowanceThunk.fulfilled,
      payload,
    });

    expect(newState.walletTokenAllowance.value).toBe(payload);
    expect(newState.walletTokenAllowance.status).toBe('success');
  });

  it('should handle approveUnderlyingTokenThunk.pending', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: approveUnderlyingTokenThunk.pending,
    });

    expect(newState.submitButton.state).toBe('approving');
    expect(newState.submitButton.disabled).toBe(true);
    expect(newState.submitButton.message.text).toBe('Waiting for confirmation...');
    expect(newState.submitButton.message.isError).toBe(false);
  });

  it('should handle approveUnderlyingTokenThunk.rejected', () => {
    const state = createState();

    const payload = 'Error message';

    const newState = lpFormReducer(state, {
      type: approveUnderlyingTokenThunk.rejected,
      payload: 'Error message',
    });

    expect(newState.submitButton.state).toBe('approve');
    expect(newState.submitButton.disabled).toBe(false);
    expect(newState.submitButton.message.text).toBe(payload);
    expect(newState.submitButton.message.isError).toBe(true);
  });

  it('should handle approveUnderlyingTokenThunk.fulfilled', () => {
    const state = createState();

    const payload = 1000;
    const newState = lpFormReducer(state, { type: approveUnderlyingTokenThunk.fulfilled, payload });

    expect(newState.walletTokenAllowance.value).toBe(payload);
    expect(newState.walletTokenAllowance.status).toBe('success');
  });

  it('should handle getPoolLpInfoThunk.pending', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: getPoolLpInfoThunk.pending,
    });

    expect(newState.poolLpInfo.maxLeverage).toBe(0);
    expect(newState.poolLpInfo.status).toBe('pending');
  });

  it('should handle getPoolLpInfoThunk.rejected', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: getPoolLpInfoThunk.rejected,
    });

    expect(newState.poolLpInfo.maxLeverage).toBe(0);
    expect(newState.poolLpInfo.status).toBe('error');
  });

  it('should handle getPoolLpInfoThunk.fulfilled', () => {
    const state = createState();

    const payload: PoolLpInfo = {
      maxLeverage: 5,
    };
    const newState = lpFormReducer(state, { type: getPoolLpInfoThunk.fulfilled, payload });

    expect(newState.poolLpInfo.maxLeverage).toBe(Math.floor((payload.maxLeverage * 99) / 100));
    expect(newState.poolLpInfo.status).toBe('success');
  });

  it('should handle getInfoPostLpThunk.pending', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: getInfoPostLpThunk.pending,
    });

    expect(newState.prospectiveLp.infoPostLp.value).toBe(
      initialState.prospectiveLp.infoPostLp.value,
    );
    expect(newState.prospectiveLp.infoPostLp.status).toBe('pending');
  });

  it('should handle getInfoPostLpThunk.rejected', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: getInfoPostLpThunk.rejected,
    });

    expect(newState.prospectiveLp.infoPostLp.value).toBe(
      initialState.prospectiveLp.infoPostLp.value,
    );
    expect(newState.prospectiveLp.infoPostLp.status).toBe('error');
  });

  it('should handle getInfoPostLpThunk.fulfilled with earlyReturn', () => {
    const state = createState();

    const payload = {
      infoPostLp: {
        marginRequirement: 1000,
        maxMarginWithdrawable: 500,
        gasFee: 100,
      },
      earlyReturn: true,
    };
    const newState = lpFormReducer(state, { type: getInfoPostLpThunk.fulfilled, payload });

    expect(newState.prospectiveLp.infoPostLp.value).toBe(
      initialState.prospectiveLp.infoPostLp.value,
    );
    expect(newState.prospectiveLp.infoPostLp.status).toBe('idle');
  });

  it('should handle getInfoPostLpThunk.fulfilled without earlyReturn', () => {
    const state = createState();

    const payload = {
      infoPostLp: {
        marginRequirement: 1000,
        maxMarginWithdrawable: 500,
        gasFee: 100,
      },
      earlyReturn: false,
    };
    const newState = lpFormReducer(state, { type: getInfoPostLpThunk.fulfilled, payload });

    const marginRequirementWithBuffer = (payload.infoPostLp.marginRequirement * 101) / 100;

    expect(newState.prospectiveLp.infoPostLp.value).toEqual({
      marginRequirement: marginRequirementWithBuffer,
      maxMarginWithdrawable: payload.infoPostLp.maxMarginWithdrawable,
      gasFee: payload.infoPostLp.gasFee,
    });
    expect(newState.prospectiveLp.infoPostLp.status).toBe('success');
  });

  it('should handle setSignerAndGetPositionsForLPThunk.pending', () => {
    const state = createState({
      amm: {
        signer: jest.fn(),
      },
    } as never);

    const newState = lpFormReducer(state, {
      type: setSignerAndGetPositionsForLPThunk.pending,
    });

    expect(newState.positions.value).toBe(null);
    expect(newState.positions.status).toBe('pending');
  });

  it('should handle setSignerAndGetPositionsForLPThunk.rejected', () => {
    const state = createState({
      amm: jest.fn(),
    } as never);

    const newState = lpFormReducer(state, {
      type: setSignerAndGetPositionsForLPThunk.rejected,
    });

    expect(newState.positions.value).toBe(null);
    expect(newState.positions.status).toBe('error');
  });

  it('should handle confirmLpThunk.pending', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: confirmLpThunk.pending,
    });

    expect(newState.lpConfirmationFlow.step).toBe('waitingForLpConfirmation');
    expect(newState.lpConfirmationFlow.error).toBe(null);
    expect(newState.lpConfirmationFlow.txHash).toBe(null);
  });

  it('should handle confirmLpThunk.rejected', () => {
    const state = createState();

    const payload = 'Error message';
    const newState = lpFormReducer(state, {
      type: confirmLpThunk.rejected,
      payload,
    });

    expect(newState.lpConfirmationFlow.step).toBe('lpConfirmation');
    expect(newState.lpConfirmationFlow.error).toBe(payload);
    expect(newState.lpConfirmationFlow.txHash).toBe(null);
  });

  it('should handle confirmLpThunk.fulfilled', () => {
    const state = createState();

    const payload = { transactionHash: '0x1234567890abcdef' };
    const newState = lpFormReducer(state, { type: confirmLpThunk.fulfilled, payload });

    expect(newState.lpConfirmationFlow.step).toBe('lpCompleted');
    expect(newState.lpConfirmationFlow.error).toBe(null);
    expect(newState.lpConfirmationFlow.txHash).toBe(payload.transactionHash);
  });

  it('should handle confirmMarginUpdateThunk.pending', () => {
    const state = createState();

    const newState = lpFormReducer(state, {
      type: confirmMarginUpdateThunk.pending,
    });

    expect(newState.marginUpdateConfirmationFlow.step).toBe('waitingForMarginUpdateConfirmation');
    expect(newState.marginUpdateConfirmationFlow.error).toBe(null);
    expect(newState.marginUpdateConfirmationFlow.txHash).toBe(null);
  });

  it('should handle confirmMarginUpdateThunk.rejected', () => {
    const state = createState();

    const payload = 'Error message';
    const newState = lpFormReducer(state, {
      type: confirmMarginUpdateThunk.rejected,
      payload,
    });

    expect(newState.marginUpdateConfirmationFlow.step).toBe('marginUpdateConfirmation');
    expect(newState.marginUpdateConfirmationFlow.error).toBe(payload);
    expect(newState.marginUpdateConfirmationFlow.txHash).toBe(null);
  });

  it('should handle confirmMarginUpdateThunk.fulfilled', () => {
    const state = createState();

    const payload = { transactionHash: '0x1234567890abcdef' };
    const newState = lpFormReducer(state, { type: confirmMarginUpdateThunk.fulfilled, payload });

    expect(newState.marginUpdateConfirmationFlow.step).toBe('marginUpdateCompleted');
    expect(newState.marginUpdateConfirmationFlow.error).toBe(null);
    expect(newState.marginUpdateConfirmationFlow.txHash).toBe(payload.transactionHash);
  });
});
