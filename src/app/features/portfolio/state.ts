import {
  initialMarginAccountsSortingDirection,
  initialPositionsSortingDirection,
  MARGIN_ACCOUNTS_INITIAL_PAGE,
} from './constants';
import { SliceState } from './types';

export const initialState: SliceState = {
  createMarginAccountDialogState: 'closed',
  createMarginAccountError: '',
  createMarginAccountLoadedState: 'idle',
  marginAccounts: [],
  marginAccountsForSelection: [],
  marginAccountsForSelectionLoadedState: 'idle',
  marginAccountsPositions: {},
  marginAccountPositionsSortingDirection: {},
  marginAccountsSummary: {},
  totalMarginAccounts: 0,
  page: MARGIN_ACCOUNTS_INITIAL_PAGE,
  marginAccountsLoadedState: 'idle',
  positionsLoadedState: 'idle',
  positions: [],
  portfolioSummaryLoadedState: 'idle',
  portfolioSummary: null,
  sortingDirection: { ...initialPositionsSortingDirection },
  marginAccountsSortingDirection: { ...initialMarginAccountsSortingDirection },
  marginAccountWithdrawMarginFlow: {
    availableAmounts: [],
    availableAmountsLoadedState: 'idle',
    marginAccounts: [],
    marginAccountsLoadedState: 'idle',
    step: 'closed',
    selectedMarginAccount: null,
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
  },
};
