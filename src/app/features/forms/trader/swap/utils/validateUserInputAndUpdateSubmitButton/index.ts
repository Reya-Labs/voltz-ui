import { Draft } from '@reduxjs/toolkit';

import { isPoolPaused } from '../../../../../../../utilities/amm';
import { SliceState } from '../../state';
import { isDepositAndSwapFlow } from '../isDepositAndSwapFlow';
import { validateUserInput } from '../validateUserInput';

export const validateUserInputAndUpdateSubmitButton = (state: Draft<SliceState>): void => {
  validateUserInput(state);

  // validateUserInput mutates the state
  const notionalInputted = state.userInput.notionalAmount.value;
  const emptyNotionalValue = notionalInputted <= 0;

  if (!state.marginAccount) {
    state.submitButton = {
      state: 'select-margin-account',
      text: 'Select a Margin Account',
      disabled: true,
      message: {
        text: 'Almost ready',
        type: 'info',
      },
    };
    return;
  }

  if (!state.pool || !state.signer || !state.marginAccount) {
    state.submitButton = {
      state: 'connect-wallet',
      text: 'Connect Wallet',
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
      text: 'Paused',
      disabled: true,
      message: {
        text: 'Pool paused until further notice. Check Discord for updates.',
        type: 'warning',
      },
    };
    return;
  }

  if (isDepositAndSwapFlow(state)) {
    state.submitButton = {
      state: 'deposit-and-swap',
      text: 'Deposit to Swap',
      disabled: Boolean(state.userInput.notionalAmount.error) || emptyNotionalValue,
      message: {
        text: emptyNotionalValue ? 'Almost ready' : '',
        type: 'info',
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
    text: 'Swap',
    disabled: Boolean(state.userInput.notionalAmount.error) || emptyNotionalValue,
    message: {
      text: emptyNotionalValue ? 'Almost ready' : '',
      type: 'info',
    },
  };
};
