import React from 'react';
import { Agents } from '@components/contexts';
import { SwapFormState, useTokenApproval } from '@hooks';
import { Box } from '@mui/material';
import { SwapFormActions } from './types';
import { AugmentedAMM } from '@utilities';
import { actions } from '@store';

type ApprovalLabelProps = {
  text: string; 
  token: string;
};
const ApprovalLabel = ({text, token}: ApprovalLabelProps) => (
  <Box>
    {text}{' '}
    <Box component='span' sx={{ textTransform: 'none' }}>
      {token}
    </Box>
  </Box>
);

export const getFormAction = (isEditingMargin: boolean, partialCollateralization: boolean, agent: Agents) => {
  if (isEditingMargin) {
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

export const getSubmitButtonText = (isEditingMargin: boolean, tokenApprovals: ReturnType<typeof useTokenApproval>, amm: AugmentedAMM, formAction:SwapFormActions, agent: Agents) => {
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
      return <ApprovalLabel text="Approve" token={amm.protocol} />;
    }
    if (!tokenApprovals.underlyingTokenApprovedForFCM) {
      return <ApprovalLabel text="Approve" token={amm.underlyingToken.name || ''} />;
    }
  } 
  else {
    if (!tokenApprovals.underlyingTokenApprovedForPeriphery) {
      return <ApprovalLabel text="Approve" token={amm.underlyingToken.name || ''} />;
    }
  }
  
  if (isEditingMargin) {
    return "Update Margin";
  }
  if (agent === Agents.FIXED_TRADER) {
    return 'Trade Fixed Rate';
  }
  return 'Trade Variable Rate';
};

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