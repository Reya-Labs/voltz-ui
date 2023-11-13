import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, ExpectedCashflowInfo } from '@voltz-protocol/v1-sdk';

import { getAmmProtocol } from '../../../../utilities/amm';
import { pushEstimatedApyChangeEvent } from './analytics';
import { initialState } from './state';
import { getExpectedCashflowInfoThunk } from './thunks';

const slice = createSlice({
  name: 'deprecatedCashflowCalculator',
  initialState,
  reducers: {
    setCashflowAMMAction: (
      state,
      {
        payload: { amm },
      }: PayloadAction<{
        amm: AMM;
      }>,
    ) => {
      state.aMM = amm;
    },
    setEstimatedApyAction: (
      state,
      {
        payload: { value, account, mode },
      }: PayloadAction<{
        value: number;
        account: string;
        mode: 'fixed' | 'variable';
      }>,
    ) => {
      if (!isNaN(value)) {
        pushEstimatedApyChangeEvent({
          estimatedApy: value,
          account,
          pool: getAmmProtocol(state.aMM as AMM),
          isFT: mode === 'fixed',
        });
      }
      state.estimatedApy = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpectedCashflowInfoThunk.pending, (state) => {
        state.cashflowInfo.status = 'pending';
      })
      .addCase(getExpectedCashflowInfoThunk.rejected, (state, {}) => {
        state.cashflowInfo.status = 'error';
      })
      .addCase(getExpectedCashflowInfoThunk.fulfilled, (state, { payload }) => {
        const expectedCashflowInfo = payload as ExpectedCashflowInfo;
        state.cashflowInfo = {
          averageFixedRate: expectedCashflowInfo.averageFixedRate,
          accruedCashflowExistingPosition: expectedCashflowInfo.accruedCashflowExistingPosition,
          accruedCashflowEditPosition: expectedCashflowInfo.accruedCashflowEditPosition,
          estimatedAdditionalCashflow: expectedCashflowInfo.estimatedAdditionalCashflow,
          estimatedTotalCashflow: expectedCashflowInfo.estimatedTotalCashflow,
          status: 'success',
        };
      });
  },
});
export const { setCashflowAMMAction, setEstimatedApyAction } = slice.actions;
export const deprecatedCashflowCalculatorReducer = slice.reducer;
