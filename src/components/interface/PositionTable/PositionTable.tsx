import React, { useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@mui/system';
import { Position } from '@voltz-protocol/v1-sdk';

import { AugmentedAMM, data } from '@utilities';
import { useAgent } from '@hooks';
import { Panel } from '@components/atomic';
import { AMMProvider } from '@components/contexts';
import { PositionTableFields } from './types';
import { lpLabels } from './constants';
import { traderLabels } from './constants';
import { mapPositionToPositionTableDatum } from './utilities';
import {
  PositionTableControls,
  PositionTableFooter,
  PositionTableHead,
  PositionTableRow,
} from './components';
import { Agents } from '@components/contexts';
import TransactionList from '../TransactionList/TransactionList';
import { TableRow, TableCell } from '@mui/material';

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
  onSelectItem: (datum: Position, mode: 'margin' | 'liquidity') => void;
  agent: Agents
  handleSettle: (position: Position) => void;
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
  handleSettle
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
    '.MuiInputLabel-root': {
      marginBottom: (theme) => theme.spacing(1)
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
  
  const handleSelectRow = (index: number, mode: 'margin' | 'liquidity') => {
    onSelectItem(positions[index], mode);
  };

  let labels: [PositionTableFields, string][];

  if (agent === Agents.LIQUIDITY_PROVIDER) {
    labels = lpLabels;
  } else {
    labels = traderLabels;
  }

  return (
    <Panel variant="dark" borderRadius='large' padding='container' sx={{ minWidth: 800, marginTop: 10, paddingBottom: 0 }}>
      <PositionTableControls quantity={positions.length} />
      <TableContainer>
        <Table
          sx={{
            minWidth: 750,
            borderCollapse: 'separate',
            borderSpacing: '0px 16px',
            ...commonOverrides,
          }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <PositionTableHead order={order} orderBy={orderBy} onSort={handleSort} agent={agent} />
          <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
            {tableData.map((datum, index) => (
              <AMMProvider amm={(positions[index].amm as AugmentedAMM)}>
                <PositionTableRow
                  key={datum.id}
                  datum={datum}
                  index={index}
                  onSelect={(mode: 'margin' | 'liquidity') => handleSelectRow(index, mode)}
                  handleSettle={() => handleSettle(positions[index])}
                />
                <TableRow>
                  <TableCell colSpan={agent === Agents.LIQUIDITY_PROVIDER ? 6 : 4}>
                    <TransactionList position={positions[index]} />
                  </TableCell>
                </TableRow>
              </AMMProvider>
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
