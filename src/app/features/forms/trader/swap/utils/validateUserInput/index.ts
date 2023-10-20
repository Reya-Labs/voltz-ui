import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../types';
import { validateUserInputNotional } from './validateUserInputNotional';

export const validateUserInput = (state: Draft<SliceState>): void => {
  validateUserInputNotional(state);
};
