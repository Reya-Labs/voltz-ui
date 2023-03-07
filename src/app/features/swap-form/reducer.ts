import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { AMM, InfoPostSwapV1, Position } from '@voltz-protocol/v1-sdk';
import { ContractReceipt } from 'ethers';

import { limitAndFormatNumber, stringToBigFloat } from '../../../utilities/number';
import {
  approveUnderlyingTokenThunk,
  confirmMarginUpdateThunk,
  confirmSwapThunk,
  getFixedRateThunk,
  getInfoPostSwapThunk,
  getPoolSwapInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getVariableRateThunk,
  getWalletBalanceThunk,
  initialiseCashflowCalculatorThunk,
  setSignerAndPositionForAMMThunk,
  SetSignerAndPositionForAMMThunkSuccess,
} from './thunks';
import {
  checkLowLeverageNotification,
  getExistingPositionMode,
  getProspectiveSwapMargin,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
  hasExistingPosition,
  isUserInputMarginError,
  updateLeverage,
  validateUserInput,
} from './utils';

export const SwapFormNumberLimits = {
  digitLimit: 12,
  decimalLimit: 6,
};

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  submitButton: {
    state:
      | 'swap'
      | 'margin-update'
      | 'not-enough-balance'
      | 'connect-wallet'
      | 'approve'
      | 'approving';
    disabled: boolean;
    message: {
      text: string | null;
      isError: boolean;
    };
  };
  amm: AMM | null;
  position: {
    value: Position | null;
    status: ThunkStatus;
  };
  walletBalance: {
    value: number;
    status: ThunkStatus;
  };
  walletTokenAllowance: {
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
  userInput: {
    // Side chosen by user in the UI
    mode: 'fixed' | 'variable';
    // User-inputted notional amount
    notionalAmount: {
      value: number;
      editMode: 'add' | 'remove';
      error: string | null;
    };
    // User-inputted margin amount
    marginAmount: {
      value: number;
      editMode: 'add' | 'remove';
      error: string | null;
    };
    leverage: number | null;
  };
  // State of prospective swap
  prospectiveSwap: {
    // Direction of trade: FT or VT
    mode: 'fixed' | 'variable';
    // Notional amount for prospective swap
    notionalAmount: number;
    // Notional amount for prospective swap
    marginAmount: number;
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
    txHash: string | null;
  };
  marginUpdateConfirmationFlow: {
    step:
      | 'marginUpdateConfirmation'
      | 'waitingForMarginUpdateConfirmation'
      | 'marginUpdateCompleted'
      | null;
    error: string | null;
    txHash: string | null;
  };
  showLowLeverageNotification: boolean;
};

const initialState: SliceState = {
  submitButton: {
    state: 'connect-wallet',
    disabled: true,
    message: {
      text: null,
      isError: false,
    },
  },
  amm: null,
  position: {
    value: null,
    status: 'idle',
  },
  walletBalance: {
    value: 0,
    status: 'idle',
  },
  walletTokenAllowance: {
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
  userInput: {
    mode: 'fixed',
    notionalAmount: {
      value: 0,
      editMode: 'add',
      error: null,
    },
    marginAmount: {
      value: 0,
      editMode: 'add',
      error: null,
    },
    leverage: null,
  },
  prospectiveSwap: {
    mode: 'fixed',
    notionalAmount: 0,
    marginAmount: 0,
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
      status: 'success',
    },
  },
  cashflowCalculator: {
    predictedApy: '0', // TODO Alex: should maybe change to number
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
    txHash: null,
  },
  marginUpdateConfirmationFlow: {
    step: null,
    error: null,
    txHash: null,
  },
  showLowLeverageNotification: false,
};

const updateCashflowCalculator = (state: Draft<SliceState>): void => {
  if (!state.amm) {
    return;
  }
  if (state.cashflowCalculator.variableFactorStartNow.status !== 'success') {
    return;
  }
  if (!state.cashflowCalculator.predictedApy) {
    state.cashflowCalculator.additionalCashflow = 0;
    state.cashflowCalculator.totalCashflow = 0;
    return;
  }
  if (state.prospectiveSwap.infoPostSwap.status !== 'success') {
    return;
  }

  const { additionalCashflow, totalCashflow } = state.amm.getExpectedCashflowInfo({
    position: state.position.value as Position,
    fixedTokenDeltaBalance: state.prospectiveSwap.infoPostSwap.value.fixedTokenDeltaBalance,
    variableTokenDeltaBalance: state.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance,
    variableFactorStartNow: state.cashflowCalculator.variableFactorStartNow.value,
    predictedVariableApy: stringToBigFloat(state.cashflowCalculator.predictedApy) / 100,
  });

  state.cashflowCalculator.additionalCashflow = additionalCashflow;
  state.cashflowCalculator.totalCashflow = totalCashflow;
};

