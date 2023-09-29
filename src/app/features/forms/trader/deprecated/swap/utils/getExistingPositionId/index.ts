import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { hasExistingPosition } from '../hasExistingPosition';

export const getExistingPositionId = (state: Draft<SliceState>): string | null => {
  if (!hasExistingPosition(state)) {
    return null;
  }
  return state.position.value!.id;
};
