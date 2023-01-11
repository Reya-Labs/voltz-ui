import isUndefined from 'lodash.isundefined';

import { SwapFormActions, SwapFormModes } from '../../components/interface/SwapForm/types';
import { useTokenApproval } from '../../hooks/useTokenApproval';

/**
 * Returns true or false if approvals are needed for this user to trade
 * @param tokenApprovals - the token approvals state for this form
 * @param isRemovingMargin - boolean flag for if the action is to remove margin
 */
export const approvalsNeeded = (
  tokenApprovals: ReturnType<typeof useTokenApproval>,
  isRemovingMargin: boolean,
) => {
  if (!isRemovingMargin) {
    return !tokenApprovals.underlyingTokenApprovedForPeriphery;
  }
  return false;
};

/**
 * Returns what action the form is currently set to make (SWAP etc.)
 * @param mode - the mode the form is in
 */
export const getFormAction = (mode: SwapFormModes): SwapFormActions => {
  if (mode === SwapFormModes.EDIT_MARGIN) {
    return SwapFormActions.UPDATE;
  }

  return mode === SwapFormModes.ROLLOVER ? SwapFormActions.ROLLOVER_SWAP : SwapFormActions.SWAP;
};

/**
 * If both valueA and valueB are defined, return true if valueA is less than valueB, otherwise return undefined.
 * @param {number | undefined} valueA - number | undefined
 * @param {number | undefined} valueB - number | undefined
 * @returns A function that takes two numbers and returns true if the first number is less than the second number.
 */
export const lessThan = (valueA: number | undefined, valueB: number | undefined) => {
  if (!isUndefined(valueA) && !isUndefined(valueB)) {
    return valueA < valueB;
  }
};
