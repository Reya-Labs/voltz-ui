import { initialSortingDirection } from './constants';
import { SliceState } from './types';

export const initialState: SliceState = {
  positionsLoadedState: 'idle',
  positions: [],
  portfolioSummaryLoadedState: 'idle',
  portfolioSummary: null,
  sortingDirection: { ...initialSortingDirection },
};
