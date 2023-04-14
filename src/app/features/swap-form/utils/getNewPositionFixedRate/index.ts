import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const getNewPositionFixedRate = (state: Draft<SliceState>) => {
  if (state.prospectiveSwap.infoPostSwap.status === 'success') {
    return state.prospectiveSwap.infoPostSwap.value.averageFixedRate;
  }

  if (state.fixedRate.status === 'success') {
    return state.fixedRate.value;
  }

  return null;
};
