import React from 'react';
import SummaryPanel from '../../../../atomic/SummaryPanel/SummaryPanel';
import { IconLabel } from '@components/composite';
import { formatCurrency } from '@utilities';
import { isUndefined } from 'lodash';

export type SwapInfoEditMarginProps = {
  balance?: number;
  loading?: boolean;
  minRequiredMargin: number;
  positionMargin: number;
  underlyingTokenName?: string; 
};

const SwapInfoEditMargin: React.FunctionComponent<SwapInfoEditMarginProps> = ({ balance, loading = false, minRequiredMargin, positionMargin, underlyingTokenName = '' }) => {

  const label = <IconLabel
    label="trade information"
    icon="information-circle"
    info="Your minimum required margin is defined based on your leverage and notional amount traded. You are required to deposit margin in order to execute a trade."
  />;

  const rows = !isUndefined(minRequiredMargin) ? [
    {
      label: 'MINIMUM REQUIRED MARGIN:', 
      value: `${formatCurrency(minRequiredMargin, true)} ${underlyingTokenName}`
    },
    {
      label: 'POSITION MARGIN:', 
      value: `${formatCurrency(positionMargin, true)} ${underlyingTokenName}`
    },
    {
      label: 'WALLET BALANCE:', 
      value: !isUndefined(balance) ? `${formatCurrency(Math.abs(balance), true)} ${underlyingTokenName}` : 'NO DATA'
    },
  ] : undefined;

  return <SummaryPanel label={label} loading={loading} rows={rows} />
};

export default SwapInfoEditMargin;