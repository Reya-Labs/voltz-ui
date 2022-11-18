import { Box } from '@mui/system';
import LPMellowVaultInfo from './LPMellowVaultInfo';
import { ReactComponent as Mellow } from '../../mellow-icon.svg';
import MellowLPPosition from './MellowLPPosition';
import { boxStyles, tagStyles, titleStyles, copyStyles } from './styles';
import React from 'react';
import { Typography } from '@components/atomic';
import { PoolField } from '@components/composite';

import { MellowProduct } from '../../types';
import { VaultField } from '../../Common/VaultField';

export type MellowLPEntryProps = {
  onSelectItem: () => void;
  lpVault: MellowProduct;
  dataLoading: boolean;
};

const MellowLPEntry: React.FunctionComponent<MellowLPEntryProps> = ({
  lpVault,
  onSelectItem,
  dataLoading,
}: MellowLPEntryProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          padding: (theme) => theme.spacing(4),
          maxWidth: '308px',
          maxHeight: '408px',
          width: '100%',
          height: '100%',
          backgroundColor: '#19152A',
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
          borderRadius: '8px 8px 0px 0px',
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
            {lpVault.metadata.title}
          </Typography>
        </Box>

        <VaultField maturity={lpVault.metadata.maturity} expectedApy={lpVault.metadata.estimatedHistoricApy} />

        <Typography variant="h6" sx={copyStyles}>
          The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates
          optimised LP fees by providing liquidity on Voltz Protocol.
        </Typography>

        <Box sx={{ ...boxStyles, padding: '2px 4px' }}>
          <Typography variant="h6" sx={{ ...tagStyles }}>
            {`${lpVault.metadata.underlyingPools.length} ${lpVault.metadata.token} POOLS`}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{...copyStyles, marginTop: '8px'}}>
          LIQUIDITY SPREAD ACROSS
        </Typography>

        <Box sx={{ marginLeft: '8px', marginTop: '4px' }}>
          {lpVault.metadata.underlyingPools.map((pool) =>
            (<PoolField protocol={pool} isBorrowing={false} isBorrowTable={true} />)
          )}
        </Box>

        <Box sx={{ marginLeft: '8px', marginTop: '16px' }}>
          <LPMellowVaultInfo
            vaultCap={lpVault.vault.vaultCap}
            vaultCumulative={lpVault.vault.vaultCumulative}
            tokenName={lpVault.metadata.token}
          />
        </Box>
      </Box>
      <Box
        sx={{
          background: '#1E1A33',
          padding: (theme) => theme.spacing(2, 4),
          borderRadius: '0px 0px 8px 8px',
        }}
      >
        <MellowLPPosition userDeposit={lpVault.vault.userDeposit} tokenName={lpVault.metadata.token} handleClick={onSelectItem} dataLoading={dataLoading} />
      </Box>
    </Box>
  );
};

export default MellowLPEntry;
