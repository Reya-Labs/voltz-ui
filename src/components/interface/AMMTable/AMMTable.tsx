import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@mui/system';

import { data } from '@utilities';
import { AgentProps } from '@components/contexts';
import { Panel } from '@components/atomic';
import { useAgentWithOverride } from '@hooks';
import { AMMTableControls, AMMTableFooter, AMMTableHead, AMMTableRow } from './components';

export type AMMTableProps = AgentProps & {
  mode: data.Mode;
  data: data.TEMPORARY_Pool[];
  onSelectVamm: (vammId: string, positionId?: string) => void;
};

const AMMTable: React.FunctionComponent<AMMTableProps> = ({
  agent: agentOverride,
  mode,
  data: rawData,
  onSelectVamm,
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
  const [order, setOrder] = useState<data.TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<data.TableFields>('protocol');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const transformedData = data.transformData({ data: rawData, mode, agent });
  const labels = data.getLabels({ agent, mode });
  const handleSort = (field: data.TableFields) => {
    setOrder(field === orderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc');
    setOrderBy(field);
  };

  const sortedData = data.sortData({ data: transformedData, order, orderBy });
  const { data: paginatedData, pages } = data.paginateData({ data: sortedData, page, size });

  return (
    <Panel variant="dark" sx={{ minWidth: 800 }}>
      <AMMTableControls mode={mode} quantity={transformedData.length} />
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
          <AMMTableHead order={order} orderBy={orderBy} onSort={handleSort} labels={labels} />
          <TableBody>
            {paginatedData.map((datum, index) => (
              <AMMTableRow
                datum={datum}
                mode={mode}
                labels={labels}
                index={index}
                onSelectVamm={onSelectVamm}
              />
            ))}
          </TableBody>
          <AMMTableFooter
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

export default AMMTable;
