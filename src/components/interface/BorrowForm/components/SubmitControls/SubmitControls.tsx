import { useTokenApproval } from '@hooks';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@components/atomic';
import { colors } from '@theme';

interface SubmitControlsProps {
  approvalsNeeded: boolean;
  isFormValid: boolean;
  isTradeVerified: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  protocol?: string;
  tokenApprovals: {
    checkingApprovals: boolean;
    approving: boolean;
  };
  tradeInfoErrorMessage?: string;
  underlyingTokenName?: string;
}

const SubmitControls = ({
  approvalsNeeded,
  isFormValid, 
  isTradeVerified,
  onCancel, 
  onSubmit, 
  tokenApprovals,
}: SubmitControlsProps) => {
  const getHint = () => {
    return 'Fix rate!';
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













