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
