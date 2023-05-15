import { Draft } from '@reduxjs/toolkit';

import { isUserInputMarginError } from '../../../../common/utils';
import { SliceState } from '../../state';

export const getProspectiveLpMargin = (state: Draft<SliceState>): number => {
  if (isUserInputMarginError(state)) {
    return 0;
  }

  return state.userInput.marginAmount.value;
};
