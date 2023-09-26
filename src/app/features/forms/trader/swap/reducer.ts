import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SimulateSwapMarginAccountResult } from '@voltz-protocol/sdk-v2';
import { ContractReceipt, providers } from 'ethers';

import { V2Pool } from '../../../aMMs';
import { initialState } from './state';
import {
  getMaxNotionalAvailableThunk,
  getPoolUnderlyingTokenAllowanceThunk,
  simulateSwapThunk,
  swapThunk,
} from './thunks';
import { validateUserInputAndUpdateSubmitButton } from './utils';

const slice = createSlice({
  name: 'swapForm',
  initialState,
  reducers: {
    resetStateAction: () => initialState,
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
        validateUserInputAndUpdateSubmitButton(state);
      }
    },
    resetInfoPostSwapAction: (state) => {
      state.prospectiveSwap.swapSimulation = {
        ...initialState.prospectiveSwap.swapSimulation,
      };
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
      .addCase(getPoolUnderlyingTokenAllowanceThunk.pending, (state) => {
        state.walletTokenAllowance = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getPoolUnderlyingTokenAllowanceThunk.rejected, (state) => {
        state.walletTokenAllowance = {
          value: 0,
          status: 'error',
        };
      })
      .addCase(getPoolUnderlyingTokenAllowanceThunk.fulfilled, (state, { payload }) => {
        state.walletTokenAllowance = {
          value: payload as number,
          status: 'success',
        };
        validateUserInputAndUpdateSubmitButton(state);
      })
      // TODO: FB - Should be part of the deposit flow
      // .addCase(approvePoolUnderlyingTokenThunk.pending, (state) => {
      //   state.submitButton = {
      //     state: 'approving',
      //     disabled: true,
      //     message: {
      //       text: 'Waiting for confirmation...',
      //       type: 'info',
      //     },
      //   };
      // })
      // .addCase(approvePoolUnderlyingTokenThunk.rejected, (state, { payload }) => {
      //   state.submitButton = {
      //     state: 'approve',
      //     disabled: false,
      //     message: {
      //       text: payload as string,
      //       type: 'error',
      //     },
      //   };
      // })
      // .addCase(approvePoolUnderlyingTokenThunk.fulfilled, (state, { payload }) => {
      //   state.walletTokenAllowance = {
      //     value: payload as number,
      //     status: 'success',
      //   };
      //   validateUserInputAndUpdateSubmitButton(state);
      // })
      .addCase(simulateSwapThunk.pending, (state) => {
        state.prospectiveSwap.swapSimulation = {
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
      });
  },
});
export const {
  resetStateAction,
  setUserInputModeAction,
  setSwapFormPoolAction,
  setNotionalAmountAction,
  openSwapConfirmationFlowAction,
  closeSwapConfirmationFlowAction,
  resetInfoPostSwapAction,
  setSwapFormSignerAction,
} = slice.actions;
export const swapFormReducer = slice.reducer;
