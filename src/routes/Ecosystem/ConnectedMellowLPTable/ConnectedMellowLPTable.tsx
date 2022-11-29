import Box from '@mui/material/Box';
import React from 'react';

import { Panel } from '../../../components/atomic/Panel/Panel';
import { MellowProduct } from '../../../store/features/ecosystem/getMellowLPVaults/config';
import EcosystemHeader from '../EcosystemHeader/EcosystemHeader';
import MellowLPTable from '../MellowLPTable/MellowLPTable';

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
        sx={{
          padding: 0,
          width: '100%',
          maxWidth: '1088px',
          margin: '0 auto',
          background: 'transparent',
        }}
        variant="dark"
      >
        <EcosystemHeader />
        {lpVaults && (
          <Box sx={{ marginTop: '32px' }}>
            <MellowLPTable
              dataLoading={dataLoading}
              mellowProducts={lpVaults}
              onSelectItem={onSelectItem}
            />
          </Box>
        )}
      </Panel>
    );
  };

  return renderContent();
};

export default ConnectedMellowLPTable;
