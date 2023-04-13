import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const getRealizedPnLFromSwaps = (state: Draft<SliceState>) => {
  if (state.position.status === 'success') {
    if (state.position.value !== null) {
      return state.position.value.realizedPnLFromSwaps;
    }
  }

  return null;
};
