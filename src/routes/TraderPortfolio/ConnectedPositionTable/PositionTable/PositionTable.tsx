import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Position } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { Panel } from '../../../../components/atomic/Panel/Panel';
import { Agents } from '../../../../contexts/AgentContext/types';
import { AMMProvider } from '../../../../contexts/AMMContext/AMMContext';
import { useAgent } from '../../../../hooks/useAgent';
import { useAMMs } from '../../../../hooks/useAMMs';
import { getConfig } from '../../../../hooks/voltz-config/config';
import { colors, SystemStyleObject, Theme } from '../../../../theme';
import { findCurrentAmm } from '../../../../utilities/amm';
import { MATURITY_WINDOW } from '../../../../utilities/constants';
import { getRowButtonId } from '../../../../utilities/googleAnalytics/helpers';
import { isBorrowing } from '../../../../utilities/isBorrowing';
import { PositionTableHead, PositionTableRow } from './components';
import { TransactionList } from './TransactionList/TransactionList';

export type PositionTableProps = {
  positions: Position[];
  onSelectItem: (datum: Position, mode: 'margin' | 'liquidity' | 'rollover' | 'notional') => void;
  onSettle: (position: Position) => void;
};

export const PositionTable: React.FunctionComponent<PositionTableProps> = ({
  positions,
  onSelectItem,
  onSettle,
}) => {
  const { amms } = useAMMs();
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
      marginBottom: (theme) => theme.spacing(1),
    },
  };

  const listItemStyles: SystemStyleObject<Theme> = {
    padding: '0',
    margin: '0',
    marginTop: (theme) => theme.spacing(6),

    '&:first-of-type': {
      marginTop: '0',
    },
  };

  const getMaturedTableBorderStyles = (positionType: number) => {
    const base = { borderRadius: '8px' };

    switch (positionType) {
      case 1: {
        return {
          ...base,
          border: `1px solid ${colors.skyBlueCrayola.base}`,
        };
      }
      case 2:
      case 3: {
        return {
          ...base,
          border: `1px solid ${colors.lavenderWeb.base}`,
        };
      }
    }
  };

  const handleSelectRow = (
    index: number,
    mode: 'margin' | 'liquidity' | 'rollover' | 'notional',
  ) => {
    onSelectItem(positions[index], mode);
  };

  const config = getConfig();

  return (
    <>
      {positions.length > 0 && (
        <List sx={{ padding: '0', margin: '0' }}>
          {positions.map((pos, index) => {
            const rolloverAmm = findCurrentAmm(amms || [], pos);
            const rolloverAvailable = rolloverAmm ? rolloverAmm.id !== pos.amm.id : false;
            const closeToMaturity =
              Date.now().valueOf() + MATURITY_WINDOW > pos.amm.endDateTime.toMillis();

            return (
              <ListItem key={pos.id} sx={listItemStyles}>
                <Panel
                  sx={{ width: '100%', padding: (theme) => `0 ${theme.spacing(4)}` }}
                  variant="main"
                >
                  <PositionTableHead
                    beforeMaturity={!pos.isPoolMatured}
                    currencyCode="USD"
                    currencySymbol="$"
                    fees={pos.fees}
                    feesPositive={true}
                    fixedApr={pos.poolAPR}
                    fixedRateHealthFactor={pos.fixedRateHealthFactor}
                    gaButtonId={getRowButtonId(
                      agent === Agents.LIQUIDITY_PROVIDER,
                      pos.amm.protocol,
                      isBorrowing(pos.amm.rateOracle.protocolId),
                    )}
                    healthFactor={pos.healthFactor}
                    isSettled={pos.isSettled}
                    poolTraderWithdrawable={
                      config.pools.find((pool) => pool.id === pos.amm.id)?.traderWithdrawable ??
                      true
                    }
                    positionType={pos.positionType}
                    rolloverAvailable={rolloverAvailable}
                    onRollover={() => handleSelectRow(index, 'rollover')}
                    onSelect={
                      agent === Agents.LIQUIDITY_PROVIDER || closeToMaturity
                        ? undefined
                        : (mode: 'margin' | 'liquidity' | 'notional') =>
                            handleSelectRow(index, mode)
                    }
                    onSettle={() => onSettle(pos)}
                  />

                  <TableContainer
                    sx={
                      pos.isPoolMatured && !pos.isSettled
                        ? getMaturedTableBorderStyles(pos.positionType)
                        : undefined
                    }
                  >
                    <Table size="medium" sx={{ ...commonOverrides }}>
                      <TableBody>
                        <AMMProvider amm={pos.amm}>
                          <PositionTableRow
                            key={pos.id}
                            index={index}
                            position={pos}
                            onSelect={(mode: 'margin' | 'liquidity' | 'notional') =>
                              handleSelectRow(index, mode)
                            }
                          />
                        </AMMProvider>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TransactionList position={pos} />
                </Panel>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};
