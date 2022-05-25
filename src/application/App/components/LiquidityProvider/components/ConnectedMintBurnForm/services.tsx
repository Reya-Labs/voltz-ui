import { ReactNode } from "react";
import { Agents } from "@components/*";
import { useTokenApproval, MintBurnFormState, MintBurnFormLiquidityAction, MintBurnFormMarginAction } from "@hooks";
import { Box } from "@mui/system";
import { actions } from "@store";
import { AugmentedAMM } from "@utilities";
import { MintBurnFormActions } from "./types";
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
 * @param isEditingMargin - boolean flag for edit margin mode
 * @param isEditingLiquidity - boolean flag for edit liquidity mode
 * @param liquidityAction - the liquidity action selected on the form 
 */
 export const getFormAction = (isEditingMargin: boolean, isEditingLiquidity: boolean, liquidityAction: MintBurnFormLiquidityAction) => {
  if (isEditingMargin) {
    return MintBurnFormActions.UPDATE;
  } 
  else if (!isEditingLiquidity || liquidityAction === MintBurnFormLiquidityAction.ADD) {
    return MintBurnFormActions.MINT;
  } 
  else {
    return MintBurnFormActions.BURN;
  }
};

/**
 * Gets the text to show on the submit button
 * @param isEditingLiquidity - boolean flag for edit liquidity mode
 * @param tokenApprovals - the token approvals state for this form
 * @param amm - the amm class instance for this form
 * @param liquidityAction - the liquidity action selected on the form
 */
 export const getSubmitButtonText = (
  isEditingLiquidity: boolean, 
  tokenApprovals: ReturnType<typeof useTokenApproval>, 
  amm: AugmentedAMM, 
  liquidityAction: MintBurnFormLiquidityAction
) => {
  const isAddingLiquidity = !isEditingLiquidity || liquidityAction === MintBurnFormLiquidityAction.ADD;
  
  if (tokenApprovals.checkingApprovals) {
    return 'Initialising...';
  }
  if (tokenApprovals.approving) {
    return 'Approving...';
  }

  if (!tokenApprovals.underlyingTokenApprovedForPeriphery) {
    return <Box>Approve <Text>{amm.underlyingToken.name || ''}</Text></Box>;
  }

  return isAddingLiquidity ? 'Provide Liquidity' : 'Burn Liquidity';
};

/**
 * Returns the redux action required to submit the form, complete with transaction data
 * @param amm - the amm class instance for this form
 * @param formAction - the action the form is currently set to make (MINT, BURN etc)
 * @param formState - the state of the form fields
 * @param agent - the agent mode the form is currently in (fixed, variable etc)
 * @param isEditingLiquidity - boolean flag for if the form is in 'edit liquidity' mode
 * @param isEditingMargin - boolean flag for if the form is in 'edit margin' mode
 */
export const getSubmitAction = (
  amm: AugmentedAMM, 
  formAction: MintBurnFormActions, 
  formState: MintBurnFormState, 
  agent: Agents, 
  isEditingLiquidity: boolean, 
  isEditingMargin: boolean
) => {
  const isBurningLiquidity = (isEditingLiquidity && formState.liquidityAction === MintBurnFormLiquidityAction.BURN);
  const isRemovingMargin = (isEditingMargin && formState.marginAction === MintBurnFormMarginAction.REMOVE);
  
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