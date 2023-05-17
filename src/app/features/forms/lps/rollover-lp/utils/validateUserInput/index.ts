import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { validateUserInputFixedRange } from './validateUserInputFixedRange';
import { validateUserInputMargin } from './validateUserInputMargin';

export const validateUserInput = (state: Draft<SliceState>): void => {
  validateUserInputMargin(state);
  validateUserInputFixedRange(state);
};
