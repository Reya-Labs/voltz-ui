import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../types';

export const getMaxAvailableNotional = (state: Draft<SliceState>): number => {
  if (state.maxNotionalAvailable.status !== 'success') {
    return 0;
  }
  return state.maxNotionalAvailable.value;
};
