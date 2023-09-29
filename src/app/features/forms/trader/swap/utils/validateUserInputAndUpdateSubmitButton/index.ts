import { Draft } from '@reduxjs/toolkit';

import { isPoolPaused } from '../../../../../../../utilities/amm';
import { SliceState } from '../../state';
import { validateUserInput } from '../validateUserInput';

export const validateUserInputAndUpdateSubmitButton = (state: Draft<SliceState>): void => {
  validateUserInput(state);

  if (!state.pool || !state.signer) {
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

  if (isPoolPaused(state.pool)) {
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

  // TODO: FB - Should be part of the deposit flow
  // const ammToken = state.pool.underlyingToken.name.toUpperCase();
  //
  // if (isWalletTokenAllowanceLoaded) {
  //   const walletTokenAllowance = state.walletTokenAllowance.value;
  //
  //   if (
  //     !notionalError &&
  //     isSwapSimulationLoaded &&
  //     walletTokenAllowance < userInputMarginAmount + fee
  //   ) {
  //     state.submitButton = {
  //       state: 'approve',
  //       disabled: false,
  //       message: {
  //         text: `Please approve ${ammToken}. Approval amount must cover for both the margin and the fees.`,
  //         type: 'info',
  //       },
  //     };
  //     return;
  //   }
  // }
  //
  // if (
  //   !notionalError &&
  //   isProspectiveSwapNotionalValid &&
  //   isProspectiveSwapNotionalMarginValid &&
  //   isSwapSimulationLoaded &&
  //   isWalletBalanceLoaded &&
  //   isWalletTokenAllowanceLoaded
  // ) {
  //   state.submitButton = {
  //     state: 'swap',
  //     disabled: false,
  //     message: {
  //       text: "Token approved, let's trade",
  //       type: 'info',
  //     },
  //   };
  //   return;
  // }

  state.submitButton = {
    state: 'swap',
    disabled: true,
    message: {
      text: 'Almost ready',
      type: 'info',
    },
  };
};
