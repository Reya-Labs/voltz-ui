import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../reducer';

export const isNotionalStrictlyPositive = (state: Draft<SliceState>): boolean => {
  return (
    !state.prospectiveSwap.notionalAmount.error &&
    state.prospectiveSwap.notionalAmount.value !== '0'
  );
};

export const isMarginStrictlyPositive = (state: Draft<SliceState>): boolean => {
  return (
    !state.prospectiveSwap.marginAmount.error && state.prospectiveSwap.marginAmount.value !== '0'
  );
};
