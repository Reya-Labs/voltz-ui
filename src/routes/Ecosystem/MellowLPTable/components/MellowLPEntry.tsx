import { Agents } from '@contexts';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import PoolField from '../../../../components/composite/PoolField/PoolField';
import LPMellowVaultInfo from './LPMellowVaultInfo';
import { ReactComponent as Mellow } from '../../mellow-icon.svg';
import MellowLPPosition from './MellowLPPosition';
import { boxStyles, tagStyles, titleStyles, copyStyles } from './styles';
import React from 'react';

import { MellowLpVault } from '@voltz-protocol/v1-sdk';

export type MellowLPEntryProps = {
  onSelectItem: () => void;
  lpVault: MellowLpVault;
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
            MELLOW VAULT
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" sx={copyStyles}>
            The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates
            optimised LP fees by providing liquidity on Voltz Protocol.
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
      </Box>
      <Box
        sx={{
          background: '#1E1A33',
          padding: (theme) => theme.spacing(2, 4),
          borderRadius: '0px 0px 8px 8px',
        }}
      >
        <MellowLPPosition userDeposit={lpVault.userDeposit} tokenName={lpVault.tokenName} handleClick={onSelectItem} dataLoading={dataLoading} />
      </Box>
    </Box>
  );
};

export default MellowLPEntry;
