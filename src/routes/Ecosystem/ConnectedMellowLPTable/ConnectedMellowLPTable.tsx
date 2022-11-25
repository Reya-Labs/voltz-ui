import Box from '@mui/material/Box';
import { Panel } from '../../../components/atomic';
import MellowLPTable from '../MellowLPTable/MellowLPTable';
import EcosystemHeader from '../EcosystemHeader/EcosystemHeader';

import { MellowProduct } from '../types';

export type ConnectedMellowLPTableProps = {
  lpVaults: MellowProduct[];
  dataLoading: boolean;
  onSelectItem: (item: MellowProduct) => void;
};

const ConnectedMellowLPTable: React.FunctionComponent<ConnectedMellowLPTableProps> = ({
  lpVaults,
  dataLoading,
  onSelectItem,
}) => {
  const renderContent = () => {
    return (
      <Panel
        variant="dark"
        sx={{
          padding: 0,
          width: '100%',
          maxWidth: '1088px',
          margin: '0 auto',
          background: 'transparent',
        }}
      >
        <EcosystemHeader />
        {lpVaults && (
          <Box sx={{ marginTop: '32px' }}>
            <MellowLPTable
              mellowProducts={lpVaults}
              onSelectItem={onSelectItem}
              dataLoading={dataLoading}
            />
          </Box>
        )}
      </Panel>
    );
  };

  return renderContent();
};

export default ConnectedMellowLPTable;
