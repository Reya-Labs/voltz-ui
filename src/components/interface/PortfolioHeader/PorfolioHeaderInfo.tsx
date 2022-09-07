import React from 'react';
import { colors, SystemStyleObject, Theme } from '@theme';

import { formatCurrency, formatNumber } from '@utilities';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { isUndefined } from 'lodash';
import { PortfolioHeaderProps } from './PortfolioHeader';
import PortfolioHeaderValue from './PortfolioHeaderValue';
import PortfolioHeaderBox from './PortfolioHeaderBox';

export type PortfolioHeaderInfoProps = {
  currencyCode?: string;
  currencySymbol?: string;
  feesApy?: number;
  netMargin?: number;
  netMarginDiff?: number;
  netRatePaying?: number;
  netRateReceiving?: number;
};

const listItemStyles: SystemStyleObject<Theme> = { 
  marginLeft: (theme) => theme.spacing(6),
  padding: '0',

  '&:first-of-type': {
    marginLeft: '0'
  }
};

const PortfolioHeaderInfo = ({ 
  currencyCode = '', 
  currencySymbol = '', 
  feesApy, 
  netMargin, 
  netMarginDiff, 
  netRatePaying, 
  netRateReceiving,
}: PortfolioHeaderInfoProps) => {
  const getNetMarginLabel = () => (
    <>
      Net margin 
      {!isUndefined(netMarginDiff) && (
        <Box component='span' sx={{ color: netMarginDiff >= 0 ? colors.vzCustomGreen1 : colors.vzCustomRed1 }}>
          {' '}
          {netMarginDiff > 0 && '+'}
          {netMarginDiff < 0 && '-'}
          {currencySymbol}{formatCurrency(Math.abs(netMarginDiff))} {currencyCode}
        </Box>
      )}
    </>
  );

  const dataExists = (
    !isUndefined(netMargin) || 
    !isUndefined(netRateReceiving) || 
    !isUndefined(netRatePaying) || 
    !isUndefined(feesApy)
  );

  if (dataExists) return (
    <List sx={{ padding: '0', display: 'flex' }}>
      {!isUndefined(netMargin) && (
        <ListItem sx={listItemStyles}>
          <PortfolioHeaderValue label={getNetMarginLabel()}>
            <PortfolioHeaderBox>{currencySymbol}{formatCurrency(netMargin)} {currencyCode}</PortfolioHeaderBox>
          </PortfolioHeaderValue>
        </ListItem>
      )}
      {!isUndefined(netRateReceiving) && (
        <ListItem sx={listItemStyles}>
          <PortfolioHeaderValue label='Net rate receiving'>
            <PortfolioHeaderBox>{formatNumber(netRateReceiving)} %</PortfolioHeaderBox>
          </PortfolioHeaderValue>
        </ListItem>
      )}
      {!isUndefined(netRatePaying) && (
        <ListItem sx={listItemStyles}>
          <PortfolioHeaderValue label='Net rate paying'>
            <PortfolioHeaderBox>{formatNumber(netRatePaying)} %</PortfolioHeaderBox>
          </PortfolioHeaderValue>
        </ListItem>
      )}
      {!isUndefined(feesApy) && (
        <ListItem sx={listItemStyles}>
          <PortfolioHeaderValue label='Fees APY'>
            <PortfolioHeaderBox>s00n</PortfolioHeaderBox>
            {/* <PortfolioHeaderBox>{formatNumber(feesApy)} %</PortfolioHeaderBox> */}
          </PortfolioHeaderValue>
        </ListItem>
      )}
    </List>
  );
  
  return null;
};

export default PortfolioHeaderInfo;

  