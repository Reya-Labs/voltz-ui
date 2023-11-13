import { SimulateSwapMarginAccountResult } from '@voltz-protocol/sdk-v2';
import { providers } from 'ethers';

import { V2Pool } from '../../../aMMs';
import { AvailableAmountForMarginAccountDeposit } from '../../../deposit-flow';
import { MarginAccountForSwapLP } from '../../../margin-accounts-for-swap-lp';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

type SubmitButtonState =
  | 'swap'
  | 'deposit-and-swap'
  | 'connect-wallet'
  | 'paused'
  | 'select-margin-account';

export type SliceState = {
  submitButton: {
    state: SubmitButtonState;
    disabled: boolean;
    text: string;
    message: {
      text: string | null;
      type: 'error' | 'warning' | 'info';
    };
  };
  pool: V2Pool | null;
  signer: providers.JsonRpcSigner | null;
  marginAccount: MarginAccountForSwapLP | null;
  maxNotionalAvailable: {
    value: number;
    status: ThunkStatus;
  };
  walletTokenAllowance: {
    value: number;
    status: ThunkStatus;
  };
  userInput: {
    // Side chosen by user in the UI
    mode: 'fixed' | 'variable';
    // User-inputted notional amount
    notionalAmount: {
      value: number;
      error: string | null;
    };
  };
  // State of prospective swap
  prospectiveSwap: {
    swapSimulation: {
      value: SimulateSwapMarginAccountResult;
      status: ThunkStatus;
    };
  };
  swapConfirmationFlow: {
    step: 'swapConfirmation' | 'waitingForSwapConfirmation' | 'swapCompleted' | null;
    error: string | null;
    txHash: string | null;
  };
  depositAndSwapConfirmationFlow: {
    step:
      | 'depositAndSwapConfirmation'
      | 'waitingForDepositAndSwapConfirmation'
      | 'depositAndSwapCompleted'
      | 'approveTokenError'
      | 'approvingToken'
      | null;
    error: string | null;
    txHash: string | null;
    availableAmounts: AvailableAmountForMarginAccountDeposit[];
    availableAmountsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
    userInput: {
      amount: number;
      maxAmount: AvailableAmountForMarginAccountDeposit['value'];
      maxAmountUSD: AvailableAmountForMarginAccountDeposit['valueUSD'];
      token: undefined | AvailableAmountForMarginAccountDeposit['token'];
    };
    // required for approval flow, used to validate the deposit value against
    walletTokenAllowance: {
      value: number;
      status: 'idle' | 'pending' | 'succeeded' | 'failed';
    };
  };
};
