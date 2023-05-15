import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getPreviousPositionNotional = (state: Draft<SliceState>) => {
  return state.previousPosition?.notional ?? 0;
};
