import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { AgentProps, Agents } from '@components/contexts';
import { Panel } from '@components/atomic';
import { useAgentWithOverride } from '@hooks';
import { TableOrder, TableFields, Mode, TEMPORARY_Pool } from './types';
import { transformData, getLabels, sortData, paginateData } from './utilities';
import { PoolTableControls, PoolTableHead, PoolTableRow } from './components';

export type PoolTableProps = AgentProps & {
  mode: Mode;
  data: TEMPORARY_Pool[];
};

const PoolTable: React.FunctionComponent<PoolTableProps> = ({
  agent: agentOverride,
  mode,
  data: rawData,
}) => {
  const { agent } = useAgentWithOverride(agentOverride);
  const [order, setOrder] = useState<TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<TableFields>('protocol');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const data = transformData({ data: rawData, mode, agent });
  const labels = getLabels({ agent, mode });
  const handleSort = (field: TableFields) => {
    setOrder(field === orderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc');
    setOrderBy(field);
  };

  const sortedData = sortData({ data, order, orderBy });
  const { data: paginatedData, pages } = paginateData({ data: sortedData, page, size });
  const onChangeAgent = (value: Agents) => null;

  return (
    <Panel variant="dark" sx={{ minWidth: 800 }}>
      <PoolTableControls mode={mode} quantity={data.length} />
      <TableContainer>
        <Table
          sx={{ minWidth: 750, borderCollapse: 'separate', borderSpacing: '0px 8px' }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <PoolTableHead order={order} orderBy={orderBy} onSort={handleSort} labels={labels} />
          <TableBody>
            {paginatedData.map((datum, index) => (
              <PoolTableRow datum={datum} mode={mode} labels={labels} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Panel>
  );
};

export default PoolTable;
