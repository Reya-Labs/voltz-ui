import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { validateUserInputMargin } from './validateUserInputMargin';
import { validateUserInputNotional } from './validateUserInputNotional';

export const validateUserInput = (state: Draft<SliceState>): void => {
  validateUserInputNotional(state);
  validateUserInputMargin(state);
};
