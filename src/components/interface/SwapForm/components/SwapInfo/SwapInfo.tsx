import React from 'react';
import SummaryPanel from '../../../../atomic/SummaryPanel/SummaryPanel';
import { IconLabel } from '@components/composite';
import { formatCurrency, formatNumber } from '@utilities';
import { InfoPostSwap } from '@voltz-protocol/v1-sdk';

export type SwapInfoProps = {
  data: InfoPostSwap | void | null;
  loading: boolean;
  underlyingTokenName?: string; 
};

const SwapInfo: React.FunctionComponent<SwapInfoProps> = ({ data, loading, underlyingTokenName = '' }) => {

  const label = <IconLabel
    label="trade information"
    icon="information-circle"
    info="Trade information"
  />;

  const rows = data ? [
    {
      label: 'NOTIONAL AVAILABLE:', 
      value: `${formatCurrency(Math.abs(data.availableNotional), true)} ${underlyingTokenName}`
    },
    {
      label: 'AVERAGE FIXED RATE:', 
      value: `${formatNumber(Math.abs(data.averageFixedRate))} %`
    },
    {
      label: 'FEES:', 
      value: `${formatCurrency(Math.abs(data.fee), true)} ${underlyingTokenName}`
    },
    {
      label: 'ESTIMATED SLIPPAGE:', 
      value: `${formatNumber(Math.abs(data.slippage))} %`
    },
    {
      label: 'ADDITIONAL MARGIN REQUIRED:', 
      value: `${formatCurrency(data.marginRequirement, true)} ${underlyingTokenName}`
    },
  ] : undefined;

  return <SummaryPanel label={label} loading={loading} rows={rows} />
};

export default SwapInfo;
