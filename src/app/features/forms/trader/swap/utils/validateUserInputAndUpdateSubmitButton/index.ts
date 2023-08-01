import { Draft } from '@reduxjs/toolkit';
import { AMM } from '@voltz-protocol/v1-sdk';

import { isAMMPaused } from '../../../../../../../utilities/amm';
import { isUserInputMarginError, isUserInputNotionalError } from '../../../../common';
import { SliceState } from '../../state';
import { getProspectiveSwapMargin } from '../getProspectiveSwapMargin';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';
import { hasExistingPosition } from '../hasExistingPosition';
import { validateUserInput } from '../validateUserInput';

export const validateUserInputAndUpdateSubmitButton = (state: Draft<SliceState>): void => {
  validateUserInput(state);

  const existingPosition = hasExistingPosition(state);
  const prospectiveSwapNotional = getProspectiveSwapNotional(state);
  const prospectiveSwapMargin = getProspectiveSwapMargin(state);
  const marginAmountEditMode = state.userInput.marginAmount.editMode;
  const userInputMarginAmount = state.userInput.marginAmount.value;
  const fee = state.prospectiveSwap.infoPostSwap.value.fee;
  const marginError = isUserInputMarginError(state);
  const notionalError = isUserInputNotionalError(state);

  const isProspectiveSwapNotionalValid = existingPosition || prospectiveSwapNotional > 0;
  const isProspectiveSwapMarginValid = existingPosition || prospectiveSwapMargin > 0;
  const isProspectiveSwapNotionalMarginValid =
    prospectiveSwapNotional !== 0 || prospectiveSwapMargin !== 0;
  const isInfoPostSwapLoaded = state.prospectiveSwap.infoPostSwap.status === 'success';
  const isWalletBalanceLoaded = state.walletBalance.status === 'success';
  const isWalletTokenAllowanceLoaded = state.walletTokenAllowance.status === 'success';

  if (!state.amm || !state.amm.signer) {
    state.submitButton = {
      state: 'connect-wallet',
      disabled: true,
      message: {
        text: 'Almost ready',
        type: 'info',
      },
    };
    return;
  }

  if (isAMMPaused(state.amm as AMM)) {
    state.submitButton = {
      state: 'paused',
      disabled: true,
      message: {
        text: 'Pool paused until further notice. Check Discord for updates.',
        type: 'warning',
      },
    };
    return;
  }

  const ammToken = state.amm.underlyingToken.name.toUpperCase();

  if (!marginError && isWalletTokenAllowanceLoaded && marginAmountEditMode === 'add') {
    const walletTokenAllowance = state.walletTokenAllowance.value;
    if (walletTokenAllowance < userInputMarginAmount) {
      state.submitButton = {
        state: 'approve',
        disabled: false,
        message: {
          text: `Please approve ${ammToken}`,
          type: 'info',
        },
      };
      return;
    }

    if (
      !notionalError &&
      isInfoPostSwapLoaded &&
      walletTokenAllowance < userInputMarginAmount + fee
    ) {
      state.submitButton = {
        state: 'approve',
        disabled: false,
        message: {
          text: `Please approve ${ammToken}. Approval amount must cover for both the margin and the fees.`,
          type: 'info',
        },
      };
      return;
    }
  }

  if (isWalletBalanceLoaded && marginAmountEditMode === 'add') {
    const walletBalance = state.walletBalance.value;
    if (userInputMarginAmount > walletBalance) {
      state.submitButton = {
        state: 'not-enough-balance',
        disabled: true,
        message: {
          text: '',
          type: 'info',
        },
      };
      return;
    }

    if (!notionalError && isInfoPostSwapLoaded && userInputMarginAmount + fee > walletBalance) {
      state.submitButton = {
        state: 'not-enough-balance',
        disabled: true,
        message: {
          text: `Insufficient ${ammToken} balance to cover for both the margin and the fees.`,
          type: 'error',
        },
      };
      return;
    }
  }

  if (
    !marginError &&
    !notionalError &&
    isProspectiveSwapNotionalValid &&
    isProspectiveSwapMarginValid &&
    isProspectiveSwapNotionalMarginValid &&
    isInfoPostSwapLoaded &&
    isWalletBalanceLoaded &&
    isWalletTokenAllowanceLoaded
  ) {
    state.submitButton = {
      state: prospectiveSwapNotional !== 0 ? 'swap' : 'margin-update',
      disabled: false,
      message: {
        text: "Token approved, let's trade",
        type: 'info',
      },
    };
    return;
  }

  state.submitButton = {
    state: 'swap',
    disabled: true,
    message: {
      text: 'Almost ready',
      type: 'info',
    },
  };
};
