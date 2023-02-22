import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, Position } from '@voltz-protocol/v1-sdk';

import { formatCurrency, toUSFormat } from '../../../utilities/number';
import { initialiseCashflowCalculator } from './thunks';

type SliceState = {
  amm: AMM | undefined;
  position: Position | undefined;
  // State of prospective swap
  prospectiveSwap: {
    // user-inputted notional amount
    notionalAmount: string;
  };
  // State of cashflow calculator
  cashflowCalculator: {
    // user-inputted predicted variable apy
    predictedApy: string;
    // cached variable factor from termStart to now
    variableFactorStartNow: number;
    // Additional cashflow resulted from prospective swap, form now to termEnd.
    additionalCashflow: string;
    // Total cashflow resulted from past and prospective swaps, from termStart to termEnd.
    totalCashflow: string;
    // Flag that signals whether cashflow calculator was initialised
    initialised: boolean;
    // Flag that signals potential errors in cashflow calculation
    error: boolean;
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
    additionalCashflow: '+0.00',
    totalCashflow: '+0.00',
    initialised: false,
    error: false,
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
      if (parseFloat(toUSFormat(value) as string) < 0) {
        state.cashflowCalculator.error = true;
      } else {
        state.cashflowCalculator.error = false;
      }
    },
    refreshCashflows: (
      state,
      {
        payload: { amm },
      }: PayloadAction<{
        amm: AMM; //TODO Alex: remove amm and use amm from state
      }>,
    ) => {
      if (state.cashflowCalculator.error) {
        return;
      }

      const { additionalCashflow, totalCashflow } = amm.getExpectedCashflowInfo({
        position: state.position as Position | undefined, //TODO Alex
        fixedTokenDeltaBalance: Number(state.prospectiveSwap.notionalAmount), //TODO Alex
        variableTokenDeltaBalance: -Number(state.prospectiveSwap.notionalAmount), //TODO Alex
        variableFactorStartNow: state.cashflowCalculator.variableFactorStartNow,
        predictedVariableApy: Number(state.cashflowCalculator.predictedApy), //TODO Alex
      });

      state.cashflowCalculator.additionalCashflow = formatCurrency(
        additionalCashflow,
        true,
        true,
        2,
        4,
      );

      state.cashflowCalculator.totalCashflow = formatCurrency(totalCashflow, true, true, 2, 4);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseCashflowCalculator.pending, (state, {}) => {
        state.cashflowCalculator.initialised = false;
      })
      .addCase(initialiseCashflowCalculator.rejected, (state, {}) => {
        state.cashflowCalculator.error = true;
      })
      .addCase(initialiseCashflowCalculator.fulfilled, (state, { payload }) => {
        state.cashflowCalculator.variableFactorStartNow = payload as number;
        state.cashflowCalculator.initialised = true;
      });
  },
});
export const { setNotionalAmountAction, setPredictedApyAction, refreshCashflows } = slice.actions;
export const swapFormReducer = slice.reducer;
