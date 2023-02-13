import { RootState } from '../../store';
import { selectChainId } from '../network';
import { OptimiserInfo } from './types';

export const selectOptimisers = (state: RootState): OptimiserInfo[] => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return [];
  }
  return state.lpOptimisers.optimisers[chainId];
};

export const selectOptimisersLoadedState = (state: RootState) => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return 'idle';
  }
  return state.lpOptimisers.optimisersLoadedState[chainId];
};
