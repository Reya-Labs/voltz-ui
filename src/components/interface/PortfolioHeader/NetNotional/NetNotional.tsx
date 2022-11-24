import Box from '@mui/material/Box';
import CountUp from 'react-countup';
import React, { FunctionComponent } from 'react';
import { formatCurrency } from '../../../../utilities';
import { TitleTypography, TotalNotionalTypography } from './NetNotional.styled';

export type NetNotionalProps = {
  totalNotional?: number;
  currencySymbol: string;
  currencyCode: string;
};

export const NetNotional: FunctionComponent<NetNotionalProps> = React.memo(
  ({ totalNotional, currencySymbol, currencyCode }) => (
    <Box>
      <TitleTypography variant="body2">NET NOTIONAL</TitleTypography>
      <TotalNotionalTypography variant="h1">
        {totalNotional === undefined ? 'Loading...' : null}
        {totalNotional !== undefined ? (
          <CountUp
            start={0}
            end={totalNotional}
            delay={0}
            duration={0.7}
            decimals={2}
            formattingFn={(value) => `${currencySymbol}${formatCurrency(value)} ${currencyCode}`}
          >
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        ) : null}
      </TotalNotionalTypography>
    </Box>
  ),
);
