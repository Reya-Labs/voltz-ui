import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { AMM, InfoPostSwapV1, Position } from '@voltz-protocol/v1-sdk';

import { limitAndFormatNumber, stringToBigFloat } from '../../../utilities/number';
import {
  confirmSwapThunk,
  getFixedRateThunk,
  getInfoPostSwapThunk,
  getPoolSwapInfoThunk,
  getVariableRateThunk,
  getWalletBalanceThunk,
  initialiseCashflowCalculatorThunk,
  setSignerAndPositionForAMMThunk,
  SetSignerAndPositionForAMMThunkSuccess,
} from './thunks';
import { isMarginStrictlyPositive, isNotionalStrictlyPositive } from './utils';

export const SwapFormNumberLimits = {
  digitLimit: 12,
  decimalLimit: 6,
};

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  amm: AMM | null;
  position: {
    value: Position | null;
    status: ThunkStatus;
  };
  walletBalance: {
    value: number;
    status: ThunkStatus;
  };
  fixedRate: {
    value: number;
    status: ThunkStatus;
  };
  variableRate: {
    value: number;
    status: ThunkStatus;
  };
  variableRate24hAgo: {
    value: number;
    status: ThunkStatus;
  };
  // User-agnostic swap info about pool
  poolSwapInfo: {
    availableNotional: Record<'fixed' | 'variable', number>;
    maxLeverage: Record<'fixed' | 'variable', number>;
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
    leverage: number | null;
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
    // Additional cashflow resulted from prospective swap, from now to termEnd
    additionalCashflow: number;
    // Total cashflow resulted from past and prospective swaps, from termStart to termEnd
    totalCashflow: number;
  };
  swapConfirmationFlow: {
    step: 'swapConfirmation' | 'waitingForSwapConfirmation' | 'swapCompleted' | null;
    error: string | null;
  };
};

