import { Box } from '@mui/system';
import MellowLPEntry from './components/MellowLPEntry';

import { MellowLpVault } from '@voltz-protocol/v1-sdk';

export type MellowLPTableProps = {
  lpVaults: MellowLpVault[];
  onSelectItem: (item: MellowLpVault) => void;
  dataLoading: boolean;
};

const MellowLPTable: React.FunctionComponent<MellowLPTableProps> = ({
  lpVaults,
  onSelectItem,
  dataLoading,
}: MellowLPTableProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <MellowLPEntry
        lpVault={lpVaults[0]}
        onSelectItem={() => onSelectItem(lpVaults[0])}
        dataLoading={dataLoading}
      />
    </Box>
  );
};

export default MellowLPTable;