const validateUserInputAndUpdateSubmitButton = (state: Draft<SliceState>): void => {
  validateUserInput(state);

  const isProspectiveSwapNotionalValid =
    hasExistingPosition(state) || state.prospectiveSwap.notionalAmount > 0;
  const isProspectiveSwapMarginValid =
    hasExistingPosition(state) || state.prospectiveSwap.marginAmount > 0;
  const isProspectiveSwapNotionalMarginValid =
    state.prospectiveSwap.notionalAmount !== 0 || state.prospectiveSwap.marginAmount !== 0;
  const isInfoPostSwapLoaded =
    state.prospectiveSwap.infoPostSwap.status === 'success' &&
    state.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance *
      (state.prospectiveSwap.mode === 'fixed' ? -1 : 1) ===
      state.prospectiveSwap.notionalAmount;
  const isWalletBalanceLoaded = state.walletBalance.status === 'success';
  const isWalletTokenAllowanceLoaded = state.walletTokenAllowance.status === 'success';

  if (!state.amm || !state.amm.signer) {
    state.submitButton = {
      state: 'connect-wallet',
      disabled: true,
      message: {
        text: 'Almost ready',
        isError: false,
      },
    };
    return;
  }

  if (
    !isUserInputMarginError(state) &&
    isWalletTokenAllowanceLoaded &&
    state.walletTokenAllowance.value < state.userInput.marginAmount.value
  ) {
    state.submitButton = {
      state: 'approve',
      disabled: false,
      message: {
        text: `Please approve ${state.amm.underlyingToken.name.toUpperCase()}`,
        isError: false,
      },
    };
    return;
  }

  if (
    isWalletBalanceLoaded &&
    state.userInput.marginAmount.editMode === 'add' &&
    state.userInput.marginAmount.value > state.walletBalance.value
  ) {
    state.submitButton = {
      state: 'not-enough-balance',
      disabled: true,
      message: {
        text: `You have got not enough ${state.amm.underlyingToken.name.toUpperCase()}`,
        isError: false,
      },
    };
    return;
  }

  if (
    !isUserInputMarginError(state) &&
    !isUserInputMarginError(state) &&
    isProspectiveSwapNotionalValid &&
    isProspectiveSwapMarginValid &&
    isProspectiveSwapNotionalMarginValid &&
    isInfoPostSwapLoaded &&
    isWalletBalanceLoaded &&
    isWalletTokenAllowanceLoaded
  ) {
    state.submitButton = {
      state: state.prospectiveSwap.notionalAmount !== 0 ? 'swap' : 'margin-update',
      disabled: false,
      message: {
        text: "Token approved, let's trade",
        isError: false,
      },
    };
    return;
  }

  state.submitButton = {
    state: 'swap',
    disabled: true,
    message: {
      text: 'Almost ready',
      isError: false,
    },
  };
};

const updateProspectiveSwapParams = (state: Draft<SliceState>): void => {
  state.prospectiveSwap.mode = getProspectiveSwapMode(state);
  state.prospectiveSwap.notionalAmount = getProspectiveSwapNotional(state);
  state.prospectiveSwap.marginAmount = getProspectiveSwapMargin(state);
};

