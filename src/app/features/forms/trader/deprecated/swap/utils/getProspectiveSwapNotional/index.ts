import { Draft } from '@reduxjs/toolkit';

import { isUserInputNotionalError } from '../../../../../common';
import { SliceState } from '../../state';
import { getAdjustedSwapNotional } from '../getAdjustedSwapNotional';

export const getProspectiveSwapNotional = (state: Draft<SliceState>): number => {
  if (isUserInputNotionalError(state)) {
    return 0;
  }

  return getAdjustedSwapNotional(state);
};
