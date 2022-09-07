import React from 'react';
import { colors, SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import { formatCurrency, formatNumber } from '@utilities';
import Box from '@mui/material/Box';
import { isUndefined } from 'lodash';
import PortfolioHeaderValue from './PortfolioHeaderValue';
import PortfolioHeaderBox from './PortfolioHeaderBox';
import PortfolioHeaderInfo from './PorfolioHeaderInfo';
import PortfolioHeaderHealth from './PortfolioHeaderHealth';
import { PortfolioContext, usePortfolioContext } from '@contexts';

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
          {currencySymbol}{formatCurrency(0)} {currencyCode}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: (theme) => theme.spacing(6) }}>
        <Box>
          <PortfolioHeaderInfo
            currencyCode={currencyCode} 
            currencySymbol={currencySymbol}
            feesApy={feesApy} 
            netMargin={portfolioData.totalMargin ?? 0} 
            netMarginDiff={portfolioData.totalAccruedCashflow ?? 0} 
            netRatePaying={portfolioData.netPayingRate ?? 0} 
            netRateReceiving={portfolioData.netReceivingRate ?? 0}
          />
        </Box>
        <Box>
          <PortfolioHeaderHealth
            positionsDanger={portfolioData.healthCounters ? portfolioData.healthCounters.danger : 0} 
            positionsHealthy={portfolioData.healthCounters ? portfolioData.healthCounters.healthy : 0} 
            positionsWarning={portfolioData.healthCounters ? portfolioData.healthCounters.warning : 0}
          />
        </Box>
      </Box>
    </>
  )
};

export default PortfolioHeader;

  