import { Box } from '@mui/system';
import { MellowProduct } from '../types';
import MellowLPEntry from './components/MellowLPEntry';

export type MellowLPTableProps = {
  lpVaults: MellowProduct[];
  onSelectItem: (item: MellowProduct) => void;
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
