import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, InfoPostLp, PoolLpInfo } from '@voltz-protocol/v1-sdk';
import { ContractReceipt } from 'ethers';

import { getAmmProtocol } from '../../../../../utilities/amm';
import { stringToBigFloat } from '../../../../../utilities/number';
import { checkLowLeverageNotification, formLimitAndFormatNumber } from '../../common';
import { pushLeverageChangeEvent, pushPageViewEvent } from './analytics';
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
  SetSignerAndGetPositionsForLPThunkSuccess,
} from './thunks';
import {
  getProspectiveLpNotional,
  resetNotionalAndMarginEditMode,
  updateLeverage,
  updateLeverageOptionsAfterGetInfoPostLp,
  updateLeverageOptionsAfterGetPoolLpInfo,
  updateSelectedPosition,
  validateUserInputAndUpdateSubmitButton,
} from './utils';

const slice = createSlice({
  name: 'lpForm',
  initialState,
  reducers: {
    resetStateAction: () => initialState,
    openLpConfirmationFlowAction: (state) => {
      state.lpConfirmationFlow.step = 'lpConfirmation';
    },
    closeLpConfirmationFlowAction: (state) => {
      state.lpConfirmationFlow = {
        step: null,
        error: null,
        txHash: null,
      };
    },
    openMarginUpdateConfirmationFlowAction: (state) => {
      state.marginUpdateConfirmationFlow.step = 'marginUpdateConfirmation';
    },
    closeMarginUpdateConfirmationFlowAction: (state) => {
      state.marginUpdateConfirmationFlow = {
        step: null,
        error: null,
        txHash: null,
      };
    },
    setUserInputFixedLowerAction: (
      // the current state of the lp-form slice of the redux store (defined in this file) -> we extended the type
      state,
      {
        // what you send from the frontend world with type PayloadAction and the value can be a number
        payload: { value },
      }: PayloadAction<{
        value: number | null;
      }>,
    ) => {
      const amm = state.amm;

      if (!amm) {
        return;
      }

      let nextFixedRateLowerNumber: number | null = null;
      if (value !== null) {
        nextFixedRateLowerNumber = amm.getNextUsableFixedRate(value, 0);
      }

      state.userInput.fixedRange.lower = nextFixedRateLowerNumber;
      state.userInput.fixedRange.updateCount = state.userInput.fixedRange.updateCount + 1;
      updateSelectedPosition(state);
      validateUserInputAndUpdateSubmitButton(state);
      resetNotionalAndMarginEditMode(state);
    },
    setUserInputFixedUpperAction: (
      // the current state of the lp-form slice of the redux store (defined in this file) -> we extended the type
      state,
      {
        // what you send from the frontend world with type PayloadAction and the value can be a number
        payload: { value },
      }: PayloadAction<{
        value: number | null;
      }>,
    ) => {
      const amm = state.amm;

      if (!amm) {
        return;
      }

      let nextFixedRateUpperNumber: number | null = null;
      if (value !== null) {
        nextFixedRateUpperNumber = amm.getNextUsableFixedRate(value, 0);
      }

      state.userInput.fixedRange.upper = nextFixedRateUpperNumber;
      state.userInput.fixedRange.updateCount = state.userInput.fixedRange.updateCount + 1;
      updateSelectedPosition(state);
      validateUserInputAndUpdateSubmitButton(state);
      resetNotionalAndMarginEditMode(state);
    },
    setNotionalAmountAction: (
      state,
      {
        payload: { value, editMode },
      }: PayloadAction<{
        value?: number;
        editMode?: 'add' | 'remove';
      }>,
    ) => {
      if (value !== undefined || editMode !== undefined) {
        if (value !== undefined) {
          state.userInput.notionalAmount.value = value;
        }

        if (editMode !== undefined) {
          state.userInput.notionalAmount.editMode = editMode;
        }

        updateLeverage(state);
        validateUserInputAndUpdateSubmitButton(state);
      }
    },
    resetInfoPostLpAction: (state) => {
      state.prospectiveLp.infoPostLp = {
        ...initialState.prospectiveLp.infoPostLp,
      };
    },
    setMarginAmountAction: (
      state,
      {
        payload: { value, editMode },
      }: PayloadAction<{
        value?: number;
        editMode?: 'add' | 'remove';
      }>,
    ) => {
      if (value !== undefined) {
        state.userInput.marginAmount.value = value;
      }

      if (editMode !== undefined) {
        state.userInput.marginAmount.editMode = editMode;
      }

      updateLeverage(state);
      validateUserInputAndUpdateSubmitButton(state);
    },
    setLeverageAction: (
      state,
      {
        payload: { value, account, changeType },
      }: PayloadAction<{
        value: number;
        account: string;
        changeType: 'button' | 'input';
      }>,
    ) => {
      if (getProspectiveLpNotional(state) === 0 || isNaN(value) || value === 0) {
        state.userInput.leverage = null;
        state.userInput.marginAmount.value = 0;
        validateUserInputAndUpdateSubmitButton(state);
        return;
      }

      state.userInput.leverage = value;
      if (!isNaN(value)) {
        pushLeverageChangeEvent({
          leverage: value,
          account,
          pool: getAmmProtocol(state.amm as AMM),
          changeType,
        });
      }
      state.userInput.marginAmount.value = stringToBigFloat(
        formLimitAndFormatNumber(getProspectiveLpNotional(state) / value, 'ceil'),
      );

      validateUserInputAndUpdateSubmitButton(state);
      state.showLowLeverageNotification = checkLowLeverageNotification(state);
    },
    setLpFormAMMAction: (
      state,
      {
        payload: { amm },
      }: PayloadAction<{
        amm: AMM | null;
      }>,
    ) => {
      state.amm = amm;
    },
    trackPageViewAction: (
      state,
      {
        payload: { isEdit, account },
      }: PayloadAction<{
        isEdit: boolean;
        account: string;
      }>,
    ) => {
      pushPageViewEvent({ account, isEdit });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalletBalanceThunk.pending, (state) => {
        state.walletBalance = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getWalletBalanceThunk.rejected, (state) => {
        state.walletBalance = {
          value: 0,
          status: 'error',
        };
      })
      .addCase(getWalletBalanceThunk.fulfilled, (state, { payload }) => {
        state.walletBalance = {
          value: payload as number,
          status: 'success',
        };
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(getUnderlyingTokenAllowanceThunk.pending, (state) => {
        state.walletTokenAllowance = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getUnderlyingTokenAllowanceThunk.rejected, (state) => {
        state.walletTokenAllowance = {
          value: 0,
          status: 'error',
        };
      })
      .addCase(getUnderlyingTokenAllowanceThunk.fulfilled, (state, { payload }) => {
        state.walletTokenAllowance = {
          value: payload as number,
          status: 'success',
        };
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(approveUnderlyingTokenThunk.pending, (state) => {
        state.submitButton = {
          state: 'approving',
          disabled: true,
          message: {
            text: 'Waiting for confirmation...',
            isError: false,
          },
        };
      })
      .addCase(approveUnderlyingTokenThunk.rejected, (state, { payload }) => {
        state.submitButton = {
          state: 'approve',
          disabled: false,
          message: {
            text: payload as string,
            isError: true,
          },
        };
      })
      .addCase(approveUnderlyingTokenThunk.fulfilled, (state, { payload }) => {
        state.walletTokenAllowance = {
          value: payload as number,
          status: 'success',
        };
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(getPoolLpInfoThunk.pending, (state) => {
        state.poolLpInfo = {
          // note max leverage is a function of the fixed rate range selected by the lp
          maxLeverage: 0,
          status: 'pending',
        };
      })
      .addCase(getPoolLpInfoThunk.rejected, (state) => {
        state.poolLpInfo = {
          maxLeverage: 0,
          status: 'error',
        };
      })
      .addCase(getPoolLpInfoThunk.fulfilled, (state, { payload }) => {
        let { maxLeverage } = payload as PoolLpInfo;
        maxLeverage = Math.floor((maxLeverage * 99) / 100);
        state.poolLpInfo = {
          maxLeverage: maxLeverage,
          status: 'success',
        };
        updateLeverageOptionsAfterGetPoolLpInfo(state);
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(getInfoPostLpThunk.pending, (state) => {
        state.prospectiveLp.infoPostLp = {
          value: initialState.prospectiveLp.infoPostLp.value,
          status: 'pending',
        };
      })
      .addCase(getInfoPostLpThunk.rejected, (state) => {
        state.prospectiveLp.infoPostLp = {
          value: initialState.prospectiveLp.infoPostLp.value,
          status: 'error',
        };
      })
      .addCase(getInfoPostLpThunk.fulfilled, (state, { payload }) => {
        const { infoPostLp, earlyReturn } = payload as {
          infoPostLp: InfoPostLp;
          earlyReturn: boolean;
        };

        if (earlyReturn) {
          state.prospectiveLp.infoPostLp = {
            value: initialState.prospectiveLp.infoPostLp.value,
            status: 'idle',
          };
          return;
        }

        const marginRequirementWithBuffer: number = (infoPostLp.marginRequirement * 101) / 100;

        state.prospectiveLp.infoPostLp = {
          value: {
            marginRequirement: marginRequirementWithBuffer,
            maxMarginWithdrawable: infoPostLp.maxMarginWithdrawable,
            gasFee: infoPostLp.gasFee,
          },
          status: 'success',
        };

        updateLeverageOptionsAfterGetInfoPostLp(state);
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(setSignerAndGetPositionsForLPThunk.pending, (state) => {
        if (state.amm === null) {
          return;
        }
        state.positions.value = null;
        state.positions.status = 'pending';
        state.amm.signer = null;
      })
      .addCase(setSignerAndGetPositionsForLPThunk.rejected, (state) => {
        if (state.amm === null) {
          return;
        }
        state.positions.value = null;
        state.positions.status = 'error';
        state.amm.signer = null;
      })
      .addCase(setSignerAndGetPositionsForLPThunk.fulfilled, (state, { payload }) => {
        if (state.amm === null) {
          return;
        }
        state.positions.value = (payload as SetSignerAndGetPositionsForLPThunkSuccess).positions;
        state.positions.status = 'success';
        state.amm.signer = (payload as SetSignerAndGetPositionsForLPThunkSuccess).signer;
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(confirmLpThunk.pending, (state) => {
        state.lpConfirmationFlow = {
          step: 'waitingForLpConfirmation',
          error: null,
          txHash: null,
        };
      })
      .addCase(confirmLpThunk.rejected, (state, { payload }) => {
        state.lpConfirmationFlow = {
          step: 'lpConfirmation',
          error: payload as string,
          txHash: null,
        };
      })
      .addCase(confirmLpThunk.fulfilled, (state, { payload }) => {
        state.lpConfirmationFlow = {
          step: 'lpCompleted',
          error: null,
          txHash: (payload as ContractReceipt).transactionHash,
        };
      })
      .addCase(confirmMarginUpdateThunk.pending, (state) => {
        state.marginUpdateConfirmationFlow = {
          step: 'waitingForMarginUpdateConfirmation',
          error: null,
          txHash: null,
        };
      })
      .addCase(confirmMarginUpdateThunk.rejected, (state, { payload }) => {
        state.marginUpdateConfirmationFlow = {
          step: 'marginUpdateConfirmation',
          error: payload as string,
          txHash: null,
        };
      })
      .addCase(confirmMarginUpdateThunk.fulfilled, (state, { payload }) => {
        state.marginUpdateConfirmationFlow = {
          step: 'marginUpdateCompleted',
          error: null,
          txHash: (payload as ContractReceipt).transactionHash,
        };
      });
  },
});
export const {
  resetStateAction,
  setLpFormAMMAction,
  setNotionalAmountAction,
  setMarginAmountAction,
  setLeverageAction,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
  openLpConfirmationFlowAction,
  closeLpConfirmationFlowAction,
  openMarginUpdateConfirmationFlowAction,
  closeMarginUpdateConfirmationFlowAction,
  trackPageViewAction,
  resetInfoPostLpAction,
} = slice.actions;
export const lpFormReducer = slice.reducer;
