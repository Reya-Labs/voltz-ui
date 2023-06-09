import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfoPostSettlePosition, Position } from '@voltz-protocol/v1-sdk';
import { ContractReceipt } from 'ethers';

import { PositionDetailsUI } from '../position-details';
import { pushPageViewEvent } from './analytics';
import { confirmSettleThunk, getInfoPostSettlePositionThunk } from './thunks';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  // todo: FB deprecated after portfolio launch
  position: Position | null;
  positionDetails: PositionDetailsUI | null;
  step: 'confirmation' | 'waitingForConfirmation' | 'completed' | null;
  error: string | null;
  txHash: string | null;
  infoPostSettlePosition: {
    value: InfoPostSettlePosition;
    status: ThunkStatus;
  };
};

const initialState: SliceState = {
  // todo: FB deprecated after portfolio launch
  position: null,
  positionDetails: null,
  step: null,
  error: null,
  txHash: null,
  infoPostSettlePosition: {
    value: {
      gasFee: {
        value: 0,
        token: 'ETH',
      },
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
        payload: { position, positionDetails, account },
      }: PayloadAction<{
        position: Position | null;
        positionDetails: PositionDetailsUI | null;
        account: null | string;
      }>,
    ) => {
      if (position) {
        pushPageViewEvent({
          account: account || '',
          isTrader: position.positionType !== 3,
        });
      }
      if (positionDetails) {
        pushPageViewEvent({
          account: account || '',
          isTrader: positionDetails.type !== 'LP',
        });
      }
      state.step = 'confirmation';
      state.error = null;
      state.txHash = null;
      state.position = position;
      state.positionDetails = positionDetails;
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
            gasFee: {
              value: 0,
              token: 'ETH',
            },
          },
          status: 'pending',
        };
      })
      .addCase(getInfoPostSettlePositionThunk.rejected, (state) => {
        state.infoPostSettlePosition = {
          value: {
            gasFee: {
              value: 0,
              token: 'ETH',
            },
          },
          status: 'error',
        };
      })
      .addCase(getInfoPostSettlePositionThunk.fulfilled, (state, { payload }) => {
        const infoPostSettlePosition = payload as InfoPostSettlePosition;

        state.infoPostSettlePosition = {
          value: infoPostSettlePosition,
          status: 'success',
        };
      });
  },
});

export const { initializeSettleFlowAction, closeSettleFlowAction } = slice.actions;
export const settleFlowReducer = slice.reducer;
