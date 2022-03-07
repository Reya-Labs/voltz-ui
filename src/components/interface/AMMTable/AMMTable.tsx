import React, { useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@mui/system';
import { AMM } from '@voltz/v1-sdk';

import { data } from '@utilities';
import { AgentProps } from '@components/contexts';
import { Panel } from '@components/atomic';
import { useAgentWithOverride } from '@hooks';
import { AMMTableFields } from './types';
import { labels } from './constants';
import { mapAmmToAmmTableDatum } from './utilities';
import { AMMTableControls, AMMTableFooter, AMMTableHead, AMMTableRow } from './components';

export type AMMTableProps = AgentProps & {
  mode: data.Mode;
  amms: AMM[];
  order: data.TableOrder;
  onSetOrder: (order: data.TableOrder) => void;
  orderBy: AMMTableFields;
  onSetOrderBy: (orderBy: AMMTableFields) => void;
  page: number;
  pages: number;
  onSetPage: (page: number) => void;
  size: number | null;
  onSetSize: (size: number) => void;
  onSelectItem: (vammId: string) => void;
};

const AMMTable: React.FunctionComponent<AMMTableProps> = ({
  agent: agentOverride,
  mode,
  amms,
  order,
  onSetOrder,
  orderBy,
  onSetOrderBy,
  page,
  pages,
  onSetPage,
  size,
  onSetSize,
  onSelectItem,
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
  const handleSort = (field: AMMTableFields) => {
    onSetOrder(field === orderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc');
    onSetOrderBy(field);
  };
  const tableData = useMemo(() => {
    return amms.map(mapAmmToAmmTableDatum);
  }, [order, page, size]);

  return (
    <Panel variant="dark" sx={{ minWidth: 800 }}>
      <AMMTableControls mode={mode} quantity={amms.length} />
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
          <AMMTableHead order={order} orderBy={orderBy} onSort={handleSort} />
          <TableBody>
            {tableData.map((datum, index) => (
              <AMMTableRow datum={datum} index={index} onSelect={onSelectItem} />
            ))}
          </TableBody>
          <AMMTableFooter
            columns={labels.length + 1}
            pages={pages}
            page={page}
            onChangePage={onSetPage}
            size={size}
            onChangeSize={onSetSize}
          />
        </Table>
      </TableContainer>
    </Panel>
  );
};

export default AMMTable;
