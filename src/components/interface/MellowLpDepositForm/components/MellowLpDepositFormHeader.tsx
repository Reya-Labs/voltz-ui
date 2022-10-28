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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit
            dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu
            vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Button sx={{ ...boxStyles, border: '1px solid #FF4AA9' }} onClick={onCancel}>
            <Typography variant="h6" sx={{ ...tagStyles }}>
              ECOSYSTEM
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
