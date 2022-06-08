import React from 'react';
import { Agents, } from '@components/contexts';
import { SwapFormActions, SwapFormModes } from '@components/interface';
import { SwapFormData, useTokenApproval } from '@hooks';
import { SwapFormSubmitButtonHintStates, SwapFormSubmitButtonStates } from './types';

/**
 * Returns true or false if approvals are needed for this user to trade
 * @param action - the action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param tokenApprovals - the token approvals state for this form
 * @param isRemovingMargin - boolean flag for if the action is to remove margin
 */
export const approvalsNeeded = (action: SwapFormActions, tokenApprovals: ReturnType<typeof useTokenApproval>, isRemovingMargin: boolean) => {
  if(!isRemovingMargin) {
    if (action === SwapFormActions.FCM_SWAP || action === SwapFormActions.FCM_UNWIND) {
      return !tokenApprovals.FCMApproved || !tokenApprovals.yieldBearingTokenApprovedForFCM || !tokenApprovals.underlyingTokenApprovedForFCM;
    } else {
      return !tokenApprovals.underlyingTokenApprovedForPeriphery;
    }
  }
  return false;
}

/**
 * Returns what action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param mode - the mode the form is in
 * @param partialCollateralization - boolean flag for if the form has partial collateralization selected
 * @param agent - the agent mode the form is currently in (fixed, variable etc)
 */
export const getFormAction = (mode: SwapFormModes, partialCollateralization: boolean, agent: Agents): SwapFormActions => {
  if (mode === SwapFormModes.EDIT_MARGIN) {
    return SwapFormActions.UPDATE;
  }

  if (agent === Agents.FIXED_TRADER) {
    if(partialCollateralization) {
      return SwapFormActions.SWAP;
    } else {
      return SwapFormActions.FCM_SWAP;
    }
  } 
  else {
    // if (partialCollateralization) {
      return SwapFormActions.SWAP;
    // }
    // else {
    //   return SwapFormActions.FCM_UNWIND;
    // }
  }
};

/**
 * Gets the hint state (used to show text below the submit button)
 * @param formAction - the action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param formErrors - the form errors object
 * @param isFormValid - boolean flag wether the form is valid or not
 * @param isRemovingMargin - boolean flag for if the action is to remove margin
 * @param tokenApprovals - the token approvals state for this form
 */
export const getHintState = (
  formAction: SwapFormActions, 
  formErrors: SwapFormData['errors'], 
  isFormValid: boolean, 
  isRemovingMargin: boolean,
  tokenApprovals: ReturnType<typeof useTokenApproval>, 
  tradeInfoErrorMessage: string | null,
) => {
  const isFCMAction = formAction === SwapFormActions.FCM_SWAP || formAction === SwapFormActions.FCM_UNWIND;

  // Please note that the order these are in is important, you need the conditions that take precidence
  // to be nearer the top.

  // Token approvals - Checking current status
  if(tokenApprovals.checkingApprovals) {
    return SwapFormSubmitButtonHintStates.INITIALISING;
  }
  if(tokenApprovals.approving) {
    return SwapFormSubmitButtonHintStates.APPROVING;
  }

  if(!isRemovingMargin) {
    if(tokenApprovals.lastError) {
      return SwapFormSubmitButtonHintStates.ERROR_TOKEN_APPROVAL;
    }
    
    if(tokenApprovals.getNextApproval(isFCMAction)) {
      if(tokenApprovals.lastApproval) {
        return SwapFormSubmitButtonHintStates.APPROVE_NEXT_TOKEN;
      } else {
        return SwapFormSubmitButtonHintStates.APPROVE_TOKEN;
      }
    }
  }

  // Form validation
  if (!isFormValid || tradeInfoErrorMessage) {
    if (tradeInfoErrorMessage) {
      return SwapFormSubmitButtonHintStates.FORM_INVALID_TRADE;
    }
    if(formErrors.balance) {
      return SwapFormSubmitButtonHintStates.FORM_INVALID_BALANCE;
    }
    if(!Object.keys(formErrors).length) {
      return SwapFormSubmitButtonHintStates.FORM_INVALID_INCOMPLETE;
    }
    return SwapFormSubmitButtonHintStates.FORM_INVALID;
  }

  if(tokenApprovals.lastApproval) {
    return SwapFormSubmitButtonHintStates.READY_TO_TRADE_TOKENS_APPROVED;
  } else {
    return SwapFormSubmitButtonHintStates.READY_TO_TRADE;
  }
}

/**
 * Gets the submit button state (used to show text on the submit button)
 * @param mode - the mode the form is in
 * @param tokenApprovals - the token approvals state for this form
 * @param formAction - the action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param agent - the agent mode the form is currently in (fixed, variable etc)
 * @param isRemovingMargin - boolean flag for if the action is to remove margin
 */
export const getSubmitButtonState = (mode: SwapFormModes, tokenApprovals: ReturnType<typeof useTokenApproval>, formAction:SwapFormActions, agent: Agents, isRemovingMargin: boolean) => {  
  if (tokenApprovals.checkingApprovals) {
    return SwapFormSubmitButtonStates.INITIALISING;
  }
  if (tokenApprovals.approving) {
    return SwapFormSubmitButtonStates.APPROVING;
  }

  if(!isRemovingMargin) {
    if (formAction === SwapFormActions.FCM_SWAP || formAction === SwapFormActions.FCM_UNWIND) {
      if (!tokenApprovals.FCMApproved) {
        return SwapFormSubmitButtonStates.APPROVE_FCM;
      }
      if (!tokenApprovals.yieldBearingTokenApprovedForFCM) {
        return SwapFormSubmitButtonStates.APPROVE_YBT_FCM;
      }
      if (!tokenApprovals.underlyingTokenApprovedForFCM) {
        return SwapFormSubmitButtonStates.APPROVE_UT_FCM;
      }
    } 
    else {
      if (!tokenApprovals.underlyingTokenApprovedForPeriphery) {
        return SwapFormSubmitButtonStates.APPROVE_UT_PERIPHERY
      }
    }
  }
  
  if (mode === SwapFormModes.EDIT_MARGIN) {
    return SwapFormSubmitButtonStates.UPDATE;
  }
  if (agent === Agents.FIXED_TRADER) {
    return SwapFormSubmitButtonStates.TRADE_FIXED
  }
  return SwapFormSubmitButtonStates.TRADE_VARIABLE;
};