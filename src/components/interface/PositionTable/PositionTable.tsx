import React, { useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@mui/system';
import { Position } from '@voltz/v1-sdk';

import { data } from '@utilities';
import { useAgent } from '@hooks';
import { Panel } from '@components/atomic';
import { PositionTableFields } from './types';
import { labels } from './constants';
import { mapPositionToPositionTableDatum } from './utilities';
import {
  PositionTableControls,
  PositionTableFooter,
  PositionTableHead,
  PositionTableRow,
} from './components';

export type PositionTableProps = {
  positions: Position[];
  order: data.TableOrder;
  onSetOrder: (order: data.TableOrder) => void;
  orderBy: PositionTableFields;
  onSetOrderBy: (orderBy: PositionTableFields) => void;
  page: number;
  pages: number;
  onSetPage: (page: number) => void;
  size: number | null;
  onSetSize: (size: number) => void;
  onSelectItem: (datum: Position) => void;
};

const PositionTable: React.FunctionComponent<PositionTableProps> = ({
  positions,
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
  const { agent } = useAgent();
  const handleSort = (field: PositionTableFields) => {
    onSetOrder(field === orderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc');
    onSetOrderBy(field);
  };
  const positionIds = positions.map(({ id }) => id).join('');
  const tableData = useMemo(() => {
    return positions.map(mapPositionToPositionTableDatum(agent));
  }, [positionIds, order, page, size]);
  const handleSelectRow = (index: number) => () => {
    onSelectItem(positions[index]);
  };

  return (
    <Panel variant="dark" sx={{ minWidth: 800 }}>
      <PositionTableControls quantity={positions.length} />
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
          <PositionTableHead order={order} orderBy={orderBy} onSort={handleSort} />
          <TableBody>
            {tableData.map((datum, index) => (
              <PositionTableRow
                key={datum.id}
                datum={datum}
                index={index}
                onSelect={handleSelectRow(index)}
              />
            ))}
          </TableBody>
          <PositionTableFooter
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

export default PositionTable;
