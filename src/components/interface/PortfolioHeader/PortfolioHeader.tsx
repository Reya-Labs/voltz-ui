import { SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import { formatCurrency} from '@utilities';
import Box from '@mui/material/Box';
import PortfolioHeaderInfo from './PorfolioHeaderInfo';
import PortfolioHeaderHealth from './PortfolioHeaderHealth';
import { PortfolioContext} from '@contexts';
import { isUndefined } from 'lodash';

export type PortfolioHeaderProps = {
  currencyCode?: string;
  currencySymbol?: string;
  feesApy?: number;
  portfolioData: PortfolioContext;
};

const labelStyles: SystemStyleObject<Theme> = { 
  fontSize: '12px', 
  lineHeight: '1.2',
  textTransform: 'uppercase'
};

const titleStyles: SystemStyleObject<Theme> = { 
  fontSize: '40px', 
  lineHeight: '1.2', 
  marginTop: (theme) => theme.spacing(2)
};

const PortfolioHeader = ({ 
  currencyCode = '', 
  currencySymbol = '', 
  feesApy,
  portfolioData
}: PortfolioHeaderProps) => {
  return (
    <>
      <Box sx={{ textTransform: 'uppercase' }}>
        <Typography variant='body2' sx={labelStyles}>
          Net notional
        </Typography>
        <Typography variant='h1' sx={titleStyles}>
          {!portfolioData.totalNotional && <>Loading...</>}
          {portfolioData.totalNotional &&  <>{currencySymbol}{formatCurrency(portfolioData.totalNotional)} {currencyCode}</>}
          
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: (theme) => theme.spacing(6) }}>
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
  )
};

export default PortfolioHeader;

  