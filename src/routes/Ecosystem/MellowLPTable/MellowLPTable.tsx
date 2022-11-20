import { Box } from '@mui/system';
import { MellowProduct } from '../types';
import MellowLPEntry from './components/MellowLPEntry';
import { group } from './utils';

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
    <>
      {group<MellowProduct>(lpVaults, 3).map((line, index) =>
      (<Box sx={{ display:'flex', justifyContent: 'space-between', marginTop: index > 0 ? '16px' : '0px' }}>
        {line.map((product) => (
          <MellowLPEntry
            lpVault={product}
            onSelectItem={() => onSelectItem(product)}
            dataLoading={dataLoading}
          />
        ))}
      </Box>))}
    </>
  );
};

export default MellowLPTable;
