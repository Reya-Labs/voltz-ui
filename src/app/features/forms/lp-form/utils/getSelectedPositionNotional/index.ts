import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getSelectedPositionNotional = (state: Draft<SliceState>) => {
  return state.selectedPosition?.notional ?? 0;
};
