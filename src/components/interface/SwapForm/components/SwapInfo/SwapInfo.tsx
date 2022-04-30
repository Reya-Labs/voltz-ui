import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';
import SummaryPanel from '../../../../atomic/SummaryPanel/SummaryPanel';
import { IconLabel } from '@components/composite';
import { useAgent, useAMMContext } from '@hooks';
import { formatCurrency, formatNumber } from '@utilities';

export type SwapInfoProps = {
  notional?: number;
  underlyingTokenName?: string; 
};

const SwapInfo: React.FunctionComponent<SwapInfoProps> = ({ notional, underlyingTokenName = '' }) => {
  const { agent } = useAgent();
  const { swapInfo } = useAMMContext();
  const { result, loading, call } = swapInfo;

  const label = <IconLabel
    label="trade information"
    icon="information-circle"
    info="Trade information"
  />;

  const rows = result ? [
    {
      label: 'NOTIONAL AVAILABLE:', 
      value: `${formatCurrency(Math.abs(result.availableNotional), true)} ${underlyingTokenName}`
    },
    {
      label: 'AVERAGE FIXED RATE:', 
      value: `${formatNumber(Math.abs(result.averageFixedRate))} %`
    },
    {
      label: 'FEES:', 
      value: `${formatCurrency(Math.abs(result.fee), true)} ${underlyingTokenName}`
    },
    {
      label: 'ESTIMATED SLIPPAGE:', 
      value: `${formatNumber(Math.abs(result.slippage))} %`
    },
    {
      label: 'ADDITIONAL MARGIN REQUIRED:', 
      value: `${formatCurrency(result.marginRequirement, true)} ${underlyingTokenName}`
    },
  ] : undefined;

  useEffect(() => {
    if (!isUndefined(notional)) {
      call({ notional });
    }
  }, [call, notional, agent]);

  return <SummaryPanel label={label} loading={loading} rows={rows} />
};

export default SwapInfo;
