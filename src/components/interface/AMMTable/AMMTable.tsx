import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { AMM } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { selectNetwork } from '../../../app/features/network';
import { useAppSelector } from '../../../app/hooks';
import { Agents } from '../../../contexts/AgentContext/types';
import { AMMProvider } from '../../../contexts/AMMContext/AMMContext';
import { useAgent } from '../../../hooks/useAgent';
import { getConfig } from '../../../hooks/voltz-config/config';
import { isAaveV3, isBorrowing } from '../../../utilities/amm';
import { MATURITY_WINDOW } from '../../../utilities/constants';
import { Loading } from '../../atomic/Loading/Loading';
import { Panel } from '../../atomic/Panel/Panel';
import { AMMTableHead, AMMTableRow } from './components';
import { commonOverrides } from './styles';

export type AMMTableProps = {
  onSelectItem: (amm: AMM) => void;
  loading: boolean;
  amms: AMM[];
  error: boolean;
};

export const AMMTable: React.FunctionComponent<AMMTableProps> = ({
  amms,
  loading,
  error,
  onSelectItem,
}) => {
  const { agent } = useAgent();
  const network = useAppSelector(selectNetwork);
  if (loading) {
    return (
      <Panel sx={{ width: '100%' }} variant="grey-dashed">
        <Loading />
      </Panel>
    );
  }
  if (error) {
    return null;
  }
  const config = getConfig(network);
  const pools = config ? config.pools : [];
  return (
    <Panel
      borderRadius="large"
      padding="container"
      sx={{ paddingTop: 0, paddingBottom: 0 }}
      variant={agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'dark'}
    >
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size="medium"
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0px 16px',
            ...commonOverrides,
          }}
        >
          <AMMTableHead />
          <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
            {amms
              .filter((amm) => Date.now().valueOf() + MATURITY_WINDOW < amm.endDateTime.toMillis())
              .map((amm) => (
                <AMMProvider key={amm.id} amm={amm}>
                  <AMMTableRow
                    endDate={amm.endDateTime}
                    isAaveV3={isAaveV3(pools, amm.id)}
                    isBorrowing={isBorrowing(amm.rateOracle.protocolId)}
                    protocol={amm.protocol}
                    startDate={amm.startDateTime}
                    onSelect={() => onSelectItem(amm)}
                  />
                </AMMProvider>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Panel>
  );
};
