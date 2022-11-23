import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { AMMProvider, Agents } from '@contexts';
import { Panel } from '@components/atomic';
import { AMMTableHead, AMMTableRow } from './components';
import { useAgent, useAMMs } from '@hooks';
import { DateTime } from 'luxon';

import { AMM } from '@voltz-protocol/v1-sdk';
import { commonOverrides } from './styles';
import { isBorrowing } from '@utilities';

export type AMMTableProps = {
  onSelectItem: (datum: AMM) => void;
};

const AMMTable: React.FunctionComponent<AMMTableProps> = ({ onSelectItem }) => {
  const { amms, loading, error } = useAMMs();
  const { agent } = useAgent();

  if (!amms || loading || error) {
    return null;
  }

  const handleSelectRow = (index: number) => () => {
    onSelectItem(amms[index]);
  };

  return (
    <Panel
      variant={agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'dark'}
      borderRadius="large"
      padding="container"
      sx={{ paddingTop: 0, paddingBottom: 0 }}
    >
      <TableContainer>
        <Table
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0px 16px',
            ...commonOverrides,
          }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <AMMTableHead />
          <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
            {amms
              .filter((amm) => DateTime.now() < amm.endDateTime)
              .map((amm, index) => (
                <AMMProvider amm={amms[index]} key={amm.id}>
                  <AMMTableRow
                    protocol={amm.protocol}
                    isBorrowing={isBorrowing(amm.rateOracle.protocolId)}
                    startDate={amm.startDateTime}
                    endDate={amm.endDateTime}
                    index={index}
                    onSelect={handleSelectRow(index)}
                  />
                </AMMProvider>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Panel>
  );
};

export default AMMTable;
