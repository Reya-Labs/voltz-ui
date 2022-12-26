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
          {positions.map((position, index) => {
            const rolloverAmm = findCurrentAmm(amms || [], position);
            const rolloverAvailable = rolloverAmm ? rolloverAmm.id !== position.amm.id : false;
            const info = portfolioData?.info ? portfolioData.info[position.id] : undefined;

            return (
              <PositionsListItemBox key={position.id}>
                <PositionsListTopBox>
                  <PositionTableHead
                    beforeMaturity={info?.beforeMaturity}
                    currencyCode="USD"
                    currencySymbol="$"
                    fees={info?.feesInUSD}
                    feesPositive={true}
                    fixedApr={info?.fixedApr}
                    fixedRateHealthFactor={info?.fixedRateHealthFactor}
                    gaButtonId={getRowButtonId(
                      true,
                      position.amm.protocol,
                      isBorrowing(position.amm.rateOracle.protocolId),
                    )}
                    healthFactor={info?.healthFactor}
                    isSettled={position.isSettled}
                    rolloverAvailable={rolloverAvailable}
                    onRollover={() => handleSelectRow(position, 'rollover')}
                    onSettle={() => onSettle(position)}
                  />

                  <AMMProvider amm={position.amm}>
                    <PositionTableRow
                      key={position.id}
                      position={position}
                      positionInfo={
                        portfolioData?.info ? portfolioData.info[position.id] : undefined
                      }
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
