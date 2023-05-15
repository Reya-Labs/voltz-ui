import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const updateSelectedPosition = (state: Draft<SliceState>): void => {
  const positions = state.positions;

  if (positions.status !== 'success' || !positions.value?.length) {
    return;
  }

  const { lower: fixedLower, upper: fixedUpper } = state.userInput.fixedRange;

  const filteredPosition = positions.value.find(
    (position) =>
      position.fixedRateLower.toNumber() === fixedLower &&
      position.fixedRateUpper.toNumber() === fixedUpper,
  );

  state.selectedPosition = filteredPosition || null;
};
