import { SliceState } from './types';

export const initialState: SliceState = {
  disableMarginAccountSelection: false,
  availableAmounts: [],
  availableAmountsLoadedState: 'idle',
  marginAccounts: [],
  marginAccountsLoadedState: 'idle',
  step: 'closed',
  selectedMarginAccount: null,
  queuedSelectedMarginAccountId: null,
  error: null,
  txHash: null,
  simulation: {
    status: 'idle',
    value: null,
  },
  userInput: {
    amount: 0,
    maxAmount: 0,
    maxAmountUSD: 0,
    token: undefined,
  },
  walletTokenAllowance: {
    value: 0,
    status: 'idle',
  },
};
