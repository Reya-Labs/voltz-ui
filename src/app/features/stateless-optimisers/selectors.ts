import { RootState } from '../../store';
import { selectChainId } from '../network';
import { OptimiserInfo } from './types';

export const selectOptimisers = (state: RootState): OptimiserInfo[] => {
  const network = selectChainId(state);
  return state.statelessOptimisers.optimisers[network];
};

export const selectOptimisersLoadedState = (state: RootState) => {
  const network = selectChainId(state);
  return state.statelessOptimisers.optimisersLoadedState[network];
};
