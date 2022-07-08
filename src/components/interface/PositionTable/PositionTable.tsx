import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@theme';
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';

import { AugmentedAMM, data } from '@utilities';
import { Panel } from '@components/atomic';
import { PositionTableFields } from './types';
import { PositionTableHead, PositionTableRow } from './components';
import { Agents, AMMProvider } from '@contexts';
import TransactionList from '../TransactionList/TransactionList';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useAgent } from '@hooks';

export type PositionTableProps = {
  positions: Position[];
  positionInformation: Record<Position['id'], PositionInfo>;
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
  positionInformation,
  onSelectItem,
  handleSettle
}) => {
  const { agent } = useAgent();
  
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
  
  const handleSelectRow = (index: number, mode: 'margin' | 'liquidity') => {
    onSelectItem(positions[index], mode);
  };

  return (
    <>
      {positions.length > 0 && (
        <List sx={{ padding: '0', margin: '0' }}>
          {positions.map((pos, index) => {
            const info = positionInformation[pos.id];

            return (
              <ListItem sx={listItemStyles} key={pos.id}>
                <Panel variant='main' sx={{ width: '100%', padding: (theme) => `0 ${theme.spacing(4)}` }}>
                  
                  <PositionTableHead
                    currencyCode='USD'
                    currencySymbol='$'
                    fcmBadge={pos.source === 'FCM'}
                    fees={agent === Agents.LIQUIDITY_PROVIDER ? info?.fees : undefined}
                    feesPositive={true}
                    beforeMaturity={info?.beforeMaturity}
                    healthFactor={info?.healthFactor}
                    currentFixedRate={(agent === Agents.LIQUIDITY_PROVIDER) ? info?.fixedApr : undefined}
                    positionType={pos.positionType}
                  />

                  <TableContainer>
                    <Table size="medium" sx={{ ...commonOverrides }}>
                      <TableBody>
                        <AMMProvider amm={(pos.amm as AugmentedAMM)}>
                          <PositionTableRow
                            position={pos}
                            positionInfo={info}
                            key={pos.id}
                            index={index}
                            onSelect={(mode: 'margin' | 'liquidity') => handleSelectRow(index, mode)}
                            handleSettle={() => handleSettle(pos)}
                          />
                        </AMMProvider>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TransactionList position={pos} />

                </Panel>
              </ListItem>
            )}
          )}
        </List>
      )}
    </>
  );
};

export default PositionTable;
