import { Draft } from '@reduxjs/toolkit';

import { isUserInputMarginError } from '../../../../common/utils';
import { SliceState } from '../../state';
import { getProspectiveSwapMargin } from '../getProspectiveSwapMargin';
import { getProspectiveSwapMode } from '../getProspectiveSwapMode';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';
import { validateUserInput } from '../validateUserInput';

export const validateUserInputAndUpdateSubmitButton = (state: Draft<SliceState>): void => {
  validateUserInput(state);

  const prospectiveSwapNotional = getProspectiveSwapNotional(state);
  const prospectiveSwapMargin = getProspectiveSwapMargin(state);
  const userInputMarginAmount = state.userInput.marginAmount.value;
  const fee = state.prospectiveSwap.infoPostSwap.value.fee;
  const marginError = isUserInputMarginError(state);

  const isProspectiveSwapNotionalValid = prospectiveSwapNotional > 0;
  const isProspectiveSwapMarginValid = prospectiveSwapMargin > 0;
  const isProspectiveSwapNotionalMarginValid =
    prospectiveSwapNotional !== 0 || prospectiveSwapMargin !== 0;
  const isInfoPostSwapLoaded =
    state.prospectiveSwap.infoPostSwap.status === 'success' &&
    state.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance *
      (getProspectiveSwapMode(state) === 'fixed' ? -1 : 1) ===
      prospectiveSwapNotional;
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

  const ammToken = state.amm.underlyingToken.name.toUpperCase();

  if (!marginError && isWalletTokenAllowanceLoaded) {
    const walletTokenAllowance = state.walletTokenAllowance.value;
    if (walletTokenAllowance < userInputMarginAmount) {
      state.submitButton = {
        state: 'approve',
        disabled: false,
        message: {
          text: `Please approve ${ammToken}`,
          isError: false,
        },
      };
      return;
    }

    if (isInfoPostSwapLoaded && walletTokenAllowance < userInputMarginAmount + fee) {
      state.submitButton = {
        state: 'approve',
        disabled: false,
        message: {
          text: `Please approve ${ammToken}. Approval amount must cover for both the margin and the fees.`,
          isError: false,
        },
      };
      return;
    }
  }

  if (isWalletBalanceLoaded && state.previousPosition !== null) {
    const walletBalance = state.walletBalance.value;
    const settlementCashflow = state.previousPosition.settlementCashflow;
    const margin = state.previousPosition.margin;
    const fees = state.previousPosition.fees;
    const allowedBalance = walletBalance + settlementCashflow + margin + fees;
    if (userInputMarginAmount > allowedBalance) {
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

    if (isInfoPostSwapLoaded && userInputMarginAmount + fee > allowedBalance) {
      state.submitButton = {
        state: 'not-enough-balance',
        disabled: true,
        message: {
          text: `Insufficient ${ammToken} balance to cover for both the margin and the fees.`,
          isError: true,
        },
      };
      return;
    }
  }

  if (
    !marginError &&
    isProspectiveSwapNotionalValid &&
    isProspectiveSwapMarginValid &&
    isProspectiveSwapNotionalMarginValid &&
    isInfoPostSwapLoaded &&
    isWalletBalanceLoaded &&
    isWalletTokenAllowanceLoaded
  ) {
    state.submitButton = {
      state: 'rollover',
      disabled: false,
      message: {
        text: "Token approved, let's trade",
        isError: false,
      },
    };
    return;
  }

  state.submitButton = {
    state: 'rollover',
    disabled: true,
    message: {
      text: 'Almost ready',
      isError: false,
    },
  };
};
