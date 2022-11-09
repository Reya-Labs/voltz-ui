import Box from '@mui/material/Box';
import PortfolioHeaderInfo from './PorfolioHeaderInfo';
import PortfolioHeaderHealth from './PortfolioHeaderHealth';
import { PortfolioContext } from '@contexts';
import { NetNotional } from './NetNotional/NetNotional';

export type PortfolioHeaderProps = {
  currencyCode?: string;
  currencySymbol?: string;
  feesApy?: number;
  portfolioData: PortfolioContext;
};

const PortfolioHeader = ({
  currencyCode = '',
  currencySymbol = '',
  feesApy,
  portfolioData,
}: PortfolioHeaderProps) => {
  return (
    <>
      <NetNotional
        totalNotional={portfolioData.totalNotional}
        currencySymbol={currencySymbol}
        currencyCode={currencyCode}
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
            feesApy={feesApy}
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

export default PortfolioHeader;
