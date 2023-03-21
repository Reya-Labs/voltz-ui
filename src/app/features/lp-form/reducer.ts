import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { AMM, ExpectedCashflowInfo, InfoPostSwapV1, Position } from '@voltz-protocol/v1-sdk';
import { ContractReceipt } from 'ethers';

import { formatNumber, roundIntegerNumber, stringToBigFloat } from '../../../utilities/number';
import {
  approveUnderlyingTokenThunk,
  confirmMarginUpdateThunk,
  confirmSwapThunk,
  getExpectedCashflowInfoThunk,
  getFixedRateThunk,
  getInfoPostSwapThunk,
  getPoolSwapInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getVariableRate24hAgoThunk,
  getVariableRateThunk,
  getWalletBalanceThunk,
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
  swapFormLimitAndFormatNumber,
  updateLeverage,
  validateUserInput,
} from './utils';

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
  // the lp form is a slice of the redux store and userInput is a "slice of a slice", doesn't have actions
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
    estimatedApy: number; // todo: remove this
    // user-inputted fixed rate range along which liquidity is provided
    fixedLower: number | null;
    fixedUpper: number | null;
  };
  // State of prospective swap
  prospectiveSwap: {
    // Leverage options
    leverage: {
      options: number[];
      maxLeverage: string;
    };
    infoPostSwap: {
      value: {
        // Margin requirement for prospective swap
        marginRequirement: number;
        // Max margin that can be withdrawn after prospective swap
        maxMarginWithdrawable: number;
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
    cashflowInfo: {
      averageFixedRate: number;
      accruedCashflowExistingPosition: number;
      accruedCashflowEditPosition: number;
      estimatedAdditionalCashflow: (estimatedApy: number) => number;
      estimatedTotalCashflow: (estimatedApy: number) => number;
      status: ThunkStatus;
    };
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
    estimatedApy: 0,
    fixedLower: null,
    fixedUpper: null
  },
  prospectiveSwap: {
    leverage: {
      options: [0, 0, 0],
      maxLeverage: '--',
    },
    infoPostSwap: {
      value: {
        marginRequirement: 0,
        maxMarginWithdrawable: 0,
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
    cashflowInfo: {
      averageFixedRate: 0,
      accruedCashflowExistingPosition: 0,
      accruedCashflowEditPosition: 0,
      estimatedAdditionalCashflow: () => 0,
      estimatedTotalCashflow: () => 0,
      status: 'idle',
    },
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

const calculateLeverageOptions = (maxLeverage: string) => {
  if (maxLeverage === '--') {
    return [0, 0, 0];
  }
  let maxLeverageOption = stringToBigFloat(maxLeverage);
  maxLeverageOption = roundIntegerNumber(
    maxLeverageOption,
    Math.max(
      0,
      Math.floor(maxLeverageOption.toString().length / 2) -
        1 +
        (maxLeverageOption.toString().length % 2),
    ),
  );
  return [
    Math.floor(maxLeverageOption / 4),
    Math.floor(maxLeverageOption / 2),
    Math.floor(maxLeverageOption),
  ];
};

const updateLeverageOptionsAfterGetPoolSwapInfo = (state: Draft<SliceState>): void => {
  const maxLeverage = formatNumber(
    Math.floor(state.poolSwapInfo.maxLeverage[getProspectiveSwapMode(state)]),
    0,
    0,
  );
  state.prospectiveSwap.leverage.maxLeverage = maxLeverage;
  state.prospectiveSwap.leverage.options = calculateLeverageOptions(maxLeverage);
};

const updateLeverageOptionsAfterGetInfoPostSwap = (state: Draft<SliceState>): void => {
  let maxLeverage = '--';
  if (
    !state.userInput.notionalAmount.error &&
    state.prospectiveSwap.infoPostSwap.status === 'success'
  ) {
    if (state.prospectiveSwap.infoPostSwap.value.marginRequirement > 0) {
      maxLeverage = formatNumber(
        Math.floor(
          getProspectiveSwapNotional(state) /
            state.prospectiveSwap.infoPostSwap.value.marginRequirement,
        ),
        0,
        0,
      );
    } else {
      maxLeverage = formatNumber(
        Math.floor(state.poolSwapInfo.maxLeverage[getProspectiveSwapMode(state)]),
        0,
        0,
      );
    }
  }

  state.prospectiveSwap.leverage.maxLeverage = maxLeverage;
  state.prospectiveSwap.leverage.options = calculateLeverageOptions(maxLeverage);
};

const validateUserInputAndUpdateSubmitButton = (state: Draft<SliceState>): void => {
  validateUserInput(state);

  const isProspectiveSwapNotionalValid =
    hasExistingPosition(state) || getProspectiveSwapNotional(state) > 0;
  const isProspectiveSwapMarginValid =
    hasExistingPosition(state) || getProspectiveSwapMargin(state) > 0;
  const isProspectiveSwapNotionalMarginValid =
    getProspectiveSwapNotional(state) !== 0 || getProspectiveSwapMargin(state) !== 0;
  const isInfoPostSwapLoaded =
    state.prospectiveSwap.infoPostSwap.status === 'success' &&
    state.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance *
      (getProspectiveSwapMode(state) === 'fixed' ? -1 : 1) ===
      getProspectiveSwapNotional(state);
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
        text: '',
        isError: false,
      },
    };
    return;
  }

  if (
    isWalletBalanceLoaded &&
    isInfoPostSwapLoaded &&
    state.userInput.marginAmount.editMode === 'add' &&
    state.userInput.marginAmount.value + state.prospectiveSwap.infoPostSwap.value.fee >
      state.walletBalance.value
  ) {
    state.submitButton = {
      state: 'not-enough-balance',
      disabled: true,
      message: {
        text: `Insufficient ${state.amm.underlyingToken.name.toUpperCase()} balance to cover for both the margin and the fees.`,
        isError: true,
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
      state: getProspectiveSwapNotional(state) !== 0 ? 'swap' : 'margin-update',
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
    setUserInputFixedLowerAction: (
      // the current state of the lp-form slice of the redux store (defined in this file) -> we extended the type
      state,
      {
        // what you send from the frontend world with type PayloadAction and the value can be a number
        payload: { value },
      }: PayloadAction<{
        value: number | null
      }>,
    ) => {
      state.userInput.fixedLower = value;
      // todo: validation -> e.g. cannot be higher than the fixedLower, etc
    },
    setUserInputFixedUpperAction: (
      // the current state of the lp-form slice of the redux store (defined in this file) -> we extended the type
      state,
      {
        // what you send from the frontend world with type PayloadAction and the value can be a number
        payload: { value },
      }: PayloadAction<{
        value: number | null
      }>,
    ) => {
      state.userInput.fixedUpper = value;
      // todo: validation
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
          maxMarginWithdrawable: 0,
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
      if (getProspectiveSwapNotional(state) === 0 || isNaN(value) || value === 0) {
        state.userInput.leverage = null;
        return;
      }

      state.userInput.leverage = value;
      state.userInput.marginAmount.value = stringToBigFloat(
        swapFormLimitAndFormatNumber(getProspectiveSwapNotional(state) / value, 'ceil'),
      );

      validateUserInputAndUpdateSubmitButton(state);
      state.showLowLeverageNotification = checkLowLeverageNotification(state);
    },
    setEstimatedApyAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: number;
      }>,
    ) => {
      state.userInput.estimatedApy = value;
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
        validateUserInputAndUpdateSubmitButton(state);
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
      .addCase(getVariableRate24hAgoThunk.pending, (state) => {
        state.variableRate24hAgo = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getVariableRate24hAgoThunk.rejected, (state) => {
        state.variableRate24hAgo = {
          value: 0,
          status: 'error',
        };
      })
      .addCase(getVariableRate24hAgoThunk.fulfilled, (state, { payload }) => {
        state.variableRate24hAgo = {
          value: payload as number,
          status: 'success',
        };
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
        updateLeverageOptionsAfterGetPoolSwapInfo(state);
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(getInfoPostSwapThunk.pending, (state) => {
        state.prospectiveSwap.infoPostSwap = {
          value: {
            marginRequirement: 0,
            maxMarginWithdrawable: 0,
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
            maxMarginWithdrawable: 0,
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
              maxMarginWithdrawable: 0,
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
            maxMarginWithdrawable: infoPostSwap.maxMarginWithdrawable,
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

        updateLeverageOptionsAfterGetInfoPostSwap(state);
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
      })
      .addCase(getExpectedCashflowInfoThunk.pending, (state) => {
        state.prospectiveSwap.cashflowInfo.status = 'pending';
      })
      .addCase(getExpectedCashflowInfoThunk.rejected, (state, {}) => {
        state.prospectiveSwap.cashflowInfo.status = 'error';
      })
      .addCase(getExpectedCashflowInfoThunk.fulfilled, (state, { payload }) => {
        const expectedCashflowInfo = payload as ExpectedCashflowInfo;
        state.prospectiveSwap.cashflowInfo = {
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
export const {
  resetStateAction,
  setUserInputModeAction,
  setSwapFormAMMAction,
  setNotionalAmountAction,
  setMarginAmountAction,
  setLeverageAction,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
  setEstimatedApyAction,
  openSwapConfirmationFlowAction,
  closeSwapConfirmationFlowAction,
  openMarginUpdateConfirmationFlowAction,
  closeMarginUpdateConfirmationFlowAction,
} = slice.actions;
export const lpFormReducer = slice.reducer;
