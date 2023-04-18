import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const getSelectedPositionNotional = (state: Draft<SliceState>) => {
  let selectedPositionNotional = 0;

  if (state.selectedPosition !== null) {
    selectedPositionNotional += state.selectedPosition.notional;
  }

  return selectedPositionNotional;
};
