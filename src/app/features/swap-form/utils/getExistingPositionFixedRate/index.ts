import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { getEditPositionNotional } from '../getEditPositionNotional';

export const getEditPositionFixedRate = (state: Draft<SliceState>) => {
  if (state.prospectiveSwap.cashflowInfo.status === 'success') {
    if (getEditPositionNotional(state) === 0) {
      return null;
    }

    return state.prospectiveSwap.cashflowInfo.averageFixedRate;
  }

  return null;
};
