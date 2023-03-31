import { Position } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { selectChainId } from '../../../../../app/features/network';
import { useAppSelector } from '../../../../../app/hooks';
import { AMMProvider } from '../../../../../contexts/AMMContext/AMMContext';
import { useAMMs } from '../../../../../hooks/useAMMs';
import { getConfig } from '../../../../../hooks/voltz-config/config';
import { findCurrentAmm } from '../../../../../utilities/amm';
import { getRowButtonId } from '../../../../../utilities/googleAnalytics/helpers';
import { PositionTableHead } from './components/PositionTableHead/PositionTableHead';
import { PositionTableRow } from './components/PositionTableRow/PositionTableRow';
import { TransactionList } from './components/TransactionList/TransactionList';
import { PositionsList, PositionsListItemBox, PositionsListTopBox } from './PositionTable.styled';

export type PositionTableProps = {
  positions: Position[];
  onSelectItem: (
    position: Position,
    mode: 'margin' | 'liquidity' | 'rollover' | 'notional',
  ) => void;
  onSettle: (position: Position) => void;
};

export const PositionTable: React.FunctionComponent<PositionTableProps> = ({
  positions,
  onSelectItem,
  onSettle,
}) => {
  const { aMMs } = useAMMs();
  const chainId = useAppSelector(selectChainId);
  const config = getConfig(chainId);
  const pools = config ? config.pools : [];

  const handleSelectRow = (
    position: Position,
    mode: 'margin' | 'liquidity' | 'rollover' | 'notional',
  ) => {
    onSelectItem(position, mode);
  };
  if (positions.length === 0) {
    return null;
  }
  return (
    <PositionsList itemsPerRow={1}>
      {positions.map((position) => {
        const rolloverAmm = findCurrentAmm(aMMs, pools, position);
        const rolloverAvailable = rolloverAmm ? rolloverAmm.id !== position.amm.id : false;

        return (
          <PositionsListItemBox key={position.id}>
            <PositionsListTopBox>
              <PositionTableHead
                beforeMaturity={!position.isPoolMatured}
                currencyCode="USD"
                currencySymbol="$"
                fees={position.feesInUSD}
                feesPositive={true}
                fixedApr={position.poolAPR}
                fixedRateHealthFactor={position.fixedRateHealthFactor}
                gaButtonId={getRowButtonId(
                  true,
                  position.amm.protocol,
                  position.amm.market.tags.isBorrowing,
                )}
                healthFactor={position.healthFactor}
                isBothTraderAndLP={position.isBothTraderAndLP ?? false}
                isSettled={position.isSettled}
                rolloverAvailable={rolloverAvailable}
                settlementCashflowInUSD={position.settlementCashflowInUSD}
                onRollover={() => handleSelectRow(position, 'rollover')}
                onSettle={() => onSettle(position)}
              />

              <AMMProvider amm={position.amm}>
                <PositionTableRow
                  key={position.id}
                  position={position}
                  onSelect={(mode: 'margin' | 'liquidity' | 'notional') =>
                    handleSelectRow(position, mode)
                  }
                />
              </AMMProvider>
            </PositionsListTopBox>
            <TransactionList position={position} />
          </PositionsListItemBox>
        );
      })}
    </PositionsList>
  );
};
