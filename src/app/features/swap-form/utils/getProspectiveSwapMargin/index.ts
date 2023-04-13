import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const getProspectiveSwapMargin = (state: Draft<SliceState>): number => {
  if (state.userInput.marginAmount.editMode === 'add') {
    return state.userInput.marginAmount.value + state.prospectiveSwap.infoPostSwap.value.fee;
  }

  return -state.userInput.marginAmount.value;
};
