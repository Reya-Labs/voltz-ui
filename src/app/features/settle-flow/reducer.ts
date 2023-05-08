import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfoPostSettlePosition, Position } from '@voltz-protocol/v1-sdk';
import { ContractReceipt } from 'ethers';

import { confirmSettleThunk, getInfoPostSettlePositionThunk } from './thunks';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  position: Position | null;
  step: 'confirmation' | 'waitingForConfirmation' | 'completed' | null;
  error: string | null;
  txHash: string | null;
  infoPostSettlePosition: {
    value: {
      gasFeeETH: number;
    };
    status: ThunkStatus;
  };
};

const initialState: SliceState = {
  position: null,
  step: null,
  error: null,
  txHash: null,
  infoPostSettlePosition: {
    value: {
      gasFeeETH: 0,
    },
    status: 'idle',
  },
};

const slice = createSlice({
  name: 'settleFlow',
  initialState,
  reducers: {
    initializeSettleFlowAction: (
      state,
      {
        payload: { position },
      }: PayloadAction<{
        position: Position;
      }>,
    ) => {
      state.step = 'confirmation';
      state.error = null;
      state.txHash = null;
      state.position = position;
    },
    closeSettleFlowAction: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmSettleThunk.pending, (state) => {
        state.step = 'waitingForConfirmation';
        state.error = null;
        state.txHash = null;
      })
      .addCase(confirmSettleThunk.rejected, (state, { payload }) => {
        state.step = 'confirmation';
        state.error = payload as string;
        state.txHash = null;
      })
      .addCase(confirmSettleThunk.fulfilled, (state, { payload }) => {
        state.step = 'completed';
        state.error = null;
        state.txHash = (payload as ContractReceipt).transactionHash;
      })
      .addCase(getInfoPostSettlePositionThunk.pending, (state) => {
        state.infoPostSettlePosition = {
          value: {
            gasFeeETH: 0,
          },
          status: 'pending',
        };
      })
      .addCase(getInfoPostSettlePositionThunk.rejected, (state) => {
        state.infoPostSettlePosition = {
          value: {
            gasFeeETH: 0,
          },
          status: 'error',
        };
      })
      .addCase(getInfoPostSettlePositionThunk.fulfilled, (state, { payload }) => {
        const { infoPostSettlePosition } = payload as {
          infoPostSettlePosition: InfoPostSettlePosition;
        };

        state.infoPostSettlePosition = {
          value: {
            gasFeeETH: infoPostSettlePosition.gasFeeETH,
          },
          status: 'success',
        };
      });
  },
});

export const { initializeSettleFlowAction, closeSettleFlowAction } = slice.actions;
export const settleFlowReducer = slice.reducer;
