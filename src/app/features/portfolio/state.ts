import {
  initialMarginAccountsSortingDirection,
  initialPositionsSortingDirection,
} from './constants';
import { SliceState } from './types';

export const initialState: SliceState = {
  marginAccounts: [],
  marginAccountsPositions: {},
  totalMarginAccounts: 0,
  marginAccountsLoadedState: 'idle',
  positionsLoadedState: 'idle',
  positions: [],
  portfolioSummaryLoadedState: 'idle',
  portfolioSummary: null,
  sortingDirection: { ...initialPositionsSortingDirection },
  marginAccountsSortingDirection: { ...initialMarginAccountsSortingDirection },
};
