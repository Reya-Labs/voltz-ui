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
import { mapPositionToPositionTableDatum } from './utilities';
import { PositionTableHead, PositionTableRow } from './components';
import { Agents } from '@components/contexts';
import TransactionList from '../TransactionList/TransactionList';
import { List, ListItem } from '@mui/material';

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

  const listItemStyles: SystemStyleObject<Theme> = {
    padding: '0', 
    margin: '0',
    marginTop: (theme) => theme.spacing(6),

    '&:first-of-type': {
      marginTop: '0'
    }
  }

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

  return (
    <>
      {positions.length > 0 && (
        <List sx={{ padding: '0', margin: '0' }}>
          {tableData.map((datum, index) => (
            <ListItem sx={listItemStyles}>
              <Panel variant='main' sx={{ width: '100%', padding: (theme) => `0 ${theme.spacing(4)}` }}>
                
                <PositionTableHead
                  currencyCode='USD'
                  currencySymbol='$'
                  fcmBadge={positions[index].source === 'FCM'}
                  fees={3000}
                  feesPositive={true}
                  currentFixedRate={4}
                  currentFixedRatePositive={false}
                  positionType={positions[index].positionType}
                />

                <TableContainer>
                  <Table size="medium" sx={{ ...commonOverrides }}>
                    <TableBody>
                      <AMMProvider amm={(positions[index].amm as AugmentedAMM)}>
                        <PositionTableRow
                          key={datum.id}
                          datum={datum}
                          index={index}
                          onSelect={(mode: 'margin' | 'liquidity') => handleSelectRow(index, mode)}
                          handleSettle={() => handleSettle(positions[index])}
                        />
                      </AMMProvider>
                    </TableBody>
                  </Table>
                </TableContainer>

                <TransactionList position={positions[index]} />

              </Panel>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default PositionTable;
