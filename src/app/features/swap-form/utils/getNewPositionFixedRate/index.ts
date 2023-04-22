import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const getNewPositionFixedRate = (state: Draft<SliceState>) => {
  if (!state.amm) {
    return null;
  }

  if (state.prospectiveSwap.infoPostSwap.status === 'success') {
    return state.prospectiveSwap.infoPostSwap.value.averageFixedRate;
  }

  return state.amm.fixedApr;
};
