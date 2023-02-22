import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, Position } from '@voltz-protocol/v1-sdk';

import { stringToBigFloat } from '../../../utilities/number';
import { initialiseCashflowCalculator } from './thunks';

type SliceState = {
  amm: AMM | undefined;
  position: Position | undefined;
  // State of prospective swap
  prospectiveSwap: {
    // User-inputted notional amount
    notionalAmount: string;
  };
  // State of cashflow calculator
  cashflowCalculator: {
    // User-inputted predicted variable apy
    predictedApy: string;
    // Cached variable factor from termStart to now
    variableFactorStartNow: number;
    // Additional cashflow resulted from prospective swap, form now to termEnd
    additionalCashflow: number;
    // Total cashflow resulted from past and prospective swaps, from termStart to termEnd
    totalCashflow: number;
    // Status of cashflow calculation
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
  };
};

const initialState: SliceState = {
  amm: undefined,
  position: undefined,
  prospectiveSwap: {
    notionalAmount: '0',
  },
  cashflowCalculator: {
    predictedApy: '0',
    variableFactorStartNow: 0,
    additionalCashflow: 0,
    totalCashflow: 0,
    status: 'idle',
  },
};

export const slice = createSlice({
  name: 'swapForm',
  initialState,
  reducers: {
    setNotionalAmountAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: string;
      }>,
    ) => {
      state.prospectiveSwap.notionalAmount = value;
    },
    setPredictedApyAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: string;
      }>,
    ) => {
      state.cashflowCalculator.predictedApy = value;
      if (stringToBigFloat(state.cashflowCalculator.predictedApy) < 0) {
        state.cashflowCalculator.status = 'failed';
      } else {
        state.cashflowCalculator.status = 'succeeded';
      }
    },
    updateCashflowCalculatorAction: (
      state,
      {
        payload: { amm },
      }: PayloadAction<{
        amm: AMM; //TODO Alex: remove amm and use amm from state
      }>,
    ) => {
      if (state.cashflowCalculator.status === 'failed') {
        return;
      }

      const { additionalCashflow, totalCashflow } = amm.getExpectedCashflowInfo({
        position: state.position as Position | undefined, //TODO Alex
        fixedTokenDeltaBalance: Number(state.prospectiveSwap.notionalAmount), //TODO Alex
        variableTokenDeltaBalance: -Number(state.prospectiveSwap.notionalAmount), //TODO Alex
        variableFactorStartNow: state.cashflowCalculator.variableFactorStartNow,
        predictedVariableApy: stringToBigFloat(state.cashflowCalculator.predictedApy), //TODO Alex
      });

      state.cashflowCalculator.additionalCashflow = additionalCashflow;
      state.cashflowCalculator.totalCashflow = totalCashflow;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseCashflowCalculator.pending, (state, {}) => {
        state.cashflowCalculator.status = 'pending';
      })
      .addCase(initialiseCashflowCalculator.rejected, (state, {}) => {
        state.cashflowCalculator.status = 'failed';
      })
      .addCase(initialiseCashflowCalculator.fulfilled, (state, { payload }) => {
        state.cashflowCalculator.variableFactorStartNow = payload as number;
        state.cashflowCalculator.status = 'succeeded';
      });
  },
});
export const { setNotionalAmountAction, setPredictedApyAction, updateCashflowCalculatorAction } =
  slice.actions;
export const swapFormReducer = slice.reducer;
