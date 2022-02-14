import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@mui/system';

import { AgentProps } from '@components/contexts';
import { Panel } from '@components/atomic';
import { useAgentWithOverride } from '@hooks';
import { TableOrder, TableFields, Mode, TEMPORARY_Pool } from './types';
import { transformData, getLabels, sortData, paginateData } from './utilities';
import { PoolTableControls, PoolTableFooter, PoolTableHead, PoolTableRow } from './components';

export type PoolTableProps = AgentProps & {
  mode: Mode;
  data: TEMPORARY_Pool[];
};

const PoolTable: React.FunctionComponent<PoolTableProps> = ({
  agent: agentOverride,
  mode,
  data: rawData,
}) => {
  const commonOverrides: SystemStyleObject<Theme> = {
    '& .MuiTableCell-root': {
      borderColor: 'transparent',
      paddingRight: (theme) => theme.spacing(4),
      paddingLeft: (theme) => theme.spacing(4),
      paddingTop: (theme) => theme.spacing(2),
      paddingBottom: (theme) => theme.spacing(1),
      '&:first-of-type': {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      '&:last-of-type': {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
  };
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

  return (
    <Panel variant="dark" sx={{ minWidth: 800 }}>
      <PoolTableControls mode={mode} quantity={data.length} />
      <TableContainer>
        <Table
          sx={{
            minWidth: 750,
            borderCollapse: 'separate',
            borderSpacing: '0px 8px',
            ...commonOverrides,
          }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <PoolTableHead order={order} orderBy={orderBy} onSort={handleSort} labels={labels} />
          <TableBody>
            {paginatedData.map((datum, index) => (
              <PoolTableRow datum={datum} mode={mode} labels={labels} index={index} />
            ))}
          </TableBody>
          <PoolTableFooter
            columns={labels.length + 1}
            pages={pages}
            page={page}
            onChangePage={setPage}
            size={size}
            onChangeSize={setSize}
          />
        </Table>
      </TableContainer>
    </Panel>
  );
};

export default PoolTable;
