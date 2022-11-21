import { Box } from '@mui/system';
import { MellowProduct } from '../types';
import MellowLPEntry from './components/MellowLPEntry';
import { group } from './utils';

export type MellowLPTableProps = {
  mellowProducts: MellowProduct[];
  onSelectItem: (item: MellowProduct) => void;
  dataLoading: boolean;
};

const MellowLPTable: React.FunctionComponent<MellowLPTableProps> = ({
  mellowProducts,
  onSelectItem,
  dataLoading,
}: MellowLPTableProps) => {
  const groupedMellowProducts = group<MellowProduct>(mellowProducts, 3);

  return (
    <>
      {groupedMellowProducts.map((row, index) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: index > 0 ? '16px' : '0px',
          }}
        >
          {row.map((product) => (
            <MellowLPEntry
              lpVault={product}
              onSelectItem={() => onSelectItem(product)}
              dataLoading={dataLoading}
            />
          ))}
        </Box>
      ))}
    </>
  );
};

export default MellowLPTable;
