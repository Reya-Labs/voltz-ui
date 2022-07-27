import React from 'react';
import SummaryPanel from '../../../../atomic/SummaryPanel/SummaryPanel';
import { IconLabel } from '@components/composite';
import { formatCurrency, roundUpDecimal } from '@utilities';
import { isUndefined } from 'lodash';

export type MintSummaryProps = {
  balance?: number;
  minRequiredMargin?: number;
  loading: boolean;
  underlyingTokenName?: string; 
};

const MintSummary: React.FunctionComponent<MintSummaryProps> = ({ balance, minRequiredMargin, loading, underlyingTokenName = '' }) => {
  const label = <IconLabel
    label="trade information"
    icon="information-circle"
    info="Your minimum required margin is defined based on your leverage and notional amount traded. You are required to deposit margin in order to execute a trade."
  />;

  const rows = !isUndefined(minRequiredMargin) ? [
    {
      label: 'MARGIN IN ACCOUNT:', 
      value: !isUndefined(balance) ? `${formatCurrency(Math.abs(balance), true)} ${underlyingTokenName}` : 'NO DATA'
    },
    {
      label: 'MINIMUM REQUIRED MARGIN:', 
      value: `${formatCurrency(roundUpDecimal(minRequiredMargin, 4), true, false, 0, 4)} ${underlyingTokenName}`,
      highlight: true
    },
  ] : undefined;

  return <SummaryPanel label={label} loading={loading} rows={rows} />
};

export default MintSummary;
