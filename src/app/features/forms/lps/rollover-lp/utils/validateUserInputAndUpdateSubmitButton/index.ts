import { Draft } from '@reduxjs/toolkit';
import { AMM } from '@voltz-protocol/v1-sdk/dist/types';

import { isAMMPaused } from '../../../../../../../utilities/amm';
import { isUserInputMarginError } from '../../../../common';
import { SliceState } from '../../state';
import { getAvailableMargin } from '../getAvailableMargin';
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
        type: 'info',
      },
    };
    return;
  }
  if (isWalletBalanceLoaded && state.previousPosition !== null) {
    const allowedBalance = getAvailableMargin(state)!;
    if (state.userInput.marginAmount.value > allowedBalance) {
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
  }

  if (isWalletBalanceLoaded && state.previousPosition !== null && isInfoPostLpLoaded) {
    const allowedBalance = getAvailableMargin(state)!;
    if (state.userInput.marginAmount.value > allowedBalance) {
      state.submitButton = {
        state: 'not-enough-balance',
        disabled: true,
        message: {
          text: `Insufficient ${state.amm.underlyingToken.name.toUpperCase()} balance to cover for margin.`,
          type: 'error',
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
        type: 'error',
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
        type: 'info',
      },
    };
    return;
  }

  state.submitButton = {
    state: 'rollover',
    disabled: true,
    message: {
      text: 'Almost ready',
      type: 'info',
    },
  };
};
