import { Draft } from '@reduxjs/toolkit';
import { Position } from '@voltz-protocol/v1-sdk';

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

    let maxMarginWithdrawable = null;
    if (prospectiveLpNotional === 0 && hasExisting) {
      maxMarginWithdrawable = (selectedPosition as Position).maxMarginWithdrawable;
    } else if (prospectiveLpNotional < 0 && hasExisting) {
      maxMarginWithdrawable = (selectedPosition as Position).maxMarginWithdrawable;
    } else if (prospectiveLpNotional > 0) {
      maxMarginWithdrawable = prospectiveLp.infoPostLp.value.maxMarginWithdrawable;
    }

    return maxMarginWithdrawable;
  }

  return walletBalance.status === 'success' ? walletBalance.value : null;
};
