import { Position } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { AMMProvider } from '../../../../../contexts/AMMContext/AMMContext';
import { PortfolioContext } from '../../../../../contexts/PortfolioContext/PortfolioContext';
import { useAMMs } from '../../../../../hooks/useAMMs';
import { findCurrentAmm } from '../../../../../utilities/amm';
import { getRowButtonId } from '../../../../../utilities/googleAnalytics';
import { isBorrowing } from '../../../../../utilities/isBorrowing';
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
  portfolioData: PortfolioContext;
};

export const PositionTable: React.FunctionComponent<PositionTableProps> = ({
  positions,
  onSelectItem,
  onSettle,
  portfolioData,
}) => {
  const { amms } = useAMMs();

  const handleSelectRow = (
    position: Position,
    mode: 'margin' | 'liquidity' | 'rollover' | 'notional',
  ) => {
    onSelectItem(position, mode);
  };

  return (
    <>
      {positions.length > 0 && (
        <PositionsList itemsPerRow={1}>
          {positions.map((position) => {
            const rolloverAmm = findCurrentAmm(amms || [], position);
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
                      isBorrowing(position.amm.rateOracle.protocolId),
                    )}
                    healthFactor={position.healthFactor}
                    isSettled={position.isSettled}
                    rolloverAvailable={rolloverAvailable}
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
      )}
    </>
  );
};
