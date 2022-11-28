import Box from '@mui/material/Box';
import React, { FunctionComponent } from 'react';
import CountUp from 'react-countup';

import { formatCurrency } from '../../../../utilities/number';
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
            decimals={2}
            delay={0}
            duration={0.7}
            end={totalNotional}
            formattingFn={(value) => `${currencySymbol}${formatCurrency(value)} ${currencyCode}`}
            start={0}
          >
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        ) : null}
      </TotalNotionalTypography>
    </Box>
  ),
);
