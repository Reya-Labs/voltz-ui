import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { getProspectiveLpNotional } from '../getProspectiveLpNotional';
import { hasExistingPosition } from '../hasExistingPosition';

export const getAvailableMargin = (state: Draft<SliceState>): number | null => {
  const { userInput, prospectiveLp, selectedPosition, walletBalance } = state;

  if (userInput.marginAmount.editMode === 'remove') {
    if (prospectiveLp.infoPostLp.status !== 'success') {
      return null;
    }

    const prospectiveLpNotional = getProspectiveLpNotional(state);
    const hasExisting = hasExistingPosition(state);

    if (prospectiveLpNotional <= 0 && hasExisting) {
      return selectedPosition!.maxMarginWithdrawable;
    } else if (prospectiveLpNotional > 0) {
      return prospectiveLp.infoPostLp.value.maxMarginWithdrawable;
    }

    return null;
  }

  return walletBalance.status === 'success' ? walletBalance.value : null;
};
