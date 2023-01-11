import { Position } from '@voltz-protocol/v1-sdk';

import { Agents } from '../../../../../contexts/AgentContext/types';
import { usePortfolioPositionsSummary } from '../../../../../hooks/usePortfolioPositionsSummary';
import { NetMargin } from './NetMargin/NetMargin';
import { NetNotional } from './NetNotional/NetNotional';
import {
  LPPositionsTypography,
  NetMarginAndPositionsHealthBox,
  NetMarginAndPositionsHealthSkeleton,
} from './PortfolioHeader.styled';
import { PositionsHealth } from './PositionsHealth/PositionsHealth';

export type PortfolioHeaderProps = {
  positions: Position[];
};
const currencyCode = 'USD';
const currencySymbol = '$';

export const PortfolioHeader = ({ positions }: PortfolioHeaderProps) => {
  const { totalNotional, totalMargin, totalAccruedCashflow, healthCounters } =
    usePortfolioPositionsSummary(positions, Agents.LIQUIDITY_PROVIDER);
  return (
    <>
      <LPPositionsTypography>LP POSITIONS</LPPositionsTypography>
      <NetNotional
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        totalNotional={totalNotional}
      />
      <NetMarginAndPositionsHealthBox>
        {totalMargin === undefined ||
        totalAccruedCashflow === undefined ||
        healthCounters === undefined ? (
          <NetMarginAndPositionsHealthSkeleton variant="rectangular" />
        ) : (
          <>
            <NetMargin
              currencyCode={currencyCode}
              currencySymbol={currencySymbol}
              netMargin={totalMargin}
              netMarginDiff={totalAccruedCashflow}
            />
            <PositionsHealth
              positionsDanger={healthCounters.danger}
              positionsHealthy={healthCounters.healthy}
              positionsWarning={healthCounters.warning}
            />
          </>
        )}
      </NetMarginAndPositionsHealthBox>
    </>
  );
};
