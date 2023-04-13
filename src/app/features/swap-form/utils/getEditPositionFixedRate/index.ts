import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { getExistingPositionMode } from '../getExistingPositionMode';
import { getExistingPositionNotional } from '../getExistingPositionNotional';

export const getExistingPositionFixedRate = (state: Draft<SliceState>) => {
  if (state.position.status !== 'success' || !state.position.value) {
    return null;
  }

  if (getExistingPositionNotional(state) === 0) {
    return null;
  }

  return getExistingPositionMode(state) === 'fixed'
    ? state.position.value.receivingRate
    : state.position.value.payingRate;
};
