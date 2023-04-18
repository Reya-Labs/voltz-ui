import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const updateSelectedPosition = (state: Draft<SliceState>): void => {
  if (
    state.positions.status !== 'success' ||
    state.positions.value === null ||
    state.positions.value.length === 0
  ) {
    return;
  }

  const fixedLower = state.userInput.fixedRange.lower;
  const fixedUpper = state.userInput.fixedRange.upper;
  state.selectedPosition = state.positions.value[0];

  const filteredPosition = state.positions.value.find(
    (i) => i.fixedRateLower.toNumber() === fixedLower && i.fixedRateUpper.toNumber() === fixedUpper,
  );

  if (filteredPosition === undefined) {
    state.selectedPosition = null;
  } else {
    state.selectedPosition = filteredPosition;
  }
};
