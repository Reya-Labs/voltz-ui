import React from 'react';
import SummaryPanel from '../../../../atomic/SummaryPanel/SummaryPanel';
import { IconLabel } from '@components/composite';
import { formatCurrency, formatNumber } from '@utilities';
import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { SwapFormActions } from '../../types';

export type SwapInfoProps = {
  data: InfoPostSwap | void | null;
  loading: boolean;
  underlyingTokenName?: string; 
  yieldBearingTokenName?: string;
  formAction: SwapFormActions;
};

const SwapInfo: React.FunctionComponent<SwapInfoProps> = ({ data, loading, underlyingTokenName = '', yieldBearingTokenName = '', formAction}) => {

  const label = <IconLabel
    label="trade information"
    icon="information-circle"
    info={
      <>
        Notional Available is the amount of Liqduity in the AMM that's avialble to trade<br/><br/>
        Average Fixed Rate is the rate you'll receive or pay once accounting for slippage<br/><br/>
        Fees are the fees you'll pay to the liquidity provider for the trade<br/><br/>
        Estimated Slippage is accounted for in the Average Fixed Rate you'll recieve<br/><br/>
        Additional Margin Required accounts for any margin you may already have in your account. If you don't have any this will be the same as your Minimum Required Margin
      </>
    }
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
      label: 'MINIMUM REQUIRED MARGIN:', 
      value: (formAction === SwapFormActions.SWAP || formAction === SwapFormActions.UPDATE) ? `${formatCurrency(data.marginRequirement, true)} ${underlyingTokenName}` : `${formatCurrency(data.marginRequirement, true)} ${yieldBearingTokenName}`
    },
  ] : undefined;

  return <SummaryPanel label={label} loading={loading} rows={rows} />
};

export default SwapInfo;
