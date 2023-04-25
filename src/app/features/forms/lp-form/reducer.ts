import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { AMM, InfoPostLp, Position } from '@voltz-protocol/v1-sdk';
import { ContractReceipt } from 'ethers';

import { formatNumber, stringToBigFloat } from '../../../../utilities/number';
import {
  calculateLeverageOptions,
  checkLowLeverageNotification,
  formLimitAndFormatNumber,
  isUserInputMarginError,
} from '../common/utils';
import {
  approveUnderlyingTokenThunk,
  confirmLpThunk,
  confirmMarginUpdateThunk,
  getInfoPostLpThunk,
  getPoolLpInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getWalletBalanceThunk,
  setSignerAndPositionsForAMMThunk,
  SetSignerAndPositionsForAMMThunkSuccess,
} from './thunks';
import {
  getProspectiveLpMargin,
  getProspectiveLpNotional,
  hasExistingPosition,
  resetNotionalAndMarginEditMode,
  updateLeverage,
  updateSelectedPosition,
  validateUserInput,
} from './utils';
import { updateLeverageOptionsAfterGetPoolLpInfo } from './utils/updateLeverageOptionsAfterGetPoolLpInfo';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  submitButton: {
    state:
      | 'lp'
      | 'margin-update'
      | 'not-enough-balance'
      | 'connect-wallet'
      | 'fixed-range-error'
      | 'approve'
      | 'approving';
    disabled: boolean;
    message: {
      text: string | null;
      isError: boolean;
    };
  };
  amm: AMM | null;
  positions: {
    value: Position[] | null;
    status: ThunkStatus;
  };
  // position from the list of positions above that matches the fixed rate range selected by user
  selectedPosition: Position | null;
  walletBalance: {
    value: number;
    status: ThunkStatus;
  };
  walletTokenAllowance: {
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
    leverage: number | null;
    // user-inputted fixed rate range along which liquidity is provided
    fixedRange: {
      lower: number | null;
      upper: number | null;
      error: string | null;
      // counts how many times update happens for lower or upper and refreshes UI
      // in case a same value is recalculated by selectors UI won't refresh
      updateCount: number;
    };
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
  selectedPosition: null,
  positions: {
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
  poolLpInfo: {
    maxLeverage: 1,
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
    fixedRange: {
      lower: null,
      upper: null,
      error: null,
      updateCount: 0,
    },
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
    state.userInput.marginAmount.editMode === 'add' &&
    state.userInput.marginAmount.value > state.walletBalance.value
  ) {
    state.submitButton = {
      state: 'not-enough-balance',
      disabled: true,
      message: {
        text: `Insufficient ${state.amm.underlyingToken.name.toUpperCase()} balance to cover for margin.`,
        isError: true,
      },
    };
    return;
  }

  if (state.userInput.fixedRange.error) {
    state.submitButton = {
      state: 'fixed-range-error',
      disabled: true,
      message: {
        text: state.userInput.fixedRange.error,
        isError: true,
      },
    };
    return;
  }

  if (
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
        text: 'Token approved',
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

const slice = createSlice({
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
      const amm = state.amm;

      if (!amm) {
        return;
      }

      let nextFixedRateLowerNumber: number | null = null;
      if (value !== null) {
        nextFixedRateLowerNumber = amm.getNextUsableFixedRate(value, 0);
      }

      state.userInput.fixedRange.lower = nextFixedRateLowerNumber;
      state.userInput.fixedRange.updateCount = state.userInput.fixedRange.updateCount + 1;
      updateSelectedPosition(state);
      validateUserInputAndUpdateSubmitButton(state);
      resetNotionalAndMarginEditMode(state);
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
      const amm = state.amm;

      if (!amm) {
        return;
      }

      let nextFixedRateUpperNumber: number | null = null;
      if (value !== null) {
        nextFixedRateUpperNumber = amm.getNextUsableFixedRate(value, 0);
      }

      state.userInput.fixedRange.upper = nextFixedRateUpperNumber;
      state.userInput.fixedRange.updateCount = state.userInput.fixedRange.updateCount + 1;
      updateSelectedPosition(state);
      validateUserInputAndUpdateSubmitButton(state);
      resetNotionalAndMarginEditMode(state);
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
      if (getProspectiveLpNotional(state) === 0 || isNaN(value) || value === 0) {
        state.userInput.leverage = null;
        state.userInput.marginAmount.value = 0;
        validateUserInputAndUpdateSubmitButton(state);
        return;
      }

      state.userInput.leverage = value;
      state.userInput.marginAmount.value = stringToBigFloat(
        formLimitAndFormatNumber(getProspectiveLpNotional(state) / value, 'ceil'),
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
      .addCase(approveUnderlyingTokenThunk.rejected, (state, { payload }) => {
        state.submitButton = {
          state: 'approve',
          disabled: false,
          message: {
            text: payload as string,
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
      .addCase(getPoolLpInfoThunk.pending, (state) => {
        state.poolLpInfo = {
          // note max leverage is a function of the fixed rate range selected by the lp
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
        let { maxLeverage } = payload as {
          maxLeverage: number;
        };
        maxLeverage = Math.floor((maxLeverage * 99) / 100);
        state.poolLpInfo = {
          maxLeverage: maxLeverage,
          status: 'success',
        };
        updateLeverageOptionsAfterGetPoolLpInfo(state);
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(getInfoPostLpThunk.pending, (state) => {
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
          infoPostLp: InfoPostLp;
          earlyReturn: boolean;
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

        const marginRequirementWithBuffer: number = (infoPostLp.marginRequirement * 101) / 100;

        state.prospectiveLp.infoPostLp = {
          value: {
            marginRequirement: marginRequirementWithBuffer,
            maxMarginWithdrawable: infoPostLp.maxMarginWithdrawable,
            gasFeeETH: infoPostLp.gasFeeETH,
          },
          status: 'success',
        };

        updateLeverageOptionsAfterGetInfoPostLp(state);
        validateUserInputAndUpdateSubmitButton(state);
      })
      .addCase(setSignerAndPositionsForAMMThunk.pending, (state) => {
        if (state.amm === null) {
          return;
        }
        state.positions.value = null;
        state.positions.status = 'pending';
        state.amm.signer = null;
      })
      .addCase(setSignerAndPositionsForAMMThunk.rejected, (state) => {
        if (state.amm === null) {
          return;
        }
        state.positions.value = null;
        state.positions.status = 'error';
        state.amm.signer = null;
      })
      .addCase(setSignerAndPositionsForAMMThunk.fulfilled, (state, { payload }) => {
        if (state.amm === null) {
          return;
        }
        state.positions.value = (payload as SetSignerAndPositionsForAMMThunkSuccess).positions;
        state.positions.status = 'success';
        state.amm.signer = (payload as SetSignerAndPositionsForAMMThunkSuccess).signer;
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