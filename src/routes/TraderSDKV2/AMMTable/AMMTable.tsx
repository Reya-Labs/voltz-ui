import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@theme';

import { Panel } from '@components/atomic';
import { AMMTableHead, AMMTableRow } from './components';
import { useAgent } from '@hooks';
import { Agents } from '@contexts';
import { AMM } from '@voltz-protocol/v2-sdk';

export type AMMTableProps = {
  amms: AMM[];
};

const commonOverrides: SystemStyleObject<Theme> = {
  '& .MuiTableCell-root': {
    borderColor: 'transparent',
    paddingRight: (theme) => theme.spacing(4),
    paddingLeft: (theme) => theme.spacing(4),
    paddingTop: (theme) => theme.spacing(3),
    paddingBottom: (theme) => theme.spacing(4),
    '&:first-of-type': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    '&:last-of-type': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
  },
  '.MuiInputLabel-root': {
    marginBottom: (theme) => theme.spacing(1),
  },
};

const AMMTable: React.FunctionComponent<AMMTableProps> = ({ amms }) => {
  const { agent } = useAgent();
  const _variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'dark';

  const activePools = amms.filter((amm) => !amm.matured);

  return (
    <Panel
      variant={_variant}
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
            {activePools.map((amm, index) => (
              <AMMTableRow key={amm.id} amm={amm} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Panel>
  );
};

export default AMMTable;
