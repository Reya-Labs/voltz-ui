import { Position } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { selectChainId } from '../../../../../app/features/network';
import { useAppSelector } from '../../../../../app/hooks';
import { AMMProvider } from '../../../../../contexts/AMMContext/AMMContext';
import { useAMMs } from '../../../../../hooks/useAMMs';
import { useAppNavigate } from '../../../../../hooks/useAppNavigate';
import { getConfig } from '../../../../../hooks/voltz-config/config';
import {
  findCurrentAmm,
  generateAmmIdForRoute,
  generatePoolId,
  generatePositionIdForRoute,
} from '../../../../../utilities/amm';
import { getRowButtonId } from '../../../../../utilities/googleAnalytics/helpers';
import { isLPRolloverExperienceFlowEnabled } from '../../../../../utilities/isEnvVarProvided/is-lp-rollover-experience-flow-enabled';
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
  const navigate = useAppNavigate();
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
                realizedPnLFromFeesInUSD={position.feesInUSD}
                realizedPnLFromSwapsInUSD={position.realizedPnLFromSwapsInUSD}
                rolloverAvailable={rolloverAvailable}
                settlementCashflowInUSD={position.settlementCashflowInUSD}
                underlyingTokenName={'USD'}
                onRollover={() => {
                  if (isLPRolloverExperienceFlowEnabled()) {
                    navigate.toRolloverLPFormPage({
                      ammId: generateAmmIdForRoute(position.amm),
                      poolId: generatePoolId(position.amm),
                      positionId: generatePositionIdForRoute(position),
                    });
                    return;
                  }
                  handleSelectRow(position, 'rollover');
                }}
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
