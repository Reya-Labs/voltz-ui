import { ReactNode } from 'react';
import { SwapFormSubmitButtonHintStates, SwapFormSubmitButtonStates } from '@contexts';
import { useTokenApproval } from '@hooks';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Ellipsis } from '@components/atomic';
import { colors } from '@theme';
import { SwapFormModes } from '../../types';

interface SubmitControlsProps {
  approvalsNeeded: boolean;
  hintState: SwapFormSubmitButtonHintStates;
  isFormValid: boolean;
  isTradeVerified: boolean;
  mode: SwapFormModes;
  onCancel: () => void;
  onSubmit: () => void;
  protocol?: string;
  gaButtonId?: string;
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
  <Box
    component="span"
    sx={{
      color: green ? colors.vzCustomGreen1.base : red ? colors.vzCustomRed1.base : undefined,
      fontWeight: bold ? 'bold' : undefined,
      textTransform: 'none',
    }}
  >
    {children}
  </Box>
);

const SubmitControls = ({
  approvalsNeeded,
  hintState,
  isFormValid,
  isTradeVerified,
  mode,
  onCancel,
  onSubmit,
  protocol,
  gaButtonId,
  submitButtonState,
  tokenApprovals,
  tradeInfoErrorMessage,
  underlyingTokenName,
}: SubmitControlsProps) => {
  const getHint = () => {
    switch (hintState) {
      case SwapFormSubmitButtonHintStates.APPROVE_NEXT_TOKEN: {
        return (
          <>
            <Text green bold>
              {tokenApprovals.lastApproval?.text}
            </Text>
            <Text green> approved!</Text> Let's now approve{' '}
            <Text bold>{tokenApprovals.getNextApproval()?.text}</Text>
          </>
        );
      }
      case SwapFormSubmitButtonHintStates.APPROVE_TOKEN: {
        return `Please approve ${tokenApprovals.getNextApproval()?.text || ''}`;
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
        return "Let's trade!";
      }
      case SwapFormSubmitButtonHintStates.READY_TO_TRADE_TOKENS_APPROVED: {
        return (
          <>
            <Text green>Tokens approved</Text>. Let's trade!
          </>
        );
      }
      case SwapFormSubmitButtonHintStates.ADD_AND_ADD: {
        return "You're ADDING NOTIONAL and MARGIN";
      }
      case SwapFormSubmitButtonHintStates.REMOVE_AND_ADD: {
        return "You're REMOVING NOTIONAL and ADDING MARGIN";
      }
      case SwapFormSubmitButtonHintStates.ADD_AND_REMOVE: {
        return "You're ADDING NOTIONAL and REMOVING MARGIN";
      }
      case SwapFormSubmitButtonHintStates.REMOVE_AND_REMOVE: {
        return "You're REMOVING NOTIONAL and MARGIN";
      }
    }
  };

  const getSubmitText = () => {
    switch (submitButtonState) {
      case SwapFormSubmitButtonStates.APPROVE_UT_PERIPHERY: {
        return (
          <Box>
            Approve <Text>{underlyingTokenName}</Text>
          </Box>
        );
      }
      case SwapFormSubmitButtonStates.APPROVING: {
        return (
          <>
            Approving
            <Ellipsis />
          </>
        );
      }
      case SwapFormSubmitButtonStates.CHECKING: {
        return (
          <>
            Loading
            <Ellipsis />
          </>
        );
      }
      case SwapFormSubmitButtonStates.INITIALISING: {
        return (
          <>
            Initialising
            <Ellipsis />
          </>
        );
      }
      case SwapFormSubmitButtonStates.ROLLOVER_TRADE: {
        return 'Settle and trade';
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
      case SwapFormSubmitButtonStates.UPDATE_POSITION: {
        return 'Update Position';
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
            ((mode === SwapFormModes.NEW_POSITION || mode === SwapFormModes.ROLLOVER) &&
              !approvalsNeeded &&
              isFormValid &&
              !isTradeVerified)
          }
          onClick={onSubmit}
          size="large"
          sx={{ flexGrow: 1 }}
          id={gaButtonId}
        >
          {getSubmitText()}
        </Button>

        <Button
          sx={{ marginLeft: (theme) => theme.spacing(7), flexGrow: 0 }}
          variant="dark"
          onClick={onCancel}
          id={gaButtonId}
        >
          Back
        </Button>
      </Box>

      <Typography
        variant="body2"
        sx={{
          marginTop: (theme) => theme.spacing(2),
          color: colors.lavenderWeb.darken015,
          fontSize: '12px',
        }}
      >
        {getHint()}
      </Typography>
    </>
  );
};

export default SubmitControls;
