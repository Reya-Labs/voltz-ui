import { Draft } from '@reduxjs/toolkit';

import { isUserInputMarginError } from '../../../../common/utils';
import { SliceState } from '../../state';
import { getProspectiveLpMargin } from '../getProspectiveLpMargin';
import { getProspectiveLpNotional } from '../getProspectiveLpNotional';
import { validateUserInput } from '../validateUserInput';

export const validateUserInputAndUpdateSubmitButton = (state: Draft<SliceState>): void => {
  validateUserInput(state);

  const prospectiveLpNotional = getProspectiveLpNotional(state);
  const isProspectiveLpNotionalValid = prospectiveLpNotional > 0;
  const prospectiveLpMargin = getProspectiveLpMargin(state);
  const marginError = isUserInputMarginError(state);
  const isProspectiveLpMarginValid = prospectiveLpMargin > 0;
  const isProspectiveLpNotionalMarginValid =
    prospectiveLpNotional !== 0 || prospectiveLpMargin !== 0;
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
    !marginError &&
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
  if (isWalletBalanceLoaded && state.previousPosition !== null) {
    const walletBalance = state.walletBalance.value;
    const settlementCashflow = state.previousPosition.settlementCashflow;
    const margin = state.previousPosition.margin;
    const fees = state.previousPosition.fees;
    const allowedBalance = walletBalance + settlementCashflow + margin + fees;
    if (state.userInput.marginAmount.value > allowedBalance) {
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
  }

  if (isWalletBalanceLoaded && state.previousPosition !== null && isInfoPostLpLoaded) {
    const walletBalance = state.walletBalance.value;
    const settlementCashflow = state.previousPosition.settlementCashflow;
    const margin = state.previousPosition.margin;
    const fees = state.previousPosition.fees;
    const allowedBalance = walletBalance + settlementCashflow + margin + fees;
    if (state.userInput.marginAmount.value > allowedBalance) {
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
    !marginError &&
    isProspectiveLpNotionalValid &&
    isProspectiveLpMarginValid &&
    isProspectiveLpNotionalMarginValid &&
    isInfoPostLpLoaded &&
    isWalletBalanceLoaded &&
    isWalletTokenAllowanceLoaded
  ) {
    state.submitButton = {
      state: 'rollover',
      disabled: false,
      message: {
        text: 'Token approved',
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
