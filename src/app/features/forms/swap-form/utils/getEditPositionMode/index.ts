import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { getEditPositionTokenBalance } from '../getEditPositionTokenBalance';

export const getEditPositionMode = (state: Draft<SliceState>) => {
  return getEditPositionTokenBalance(state).variableTokenBalance < 0 ? 'fixed' : 'variable';
};
