import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tokens } from '@voltz-protocol/api-sdk-v2';
import { GetExpectedCashflowResult } from '@voltz-protocol/sdk-v2';

import { getPoolProtocol } from '../../../utilities/amm';
import { V2Pool } from '../aMMs';
import { pushEstimatedApyChangeEvent } from './analytics';
import { initialState } from './state';
import { getExpectedCashflowThunk } from './thunks';

const slice = createSlice({
  name: 'cashflowCalculator',
  initialState,
  reducers: {
    setCashflowPoolAndTokenAction: (
      state,
      {
        payload: { pool, token },
      }: PayloadAction<{
        pool: V2Pool;
        token: Tokens | '$';
      }>,
    ) => {
      state.pool = pool;
      state.token = token;
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
          totalCashflow: expectedCashflowInfo.totalCashflow,
          status: 'success',
        };
      });
  },
});
export const { setCashflowPoolAndTokenAction, setEstimatedVariableApyAction } = slice.actions;
export const cashflowCalculatorReducer = slice.reducer;
