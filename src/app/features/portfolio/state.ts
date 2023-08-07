import {
  initialMarginAccountsSortingDirection,
  initialPositionsSortingDirection,
  MARGIN_ACCOUNTS_INITIAL_PAGE,
} from './constants';
import { SliceState } from './types';

export const initialState: SliceState = {
  marginAccounts: [],
  marginAccountsPositions: {},
  totalMarginAccounts: 0,
  page: MARGIN_ACCOUNTS_INITIAL_PAGE,
  marginAccountsLoadedState: 'idle',
  positionsLoadedState: 'idle',
  positions: [],
  portfolioSummaryLoadedState: 'idle',
  portfolioSummary: null,
  sortingDirection: { ...initialPositionsSortingDirection },
  marginAccountsSortingDirection: { ...initialMarginAccountsSortingDirection },
};
