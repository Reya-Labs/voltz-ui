import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';
import SummaryPanel from '../../../../atomic/SummaryPanel/SummaryPanel';
import { IconLabel } from '@components/composite';
import { useAMMContext } from '@hooks';

export type SwapInfoProps = {
  notional?: number;
  underlyingTokenName?: string; 
};

const SwapInfo: React.FunctionComponent<SwapInfoProps> = ({ notional, underlyingTokenName = '' }) => {
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
      value: `${Math.abs(result.availableNotional).toFixed(2)} ${underlyingTokenName}`
    },
    {
      label: 'AVERAGE FIXED RATE:', 
      value: `${Math.abs(result.averageFixedRate).toFixed(2)} %`
    },
    {
      label: 'FEES:', 
      value: `${Math.abs(result.fee).toFixed(2)} ${underlyingTokenName}`
    },
    {
      label: 'ESTIMATED SLIPPAGE:', 
      value: `${Math.abs(result.slippage).toFixed(2)} %`
    },
    {
      label: 'ADDITIONAL MARGIN REQUIRED:', 
      value: `${result.marginRequirement.toFixed(2)} ${underlyingTokenName}`
    },
  ] : undefined;

  useEffect(() => {
    if (!isUndefined(notional)) {
      call({ notional });
    }
  }, [call, notional]);

  return <SummaryPanel label={label} loading={loading} rows={rows} />
};

export default SwapInfo;
