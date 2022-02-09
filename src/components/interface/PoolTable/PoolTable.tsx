import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/Table';

import { AgentProps } from '@theme';
import { Panel } from '@components/atomic';
import { TableOrder, TableFields, Mode, TEMPORARY_Pool } from './types';
import { transformData, getLabels, sortData, paginateData } from './utilities';
import { PoolTableHead, PoolTableRow } from './components';

export type PoolTableProps = AgentProps & {
  mode: Mode;
  data: TEMPORARY_Pool[];
};

const PoolTable: React.FunctionComponent<PoolTableProps> = ({ agent, mode, data: rawData }) => {
  const [order, setOrder] = useState<TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<TableFields>('protocol');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const data = transformData({ data: rawData, mode });
  const labels = getLabels({ agent, mode });
  const handleSort = (field: TableFields) => {
    setOrder(field === orderBy ? 'asc' : 'desc');
    setOrderBy(field);
  };

  const sortedData = sortData({ data, order, orderBy });
  const { data: paginatedData, pages } = paginateData({ data: sortedData, page, size });

  return (
    <Panel>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
          <PoolTableHead order={order} orderBy={orderBy} onSort={handleSort} labels={labels} />
          {paginatedData.map((datum) => (
            <PoolTableRow datum={datum} agent={agent} mode={mode} labels={labels} />
          ))}
        </Table>
      </TableContainer>
    </Panel>
  );
};

export default PoolTable;
