import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { getEditPositionNotional } from '../getEditPositionNotional';
import { getVariableRate } from '../getVariableRate';

export const getEditPositionVariableRate = (state: Draft<SliceState>) => {
  if (getEditPositionNotional(state) === 0) {
    return null;
  }

  return getVariableRate(state);
};
