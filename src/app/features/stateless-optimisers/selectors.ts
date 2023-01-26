import { RootState } from '../../store';
import { OptimiserInfo } from './types';

export const selectOptimisers = (state: RootState): OptimiserInfo[] => {
  return state.statelessOptimisers.optimisers;
};

export const depositOptimisersStatus = (state: RootState) => {
  return state.statelessOptimisers.depositLoadedState;
};

export const withdrawOptimisersStatus = (state: RootState) => {
  return state.statelessOptimisers.withdrawLoadedState;
};

export const rolloverOptimisersStatus = (state: RootState) => {
  return state.statelessOptimisers.rolloverLoadedState;
};
