import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { getExistingPositionNotional } from '../getExistingPositionNotional';
import { getVariableRate } from '../getVariableRate';

export const getExistingPositionVariableRate = (state: Draft<SliceState>) => {
  if (getExistingPositionNotional(state) === 0) {
    return null;
  }

  return getVariableRate(state);
};
