import { Agents } from '@contexts';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AugmentedMellowLpVault } from '@utilities';
import PoolField from '../../../composite/PoolField/PoolField';
import LPMellowVaultInfo from './LPMellowVaultInfo';
import { ReactComponent as Mellow } from './mellow-icon.svg';
import MellowLPPosition from './MellowLPPosition';
import { boxStyles, tagStyles, titleStyles, copyStyles } from './styles';

export type MellowLPEntryProps = {
  onSelectItem: () => void;
  lpVault: AugmentedMellowLpVault;
  disabled: boolean;
};

const MellowLPEntry: React.FunctionComponent<MellowLPEntryProps> = ({
  lpVault,
  onSelectItem,
  disabled,
}: MellowLPEntryProps) => {
  return (
    <Box
      sx={{
        backgroundColor: '#19152A',
        padding: '16px',
        maxWidth: '308px',
        maxHeight: '408px',
        width: '100%',
        height: '100%',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
      }}
    >
      <Box sx={{ ...boxStyles }}>
        <Typography variant="h6" sx={{ ...tagStyles }}>
          LP OPTIMISER
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', marginLeft: '8px', marginTop: '16px', alignItems: 'center' }}>
        <Mellow />

        <Typography variant="h1" sx={titleStyles}>
          MELLOW VAULT
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" sx={copyStyles}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit
          dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum
          et. Ut sed mauris urna justo, dictumst molestie posuere.
        </Typography>
      </Box>

      {lpVault.protocol !== '-' && (
        <Box sx={{ marginLeft: '8px', marginTop: '16px' }}>
          <PoolField
            agent={Agents.LIQUIDITY_PROVIDER}
            protocol={lpVault.protocol}
            isBorrowing={false}
            isBorrowTable={true}
          />
        </Box>
      )}

      <Box sx={{ marginLeft: '8px', marginTop: '16px' }}>
        <LPMellowVaultInfo lpVault={lpVault} />
      </Box>

      <Box sx={{ marginLeft: '8px', marginTop: '16px' }}>
        <MellowLPPosition lpVault={lpVault} handleClick={onSelectItem} disabled={disabled} />
      </Box>
    </Box>
  );
};

export default MellowLPEntry;
