import { Draft } from '@reduxjs/toolkit';
import { Position } from '@voltz-protocol/v1-sdk';

import { SliceState } from '../../state';
import { getProspectiveSwapMode } from '../getProspectiveSwapMode';
import { hasExistingPosition } from '../hasExistingPosition';

export const getAvailableNotional = (state: Draft<SliceState>): number => {
  if (hasExistingPosition(state) && state.userInput.notionalAmount.editMode === 'remove') {
    return Math.min(
      (state.position.value as Position).notional,
      state.poolSwapInfo.availableNotional[getProspectiveSwapMode(state)],
    );
  }
  const mode = getProspectiveSwapMode(state);
  const availableNotional = state.poolSwapInfo.availableNotional;
  return availableNotional[mode];
};
