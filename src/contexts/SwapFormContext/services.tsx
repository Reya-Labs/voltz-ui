import React from 'react';
import { Agents } from '@contexts';
import { SwapFormActions, SwapFormModes } from '@components/interface';
import { useTokenApproval } from '@hooks';

/**
 * Returns true or false if approvals are needed for this user to trade
 * @param action - the action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param tokenApprovals - the token approvals state for this form
 * @param isRemovingMargin - boolean flag for if the action is to remove margin
 */
export const approvalsNeeded = (
  action: SwapFormActions,
  tokenApprovals: ReturnType<typeof useTokenApproval>,
  isRemovingMargin: boolean,
) => {
  if (!isRemovingMargin) {
    if (action === SwapFormActions.FCM_SWAP || action === SwapFormActions.FCM_UNWIND) {
      return (
        !tokenApprovals.FCMApproved ||
        !tokenApprovals.yieldBearingTokenApprovedForFCM ||
        !tokenApprovals.underlyingTokenApprovedForFCM
      );
    } else {
      return !tokenApprovals.underlyingTokenApprovedForPeriphery;
    }
  }
  return false;
};

/**
 * Returns what action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param mode - the mode the form is in
 * @param partialCollateralization - boolean flag for if the form has partial collateralization selected
 * @param agent - the agent mode the form is currently in (fixed, variable etc)
 */
export const getFormAction = (
  mode: SwapFormModes,
  partialCollateralization: boolean,
  agent: Agents,
): SwapFormActions => {
  if (mode === SwapFormModes.EDIT_MARGIN) {
    return SwapFormActions.UPDATE;
  }

  if (agent === Agents.FIXED_TRADER) {
    if (partialCollateralization) {
      return mode === SwapFormModes.ROLLOVER ? SwapFormActions.ROLLOVER_SWAP : SwapFormActions.SWAP;
    } else {
      return mode === SwapFormModes.ROLLOVER
        ? SwapFormActions.ROLLOVER_FCM_SWAP
        : SwapFormActions.FCM_SWAP;
    }
  } else {
    // if (partialCollateralization) {
    return mode === SwapFormModes.ROLLOVER ? SwapFormActions.ROLLOVER_SWAP : SwapFormActions.SWAP;
    // }
    // else {
    //   return SwapFormActions.FCM_UNWIND;
    // }
  }
};
