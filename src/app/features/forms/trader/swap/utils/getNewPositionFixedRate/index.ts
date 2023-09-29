import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getNewPositionFixedRate = (state: Draft<SliceState>) => {
  if (!state.pool) {
    return null;
  }

  if (state.prospectiveSwap.swapSimulation.status === 'success') {
    return state.prospectiveSwap.swapSimulation.value.averageFixedRate;
  }

  return state.pool.currentFixedRate;
};
