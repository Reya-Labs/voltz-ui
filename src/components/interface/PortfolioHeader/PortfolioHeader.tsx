import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import { Typography } from '@components/atomic';
import { formatCurrency, formatNumber } from '@utilities';
import { Box } from '@mui/material';
import { colors } from '@theme';
import { isUndefined } from 'lodash';
import PortfolioHeaderValue from './PortfolioHeaderValue';
import PortfolioHeaderBox from './PortfolioHeaderBox';
import PortfolioHeaderInfo from './PorfolioHeaderInfo';
import PortfolioHeaderHealth from './PortfolioHeaderHealth';

export type PortfolioHeaderProps = {
  currencyCode?: string;
  currencySymbol?: string;
  feesApy?: number;
  netMargin?: number;
  netMarginDiff?: number;
  netNotional: number;
  netRatePaying?: number;
  netRateReceiving?: number;
  positionsDanger?: number;
  positionsHealthy?: number;
  positionsWarning?: number;
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
  netMargin, 
  netMarginDiff, 
  netNotional, 
  netRatePaying, 
  netRateReceiving,
  positionsDanger,
  positionsHealthy,
  positionsWarning
}: PortfolioHeaderProps) => {
  return (
    <>
      <Box sx={{ textTransform: 'uppercase' }}>
        <Typography variant='body2' sx={labelStyles}>
          Net notional
        </Typography>
        <Typography variant='h1' sx={titleStyles}>
          {currencySymbol}{formatCurrency(netNotional)} {currencyCode}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: (theme) => theme.spacing(6) }}>
        <Box>
          <PortfolioHeaderInfo
            currencyCode={currencyCode} 
            currencySymbol={currencySymbol}
            feesApy={feesApy} 
            netMargin={netMargin} 
            netMarginDiff={netMarginDiff} 
            netRatePaying={netRatePaying} 
            netRateReceiving={netRateReceiving}
          />
        </Box>
        <Box>
          <PortfolioHeaderHealth
            positionsDanger={positionsDanger} 
            positionsHealthy={positionsHealthy} 
            positionsWarning={positionsWarning}
          />
        </Box>
      </Box>
    </>
  )
};

export default PortfolioHeader;

  