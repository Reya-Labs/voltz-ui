import { Panel, Typography } from '@components/atomic';
import { Box } from '@mui/system';
import { ReactComponent as Mellow } from '../../MellowLPTable/components/mellow-icon.svg';
import { Button } from '@mui/material';
import { titleStyles, copyStyles, boxStyles, tagStyles } from './styles';

export type MellowLpDepositFormHeaderProps = {
  onCancel: () => void;
};

const MellowLpDepositHeaderForm: React.FunctionComponent<MellowLpDepositFormHeaderProps> = ({
  onCancel,
}) => {
  const renderContent = () => {
    return (
      <Panel variant="dark" sx={{ width: '100%', maxWidth: '561px', background: 'transparent' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Mellow />
            <Typography variant="h1" sx={titleStyles}>
              MELLOW LP OPTIMISER
            </Typography>
          </Box>
          <Typography variant="body1" sx={copyStyles}>
            The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates
            optimised LP fees by providing liquidity on Voltz Protocol.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Button sx={{ ...boxStyles }} onClick={onCancel}>
            <Typography variant="h6" sx={{ ...tagStyles }}>
              BACK
            </Typography>
          </Button>

          <Box sx={{ ...boxStyles, background: '#472043', marginLeft: '24px' }}>
            <Typography variant="h6" sx={{ ...tagStyles }}>
              LP OPTIMISER
            </Typography>
          </Box>
        </Box>
      </Panel>
    );
  };

  return renderContent();
};

export default MellowLpDepositHeaderForm;
