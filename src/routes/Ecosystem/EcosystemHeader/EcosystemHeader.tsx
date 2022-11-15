import { Box } from '@mui/system';
import { Panel, Typography } from '../../../components/atomic';
import { titleStyles, copyStyles, boxStyles, tagStyles } from './styles';

export type EcosystemHeaderProps = {
  lpOptimizerTag: string;
  lpOptimizerCount: number;
  alphaVaultTag: string;
  alphaVaultCount: number;
};

const EcosystemHeader = ({
  lpOptimizerTag,
  lpOptimizerCount,
  alphaVaultTag,
  alphaVaultCount,
}: EcosystemHeaderProps) => {
  const renderContent = () => {
    return (
      <Panel sx={{ padding: 0, background: 'transparent' }}>
        <Box>
          <Typography variant="h1" sx={titleStyles}>
            VOLTZ ECOSYSTEM
          </Typography>
          <Typography variant="body1" sx={copyStyles}>
            Access a world of new products, integrations, protocols and applications built on top of
            Voltz Protocol.
          </Typography>
        </Box>
        <Box sx={{ marginTop: '16px', display: 'flex' }}>
          {/* TODO: add back LP OPTIMISER tag when count > 1  */}
          {/* <Box sx={{ ...boxStyles, border: '1px solid #FF4AA9' }}>
            <Typography variant="h6" sx={{ ...tagStyles, color: '#FF4AA9' }}>
              {lpOptimizerTag}
              {lpOptimizerCount > 0 ? ':' : ''}
            </Typography>
            <Typography variant="h6" sx={{ ...tagStyles, color: '#E5E1F9', paddingLeft: '8px' }}>
              {lpOptimizerCount ? lpOptimizerCount : 's00n'}
            </Typography>
          </Box> */}

          <Box sx={{ ...boxStyles, border: '1px solid #2667FF' }}>
            <Typography variant="h6" sx={{ ...tagStyles, color: '#2667FF' }}>
              {alphaVaultTag}
              {alphaVaultCount > 0 ? ':' : ''}
            </Typography>
            <Typography variant="h6" sx={{ ...tagStyles, color: '#E5E1F9', paddingLeft: '8px' }}>
              {alphaVaultCount ? alphaVaultCount : 's00n'}
            </Typography>
          </Box>
        </Box>
      </Panel>
    );
  };

  return renderContent();
};

export default EcosystemHeader;
