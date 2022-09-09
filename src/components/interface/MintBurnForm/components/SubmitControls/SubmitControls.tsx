import React, { ReactNode } from 'react'; 
import { useTokenApproval } from '@hooks';
import { Button, Ellipsis, Typography } from '@components/atomic';
import { MintBurnFormHintStates, MintBurnFormModes, MintBurnFormSubmitButtonStates } from '@contexts';
import { colors } from '@theme';
import { Box } from '@mui/system';

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

export type SubmitControlsProps = {
  approvalsNeeded: boolean;
  hintState: MintBurnFormHintStates;
  isFormValid: boolean;
  isTradeVerified: boolean;
  mode: MintBurnFormModes;
  onCancel: () => void;
  onSubmit: () => void;
  gaButtonId: string | undefined;
  submitButtonState: MintBurnFormSubmitButtonStates;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  tradeInfoErrorMessage?: string;
  underlyingTokenName?: string;
}

const SubmitControls = ({
  approvalsNeeded,
  hintState,
  isFormValid,
  isTradeVerified,
  mode,
  onCancel, 
  onSubmit,
  gaButtonId,
  submitButtonState,
  tokenApprovals,
  tradeInfoErrorMessage,
  underlyingTokenName
}: SubmitControlsProps) => {
  const getHint = () => {
    switch(hintState) {
      case MintBurnFormHintStates.APPROVE_NEXT_TOKEN: {
        return (
          <>
            <Text green bold>{tokenApprovals.lastApproval?.text}</Text><Text green> approved!</Text> 
            {' '}Let's now approve <Text bold>{tokenApprovals.getNextApproval(false)?.text}</Text>
          </>
        );
      }
      case MintBurnFormHintStates.APPROVE_TOKEN: {
        return `Please approve ${tokenApprovals.getNextApproval(false)?.text || ''}`;
      }
      case MintBurnFormHintStates.APPROVING: {
        return 'Waiting for confirmation';
      }
      case MintBurnFormHintStates.CHECKING: {
        return 'Loading trade information';
      }
      case MintBurnFormHintStates.ERROR_TOKEN_APPROVAL: {
        return <Text red>{tokenApprovals.lastError?.message}</Text>;
      }
      case MintBurnFormHintStates.FORM_INVALID: {
        return 'Please fix form errors to continue';
      }
      case MintBurnFormHintStates.FORM_INVALID_BALANCE: {
        return <Text red>You do not have enough {underlyingTokenName}</Text>;
      }
      case MintBurnFormHintStates.FORM_INVALID_INCOMPLETE: {
        return 'Input your parameters';
      }
      case MintBurnFormHintStates.FORM_INVALID_TRADE: {
        return <Text red>{tradeInfoErrorMessage}</Text>;
      }
      case MintBurnFormHintStates.INITIALISING: {
        return 'Initialising, please wait';
      }
      case MintBurnFormHintStates.READY_TO_TRADE: {
        return 'Let\'s trade!';
      }
      case MintBurnFormHintStates.READY_TO_TRADE_TOKENS_APPROVED: {
        return <><Text green>Tokens approved</Text>. Let's trade!</>;
      }
    }
  }

  const getSubmitButtonText = () => {
    switch(submitButtonState) {
      case MintBurnFormSubmitButtonStates.ADD_LIQUIDITY: {
        return 'Provide Liquidity';
      }
      case MintBurnFormSubmitButtonStates.APPROVE_UT_PERIPHERY: {
        return <Box>Approve <Text>{underlyingTokenName}</Text></Box>;
      }
      case MintBurnFormSubmitButtonStates.APPROVING: {
        return <>Approving<Ellipsis /></>;
      }
      case MintBurnFormSubmitButtonStates.CHECKING: {
        return <>Loading<Ellipsis /></>;
      }
      case MintBurnFormSubmitButtonStates.DEPOSIT_MARGIN: {
        return 'Deposit Margin';
      }
      case MintBurnFormSubmitButtonStates.INITIALISING: {
        return <>Initialising<Ellipsis /></>;
      }
      case MintBurnFormSubmitButtonStates.REMOVE_LIQUIDITY: {
        return 'Burn Liquidity';
      }
      case MintBurnFormSubmitButtonStates.SETTLE_AND_LP: {
        return 'Settle and LP';
      }
      case MintBurnFormSubmitButtonStates.WITHDRAW_MARGIN: {
        return 'Withdraw Margin';
      }
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Button 
          disabled={
            !isFormValid || 
            tokenApprovals.checkingApprovals || 
            tokenApprovals.approving || 
            ((mode === MintBurnFormModes.NEW_POSITION || mode === MintBurnFormModes.ROLLOVER) && (!approvalsNeeded && isFormValid && !isTradeVerified))
          }
          id={gaButtonId}
          size="large" 
          onClick={onSubmit} 
          sx={{ flexGrow: 1 }}
        >
          {getSubmitButtonText()}
        </Button>
        <Button
          sx={{ marginLeft: (theme) => theme.spacing(6), flexGrow: 0 }}
          variant="dark"
          onClick={onCancel}
        >
          Back
        </Button>
      </Box>

      <Typography variant='body2' sx={{ 
        marginTop: (theme) => theme.spacing(2), 
        color: colors.lavenderWeb.darken015,
        fontSize: '12px'
      }}>
        {getHint()}
      </Typography>
    </>
  )
}

export default SubmitControls;