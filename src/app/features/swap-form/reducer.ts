import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, InfoPostSwapV1, Position } from '@voltz-protocol/v1-sdk';
import { Signer } from 'ethers';
// eslint-disable-next-line no-restricted-imports
import { WritableDraft } from 'immer/dist/internal';

import { stringToBigFloat } from '../../../utilities/number';
import {
  getAvailableNotionalsThunk,
  getFixedRateThunk,
  getInfoPostSwapThunk,
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
    // User-inputted margin amount
    marginAmount: {
      value: string;
      error: string | null;
    };
    infoPostSwap: {
      value: {
        // Margin requirement for prospective swap
        marginRequirement: number;
        // Average fixed rate obtained by the prospective swap
        averageFixedRate: number;

        // Token balance deltas resulted by prospective swap
        fixedTokenDeltaBalance: number;
        variableTokenDeltaBalance: number;
        fixedTokenDeltaUnbalanced: number;

        // Extra information about prospective swap
        fee: number;
        slippage: number;
        gasFeeETH: number;
      };
      status: ThunkStatus;
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
    marginAmount: {
      value: '0',
      error: null,
    },
    infoPostSwap: {
      value: {
        marginRequirement: 0,
        averageFixedRate: 0,
        fixedTokenDeltaBalance: 0,
        variableTokenDeltaBalance: 0,
        fixedTokenDeltaUnbalanced: 0,
        fee: 0,
        slippage: 0,
        gasFeeETH: 0,
      },
      status: 'idle',
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
  },
};

const updateCashflowCalculator = (state: WritableDraft<SliceState>): void => {
  if (!state.amm) {
    return;
  }
  if (state.cashflowCalculator.variableFactorStartNow.status !== 'success') {
    return;
  }

  const { additionalCashflow, totalCashflow } = state.amm.getExpectedCashflowInfo({
    position: state.position as Position,
    fixedTokenDeltaBalance: state.prospectiveSwap.infoPostSwap.value.fixedTokenDeltaBalance,
    variableTokenDeltaBalance: state.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance,
    variableFactorStartNow: state.cashflowCalculator.variableFactorStartNow.value,
    predictedVariableApy: stringToBigFloat(state.cashflowCalculator.predictedApy),
  });

  state.cashflowCalculator.additionalCashflow = additionalCashflow;
  state.cashflowCalculator.totalCashflow = totalCashflow;
};

const validateUserInput = (state: WritableDraft<SliceState>): void => {
  {
    let error = null;
    if (
      stringToBigFloat(state.prospectiveSwap.notionalAmount.value) >
      state.availableNotionals.value[state.prospectiveSwap.mode]
    ) {
      error = 'Not enough liquidity. Available:';
    }
    state.prospectiveSwap.notionalAmount.error = error;
  }

  {
    let error = null;
    if (
      stringToBigFloat(state.prospectiveSwap.marginAmount.value) <
      state.prospectiveSwap.infoPostSwap.value.marginRequirement
    ) {
      error = 'Margin too low. Additional margin required:';
    }
    state.prospectiveSwap.marginAmount.error = error;
  }
};

export const slice = createSlice({
  name: 'swapForm',
  initialState,
  reducers: {
    resetStateAction: (state) => {
      // TODO: Alex
    },
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
      validateUserInput(state);
    },
    setMarginAmountAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: string;
      }>,
    ) => {
      state.prospectiveSwap.marginAmount.value = value;
      validateUserInput(state);
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
      updateCashflowCalculator(state);
    },
    setSwapFormAMMAction: (
      state,
      {
        payload: { amm },
      }: PayloadAction<{
        amm: AMM | null;
      }>,
    ) => {
      state.amm = amm;
    },
    setSignerForAMMAction: (
      state,
      {
        payload: { signer },
      }: PayloadAction<{
        signer: Signer | null;
      }>,
    ) => {
      if (!state.amm) {
        return;
      }

      state.amm.signer = signer;
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
          value: payload as number,
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
      })
      .addCase(getInfoPostSwapThunk.pending, (state) => {
        state.prospectiveSwap.infoPostSwap = {
          value: {
            marginRequirement: 0,
            averageFixedRate: 0,
            fixedTokenDeltaBalance: 0,
            variableTokenDeltaBalance: 0,
            fixedTokenDeltaUnbalanced: 0,
            fee: 0,
            slippage: 0,
            gasFeeETH: 0,
          },
          status: 'pending',
        };
      })
      .addCase(getInfoPostSwapThunk.rejected, (state) => {
        state.prospectiveSwap.infoPostSwap = {
          value: {
            marginRequirement: 0,
            averageFixedRate: 0,
            fixedTokenDeltaBalance: 0,
            variableTokenDeltaBalance: 0,
            fixedTokenDeltaUnbalanced: 0,
            fee: 0,
            slippage: 0,
            gasFeeETH: 0,
          },
          status: 'error',
        };
      })
      .addCase(getInfoPostSwapThunk.fulfilled, (state, { payload }) => {
        const { notionalAmount, infoPostSwap } = payload as {
          notionalAmount: number;
          infoPostSwap: InfoPostSwapV1;
        };
        state.prospectiveSwap.infoPostSwap = {
          value: {
            marginRequirement: infoPostSwap.marginRequirement,
            averageFixedRate: infoPostSwap.averageFixedRate,
            fixedTokenDeltaBalance: infoPostSwap.fixedTokenDeltaBalance,
            variableTokenDeltaBalance: infoPostSwap.variableTokenDeltaBalance,
            fixedTokenDeltaUnbalanced: infoPostSwap.fixedTokenDeltaUnbalanced,
            fee: infoPostSwap.fee,
            slippage: infoPostSwap.slippage,
            gasFeeETH: infoPostSwap.gasFeeETH,
          },
          status: 'success',
        };
        if (infoPostSwap.availableNotional < notionalAmount) {
          state.availableNotionals.value[state.prospectiveSwap.mode] =
            infoPostSwap.availableNotional;
        }

        validateUserInput(state);
        updateCashflowCalculator(state);
      });
  },
});
export const {
  resetStateAction,
  setModeAction,
  setSwapFormAMMAction,
  setNotionalAmountAction,
  setMarginAmountAction,
  setPredictedApyAction,
  setSignerForAMMAction,
} = slice.actions;
export const swapFormReducer = slice.reducer;
