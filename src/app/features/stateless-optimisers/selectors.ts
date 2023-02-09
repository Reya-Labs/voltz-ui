import { RootState } from '../../store';
import { selectNetwork } from '../network';
import { OptimiserInfo } from './types';

export const selectOptimisers = (state: RootState): OptimiserInfo[] => {
  const network = selectNetwork(state);
  return state.statelessOptimisers.optimisers[network];
};

export const selectOptimisersLoadedState = (state: RootState) => {
  const network = selectNetwork(state);
  return state.statelessOptimisers.optimisersLoadedState[network];
};
