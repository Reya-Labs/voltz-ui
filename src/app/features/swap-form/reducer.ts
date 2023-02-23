import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, Position } from '@voltz-protocol/v1-sdk';

import { stringToBigFloat } from '../../../utilities/number';
import {
  getAvailableNotionalsThunk,
  getFixedRateThunk,
  getVariableRateThunk,
  initialiseCashflowCalculatorThunk,
} from './thunks';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

type SliceState = {
  amm: AMM | null;
  position: Position | null;
  fixedRate: {
    value: number;
    status: ThunkStatus;
  };
  variableRate: {
    value: number;
    status: ThunkStatus;
  };
  availableNotionals: {
    value: Record<'fixed' | 'variable', number>;
    status: ThunkStatus;
  };
  // State of prospective swap
  prospectiveSwap: {
    // Direction of trade: FT or VT
    mode: 'fixed' | 'variable';
    // User-inputted notional amount
    notionalAmount: {
      value: string;
      error: string | null;
    };
  };
  // State of cashflow calculator
  cashflowCalculator: {
    // User-inputted predicted variable apy
    predictedApy: string;
    // Cached variable factor from termStart to now
    variableFactorStartNow: {
      value: number;
      status: ThunkStatus;
    };
    // Additional cashflow resulted from prospective swap, form now to termEnd
    additionalCashflow: number;
    // Total cashflow resulted from past and prospective swaps, from termStart to termEnd
    totalCashflow: number;
    // Validation of user input
    valid: boolean;
  };
};

const initialState: SliceState = {
  amm: null,
  position: null,
  fixedRate: {
    value: 0,
    status: 'idle',
  },
  variableRate: {
    value: 0,
    status: 'idle',
  },
  availableNotionals: {
    value: {
      fixed: 0,
      variable: 0,
    },
    status: 'idle',
  },
  prospectiveSwap: {
    mode: 'fixed',
    notionalAmount: {
      value: '0',
      error: null,
    },
  },
  cashflowCalculator: {
    predictedApy: '0',
    variableFactorStartNow: {
      value: 0,
      status: 'idle',
    },
    additionalCashflow: 0,
    totalCashflow: 0,
    valid: true,
  },
};

export const slice = createSlice({
  name: 'swapForm',
  initialState,
  reducers: {
    setModeAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: 'fixed' | 'variable';
      }>,
    ) => {
      state.prospectiveSwap.mode = value;
    },
    setNotionalAmountAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: string;
      }>,
    ) => {
      state.prospectiveSwap.notionalAmount.value = value;
      let error = null;
      if (stringToBigFloat(value) > state.availableNotionals.value[state.prospectiveSwap.mode]) {
        error = 'Not enough liquidity. Available:';
      }
      state.prospectiveSwap.notionalAmount.error = error;
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
        state.cashflowCalculator.valid = false;
      } else {
        state.cashflowCalculator.valid = true;
      }
    },
    updateCashflowCalculatorAction: (state) => {
      if (!state.amm) {
        return;
      }
      if (
        !state.cashflowCalculator.valid ||
        state.cashflowCalculator.variableFactorStartNow.status !== 'success'
      ) {
        return;
      }

      const { additionalCashflow, totalCashflow } = state.amm.getExpectedCashflowInfo({
        position: state.position as Position,
        fixedTokenDeltaBalance: Number(state.prospectiveSwap.notionalAmount), //TODO Alex
        variableTokenDeltaBalance: -Number(state.prospectiveSwap.notionalAmount), //TODO Alex
        variableFactorStartNow: state.cashflowCalculator.variableFactorStartNow.value,
        predictedVariableApy: stringToBigFloat(state.cashflowCalculator.predictedApy),
      });

      state.cashflowCalculator.additionalCashflow = additionalCashflow;
      state.cashflowCalculator.totalCashflow = totalCashflow;
    },
    setSwapFormAMMAction: (
      state,
      {
        payload: { amm },
      }: PayloadAction<{
        amm: AMM;
      }>,
    ) => {
      if (!amm) {
        return;
      }
      state.amm = amm;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseCashflowCalculatorThunk.pending, (state) => {
        state.cashflowCalculator.variableFactorStartNow = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(initialiseCashflowCalculatorThunk.rejected, (state) => {
        state.cashflowCalculator.variableFactorStartNow = {
          value: 0,
          status: 'error',
        };
      })
      .addCase(initialiseCashflowCalculatorThunk.fulfilled, (state, { payload }) => {
        state.cashflowCalculator.variableFactorStartNow = {
          value: payload as number,
          status: 'success',
        };
      })
      .addCase(getFixedRateThunk.pending, (state) => {
        state.fixedRate = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getFixedRateThunk.rejected, (state) => {
        state.fixedRate = {
          value: 0,
          status: 'error',
        };
      })
      .addCase(getFixedRateThunk.fulfilled, (state, { payload }) => {
        state.fixedRate = {
          value: payload as number,
          status: 'success',
        };
      })
      .addCase(getVariableRateThunk.pending, (state) => {
        state.variableRate = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getVariableRateThunk.rejected, (state) => {
        state.variableRate = {
          value: 0,
          status: 'error',
        };
      })
      .addCase(getVariableRateThunk.fulfilled, (state, { payload }) => {
        state.variableRate = {
          value: (payload as number) * 100,
          status: 'success',
        };
      })
      .addCase(getAvailableNotionalsThunk.pending, (state) => {
        state.availableNotionals = {
          value: {
            fixed: 0,
            variable: 0,
          },
          status: 'pending',
        };
      })
      .addCase(getAvailableNotionalsThunk.rejected, (state) => {
        state.availableNotionals = {
          value: {
            fixed: 0,
            variable: 0,
          },
          status: 'error',
        };
      })
      .addCase(getAvailableNotionalsThunk.fulfilled, (state, { payload }) => {
        const { availableNotionalFT, availableNotionalVT } = payload as {
          availableNotionalFT: number;
          availableNotionalVT: number;
        };
        state.availableNotionals = {
          value: {
            fixed: availableNotionalFT,
            variable: availableNotionalVT,
          },
          status: 'success',
        };
      });
  },
});
export const {
  setModeAction,
  setSwapFormAMMAction,
  setNotionalAmountAction,
  setPredictedApyAction,
  updateCashflowCalculatorAction,
} = slice.actions;
export const swapFormReducer = slice.reducer;
