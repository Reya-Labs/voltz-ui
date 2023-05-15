import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getEditPositionNotional = (state: Draft<SliceState>) => {
  let editPositionNotional = 0;

  if (state.selectedPosition !== null) {
    editPositionNotional += state.selectedPosition.notional;
  }

  if (state.userInput.notionalAmount.value > 0) {
    if (state.userInput.notionalAmount.editMode === 'add') {
      editPositionNotional += state.userInput.notionalAmount.value;
    } else {
      editPositionNotional -= state.userInput.notionalAmount.value;
    }
  }

  if (editPositionNotional < 0) {
    return 0;
  }

  return editPositionNotional;
};
