import React, { ReactNode } from 'react';
import { SwapFormSubmitButtonHintStates, SwapFormSubmitButtonStates } from '@contexts';
import { useAgent, useTokenApproval } from '@hooks';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Button, Ellipsis } from '@components/atomic';
import { colors }  from '@theme';
import { SwapFormModes } from '../../types';

interface SubmitControlsProps {
  approvalsNeeded: boolean;
  hintState: SwapFormSubmitButtonHintStates;
  isFCMAction: boolean;
  isFormValid: boolean;
  isTradeVerified: boolean;
  mode: SwapFormModes
  onCancel: () => void;
  onSubmit: () => void;
  protocol?: string;
  submitButtonState: SwapFormSubmitButtonStates;
  swapInfoLoading: boolean;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  tradeInfoErrorMessage?: string;
  underlyingTokenName?: string;
}

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

const SubmitControls = ({
  approvalsNeeded,
  hintState,
  isFCMAction,
  isFormValid, 
  isTradeVerified,
  mode,
  onCancel, 
  onSubmit, 
  protocol,
  submitButtonState,
  tokenApprovals,
  tradeInfoErrorMessage,
  underlyingTokenName
}: SubmitControlsProps) => {
  const { agent } = useAgent();

  const getHint = () => {
    switch(hintState) {
      case SwapFormSubmitButtonHintStates.APPROVE_NEXT_TOKEN: {
        return (
          <>
            <Text green bold>{tokenApprovals.lastApproval?.text}</Text><Text green> approved!</Text> 
            {' '}Let's now approve <Text bold>{tokenApprovals.getNextApproval(isFCMAction)?.text}</Text>
          </>
        );
      }
      case SwapFormSubmitButtonHintStates.APPROVE_TOKEN: {
        return `Please approve ${tokenApprovals.getNextApproval(isFCMAction)?.text || ''}`;
      }
      case SwapFormSubmitButtonHintStates.APPROVING: {
        return 'Waiting for confirmation';
      }
      case SwapFormSubmitButtonHintStates.CHECKING: {
        return 'Loading trade information';
      }
      case SwapFormSubmitButtonHintStates.ERROR_TOKEN_APPROVAL: {
        return <Text red>{tokenApprovals.lastError?.message}</Text>;
      }
      case SwapFormSubmitButtonHintStates.FORM_INVALID: {
        return 'Please fix form errors to continue';
      }
      case SwapFormSubmitButtonHintStates.FORM_INVALID_BALANCE: {
        return <Text red>You do not have enough {underlyingTokenName}</Text>;
      }
      case SwapFormSubmitButtonHintStates.FORM_INVALID_INCOMPLETE: {
        return 'Input your margin';
      }
      case SwapFormSubmitButtonHintStates.FORM_INVALID_TRADE: {
        return <Text red>{tradeInfoErrorMessage}</Text>;
      }
      case SwapFormSubmitButtonHintStates.INITIALISING: {
        return 'Initialising, please wait';
      }
      case SwapFormSubmitButtonHintStates.READY_TO_TRADE: {
        return 'Let\'s trade!';
      }
      case SwapFormSubmitButtonHintStates.READY_TO_TRADE_TOKENS_APPROVED: {
        return <><Text green>Tokens approved</Text>. Let's trade!</>;
      }
    }
  }
  
  const getSubmitText = () => {
    switch(submitButtonState) {
      case SwapFormSubmitButtonStates.APPROVE_FCM: {
        return 'Approve FCM';
      }
      case SwapFormSubmitButtonStates.APPROVE_UT_FCM: {
        return <Box>Approve <Text>{underlyingTokenName}</Text> for fees</Box>;
      }
      case SwapFormSubmitButtonStates.APPROVE_UT_PERIPHERY: {
        return <Box>Approve <Text>{underlyingTokenName}</Text></Box>;
      }
      case SwapFormSubmitButtonStates.APPROVE_YBT_FCM: {
        return <Box>Approve <Text>{protocol}</Text> for trade</Box>;
      }
      case SwapFormSubmitButtonStates.APPROVING: {
        return <>Approving<Ellipsis /></>;
      }
      case SwapFormSubmitButtonStates.CHECKING: {
        return <>Loading<Ellipsis /></>;
      }
      case SwapFormSubmitButtonStates.INITIALISING: {
        return <>Initialising<Ellipsis /></>;
      }
      case SwapFormSubmitButtonStates.TRADE_FIXED: {
        return 'Trade Fixed Rate';
      }
      case SwapFormSubmitButtonStates.TRADE_VARIABLE: {
        return 'Trade Variable Rate';
      }
      case SwapFormSubmitButtonStates.UPDATE: {
        return 'Update Margin';
      }
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Button 
          disabled={
            !isFormValid || 
            tokenApprovals.checkingApprovals || 
            tokenApprovals.approving || 
            (mode === SwapFormModes.NEW_POSITION && (!approvalsNeeded && isFormValid && !isTradeVerified))
          } 
          onClick={onSubmit} 
          size="large" 
          sx={{ flexGrow: 1 }}
        >
          {getSubmitText()}
        </Button>

        <Button
          sx={{ marginLeft: (theme) => theme.spacing(7), flexGrow: 0 }}
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













