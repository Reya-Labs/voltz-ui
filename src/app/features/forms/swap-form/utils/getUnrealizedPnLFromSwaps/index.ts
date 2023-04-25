import { Draft } from '@reduxjs/toolkit';
import { Position } from '@voltz-protocol/v1-sdk';

import { SliceState } from '../../state';
import { hasExistingPosition } from '../hasExistingPosition';

export const getUnrealizedPnLFromSwaps = (state: Draft<SliceState>) => {
  if (hasExistingPosition(state)) {
    return (state.position.value as Position).unrealizedPnLFromSwaps;
  }

  return null;
};
