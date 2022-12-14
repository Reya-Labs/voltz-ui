import { PortfolioContext } from '../../../../contexts/PortfolioContext/PortfolioContext';
import { NetMargin } from './NetMargin/NetMargin';
import { NetNotional } from './NetNotional/NetNotional';
import {
  LPPositionsTypography,
  NetMarginAndPositionsHealthBox,
  NetMarginAndPositionsHealthSkeleton,
} from './PortfolioHeader.styled';
import { PositionsHealth } from './PositionsHealth/PositionsHealth';

export type PortfolioHeaderProps = {
  currencyCode: string;
  currencySymbol: string;
  portfolioData: PortfolioContext;
};

export const PortfolioHeader = ({
  currencyCode,
  currencySymbol,
  portfolioData,
}: PortfolioHeaderProps) => {
  return (
    <>
      <LPPositionsTypography>LP POSITIONS</LPPositionsTypography>
      <NetNotional
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        totalNotional={portfolioData.totalNotional}
      />
      <NetMarginAndPositionsHealthBox>
        {portfolioData.totalMargin === undefined ||
        portfolioData.totalAccruedCashflow === undefined ||
        portfolioData.healthCounters === undefined ? (
          <NetMarginAndPositionsHealthSkeleton variant="rectangular" />
        ) : (
          <>
            <NetMargin
              currencyCode={currencyCode}
              currencySymbol={currencySymbol}
              netMargin={portfolioData.totalMargin}
              netMarginDiff={portfolioData.totalAccruedCashflow}
            />
            <PositionsHealth
              positionsDanger={portfolioData.healthCounters.danger}
              positionsHealthy={portfolioData.healthCounters.healthy}
              positionsWarning={portfolioData.healthCounters.warning}
            />
          </>
        )}
      </NetMarginAndPositionsHealthBox>
    </>
  );
};
