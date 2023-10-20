import { Draft } from '@reduxjs/toolkit';

import { isUserInputNotionalError } from '../../../../common';
import { SliceState } from '../../types';
import { getSwapNotional } from '../getSwapNotional';

export const getProspectiveSwapNotional = (state: Draft<SliceState>): number => {
  if (isUserInputNotionalError(state)) {
    return 0;
  }

  return getSwapNotional(state);
};
