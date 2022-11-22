import { Box } from '@mui/system';
import { Panel, Typography } from '../../../components/atomic';
import { titleStyles, copyStyles } from './styles';

const EcosystemHeader = () => {
  return (
    <Panel sx={{ padding: 0, background: 'transparent' }}>
      <Box sx={{ maxWidth: '743px' }}>
        <Typography variant="h1" sx={titleStyles}>
          LP OPTIMIZER VAULTS
        </Typography>
        <Typography variant="body1" sx={copyStyles}>
          The Voltz-Mellow Vaults run automated strategies, optimizing deposits for high LP fees
          while taking away the complex math, empowering every user to become a Voltz LP.
        </Typography>
      </Box>
    </Panel>
  );
};

export default EcosystemHeader;
