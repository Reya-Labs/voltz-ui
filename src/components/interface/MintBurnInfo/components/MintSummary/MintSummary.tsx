import isUndefined from 'lodash.isundefined';
import React from 'react';

import { formatCurrency, roundUpDecimal } from '../../../../../utilities/number';
import { SummaryPanel } from '../../../../atomic/SummaryPanel/SummaryPanel';
import { IconLabel } from '../../../../composite/IconLabel/IconLabel';

export type MintSummaryProps = {
  balance?: number;
  loading: boolean;
  mintMinimumMarginRequirement?: number;
  underlyingTokenName?: string;
};

export const MintSummary: React.FunctionComponent<MintSummaryProps> = ({
  balance,
  loading,
  mintMinimumMarginRequirement,
  underlyingTokenName = '',
}) => {
  const label = (
    <IconLabel
      icon="information-circle"
      info="Your minimum required margin is defined based on your leverage and notional amount traded. You are required to deposit margin in order to execute a trade."
      label="trade information"
    />
  );

  const rows = !isUndefined(mintMinimumMarginRequirement)
    ? [
        {
          label: 'MARGIN IN ACCOUNT:',
          value: !isUndefined(balance)
            ? `${formatCurrency(Math.abs(balance), true)} ${underlyingTokenName}`
            : 'Loading...',
        },
        {
          label: 'MINIMUM REQUIRED MARGIN:',
          value: `${formatCurrency(
            roundUpDecimal(mintMinimumMarginRequirement, 4),
            true,
            false,
            0,
            4,
          )} ${underlyingTokenName}`,
          highlight: true,
        },
      ]
    : undefined;

  return <SummaryPanel label={label} loading={loading} rows={rows} />;
};
