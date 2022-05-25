import React from 'react';
import SummaryPanel from '../../../../atomic/SummaryPanel/SummaryPanel';
import { IconLabel } from '@components/composite';
import { formatCurrency } from '@utilities';
import { isUndefined } from 'lodash';

export type MintInfoProps = {
  balance?: number;
  minRequiredMargin?: number;
  loading: boolean;
  underlyingTokenName?: string; 
};

const MintInfo: React.FunctionComponent<MintInfoProps> = ({ balance, minRequiredMargin, loading, underlyingTokenName = '' }) => {

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
      label: 'ADDITIONAL MARGIN REQUIRED:', 
      value: `${formatCurrency(minRequiredMargin, true)} ${underlyingTokenName}`
    },
  ] : undefined;

  return <SummaryPanel label={label} loading={loading} rows={rows} />
};

export default MintInfo;
