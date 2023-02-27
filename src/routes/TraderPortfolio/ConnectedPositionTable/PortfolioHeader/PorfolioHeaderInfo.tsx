import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import isUndefined from 'lodash.isundefined';

import { colors, SystemStyleObject, Theme } from '../../../../theme';
import { formatCurrency, formatNumber } from '../../../../utilities/number';
import { PortfolioHeaderBox } from './PortfolioHeaderBox';
import { PortfolioHeaderValue } from './PortfolioHeaderValue';

export type PortfolioHeaderInfoProps = {
  currencyCode?: string;
  currencySymbol?: string;
  netMargin?: number;
  netMarginDiff?: number;
  netRatePaying?: number;
  netRateReceiving?: number;
};

const listItemStyles: SystemStyleObject<Theme> = {
  marginLeft: (theme) => theme.spacing(6),
  padding: '0',

  '&:first-of-type': {
    marginLeft: '0',
  },
};

export const PortfolioHeaderInfo = ({
  currencyCode = '',
  currencySymbol = '',
  netMargin,
  netMarginDiff,
  netRatePaying,
  netRateReceiving,
}: PortfolioHeaderInfoProps) => {
  const getNetMarginLabel = () => (
    <>
      Net margin
      {!isUndefined(netMarginDiff) && (
        <Box
          component="span"
          sx={{ color: netMarginDiff >= 0 ? colors.vzCustomGreen1.base : colors.vzCustomRed1.base }}
        >
          {' '}
          {netMarginDiff > 0 && '+'}
          {netMarginDiff < 0 && '-'}
          {currencySymbol}
          {formatCurrency(Math.abs(netMarginDiff))} {currencyCode}
        </Box>
      )}
    </>
  );

  return (
    <List sx={{ padding: '0', display: 'flex' }}>
      <ListItem sx={listItemStyles}>
        <PortfolioHeaderValue label={getNetMarginLabel()}>
          <PortfolioHeaderBox>
            {isUndefined(netMargin) && <>Loading...</>}
            {!isUndefined(netMargin) && (
              <>
                {currencySymbol}
                {formatCurrency(netMargin)} {currencyCode}
              </>
            )}
          </PortfolioHeaderBox>
        </PortfolioHeaderValue>
      </ListItem>
      <ListItem sx={listItemStyles}>
        <PortfolioHeaderValue label="Net rate receiving">
          <PortfolioHeaderBox>
            {isUndefined(netRateReceiving) && <>Loading...</>}
            {!isUndefined(netRateReceiving) && <>{formatNumber(netRateReceiving)} %</>}
          </PortfolioHeaderBox>
        </PortfolioHeaderValue>
      </ListItem>
      <ListItem sx={listItemStyles}>
        <PortfolioHeaderValue label="Net rate paying">
          <PortfolioHeaderBox>
            {isUndefined(netRatePaying) && <>Loading...</>}
            {!isUndefined(netRatePaying) && <>{formatNumber(netRatePaying)} %</>}
          </PortfolioHeaderBox>
        </PortfolioHeaderValue>
      </ListItem>
    </List>
  );
};