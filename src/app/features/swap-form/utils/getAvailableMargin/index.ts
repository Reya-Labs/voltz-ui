import { Draft } from '@reduxjs/toolkit';
import { Position } from '@voltz-protocol/v1-sdk';

import { stringToBigFloat } from '../../../../../utilities/number';
import { SliceState } from '../../reducer';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';
import { hasExistingPosition } from '../hasExistingPosition';
import { swapFormLimitAndFormatNumber } from '../swapFormLimitAndFormatNumber';

export const getAvailableMargin = (state: Draft<SliceState>): number | null => {
  const {
    userInput: { marginAmount },
    prospectiveSwap,
    position,
    walletBalance,
  } = state;
  const { editMode } = marginAmount;

  if (editMode === 'remove') {
    if (prospectiveSwap.infoPostSwap.status !== 'success') {
      return null;
    }

    const prospectiveSwapNotional = getProspectiveSwapNotional(state);
    const existingPosition = hasExistingPosition(state);

    const maxMarginWithdrawable =
      prospectiveSwapNotional === 0 && existingPosition
        ? (position.value as Position).maxMarginWithdrawable
        : prospectiveSwapNotional > 0
        ? prospectiveSwap.infoPostSwap.value.maxMarginWithdrawable
        : null;

    if (maxMarginWithdrawable !== null) {
      if (maxMarginWithdrawable > prospectiveSwap.infoPostSwap.value.fee) {
        return stringToBigFloat(
          swapFormLimitAndFormatNumber(
            maxMarginWithdrawable - prospectiveSwap.infoPostSwap.value.fee,
            'floor',
          ),
        );
      }
      return 0;
    }
    return null;
  }

  return walletBalance.status === 'success' ? walletBalance.value : null;
};