const initialState: SliceState = {
  amm: null,
  position: {
    value: null,
    status: 'idle',
  },
  walletBalance: {
    value: 0,
    status: 'idle',
  },
  fixedRate: {
    value: 0,
    status: 'idle',
  },
  variableRate: {
    value: 0,
    status: 'idle',
  },
  variableRate24hAgo: {
    value: 0,
    status: 'idle',
  },
  poolSwapInfo: {
    availableNotional: {
      fixed: 0,
      variable: 0,
    },
    maxLeverage: {
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
    leverage: null,
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
  swapConfirmationFlow: {
    step: null,
    error: null,
  },
};

const updateCashflowCalculator = (state: Draft<SliceState>): void => {
  if (!state.amm) {
    return;
  }
  if (state.cashflowCalculator.variableFactorStartNow.status !== 'success') {
    return;
  }

  const { additionalCashflow, totalCashflow } = state.amm.getExpectedCashflowInfo({
    position: state.position.value as Position,
    fixedTokenDeltaBalance: state.prospectiveSwap.infoPostSwap.value.fixedTokenDeltaBalance,
    variableTokenDeltaBalance: state.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance,
    variableFactorStartNow: state.cashflowCalculator.variableFactorStartNow.value,
    predictedVariableApy: stringToBigFloat(state.cashflowCalculator.predictedApy),
  });

  state.cashflowCalculator.additionalCashflow = additionalCashflow;
  state.cashflowCalculator.totalCashflow = totalCashflow;
};

const validateUserInput = (state: Draft<SliceState>): void => {
  {
    let error = null;
    if (
      stringToBigFloat(state.prospectiveSwap.notionalAmount.value) >
      state.poolSwapInfo.availableNotional[state.prospectiveSwap.mode]
    ) {
      error = 'Not enough liquidity. Available:';
    }
    state.prospectiveSwap.notionalAmount.error = error;
  }

  {
    let error = null;
    if (
      state.walletBalance.status === 'success' &&
      stringToBigFloat(state.prospectiveSwap.marginAmount.value) > state.walletBalance.value
    ) {
      error = 'WLT';
    }

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
    openSwapConfirmationFlowAction: (state) => {
      state.swapConfirmationFlow.step = 'swapConfirmation';
    },
    closeSwapConfirmationFlowAction: (state) => {
      state.swapConfirmationFlow.step = null;
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
        status: 'idle',
      };
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
      if (isNotionalStrictlyPositive(state) && isMarginStrictlyPositive(state)) {
        state.prospectiveSwap.leverage =
          stringToBigFloat(state.prospectiveSwap.notionalAmount.value) /
          stringToBigFloat(state.prospectiveSwap.marginAmount.value);
      }
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
      if (isNotionalStrictlyPositive(state) && isMarginStrictlyPositive(state)) {
        state.prospectiveSwap.leverage =
          stringToBigFloat(state.prospectiveSwap.notionalAmount.value) /
          stringToBigFloat(state.prospectiveSwap.marginAmount.value);
      }
    },
    setLeverageAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: number;
      }>,
    ) => {
      if (!isNotionalStrictlyPositive(state) || isNaN(value) || value === 0) {
        state.prospectiveSwap.leverage = null;
        return;
      }

      state.prospectiveSwap.leverage = value;
      state.prospectiveSwap.marginAmount.value = limitAndFormatNumber(
        stringToBigFloat(state.prospectiveSwap.notionalAmount.value) / value,
        SwapFormNumberLimits.digitLimit,
        SwapFormNumberLimits.decimalLimit,
        'ceil',
      );

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
      .addCase(getWalletBalanceThunk.pending, (state) => {
        state.walletBalance = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getWalletBalanceThunk.rejected, (state) => {
        state.walletBalance = {
          value: 0,
          status: 'error',
        };
      })
      .addCase(getWalletBalanceThunk.fulfilled, (state, { payload }) => {
        state.walletBalance = {
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
      .addCase(getVariableRateThunk.pending, (state, { meta }) => {
        if (meta.arg.timestampInMS) {
          state.variableRate24hAgo = {
            value: 0,
            status: 'pending',
          };
        } else {
          state.variableRate = {
            value: 0,
            status: 'pending',
          };
        }
      })
      .addCase(getVariableRateThunk.rejected, (state, { meta }) => {
        if (meta.arg.timestampInMS) {
          state.variableRate24hAgo = {
            value: 0,
            status: 'error',
          };
        } else {
          state.variableRate = {
            value: 0,
            status: 'error',
          };
        }
      })
      .addCase(getVariableRateThunk.fulfilled, (state, { payload, meta }) => {
        if (meta.arg.timestampInMS) {
          state.variableRate24hAgo = {
            value: payload as number,
            status: 'success',
          };
        } else {
          state.variableRate = {
            value: payload as number,
            status: 'success',
          };
        }
      })
      .addCase(getPoolSwapInfoThunk.pending, (state) => {
        state.poolSwapInfo = {
          availableNotional: {
            fixed: 0,
            variable: 0,
          },
          maxLeverage: {
            fixed: 0,
            variable: 0,
          },
          status: 'pending',
        };
      })
      .addCase(getPoolSwapInfoThunk.rejected, (state) => {
        state.poolSwapInfo = {
          availableNotional: {
            fixed: 0,
            variable: 0,
          },
          maxLeverage: {
            fixed: 0,
            variable: 0,
          },
          status: 'error',
        };
      })
      .addCase(getPoolSwapInfoThunk.fulfilled, (state, { payload }) => {
        const { availableNotionalFT, availableNotionalVT, maxLeverageFT, maxLeverageVT } =
          payload as {
            availableNotionalFT: number;
            availableNotionalVT: number;
            maxLeverageFT: number;
            maxLeverageVT: number;
          };
        state.poolSwapInfo = {
          availableNotional: {
            fixed: availableNotionalFT,
            variable: availableNotionalVT,
          },
          maxLeverage: {
            fixed: maxLeverageFT,
            variable: maxLeverageVT,
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
        const { notionalAmount, infoPostSwap, earlyReturn } = payload as {
          notionalAmount: number;
          infoPostSwap: InfoPostSwapV1;
          earlyReturn: boolean;
        };

        if (earlyReturn) {
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
            status: 'idle',
          };
          return;
        }

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
          state.poolSwapInfo.availableNotional[state.prospectiveSwap.mode] =
            infoPostSwap.availableNotional;
        }

        validateUserInput(state);
        updateCashflowCalculator(state);
      })
      .addCase(setSignerAndPositionForAMMThunk.pending, (state) => {
        state.position.value = null;
        state.position.status = 'pending';
        if (!state.amm) {
          return;
        }
        state.amm.signer = null;
      })
      .addCase(setSignerAndPositionForAMMThunk.rejected, (state) => {
        state.position.value = null;
        state.position.status = 'error';
        if (!state.amm) {
          return;
        }
        state.amm.signer = null;
      })
      .addCase(setSignerAndPositionForAMMThunk.fulfilled, (state, { payload }) => {
        state.position.value = (payload as SetSignerAndPositionForAMMThunkSuccess).position;
        state.position.status = 'success';
        if (!state.amm) {
          return;
        }
        state.amm.signer = (payload as SetSignerAndPositionForAMMThunkSuccess).signer;
      })
      .addCase(confirmSwapThunk.pending, (state) => {
        state.swapConfirmationFlow.step = 'waitingForSwapConfirmation';
        state.swapConfirmationFlow.error = null;
      })
      .addCase(confirmSwapThunk.rejected, (state, { payload }) => {
        state.swapConfirmationFlow.step = 'swapConfirmation';
        state.swapConfirmationFlow.error = payload as string;
      })
      .addCase(confirmSwapThunk.fulfilled, (state) => {
        state.swapConfirmationFlow.step = 'swapCompleted';
        state.swapConfirmationFlow.error = null;
      });
  },
});
export const {
  resetStateAction,
  setModeAction,
  setSwapFormAMMAction,
  setNotionalAmountAction,
  setMarginAmountAction,
  setLeverageAction,
  setPredictedApyAction,
  openSwapConfirmationFlowAction,
  closeSwapConfirmationFlowAction,
} = slice.actions;
export const swapFormReducer = slice.reducer;
