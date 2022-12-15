import { Position } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { AMMProvider } from '../../../../../contexts/AMMContext/AMMContext';
import { PortfolioContext } from '../../../../../contexts/PortfolioContext/PortfolioContext';
import { useAMMs } from '../../../../../hooks/useAMMs';
import { findCurrentAmm } from '../../../../../utilities/amm';
import { getRowButtonId } from '../../../../../utilities/googleAnalytics';
import { isBorrowing } from '../../../../../utilities/isBorrowing';
import { PositionTableHead, PositionTableRow } from './components';
import { TransactionList } from './components/TransactionList/TransactionList';
import { PositionsList, PositionsListItemBox, PositionsListTopBox } from './PositionTable.styled';

export type PositionTableProps = {
  positions: Position[];
  onSelectItem: (datum: Position, mode: 'margin' | 'liquidity' | 'rollover' | 'notional') => void;
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
    index: number,
    mode: 'margin' | 'liquidity' | 'rollover' | 'notional',
  ) => {
    onSelectItem(positions[index], mode);
  };

  return (
    <>
      {positions.length > 0 && (
        <PositionsList itemsPerRow={1}>
          {positions.map((pos, index) => {
            const rolloverAmm = findCurrentAmm(amms || [], pos);
            const rolloverAvailable = rolloverAmm ? rolloverAmm.id !== pos.amm.id : false;
            const info = portfolioData?.info ? portfolioData.info[pos.id] : undefined;

            return (
              <PositionsListItemBox key={pos.id}>
                <PositionsListTopBox>
                  <PositionTableHead
                    beforeMaturity={info?.beforeMaturity}
                    currencyCode="USD"
                    currencySymbol="$"
                    fees={info?.fees}
                    feesPositive={true}
                    fixedApr={info?.fixedApr}
                    fixedRateHealthFactor={info?.fixedRateHealthFactor}
                    gaButtonId={getRowButtonId(
                      true,
                      pos.amm.protocol,
                      isBorrowing(pos.amm.rateOracle.protocolId),
                    )}
                    healthFactor={info?.healthFactor}
                    isSettled={pos.isSettled}
                    rolloverAvailable={rolloverAvailable}
                    onRollover={() => handleSelectRow(index, 'rollover')}
                    onSettle={() => onSettle(pos)}
                  />

                  <AMMProvider amm={pos.amm}>
                    <PositionTableRow
                      key={pos.id}
                      index={index}
                      position={pos}
                      positionInfo={portfolioData?.info ? portfolioData.info[pos.id] : undefined}
                      onSelect={(mode: 'margin' | 'liquidity' | 'notional') =>
                        handleSelectRow(index, mode)
                      }
                    />
                  </AMMProvider>
                </PositionsListTopBox>
                <TransactionList position={pos} />
              </PositionsListItemBox>
            );
          })}
        </PositionsList>
      )}
    </>
  );
};
