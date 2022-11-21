import { Box } from '@mui/system';
import MellowLPPosition from './MellowLPPosition';
import { boxStyles, tagStyles, copyStyles } from './styles';
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
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          padding: (theme) => theme.spacing(4),
          backgroundColor: '#19152A',
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
          borderRadius: '8px 8px 0px 0px',
          flex: 1,
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ ...boxStyles }}>
            <Typography variant="h6" sx={{ ...tagStyles }}>
              LP OPTIMISER
            </Typography>
          </Box>

          {lpVault.metadata.deprecated && (
            <Box sx={{ ...boxStyles }}>
              <Typography variant="h6" sx={{ ...tagStyles }}>
                DEPRECATED
              </Typography>
            </Box>
          )}
        </Box>

        <VaultField
          title={lpVault.metadata.title}
          maturity={lpVault.metadata.maturity}
          expectedApy={lpVault.metadata.estimatedHistoricApy}
        />

        <Typography variant="h6" sx={copyStyles}>
          The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates
          optimised LP fees by providing liquidity on Voltz Protocol.
        </Typography>

        <Box sx={{ ...boxStyles, padding: '2px 4px' }}>
          <Typography variant="h6" sx={{ ...tagStyles }}>
            {`${lpVault.metadata.underlyingPools.length} ${lpVault.metadata.token} ${
              lpVault.metadata.underlyingPools.length === 1 ? 'POOL' : 'POOLS'
            }`}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ ...copyStyles, marginTop: '8px' }}>
          LIQUIDITY SPREAD ACROSS
        </Typography>

        <Box sx={{ marginLeft: '8px', marginTop: '4px' }}>
          {lpVault.metadata.underlyingPools.map((pool, index) => (
            <PoolField
              key={`${pool}-${index}`}
              protocol={pool}
              isBorrowing={false}
              isBorrowTable={true}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          background: '#1E1A33',
          padding: '16px 16px 16px 24px',
          borderRadius: '0px 0px 8px 8px',
        }}
      >
        <MellowLPPosition
          userDeposit={lpVault.vault.userDeposit}
          tokenName={lpVault.metadata.token}
          handleClick={onSelectItem}
          dataLoading={dataLoading}
          disabled={lpVault.metadata.deprecated}
        />
      </Box>
    </Box>
  );
};

export default MellowLPEntry;
