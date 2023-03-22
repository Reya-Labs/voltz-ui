import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { AMM, InfoPostLpV1, Position } from '@voltz-protocol/v1-sdk';
import { ContractReceipt } from 'ethers';

import { formatNumber, roundIntegerNumber, stringToBigFloat } from '../../../utilities/number';
import {
  approveUnderlyingTokenThunk,
  confirmLpThunk,
  confirmMarginUpdateThunk,
  getFixedRateThunk,
  getInfoPostLpThunk,
  getPoolLpInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getVariableRate24hAgoThunk,
  getVariableRateThunk,
  getWalletBalanceThunk,
  setSignerAndPositionForAMMThunk,
  SetSignerAndPositionForAMMThunkSuccess,
} from './thunks';
import {
  checkLowLeverageNotification, // todo: to we intend to use this component for the lp form as well, is it in designs?
  getProspectiveLpMargin, // todo: check if need to make any changes to the logic
  // todo: in contexto of trading/swapping notional represents the net notional filled of the position
  // in context of lp is the notional liquidity provided -> can change as lps mint and burn liquidity
  getProspectiveLpNotional,
  hasExistingPosition,
  isUserInputMarginError,
  lpFormLimitAndFormatNumber,
  updateLeverage,
  validateUserInput,
} from './utils';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  submitButton: {
    state:
      | 'lp'
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
  poolLpInfo: {
    maxLeverage: number;
    status: ThunkStatus;
  };
  // the lp form is a slice of the redux store and userInput is a "slice of a slice", doesn't have actions
  userInput: {
    // User-inputted notional amount of liquidity they want to provide or remove from the vamm
    notionalAmount: {
      value: number;
      // provide -> user is adding more liquidity into the vamm, remove means the user is removing liquidity from vamm
      editMode: 'add' | 'remove';
      error: string | null;
    };
    // User-inputted margin amount (same as the swap form)
    marginAmount: {
      value: number;
      editMode: 'add' | 'remove';
      error: string | null;
    };
    leverage: number | null; // todo: check if the current desing for lps has leverage
    // user-inputted fixed rate range along which liquidity is provided
    fixedLower: number | null;
    fixedUpper: number | null;
  };
  // State of prospective liquidity provisioning or liquidity removal operation
  prospectiveLp: {
    // Leverage options
    leverage: {
      options: number[];
      maxLeverage: string;
    };
    infoPostLp: {
      value: {
        // Margin requirement for prospective lp operation (either removing or adding liquidity)
        marginRequirement: number;
        // Max margin that can be withdrawn after prospective liquidity addition or removal operation
        maxMarginWithdrawable: number;
        // Extra information about prospective swap
        gasFeeETH: number;
      };
      status: ThunkStatus;
    };
  };
  lpConfirmationFlow: {
    step: 'lpConfirmation' | 'waitingForLpConfirmation' | 'lpCompleted' | null;
    error: string | null;
    txHash: string | null;
  };
  // note, behaviour is the same as in the swap form
  marginUpdateConfirmationFlow: {
    step:
      | 'marginUpdateConfirmation'
      | 'waitingForMarginUpdateConfirmation'
      | 'marginUpdateCompleted'
      | null;
    error: string | null;
    txHash: string | null;
  };
  // todo: assuming we want to also show low leverage notification for lps?
  // intuitively makes sense but worth confirming
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
  poolLpInfo: {
    maxLeverage: 0,
    status: 'idle',
  },
  userInput: {
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
    fixedLower: null,
    fixedUpper: null,
  },
  prospectiveLp: {
    leverage: {
      options: [0, 0, 0],
      maxLeverage: '--',
    },
    infoPostLp: {
      value: {
        marginRequirement: 0,
        maxMarginWithdrawable: 0,
        gasFeeETH: 0,
      },
      status: 'idle',
    },
  },
  lpConfirmationFlow: {
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

// todo: this logic is the same as swap form
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

const updateLeverageOptionsAfterGetPoolLpInfo = (state: Draft<SliceState>): void => {
  const maxLeverage = formatNumber(Math.floor(state.poolLpInfo.maxLeverage), 0, 0);
  state.prospectiveLp.leverage.maxLeverage = maxLeverage;
  state.prospectiveLp.leverage.options = calculateLeverageOptions(maxLeverage);
};

const updateLeverageOptionsAfterGetInfoPostLp = (state: Draft<SliceState>): void => {
  let maxLeverage = '--';
  if (
    !state.userInput.notionalAmount.error &&
    state.prospectiveLp.infoPostLp.status === 'success'
  ) {
    if (state.prospectiveLp.infoPostLp.value.marginRequirement > 0) {
      maxLeverage = formatNumber(
        Math.floor(
          getProspectiveLpNotional(state) / state.prospectiveLp.infoPostLp.value.marginRequirement,
        ),
        0,
        0,
      );
    } else {
      maxLeverage = formatNumber(Math.floor(state.poolLpInfo.maxLeverage), 0, 0);
    }
  }

  state.prospectiveLp.leverage.maxLeverage = maxLeverage;
  state.prospectiveLp.leverage.options = calculateLeverageOptions(maxLeverage);
};

const validateUserInputAndUpdateSubmitButton = (state: Draft<SliceState>): void => {
  validateUserInput(state);

  const isProspectiveLpNotionalValid =
    hasExistingPosition(state) || getProspectiveLpNotional(state) > 0;
  const isProspectiveLpMarginValid =
    hasExistingPosition(state) || getProspectiveLpMargin(state) > 0;
  const isProspectiveLpNotionalMarginValid =
    getProspectiveLpNotional(state) !== 0 || getProspectiveLpMargin(state) !== 0;
  // todo: in the swap implementation there are more checks worth revisiting
  const isInfoPostLpLoaded = state.prospectiveLp.infoPostLp.status === 'success';
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
    isInfoPostLpLoaded &&
    state.userInput.marginAmount.editMode === 'add'
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
    isProspectiveLpNotionalValid &&
    isProspectiveLpMarginValid &&
    isProspectiveLpNotionalMarginValid &&
    isInfoPostLpLoaded &&
    isWalletBalanceLoaded &&
    isWalletTokenAllowanceLoaded
  ) {
    state.submitButton = {
      state: getProspectiveLpNotional(state) !== 0 ? 'lp' : 'margin-update',
      disabled: false,
      message: {
        text: "Token approved, let's trade",
        isError: false,
      },
    };
    return;
  }

  state.submitButton = {
    state: 'lp',
    disabled: true,
    message: {
      text: 'Almost ready',
      isError: false,
    },
  };
};

export const slice = createSlice({
  name: 'lpForm',
  initialState,
  reducers: {
    resetStateAction: () => initialState,
    openLpConfirmationFlowAction: (state) => {
      state.lpConfirmationFlow.step = 'lpConfirmation';
    },
    closeLpConfirmationFlowAction: (state) => {
      state.lpConfirmationFlow = {
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
        value: number | null;
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
        value: number | null;
      }>,
    ) => {
      state.userInput.fixedUpper = value;
      // todo: validation
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

      // todo: not sure if edit mode is relevant for lps -> removing and adding notional is already an edit flow
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
      if (getProspectiveLpNotional(state) === 0 || isNaN(value) || value === 0) {
        state.userInput.leverage = null;
        return;
      }

      state.userInput.leverage = value;
      state.userInput.marginAmount.value = stringToBigFloat(
        lpFormLimitAndFormatNumber(getProspectiveLpNotional(state) / value, 'ceil'),
      );

      validateUserInputAndUpdateSubmitButton(state);
      state.showLowLeverageNotification = checkLowLeverageNotification(state);
    },
    setLpFormAMMAction: (
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
      .addCase(getPoolLpInfoThunk.pending, (state) => {
        state.poolLpInfo = {
          maxLeverage: 0,
          status: 'pending',
        };
      })
      .addCase(getPoolLpInfoThunk.rejected, (state) => {
        state.poolLpInfo = {
          maxLeverage: 0,
          status: 'error',
        };
      })
      .addCase(getPoolLpInfoThunk.fulfilled, (state, { payload }) => {
        // todo: consider having max leverage add and max leverage remove -> more aligned with how we do things in the swap form
        const { maxLeverage } = payload as {
          maxLeverage: number;
        };
        state.poolLpInfo = {
          maxLeverage: maxLeverage,
          status: 'success',
        };
        updateLeverageOptionsAfterGetPoolLpInfo(state);
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(getInfoPostLpThunk.pending, (state) => {
        // todo: needs to be updated
        state.prospectiveLp.infoPostLp = {
          value: {
            marginRequirement: 0,
            maxMarginWithdrawable: 0,
            gasFeeETH: 0,
          },
          status: 'pending',
        };
      })
      .addCase(getInfoPostLpThunk.rejected, (state) => {
        state.prospectiveLp.infoPostLp = {
          value: {
            marginRequirement: 0,
            maxMarginWithdrawable: 0,
            gasFeeETH: 0,
          },
          status: 'error',
        };
      })
      .addCase(getInfoPostLpThunk.fulfilled, (state, { payload }) => {
        const { infoPostLp, earlyReturn } = payload as {
          infoPostLp: InfoPostLpV1;
          earlyReturn: boolean; //TODO Alex: maybe refactor this
        };

        if (earlyReturn) {
          state.prospectiveLp.infoPostLp = {
            value: {
              marginRequirement: 0,
              maxMarginWithdrawable: 0,
              gasFeeETH: 0,
            },
            status: 'idle',
          };
          return;
        }

        state.prospectiveLp.infoPostLp = {
          value: {
            marginRequirement: infoPostLp.marginRequirement,
            maxMarginWithdrawable: infoPostLp.maxMarginWithdrawable,
            gasFeeETH: infoPostLp.gasFeeETH,
          },
          status: 'success',
        };

        updateLeverageOptionsAfterGetInfoPostLp(state);
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
        // todo: not sure if we need a version of the below logic
        // if (state.position.value) {
        //   state.userInput.mode = getExistingPositionMode(state) as 'fixed' | 'variable';
        // }
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(confirmLpThunk.pending, (state) => {
        state.lpConfirmationFlow = {
          step: 'waitingForLpConfirmation',
          error: null,
          txHash: null,
        };
      })
      .addCase(confirmLpThunk.rejected, (state, { payload }) => {
        state.lpConfirmationFlow = {
          step: 'lpConfirmation',
          error: payload as string,
          txHash: null,
        };
      })
      .addCase(confirmLpThunk.fulfilled, (state, { payload }) => {
        state.lpConfirmationFlow = {
          step: 'lpCompleted',
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
  setLpFormAMMAction,
  setNotionalAmountAction,
  setMarginAmountAction,
  setLeverageAction,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
  openLpConfirmationFlowAction,
  closeLpConfirmationFlowAction,
  openMarginUpdateConfirmationFlowAction,
  closeMarginUpdateConfirmationFlowAction,
} = slice.actions;
export const lpFormReducer = slice.reducer;
