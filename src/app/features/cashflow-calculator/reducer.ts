import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, ExpectedCashflowInfo } from '@voltz-protocol/v1-sdk';

import { getAmmProtocol } from '../../../utilities/amm';
import { pushEstimatedApyChangeEvent } from './analytics';
import { getExpectedCashflowInfoThunk } from './thunks';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  aMM: AMM | null;
  estimatedApy: number;
  cashflowInfo: {
    averageFixedRate: number;
    accruedCashflowExistingPosition: number;
    accruedCashflowEditPosition: number;
    estimatedAdditionalCashflow: (estimatedApy: number) => number;
    estimatedTotalCashflow: (estimatedApy: number) => number;
    status: ThunkStatus;
  };
};

const initialState: SliceState = {
  aMM: null,
  estimatedApy: 0,
  cashflowInfo: {
    averageFixedRate: 0,
    accruedCashflowExistingPosition: 0,
    accruedCashflowEditPosition: 0,
    estimatedAdditionalCashflow: () => 0,
    estimatedTotalCashflow: () => 0,
    status: 'idle',
  },
};

const slice = createSlice({
  name: 'historicalRates',
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
export const cashflowCalculatorReducer = slice.reducer;
