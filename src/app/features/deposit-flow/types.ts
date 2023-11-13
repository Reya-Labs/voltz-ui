import { PortfolioMarginAccount } from '../portfolio';
import { AvailableAmountForMarginAccountDeposit, ReturnTypeSimulateDepositMargin } from './thunks';
export type PositionsFilterId = 'active' | 'matured' | 'settled';

export type SliceState = {
  // margin accounts for the selector
  marginAccounts: PortfolioMarginAccount[];
  marginAccountsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  // available amounts for the selector
  availableAmounts: AvailableAmountForMarginAccountDeposit[];
  availableAmountsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  step:
    | 'closed'
    | 'opened'
    | 'depositing'
    | 'deposit-success'
    | 'deposit-error'
    | 'approveTokenError'
    | 'approvingToken';
  disableMarginAccountSelection: boolean;
  queuedSelectedMarginAccountId: null | PortfolioMarginAccount['id'];
  selectedMarginAccount: null | PortfolioMarginAccount;
  error: string | null;
  txHash: string | null;
  simulation: {
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    value: null | ReturnTypeSimulateDepositMargin;
  };
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
