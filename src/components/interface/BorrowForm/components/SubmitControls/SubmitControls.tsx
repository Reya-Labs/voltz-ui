import { useTokenApproval } from '@hooks';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@components/atomic';
import { colors } from '@theme';
import { BorrowFormSubmitButtonHintStates } from '@contexts';
import { ReactNode } from 'react';

interface SubmitControlsProps {
  approvalsNeeded: boolean;
  isFormValid: boolean;
  isTradeVerified: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  protocol?: string;
  tokenApprovals: ReturnType<typeof useTokenApproval>
  tradeInfoErrorMessage?: string;
  underlyingTokenName?: string;
  hintState: BorrowFormSubmitButtonHintStates;
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
  isFormValid, 
  isTradeVerified,
  onCancel, 
  onSubmit, 
  tokenApprovals,
  hintState,
  tradeInfoErrorMessage,
  underlyingTokenName
}: SubmitControlsProps) => {
  const getHint = () => {
    switch(hintState) {
      case BorrowFormSubmitButtonHintStates.APPROVE_NEXT_TOKEN: {
        return (
          <>
            <Text green bold>{tokenApprovals.lastApproval?.text}</Text><Text green> approved!</Text> 
            {' '}Let's now approve <Text bold>{tokenApprovals.getNextApproval(false)?.text}</Text>
          </>
        );
      }
      case BorrowFormSubmitButtonHintStates.APPROVE_TOKEN: {
        return `Please approve ${tokenApprovals.getNextApproval(false)?.text || ''}`;
      }
      case BorrowFormSubmitButtonHintStates.APPROVING: {
        return 'Waiting for confirmation';
      }
      case BorrowFormSubmitButtonHintStates.CHECKING: {
        return 'Loading trade information';
      }
      case BorrowFormSubmitButtonHintStates.ERROR_TOKEN_APPROVAL: {
        return <Text red>{tokenApprovals.lastError?.message}</Text>;
      }
      case BorrowFormSubmitButtonHintStates.FORM_INVALID: {
        return 'Please fix form errors to continue';
      }
      case BorrowFormSubmitButtonHintStates.FORM_INVALID_BALANCE: {
        return <Text red>You do not have enough {underlyingTokenName}</Text>;
      }
      case BorrowFormSubmitButtonHintStates.FORM_INVALID_INCOMPLETE: {
        return 'Input your margin';
      }
      case BorrowFormSubmitButtonHintStates.FORM_INVALID_TRADE: {
        return <Text red>{tradeInfoErrorMessage}</Text>;
      }
      case BorrowFormSubmitButtonHintStates.INITIALISING: {
        return 'Initialising, please wait';
      }
      case BorrowFormSubmitButtonHintStates.READY_TO_TRADE: {
        return 'Let\'s trade!';
      }
      case BorrowFormSubmitButtonHintStates.READY_TO_TRADE_TOKENS_APPROVED: {
        return <><Text green>Tokens approved</Text>. Let's trade!</>;
      }
    }
  }
  
  const getSubmitText = () => {
    return 'Fix rate!';
  };
  


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Button 
          disabled={
            (!isFormValid || 
            tokenApprovals.checkingApprovals || 
            tokenApprovals.approving || 
            approvalsNeeded ||
            !isTradeVerified)
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













