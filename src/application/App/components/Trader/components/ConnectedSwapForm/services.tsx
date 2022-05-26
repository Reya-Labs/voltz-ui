import React, { ReactNode } from 'react';
import { Agents, } from '@components/contexts';
import { SwapFormActions, SwapFormModes } from '@components/interface';
import { SwapFormData, SwapFormState, useTokenApproval } from '@hooks';
import { Box } from '@mui/material';
import { AugmentedAMM } from '@utilities';
import { actions } from '@store';
import { colors }  from '@theme';
import { ApprovalType } from 'src/hooks/useTokenApproval';

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
 * Returns what action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param mode - the mode the form is in
 * @param partialCollateralization - boolean flag for if the form has partial collateralization selected
 * @param agent - the agent mode the form is currently in (fixed, variable etc)
 */
export const getFormAction = (mode: SwapFormModes, partialCollateralization: boolean, agent: Agents) => {
  if (mode === SwapFormModes.EDIT_MARGIN) {
    return SwapFormActions.UPDATE;
  } 
  else if (partialCollateralization) {
    return SwapFormActions.SWAP;
  } 
  else if (agent === Agents.FIXED_TRADER) {
    return SwapFormActions.FCM_SWAP;
  } 
  else {
    return SwapFormActions.FCM_UNWIND;
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
 * @param formState - the state of the form fields
 * @param isFormValid - boolean flag wether the form is valid or not
 * @param tokenApprovals - the token approvals state for this form
 */
export const getSubmitButtonHint = (amm: AugmentedAMM, formAction: SwapFormActions, formErrors: SwapFormData['errors'], isFormValid: boolean, tokenApprovals: ReturnType<typeof useTokenApproval>) => {
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
  if(tokenApprovals.lastError) {
    return <Text red>{tokenApprovals.lastError.message}</Text>
  }
  
  // Token approvals - user needs to approve a token
  if(isFormValid) {
    const nextTokenHint = getNextTokenHint(amm, tokenApprovals, isFCMAction);
    if(nextTokenHint) return nextTokenHint;
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
 */
export const getSubmitButtonText = (mode: SwapFormModes, tokenApprovals: ReturnType<typeof useTokenApproval>, amm: AugmentedAMM, formAction:SwapFormActions, agent: Agents) => {
  if (tokenApprovals.checkingApprovals) {
    return 'Initialising...';
  }
  if (tokenApprovals.approving) {
    return 'Approving...';
  }

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
  
  if (mode === SwapFormModes.EDIT_MARGIN) {
    return "Update Margin";
  }
  if (agent === Agents.FIXED_TRADER) {
    return 'Trade Fixed Rate';
  }
  return 'Trade Variable Rate';
};

/**
 * Returns the redux action required to submit the form, complete with transaction data
 * @param amm - the amm class instance for this form
 * @param formAction - the action the form is currently set to make (SWAP, FCM_SWAP etc)
 * @param formState - the state of the form fields
 * @param agent - the agent mode the form is currently in (fixed, variable etc)
 * @param isRemovingMargin - boolean flag for if the user is removing margin (margin edit mode only)
 */
export const getSubmitAction = (amm: AugmentedAMM, formAction: SwapFormActions, formState: SwapFormState, agent: Agents, isRemovingMargin: boolean) => {
  const transaction = { 
    agent,
    ammId: amm.id,
    margin: Math.abs(formState.margin as number) * (isRemovingMargin ? -1 : 1),
    notional: formState.notional as number,
    partialCollateralization: formState.partialCollateralization
  };

  switch(formAction) {
    case SwapFormActions.UPDATE:
      return actions.updatePositionMarginAction(amm, transaction);
    case SwapFormActions.SWAP:
      return actions.swapAction(amm, transaction);
    case SwapFormActions.FCM_SWAP:
      return actions.fcmSwapAction(amm, transaction);
    case SwapFormActions.FCM_UNWIND:
      return actions.fcmUnwindAction(amm, transaction); 
  }
}