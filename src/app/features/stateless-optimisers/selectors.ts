import { RootState } from '../../store';
import { OptimiserInfo } from './types';

export const selectOptimisers = (state: RootState): OptimiserInfo[] => {
  return state.statelessOptimisers.optimisers;
};