export const slice = createSlice({
  name: 'swapForm',
  initialState,
  reducers: {
    resetStateAction: () => initialState,
    openSwapConfirmationFlowAction: (state) => {
      state.swapConfirmationFlow.step = 'swapConfirmation';
    },
    closeSwapConfirmationFlowAction: (state) => {
      state.swapConfirmationFlow = {
        step: null,
        error: null,
        txHash: null,
      };
    },
    openMarginUpdateConfirmationFlowAction: (state) => {
      state.marginUpdateConfirmationFlow.step = 'marginUpdateConfirmation';
    },
    closeMarginUpdateConfirmationFlowAction: (state) => {
      state.marginUpdateConfirmationFlow = {
        step: null,
        error: null,
        txHash: null,
      };
    },
    setUserInputModeAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: 'fixed' | 'variable';
      }>,
    ) => {
      state.userInput.mode = value;
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

      updateProspectiveSwapParams(state);
      validateUserInputAndUpdateSubmitButton(state);
    },
    setNotionalAmountAction: (
      state,
      {
        payload: { value, editMode },
      }: PayloadAction<{
        value?: number;
        editMode?: 'add' | 'remove';
      }>,
    ) => {
      if (value !== undefined) {
        state.userInput.notionalAmount.value = value;
      }

      if (editMode !== undefined) {
        state.userInput.notionalAmount.editMode = editMode;
      }

      updateProspectiveSwapParams(state);
      updateLeverage(state);
      validateUserInputAndUpdateSubmitButton(state);
    },
    setMarginAmountAction: (
      state,
      {
        payload: { value, editMode },
      }: PayloadAction<{
        value?: number;
        editMode?: 'add' | 'remove';
      }>,
    ) => {
      if (value !== undefined) {
        state.userInput.marginAmount.value = value;
      }

      if (editMode !== undefined) {
        state.userInput.marginAmount.editMode = editMode;
      }

      updateProspectiveSwapParams(state);
      updateLeverage(state);
      validateUserInputAndUpdateSubmitButton(state);
    },
    setLeverageAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: number;
      }>,
    ) => {
      if (state.prospectiveSwap.notionalAmount === 0 || isNaN(value) || value === 0) {
        state.userInput.leverage = null;
        return;
      }

      state.userInput.leverage = value;
      state.userInput.marginAmount.value = stringToBigFloat(
        limitAndFormatNumber(
          state.prospectiveSwap.notionalAmount / value,
          SwapFormNumberLimits.digitLimit,
          SwapFormNumberLimits.decimalLimit,
          'ceil',
        ),
      );

      validateUserInputAndUpdateSubmitButton(state);
      checkLowLeverageNotification(state);
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
      .addCase(getUnderlyingTokenAllowanceThunk.pending, (state) => {
        state.walletTokenAllowance = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getUnderlyingTokenAllowanceThunk.rejected, (state) => {
        state.walletTokenAllowance = {
          value: 0,
          status: 'error',
        };
      })
      .addCase(getUnderlyingTokenAllowanceThunk.fulfilled, (state, { payload }) => {
        state.walletTokenAllowance = {
          value: payload as number,
          status: 'success',
        };
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(approveUnderlyingTokenThunk.pending, (state) => {
        state.submitButton = {
          state: 'approving',
          disabled: true,
          message: {
            text: 'Waiting for confirmation...',
            isError: false,
          },
        };
      })
      .addCase(approveUnderlyingTokenThunk.rejected, (state) => {
        state.submitButton = {
          state: 'approve',
          disabled: false,
          message: {
            text: 'Signature declined by user',
            isError: true,
          },
        };
      })
      .addCase(approveUnderlyingTokenThunk.fulfilled, (state, { payload }) => {
        state.walletTokenAllowance = {
          value: payload as number,
          status: 'success',
        };
        validateUserInputAndUpdateSubmitButton(state);
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
        const { notionalAmount, swapMode, infoPostSwap, earlyReturn } = payload as {
          notionalAmount: number;
          swapMode: 'fixed' | 'variable';
          infoPostSwap: InfoPostSwapV1;
          earlyReturn: boolean; //TODO Alex: maybe refactor this
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
          state.poolSwapInfo.availableNotional[swapMode] = infoPostSwap.availableNotional;
        }

        updateCashflowCalculator(state);
        validateUserInputAndUpdateSubmitButton(state);
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
        if (state.position.value) {
          state.userInput.mode = getExistingPositionMode(state) as 'fixed' | 'variable';
          updateProspectiveSwapParams(state);
        }
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(confirmSwapThunk.pending, (state) => {
        state.swapConfirmationFlow = {
          step: 'waitingForSwapConfirmation',
          error: null,
          txHash: null,
        };
      })
      .addCase(confirmSwapThunk.rejected, (state, { payload }) => {
        state.swapConfirmationFlow = {
          step: 'swapConfirmation',
          error: payload as string,
          txHash: null,
        };
      })
      .addCase(confirmSwapThunk.fulfilled, (state, { payload }) => {
        state.swapConfirmationFlow = {
          step: 'swapCompleted',
          error: null,
          txHash: (payload as ContractReceipt).transactionHash,
        };
      })
      .addCase(confirmMarginUpdateThunk.pending, (state) => {
        state.marginUpdateConfirmationFlow = {
          step: 'waitingForMarginUpdateConfirmation',
          error: null,
          txHash: null,
        };
      })
      .addCase(confirmMarginUpdateThunk.rejected, (state, { payload }) => {
        state.marginUpdateConfirmationFlow = {
          step: 'marginUpdateConfirmation',
          error: payload as string,
          txHash: null,
        };
      })
      .addCase(confirmMarginUpdateThunk.fulfilled, (state, { payload }) => {
        state.marginUpdateConfirmationFlow = {
          step: 'marginUpdateCompleted',
          error: null,
          txHash: (payload as ContractReceipt).transactionHash,
        };
      });
  },
});
export const {
  resetStateAction,
  setUserInputModeAction,
  setSwapFormAMMAction,
  setNotionalAmountAction,
  setMarginAmountAction,
  setLeverageAction,
  setPredictedApyAction,
  openSwapConfirmationFlowAction,
  closeSwapConfirmationFlowAction,
  openMarginUpdateConfirmationFlowAction,
  closeMarginUpdateConfirmationFlowAction,
} = slice.actions;
export const swapFormReducer = slice.reducer;
