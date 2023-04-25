import { Draft } from '@reduxjs/toolkit';

import { isUserInputMarginError } from '../../../common/utils';
import { SliceState } from '../../reducer';
import { getProspectiveSwapMargin } from '../getProspectiveSwapMargin';
import { getProspectiveSwapMode } from '../getProspectiveSwapMode';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';
import { hasExistingPosition } from '../hasExistingPosition';
import { validateUserInput } from '../validateUserInput';

export const validateUserInputAndUpdateSubmitButton = (state: Draft<SliceState>): void => {
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
    state.userInput.marginAmount.editMode === 'add'
  ) {
    if (state.walletTokenAllowance.value < state.userInput.marginAmount.value) {
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
      isInfoPostSwapLoaded &&
      state.walletTokenAllowance.value <
        state.userInput.marginAmount.value + state.prospectiveSwap.infoPostSwap.value.fee
    ) {
      state.submitButton = {
        state: 'approve',
        disabled: false,
        message: {
          text: `Please approve ${state.amm.underlyingToken.name.toUpperCase()}. Approval amount must cover for both the margin and the fees.`,
          isError: false,
        },
      };
      return;
    }
  }

  if (isWalletBalanceLoaded && state.userInput.marginAmount.editMode === 'add') {
    if (state.userInput.marginAmount.value > state.walletBalance.value) {
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
      isInfoPostSwapLoaded &&
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
  }

  if (
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
