import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const resetNotionalAndMarginEditMode = (state: Draft<SliceState>): void => {
  state.userInput.notionalAmount.editMode = 'add';
  state.userInput.marginAmount.editMode = 'add';
};
