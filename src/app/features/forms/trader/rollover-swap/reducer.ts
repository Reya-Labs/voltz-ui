import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, InfoPostSwapV1, PoolSwapInfo } from '@voltz-protocol/v1-sdk';
import { ContractReceipt, providers } from 'ethers';

import { getAmmProtocol } from '../../../../../utilities/amm';
import { stringToBigFloat } from '../../../../../utilities/number';
import { checkLowLeverageNotification, formLimitAndFormatNumber } from '../../common';
import { pushLeverageChangeEvent } from './analytics';
import { initialState } from './state';
import {
  approveUnderlyingTokenThunk,
  confirmSwapRolloverThunk,
  getInfoPostSwapThunk,
  getPoolSwapInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getWalletBalanceThunk,
  initializeAMMsAndPositionsForRolloverThunk,
  InitializeAMMsAndPositionsForRolloverThunkSuccess,
} from './thunks';
import {
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
  updateLeverage,
  updateLeverageOptionsAfterGetInfoPostSwap,
  updateLeverageOptionsAfterGetPoolSwapInfo,
  validateUserInputAndUpdateSubmitButton,
} from './utils';

const slice = createSlice({
  name: 'rolloverSwapForm',
  initialState,
  reducers: {
    resetStateAction: () => initialState,
    setSignerForRolloverSwapFormAction: (
      state,
      {
        payload: { signer },
      }: PayloadAction<{
        signer: providers.JsonRpcSigner | null;
      }>,
    ) => {
      if (state.amm) {
        state.amm.signer = signer;
      }
      if (state.previousAMM) {
        state.previousAMM.signer = signer;
      }
    },
    openRolloverConfirmationFlowAction: (state) => {
      state.swapConfirmationFlow.step = 'rolloverConfirmation';
    },
    closeRolloverConfirmationFlowAction: (state) => {
      state.swapConfirmationFlow = {
        step: null,
        error: null,
        txHash: null,
      };
    },
    setUserInputModeAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: 'fixed' | 'variable';
      }>,
    ) => {
      state.userInput.mode = value;
      state.prospectiveSwap.infoPostSwap = {
        value: initialState.prospectiveSwap.infoPostSwap.value,
        status: 'idle',
      };

      validateUserInputAndUpdateSubmitButton(state);
    },
    setNotionalAmountAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value?: number;
      }>,
    ) => {
      if (value !== undefined) {
        state.userInput.notionalAmount.value = value;
      }

      updateLeverage(state);
      validateUserInputAndUpdateSubmitButton(state);
    },
    setMarginAmountAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value?: number;
      }>,
    ) => {
      if (value !== undefined) {
        state.userInput.marginAmount.value = value;
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
      const prospectiveSwapNotional = getProspectiveSwapNotional(state);
      if (prospectiveSwapNotional === 0 || isNaN(value) || value === 0) {
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
          isFT: getProspectiveSwapMode(state) === 'fixed',
          changeType,
        });
      }
      state.userInput.marginAmount.value = stringToBigFloat(
        formLimitAndFormatNumber(prospectiveSwapNotional / value, 'ceil'),
      );

      validateUserInputAndUpdateSubmitButton(state);
      state.showLowLeverageNotification = checkLowLeverageNotification(state);
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
      .addCase(getPoolSwapInfoThunk.pending, (state) => {
        state.poolSwapInfo = {
          availableNotional: {
            fixed: 0,
            variable: 0,
          },
          maxLeverage: {
            fixed: 0,
            variable: 0,
          },
          status: 'pending',
        };
      })
      .addCase(getPoolSwapInfoThunk.rejected, (state) => {
        state.poolSwapInfo = {
          availableNotional: {
            fixed: 0,
            variable: 0,
          },
          maxLeverage: {
            fixed: 0,
            variable: 0,
          },
          status: 'error',
        };
      })
      .addCase(getPoolSwapInfoThunk.fulfilled, (state, { payload }) => {
        const {
          availableNotionalFixedTaker,
          availableNotionalVariableTaker,
          maxLeverageFixedTaker,
          maxLeverageVariableTaker,
        } = payload as PoolSwapInfo;
        state.poolSwapInfo = {
          availableNotional: {
            fixed: availableNotionalFixedTaker,
            variable: availableNotionalVariableTaker,
          },
          maxLeverage: {
            fixed: maxLeverageFixedTaker,
            variable: maxLeverageVariableTaker,
          },
          status: 'success',
        };
        updateLeverageOptionsAfterGetPoolSwapInfo(state);
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(getInfoPostSwapThunk.pending, (state) => {
        state.prospectiveSwap.infoPostSwap = {
          value: initialState.prospectiveSwap.infoPostSwap.value,
          status: 'pending',
        };
      })
      .addCase(getInfoPostSwapThunk.rejected, (state) => {
        state.prospectiveSwap.infoPostSwap = {
          value: initialState.prospectiveSwap.infoPostSwap.value,
          status: 'error',
        };
      })
      .addCase(getInfoPostSwapThunk.fulfilled, (state, { payload }) => {
        const { infoPostSwap, earlyReturn } = payload as {
          notionalAmount: number;
          swapMode: 'fixed' | 'variable';
          infoPostSwap: InfoPostSwapV1;
          earlyReturn: boolean;
        };

        if (earlyReturn) {
          state.prospectiveSwap.infoPostSwap = {
            value: initialState.prospectiveSwap.infoPostSwap.value,
            status: 'idle',
          };
          return;
        }

        state.prospectiveSwap.infoPostSwap = {
          value: infoPostSwap,
          status: 'success',
        };

        updateLeverageOptionsAfterGetInfoPostSwap(state);
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(initializeAMMsAndPositionsForRolloverThunk.pending, (state) => {
        state.previousPosition = null;
        if (state.amm) {
          state.amm.signer = null;
        }
        if (state.previousAMM) {
          state.previousAMM.signer = null;
        }
      })
      .addCase(initializeAMMsAndPositionsForRolloverThunk.rejected, (state) => {
        state.previousPosition = null;
        if (state.amm) {
          state.amm.signer = null;
        }
        if (state.previousAMM) {
          state.previousAMM.signer = null;
        }
      })
      .addCase(initializeAMMsAndPositionsForRolloverThunk.fulfilled, (state, { payload }) => {
        state.amm = (payload as InitializeAMMsAndPositionsForRolloverThunkSuccess).aMM;
        state.previousAMM = (
          payload as InitializeAMMsAndPositionsForRolloverThunkSuccess
        ).previousAMM;
        state.previousPosition = (
          payload as InitializeAMMsAndPositionsForRolloverThunkSuccess
        ).previousPosition;
        if (state.amm) {
          state.amm.signer = (payload as InitializeAMMsAndPositionsForRolloverThunkSuccess).signer;
        }
        if (state.previousAMM) {
          state.previousAMM.signer = (
            payload as InitializeAMMsAndPositionsForRolloverThunkSuccess
          ).signer;
        }
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(confirmSwapRolloverThunk.pending, (state) => {
        state.swapConfirmationFlow = {
          step: 'waitingForRolloverConfirmation',
          error: null,
          txHash: null,
        };
      })
      .addCase(confirmSwapRolloverThunk.rejected, (state, { payload }) => {
        state.swapConfirmationFlow = {
          step: 'rolloverConfirmation',
          error: payload as string,
          txHash: null,
        };
      })
      .addCase(confirmSwapRolloverThunk.fulfilled, (state, { payload }) => {
        state.swapConfirmationFlow = {
          step: 'rolloverCompleted',
          error: null,
          txHash: (payload as ContractReceipt).transactionHash,
        };
      });
  },
});
export const {
  resetStateAction,
  setUserInputModeAction,
  setNotionalAmountAction,
  setMarginAmountAction,
  setLeverageAction,
  openRolloverConfirmationFlowAction,
  closeRolloverConfirmationFlowAction,
  setSignerForRolloverSwapFormAction,
} = slice.actions;
export const rolloverSwapFormReducer = slice.reducer;
