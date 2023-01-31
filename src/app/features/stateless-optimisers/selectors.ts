import { RootState } from '../../store';
import { OptimiserInfo } from './types';

export const selectOptimisers = (state: RootState): OptimiserInfo[] => {
  return state.statelessOptimisers.optimisers;
};

export const selectOptimisersLoadedState = (state: RootState) => {
  return state.statelessOptimisers.optimisersLoadedState;
};
