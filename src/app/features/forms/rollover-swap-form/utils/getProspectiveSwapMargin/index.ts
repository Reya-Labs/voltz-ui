import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getProspectiveSwapMargin = (state: Draft<SliceState>): number => {
  return state.userInput.marginAmount.value + state.prospectiveSwap.infoPostSwap.value.fee;
};
