import React, { ReactNode } from 'react';
import { Agents, } from '@components/contexts';
import { SwapFormActions, SwapFormModes } from '@components/interface';
import { ApprovalType, SwapFormData, useTokenApproval } from '@hooks';
import { Box } from '@mui/material';
import { AugmentedAMM } from '@utilities';
import { colors }  from '@theme';

type TextProps = {
  bold?: boolean;
  children?: ReactNode;
  green?: boolean;
  red?: boolean;
};
const Text = ({ bold, children, green, red }: TextProps) => (
  <Box component='span' sx={{ 
    color: green ? colors.vzCustomGreen1 : red ? colors.vzCustomRed1 : undefined,
    fontWeight: bold ? 'bold' : undefined,
    textTransform: 'none'
  }}>
    {children}
  </Box>
);

/**
 * Returns true or false if approvals are needed for this user to trade
 * @param action - the action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param tokenApprovals - the token approvals state for this form
 * @param isRemovingMargin - boolean flag for if the action is to remove margin
 */
export const approvalsNeeded = (action: SwapFormActions, tokenApprovals: ReturnType<typeof useTokenApproval>, isRemovingMargin: boolean) => {
  if(!isRemovingMargin) {
    if (action === SwapFormActions.FCM_SWAP || action === SwapFormActions.FCM_UNWIND) {
      return !tokenApprovals.FCMApproved || !tokenApprovals.yieldBearingTokenApprovedForFCM || !tokenApprovals.underlyingTokenApprovedForPeriphery;
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
export const getFormAction = (mode: SwapFormModes, partialCollateralization: boolean, agent: Agents) => {
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
    if (partialCollateralization) {
      return SwapFormActions.SWAP;
    }
    else {
      return SwapFormActions.FCM_UNWIND;
    }
  }
};

/**
 * Gets the submit button hint for when a token needs approval
 * @param amm - the amm class instance for this form
 * @param tokenApprovals - the token approvals state for this form
 * @param isFCMAction - boolean flag wether the form is set to perform an FCM action or not
 */
export const getNextTokenHint = (amm: AugmentedAMM, tokenApprovals: ReturnType<typeof useTokenApproval>, isFCMAction: boolean) => {
  let lastTokenApproved: string = '';
  let nextToken: string = '';

  if(isFCMAction) {
    if(!tokenApprovals.FCMApproved) {
      nextToken = 'FCM';
    }
    if(!tokenApprovals.yieldBearingTokenApprovedForFCM) {
      nextToken = amm.protocol;
    }
    if(!tokenApprovals.underlyingTokenApprovedForFCM) {
      nextToken = amm.underlyingToken.name || '';
    }
  } else {
    if(!tokenApprovals.underlyingTokenApprovedForPeriphery) {
      nextToken = amm.underlyingToken.name || '';
    }
  }

  // If there is no next token, there is no next token hint. Exit here.
  if(!nextToken) return;

  switch(tokenApprovals.lastApproval) {
    case ApprovalType.FCM:
      lastTokenApproved = 'FCM';
      break;
    case ApprovalType.YBTOKEN_FCM:
      lastTokenApproved = amm.protocol;
      break;
    case ApprovalType.UTOKEN_FCM:
    case ApprovalType.UTOKEN_PERIPHERY:
      lastTokenApproved = amm.underlyingToken.name || '';
  }

  if(lastTokenApproved) {
    return (
      <>
        <Text green bold>{lastTokenApproved}</Text><Text green> approved!</Text> 
        {' '}Let's now approve <Text bold>{nextToken}</Text>
      </>
    )
  } else {
    return `Please approve ${nextToken}`
  }
}

/**
 * Gets the hint text to show below the submit button
 * @param amm - the amm class instance for this form
 * @param formAction - the action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param formErrors - the form errors object
 * @param isFormValid - boolean flag wether the form is valid or not
 * @param tokenApprovals - the token approvals state for this form
 * @param isRemovingMargin - boolean flag for if the action is to remove margin
 */
export const getSubmitButtonHint = (
  amm: AugmentedAMM, 
  formAction: SwapFormActions, 
  formErrors: SwapFormData['errors'], 
  isFormValid: boolean, 
  tokenApprovals: ReturnType<typeof useTokenApproval>, 
  isRemovingMargin: boolean
) => {
  const isFCMAction = formAction === SwapFormActions.FCM_SWAP || formAction === SwapFormActions.FCM_UNWIND;

  // Please note that the order these are in is important, you need the conditions that take precidence
  // to be nearer the top.

  // Token approvals - Something happening
  if(tokenApprovals.checkingApprovals) {
    return 'Initialising, please wait...';
  }
  if(tokenApprovals.approving) {
    return 'Waiting for confirmation...';
  }

  if(!isRemovingMargin) {
    if(tokenApprovals.lastError) {
      return <Text red>{tokenApprovals.lastError.message}</Text>
    }
    
    // Token approvals - user needs to approve a token
    if(isFormValid) {
      const nextTokenHint = getNextTokenHint(amm, tokenApprovals, isFCMAction);
      if(nextTokenHint) return nextTokenHint;
    }
  }

  // Form validation
  if (!isFormValid) {
    if(formErrors.balance) {
      return `You do not have enough ${amm.underlyingToken.name || ''}`;
    }
    if(!Object.keys(formErrors).length) {
      return 'Input your margin'
    }
    return 'Please fix form errors to continue';
  }

  if (isFormValid) {
    return <>{tokenApprovals.lastApproval && <><Text green>Tokens approved</Text>. </>}Let's trade!</>;
  }
}

/**
 * Gets the text to show on the submit button
 * @param mode - the mode the form is in
 * @param tokenApprovals - the token approvals state for this form
 * @param amm - the amm class instance for this form
 * @param formAction - the action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param agent - the agent mode the form is currently in (fixed, variable etc)
 * @param isRemovingMargin - boolean flag for if the action is to remove margin
 */
export const getSubmitButtonText = (mode: SwapFormModes, tokenApprovals: ReturnType<typeof useTokenApproval>, amm: AugmentedAMM, formAction:SwapFormActions, agent: Agents, isRemovingMargin: boolean) => {  
  if (tokenApprovals.checkingApprovals) {
    return 'Initialising...';
  }
  if (tokenApprovals.approving) {
    return 'Approving...';
  }

  if(!isRemovingMargin) {
    if (formAction === SwapFormActions.FCM_SWAP || formAction === SwapFormActions.FCM_UNWIND) {
      if (!tokenApprovals.FCMApproved) {
        return 'Approve FCM';
      }
      if (!tokenApprovals.yieldBearingTokenApprovedForFCM) {
        return <Box>Approve <Text>{amm.protocol}</Text></Box>;
      }
      if (!tokenApprovals.underlyingTokenApprovedForFCM) {
        return <Box>Approve <Text>{amm.underlyingToken.name || ''}</Text></Box>;
      }
    } 
    else {
      if (!tokenApprovals.underlyingTokenApprovedForPeriphery) {
        return <Box>Approve <Text>{amm.underlyingToken.name || ''}</Text></Box>;
      }
    }
  }
  
  if (mode === SwapFormModes.EDIT_MARGIN) {
    return "Update Margin";
  }
  if (agent === Agents.FIXED_TRADER) {
    return 'Trade Fixed Rate';
  }
  return 'Trade Variable Rate';
};