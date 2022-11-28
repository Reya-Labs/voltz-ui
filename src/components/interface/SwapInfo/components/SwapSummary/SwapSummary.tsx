import React from 'react';
import { SummaryPanel } from '../../../../atomic/SummaryPanel/SummaryPanel';
import { IconLabel } from '../../../../composite/IconLabel/IconLabel';
import { SwapFormActions } from '../../../SwapForm';

import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { formatCurrency, formatNumber, roundUpDecimal } from '../../../../../utilities/number';

export type SwapSummaryProps = {
  data: InfoPostSwap | void | null;
  loading: boolean;
  underlyingTokenName?: string;
  yieldBearingTokenName?: string;
  formAction: SwapFormActions;
  maxAvailableNotional?: number;
};

export const SwapSummary: React.FunctionComponent<SwapSummaryProps> = ({
  data,
  loading,
  underlyingTokenName = '',
  yieldBearingTokenName = '',
  formAction,
  maxAvailableNotional,
}) => {
  const label =
    yieldBearingTokenName.substring(0, 6) === 'borrow' ? (
      <IconLabel
        label="trade information"
        icon="information-circle"
        info={
          <>
            Average Fixed Rate is the rate you'll pay once accounting for slippage
            <br />
            <br />
            Fees are the fees you'll pay to the liquidity provider for the trade; they are included
            in the margin
            <br />
            <br />
          </>
        }
      />
    ) : (
      <IconLabel
        label="trade information"
        icon="information-circle"
        info={
          <>
            Notional Available is the amount of Liqduity in the AMM that's available to trade
            <br />
            <br />
            Average Fixed Rate is the rate you'll receive or pay once accounting for slippage
            <br />
            <br />
            Fees are the fees you'll pay to the liquidity provider for the trade
            <br />
            <br />
            Estimated Slippage is accounted for in the Average Fixed Rate you'll recieve
            <br />
            <br />
            Additional Margin Required accounts for any margin you may already have in your account.
            If you don't have any this will be the same as your Minimum Required Margin
          </>
        }
      />
    );

  const notionalRow = (availableNotional: number) => {
    return {
      label: 'NOTIONAL AVAILABLE:',
      value: `${formatCurrency(Math.abs(availableNotional), true)} ${underlyingTokenName}`,
    };
  };

  const averageRateRow = (averageFixedRate: number) => {
    return {
      label: 'AVERAGE FIXED RATE:',
      value: `${formatNumber(Math.abs(averageFixedRate))} %`,
    };
  };

  const feesRow = (fee: number) => {
    const decimals = underlyingTokenName === 'ETH' ? 4 : 2;
    return {
      label: 'FEES:',
      value: `${formatCurrency(Math.abs(fee), true, false, 2, decimals)} ${underlyingTokenName}`,
    };
  };

  const slippageRow = (slippage: number) => {
    return {
      label: 'ESTIMATED SLIPPAGE:',
      value: `${formatNumber(Math.abs(slippage))} %`,
    };
  };

  const minMarginRow = (margin: number) => {
    return {
      label: 'MINIMUM REQUIRED MARGIN:',
      value:
        formAction === SwapFormActions.SWAP ||
        formAction === SwapFormActions.UPDATE ||
        formAction === SwapFormActions.ROLLOVER_SWAP
          ? `${formatCurrency(roundUpDecimal(margin, 4), true)} ${underlyingTokenName}`
          : `${formatCurrency(roundUpDecimal(margin, 4), true)} ${yieldBearingTokenName}`,
      highlight: true,
    };
  };

  const rows = () => {
    if (yieldBearingTokenName.substring(0, 6) === 'borrow') {
      return data ? [averageRateRow(data.averageFixedRate), feesRow(data.fee)] : undefined;
    }
    return data && maxAvailableNotional
      ? [
          notionalRow(maxAvailableNotional),
          averageRateRow(data.averageFixedRate),
          feesRow(data.fee),
          slippageRow(data.slippage),
          minMarginRow(data.marginRequirement),
        ]
      : undefined;
  };

  return <SummaryPanel label={label} loading={loading} rows={rows()} />;
};
