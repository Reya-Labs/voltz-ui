import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SimulateSwapMarginAccountResult } from '@voltz-protocol/sdk-v2';
import { ContractReceipt, providers } from 'ethers';

import { V2Pool } from '../../../aMMs';
import { MarginAccountForSwapLP } from '../../../margin-accounts-for-swap-lp';
import { initialState } from './state';
import {
  approveTokenForPeripheryThunk,
  AvailableAmountForMarginAccountDeposit,
  depositAndSwapThunk,
  fetchAvailableAmountsToDepositForMarginAccountThunk,
  getMaxNotionalAvailableThunk,
  getTokenAllowanceForPeripheryThunk,
  simulateSwapThunk,
  swapThunk,
} from './thunks';
import { validateUserInputAndUpdateSubmitButton } from './utils';

const slice = createSlice({
  name: 'swapForm',
  initialState,
  reducers: {
    resetStateAction: () => {
      validateUserInputAndUpdateSubmitButton(initialState);
      return initialState;
    },
    openSwapConfirmationFlowAction: (state) => {
      state.swapConfirmationFlow.step = 'swapConfirmation';
    },
    closeSwapConfirmationFlowAction: (state) => {
      state.swapConfirmationFlow = {
        step: null,
        error: null,
        txHash: null,
      };
    },
    openDepositAndSwapConfirmationFlowAction: (state) => {
      state.depositAndSwapConfirmationFlow.step = 'depositAndSwapConfirmation';
    },
    closeDepositAndSwapConfirmationFlowAction: (state) => {
      state.depositAndSwapConfirmationFlow = {
        ...initialState.depositAndSwapConfirmationFlow,
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
      state.prospectiveSwap.swapSimulation = {
        value: initialState.prospectiveSwap.swapSimulation.value,
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
      validateUserInputAndUpdateSubmitButton(state);
    },
    setSwapFormPoolAction: (
      state,
      {
        payload: { pool },
      }: PayloadAction<{
        pool: V2Pool | null;
      }>,
    ) => {
      state.pool = pool;
      validateUserInputAndUpdateSubmitButton(state);
    },
    setSwapFormMarginAccountAction: (
      state,
      {
        payload: { marginAccount },
      }: PayloadAction<{
        marginAccount: MarginAccountForSwapLP | null;
      }>,
    ) => {
      state.marginAccount = marginAccount;
      validateUserInputAndUpdateSubmitButton(state);
    },
    setSwapFormSignerAction: (
      state,
      {
        payload: { signer },
      }: PayloadAction<{
        signer: providers.JsonRpcSigner | null;
      }>,
    ) => {
      state.signer = signer;
      validateUserInputAndUpdateSubmitButton(state);
    },
    // TODO: FB evaluate before launch - refactor potentially
    marginAmountDepositFlowValueChangeAction: (
      state,
      {
        payload: { value, maxAmount, maxAmountUSD, token },
      }: PayloadAction<{
        value: number;
        maxAmount?: number;
        maxAmountUSD?: number;
        token: AvailableAmountForMarginAccountDeposit['token'];
      }>,
    ) => {
      state.depositAndSwapConfirmationFlow.userInput.amount = value;
      if (maxAmount !== undefined) {
        state.depositAndSwapConfirmationFlow.userInput.maxAmount = maxAmount;
      }
      if (maxAmountUSD !== undefined) {
        state.depositAndSwapConfirmationFlow.userInput.maxAmountUSD = maxAmountUSD;
      }
      if (token) {
        state.depositAndSwapConfirmationFlow.userInput.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMaxNotionalAvailableThunk.pending, (state) => {
        state.maxNotionalAvailable = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getMaxNotionalAvailableThunk.rejected, (state) => {
        state.maxNotionalAvailable = {
          value: 0,
          status: 'error',
        };
      })
      .addCase(getMaxNotionalAvailableThunk.fulfilled, (state, { payload }) => {
        state.maxNotionalAvailable = {
          value: payload as number,
          status: 'success',
        };
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(simulateSwapThunk.pending, (state) => {
        state.prospectiveSwap.swapSimulation = {
          ...initialState.prospectiveSwap.swapSimulation,
          value: initialState.prospectiveSwap.swapSimulation.value,
          status: 'pending',
        };
      })
      .addCase(simulateSwapThunk.rejected, (state) => {
        state.prospectiveSwap.swapSimulation = {
          value: initialState.prospectiveSwap.swapSimulation.value,
          status: 'error',
        };
      })
      .addCase(simulateSwapThunk.fulfilled, (state, { payload }) => {
        const { infoPostSwap, earlyReturn } = payload as {
          notionalAmount: number;
          swapMode: 'fixed' | 'variable';
          infoPostSwap: SimulateSwapMarginAccountResult;
          earlyReturn: boolean;
        };

        if (earlyReturn) {
          state.prospectiveSwap.swapSimulation = {
            value: initialState.prospectiveSwap.swapSimulation.value,
            status: 'idle',
          };
          return;
        }

        state.prospectiveSwap.swapSimulation = {
          value: infoPostSwap,
          status: 'success',
        };

        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(swapThunk.pending, (state) => {
        state.swapConfirmationFlow = {
          step: 'waitingForSwapConfirmation',
          error: null,
          txHash: null,
        };
      })
      .addCase(swapThunk.rejected, (state, { payload }) => {
        state.swapConfirmationFlow = {
          step: 'swapConfirmation',
          error: payload as string,
          txHash: null,
        };
      })
      .addCase(swapThunk.fulfilled, (state, { payload }) => {
        state.swapConfirmationFlow = {
          step: 'swapCompleted',
          error: null,
          txHash: (payload as ContractReceipt).transactionHash,
        };
      })
      .addCase(depositAndSwapThunk.pending, (state) => {
        state.depositAndSwapConfirmationFlow.step = 'waitingForDepositAndSwapConfirmation';
        state.depositAndSwapConfirmationFlow.error = null;
        state.depositAndSwapConfirmationFlow.txHash = null;
      })
      .addCase(depositAndSwapThunk.rejected, (state, { payload }) => {
        state.depositAndSwapConfirmationFlow.step = 'depositAndSwapConfirmation';
        state.depositAndSwapConfirmationFlow.error = payload as string;
        state.depositAndSwapConfirmationFlow.txHash = null;
      })
      .addCase(depositAndSwapThunk.fulfilled, (state, { payload }) => {
        state.depositAndSwapConfirmationFlow.step = 'depositAndSwapCompleted';
        state.depositAndSwapConfirmationFlow.error = null;
        state.depositAndSwapConfirmationFlow.txHash = (payload as ContractReceipt).transactionHash;
      })
      .addCase(fetchAvailableAmountsToDepositForMarginAccountThunk.pending, (state) => {
        state.depositAndSwapConfirmationFlow.availableAmountsLoadedState = 'pending';
        state.depositAndSwapConfirmationFlow.availableAmounts = [];
      })
      .addCase(fetchAvailableAmountsToDepositForMarginAccountThunk.rejected, (state) => {
        state.depositAndSwapConfirmationFlow.availableAmountsLoadedState = 'failed';
        state.depositAndSwapConfirmationFlow.availableAmounts = [];
      })
      .addCase(
        fetchAvailableAmountsToDepositForMarginAccountThunk.fulfilled,
        (state, { payload }) => {
          const availableAmounts = payload as AvailableAmountForMarginAccountDeposit[];
          state.depositAndSwapConfirmationFlow.availableAmountsLoadedState = 'succeeded';
          state.depositAndSwapConfirmationFlow.availableAmounts = availableAmounts;
          if (availableAmounts.length > 0) {
            const firstAvailableAmount = availableAmounts[0];
            state.depositAndSwapConfirmationFlow.userInput.token = firstAvailableAmount.token;
            state.depositAndSwapConfirmationFlow.userInput.maxAmount = firstAvailableAmount.value;
            state.depositAndSwapConfirmationFlow.userInput.maxAmountUSD =
              firstAvailableAmount.valueUSD;
          }
        },
      )
      .addCase(getTokenAllowanceForPeripheryThunk.pending, (state) => {
        state.depositAndSwapConfirmationFlow.walletTokenAllowance = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getTokenAllowanceForPeripheryThunk.rejected, (state) => {
        state.depositAndSwapConfirmationFlow.walletTokenAllowance = {
          value: 0,
          status: 'failed',
        };
      })
      .addCase(getTokenAllowanceForPeripheryThunk.fulfilled, (state, { payload }) => {
        state.depositAndSwapConfirmationFlow.walletTokenAllowance = {
          value: payload as number,
          status: 'succeeded',
        };
      })
      .addCase(approveTokenForPeripheryThunk.pending, (state) => {
        state.depositAndSwapConfirmationFlow.step = 'approvingToken';
        state.depositAndSwapConfirmationFlow.error = null;
      })
      .addCase(approveTokenForPeripheryThunk.rejected, (state, { payload }) => {
        state.depositAndSwapConfirmationFlow.step = 'approveTokenError';
        state.depositAndSwapConfirmationFlow.error = payload as string;
      })
      .addCase(approveTokenForPeripheryThunk.fulfilled, (state, { payload }) => {
        state.depositAndSwapConfirmationFlow.step = 'depositAndSwapConfirmation';
        state.depositAndSwapConfirmationFlow.error = null;
        state.depositAndSwapConfirmationFlow.walletTokenAllowance.value = payload as number;
      });
  },
});
export const {
  resetStateAction,
  setUserInputModeAction,
  setSwapFormPoolAction,
  setSwapFormMarginAccountAction,
  setNotionalAmountAction,
  openSwapConfirmationFlowAction,
  closeSwapConfirmationFlowAction,
  openDepositAndSwapConfirmationFlowAction,
  closeDepositAndSwapConfirmationFlowAction,
  setSwapFormSignerAction,
  marginAmountDepositFlowValueChangeAction,
} = slice.actions;
export const swapFormReducer = slice.reducer;
