import { Box } from '@mui/system';
import MellowLPEntry from './components/MellowLPEntry';

import { MellowLpVault } from '@voltz-protocol/v1-sdk';

export type MellowLPTableProps = {
  lpVaults: MellowLpVault[];
  onSelectItem: (item: MellowLpVault) => void;
  disabled: boolean;
};

const MellowLPTable: React.FunctionComponent<MellowLPTableProps> = ({
  lpVaults,
  onSelectItem,
  disabled,
}: MellowLPTableProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <MellowLPEntry
        lpVault={lpVaults[0]}
        onSelectItem={() => onSelectItem(lpVaults[0])}
        disabled={disabled}
      />
    </Box>
  );
};

// const MellowLPTable: React.FunctionComponent<MellowLPTableProps> = ({
//   lpVaults,
//   onSelectItem,
//   disabled,
// }: MellowLPTableProps) => {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//       {lpVaults.map((lpVault) => {
//         return (
//           <MellowLPEntry
//             lpVault={lpVault}
//             onSelectItem={() => onSelectItem(lpVault)}
//             disabled={disabled}
//           />
//         )
//       })}
//     </Box>
//   );
// };

export default MellowLPTable;
