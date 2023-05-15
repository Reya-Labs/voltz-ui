import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { getProspectiveSwapMode } from '../getProspectiveSwapMode';

export const getAvailableNotional = (state: Draft<SliceState>): number => {
  return state.poolSwapInfo.availableNotional[getProspectiveSwapMode(state)];
};
