import { ReactNode } from "react";
import { Agents } from "@components/*";
import { useTokenApproval, MintBurnFormState, MintBurnFormLiquidityAction, MintBurnFormMarginAction, MintBurnForm } from "@hooks";
import { Box } from "@mui/system";
import { actions } from "@store";
import { AugmentedAMM } from "@utilities";
import { MintBurnFormActions, MintBurnFormModes } from '@components/interface';
import { colors } from "@theme";

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
 * @param liquidityAction - the liquidity action selected on the form 
 */
 export const getFormAction = (mode: MintBurnFormModes, liquidityAction: MintBurnFormLiquidityAction) => {
  if (mode === MintBurnFormModes.EDIT_MARGIN) {
    return MintBurnFormActions.UPDATE;
  } 
  else if (mode !== MintBurnFormModes.EDIT_LIQUIDITY || liquidityAction === MintBurnFormLiquidityAction.ADD) {
    return MintBurnFormActions.MINT;
  } 
  else {
    return MintBurnFormActions.BURN;
  }
};

/**
 * Gets the hint text to show below the submit button
 * @param formState - the state of the form fields
 * @param isFormValid - boolean flag wether the form is valid or not
 * @param tokenApprovals - the token approvals state for this form
 */
export const getSubmitButtonHint = (amm: AugmentedAMM, formErrors: MintBurnForm['errors'], isFormValid: boolean, tokenApprovals: ReturnType<typeof useTokenApproval>) => {
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
    if(!tokenApprovals.underlyingTokenApprovedForPeriphery) {
      return `Please approve ${amm.underlyingToken.name || ''}`;
    }
  }

  // Form validation
  if (!isFormValid) {
    if(formErrors.balance) {
      return `You do not have enough ${amm.underlyingToken.name || ''}`;
    }
    if(!Object.keys(formErrors).length) {
      return 'Input your parameters';
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
 * @param formState - the form state
 */
 export const getSubmitButtonText = (
  mode: MintBurnFormModes,
  tokenApprovals: ReturnType<typeof useTokenApproval>, 
  amm: AugmentedAMM, 
  formState: MintBurnFormState
) => {
  const isAddingLiquidity = mode !== MintBurnFormModes.EDIT_LIQUIDITY || formState.liquidityAction === MintBurnFormLiquidityAction.ADD;
  const isAddingMargin = mode === MintBurnFormModes.EDIT_MARGIN && formState.marginAction === MintBurnFormMarginAction.ADD;

  if (tokenApprovals.checkingApprovals) {
    return 'Initialising...';
  }
  if (tokenApprovals.approving) {
    return 'Approving...';
  }

  if (!tokenApprovals.underlyingTokenApprovedForPeriphery) {
    return <Box>Approve <Text>{amm.underlyingToken.name || ''}</Text></Box>;
  }

  if(mode === MintBurnFormModes.EDIT_MARGIN) {
    return isAddingMargin ? 'Deposit Margin' : 'Withdraw Margin';
  }

  return isAddingLiquidity ? 'Provide Liquidity' : 'Burn Liquidity';
};

/**
 * Returns the redux action required to submit the form, complete with transaction data
 * @param amm - the amm class instance for this form
 * @param formAction - the action the form is currently set to make (MINT, BURN etc)
 * @param formState - the state of the form fields
 * @param agent - the agent mode the form is currently in (fixed, variable etc)
 * @param mode - the mode the form is in
 */
export const getSubmitAction = (
  amm: AugmentedAMM, 
  formAction: MintBurnFormActions, 
  formState: MintBurnFormState, 
  agent: Agents, 
  mode: MintBurnFormModes
) => {
  const isBurningLiquidity = (mode === MintBurnFormModes.EDIT_LIQUIDITY && formState.liquidityAction === MintBurnFormLiquidityAction.BURN);
  const isRemovingMargin = (mode === MintBurnFormModes.EDIT_MARGIN && formState.marginAction === MintBurnFormMarginAction.REMOVE);
  
  const transaction = { 
    ammId: amm.id, 
    agent,
    fixedLow: formState.fixedLow,
    fixedHigh: formState.fixedHigh,
    margin: Math.abs(formState.margin as number) * (isRemovingMargin ? -1 : 1),
    notional: Math.abs(formState.notional as number) * (isBurningLiquidity ? -1 : 1),
  };

  switch(formAction) {
    case MintBurnFormActions.UPDATE:
      return actions.updatePositionMarginAction(amm, transaction);
    case MintBurnFormActions.MINT:
      return actions.mintAction(amm, transaction);
    case MintBurnFormActions.BURN:
      return actions.burnAction(amm, transaction);
  }
}