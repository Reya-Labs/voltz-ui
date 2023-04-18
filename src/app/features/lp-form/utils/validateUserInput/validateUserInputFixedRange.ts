import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const validateUserInputFixedRange = (state: Draft<SliceState>): void => {
  const fixedLower = state.userInput.fixedRange.lower;
  const fixedUpper = state.userInput.fixedRange.upper;
  if (fixedLower !== null && fixedUpper !== null && fixedLower >= fixedUpper) {
    state.userInput.fixedRange.error = 'Fixed lower cannot be equal or higher than fixed upper';
  }
};
