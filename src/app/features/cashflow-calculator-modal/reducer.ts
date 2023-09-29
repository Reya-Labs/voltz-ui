import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetExpectedCashflowResult } from '@voltz-protocol/sdk-v2';

import { getPoolProtocol } from '../../../utilities/amm';
import { V2Pool } from '../aMMs';
import { pushEstimatedApyChangeEvent } from './analytics';
import { initialState } from './state';
import { getExpectedCashflowThunk } from './thunks';

const slice = createSlice({
  name: 'cashflowCalculatorModal',
  initialState,
  reducers: {
    setCashflowPoolAction: (
      state,
      {
        payload: { pool },
      }: PayloadAction<{
        pool: V2Pool;
      }>,
    ) => {
      state.pool = pool;
    },
    setEstimatedVariableApyAction: (
      state,
      {
        payload: { value, account, mode },
      }: PayloadAction<{
        value: number;
        account: string;
        mode: 'fixed' | 'variable';
      }>,
    ) => {
      if (!isNaN(value) && state.pool) {
        pushEstimatedApyChangeEvent({
          estimatedApy: value,
          account,
          pool: getPoolProtocol(state.pool),
          isFT: mode === 'fixed',
        });
      }
      state.estimatedVariableApy = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpectedCashflowThunk.pending, (state) => {
        state.cashflowInfo.status = 'pending';
      })
      .addCase(getExpectedCashflowThunk.rejected, (state, {}) => {
        state.cashflowInfo.status = 'error';
      })
      .addCase(getExpectedCashflowThunk.fulfilled, (state, { payload }) => {
        const expectedCashflowInfo = payload as GetExpectedCashflowResult;
        state.cashflowInfo = {
          totalCashflowUSD: expectedCashflowInfo.totalCashflowUSD,
          additionalCashflowUSD: expectedCashflowInfo.additionalCashflowUSD,
          status: 'success',
        };
      });
  },
});
export const { setCashflowPoolAction, setEstimatedVariableApyAction } = slice.actions;
export const cashflowCalculatorModalReducer = slice.reducer;
