import { Draft } from '@reduxjs/toolkit';
import { Position } from '@voltz-protocol/v1-sdk';

import { SliceState } from '../../reducer';
import { getProspectiveLpNotional } from '../getProspectiveLpNotional';
import { hasExistingPosition } from '../hasExistingPosition';

export const getAvailableMargin = (state: Draft<SliceState>): number | null => {
  if (state.userInput.marginAmount.editMode === 'remove') {
    if (state.prospectiveLp.infoPostLp.status !== 'success') {
      return null;
    }

    let maxMarginWithdrawable = null;
    if (getProspectiveLpNotional(state) === 0 && hasExistingPosition(state)) {
      maxMarginWithdrawable = (state.selectedPosition as Position).maxMarginWithdrawable;
    }

    if (getProspectiveLpNotional(state) < 0 && hasExistingPosition(state)) {
      maxMarginWithdrawable = (state.selectedPosition as Position).maxMarginWithdrawable;
    }

    if (getProspectiveLpNotional(state) > 0) {
      maxMarginWithdrawable = state.prospectiveLp.infoPostLp.value.maxMarginWithdrawable;
    }

    return maxMarginWithdrawable;
  }

  if (state.walletBalance.status === 'success') {
    return state.walletBalance.value;
  }

  return null;
};
