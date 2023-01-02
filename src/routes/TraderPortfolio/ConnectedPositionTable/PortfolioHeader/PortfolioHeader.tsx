import Box from '@mui/material/Box';

import { PortfolioContext } from '../../../../contexts/PortfolioContext/PortfolioContext';
import { NetNotional } from './NetNotional/NetNotional';
import { PortfolioHeaderInfo } from './PorfolioHeaderInfo';
import { PortfolioHeaderHealth } from './PortfolioHeaderHealth';

export type PortfolioHeaderProps = {
  currencyCode?: string;
  currencySymbol?: string;
  portfolioData: PortfolioContext;
};

export const PortfolioHeader = ({
  currencyCode = '',
  currencySymbol = '',
  portfolioData,
}: PortfolioHeaderProps) => {
  return (
    <>
      <NetNotional
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        totalNotional={portfolioData.totalNotional}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: (theme) => theme.spacing(6),
        }}
      >
        <Box>
          <PortfolioHeaderInfo
            currencyCode={currencyCode}
            currencySymbol={currencySymbol}
            netMargin={portfolioData.totalMargin}
            netMarginDiff={portfolioData.totalAccruedCashflow}
            netRatePaying={portfolioData.netPayingRate}
            netRateReceiving={portfolioData.netReceivingRate}
          />
        </Box>
        <Box>
          <PortfolioHeaderHealth
            positionsDanger={portfolioData.healthCounters?.danger}
            positionsHealthy={portfolioData.healthCounters?.healthy}
            positionsWarning={portfolioData.healthCounters?.warning}
          />
        </Box>
      </Box>
    </>
  );
};
