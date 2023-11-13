import { ColorTokens, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { PositionDetailsUI } from '../../../../../app/features/position-details';
import {
  ActionBox,
  BurnIcon,
  DateBox,
  EntryBox,
  LiquidationIcon,
  MarginUpdateIcon,
  MaturityIcon,
  MintIcon,
  OutcomeBox,
  SettleIcon,
  SizeBox,
  SwapIcon,
} from '../TransactionHistoryList.styled';

const TRANSACTION_TYPE_ICON_MAP: Record<
  PositionDetailsUI['history'][0]['type'],
  React.FunctionComponent
> = {
  'margin-update': MarginUpdateIcon,
  burn: BurnIcon,
  liquidation: LiquidationIcon,
  mint: MintIcon,
  settlement: SettleIcon,
  swap: SwapIcon,
  maturity: MaturityIcon,
};
const TRANSACTION_TYPE_LABEL_MAP: Record<PositionDetailsUI['history'][0]['type'], string> = {
  'margin-update': 'Margin Update',
  burn: 'Burn',
  liquidation: 'Liquidation',
  mint: 'Mint',
  settlement: 'Settled',
  swap: 'Swap',
  maturity: 'Matured',
};
export const TransactionHistoryEntry: React.FunctionComponent<{
  entry: PositionDetailsUI['history'][0];
  backgroundColorToken: ColorTokens;
}> = ({ entry, backgroundColorToken }) => {
  const Icon = TRANSACTION_TYPE_ICON_MAP[entry.type];
  return (
    <EntryBox backgroundColorToken={backgroundColorToken}>
      <DateBox>
        <Typography colorToken="white100" typographyToken="secondaryBodySmallRegular">
          {entry.creationTimestampInMSFormatted}
        </Typography>
      </DateBox>
      <ActionBox>
        {Icon ? <Icon /> : null}
        <Typography colorToken="white100" typographyToken="primaryBodySmallRegular">
          {TRANSACTION_TYPE_LABEL_MAP[entry.type]}
          {entry.type !== 'swap' ? null : entry.notional > 0 ? ' Variable' : ' Fixed'}
        </Typography>
      </ActionBox>
      <SizeBox>
        {entry.type === 'swap' ? (
          <TokenTypography
            colorToken="white"
            prefixToken="Notional $"
            token={entry.notionalUSDCompactFormat.compactSuffix}
            typographyToken="secondaryBodySmallRegular"
            value={entry.notionalUSDCompactFormat.compactNumber.replace('-', '')}
          />
        ) : entry.type === 'liquidation' ? (
          <TokenTypography
            colorToken="white"
            prefixToken={entry.notional >= 0 ? 'Unwound $' : 'Unwound -$'}
            token={entry.notionalUSDCompactFormat.compactSuffix}
            typographyToken="secondaryBodySmallRegular"
            value={entry.notionalUSDCompactFormat.compactNumber.replace('-', '')}
          />
        ) : entry.type === 'mint' || entry.type === 'burn' ? (
          <TokenTypography
            colorToken="white"
            prefixToken={entry.notional >= 0 ? 'Notional $' : 'Notional -$'}
            token={entry.notionalUSDCompactFormat.compactSuffix}
            typographyToken="secondaryBodySmallRegular"
            value={entry.notionalUSDCompactFormat.compactNumber.replace('-', '')}
          />
        ) : null}
      </SizeBox>
      <OutcomeBox>
        {entry.type === 'swap' ? (
          <TokenTypography
            colorToken="white"
            prefixToken="Fixed Rate "
            token="%"
            typographyToken="secondaryBodySmallRegular"
            value={entry.fixedRatePercentage}
          />
        ) : entry.type === 'margin-update' ? (
          <TokenTypography
            colorToken="white"
            prefixToken={entry.marginDelta >= 0 ? 'Deposited $' : 'Withdraw $'}
            token={entry.marginDeltaUSDCompactFormat.compactSuffix}
            typographyToken="secondaryBodySmallRegular"
            value={entry.marginDeltaUSDCompactFormat.compactNumber.replace('-', '')}
          />
        ) : entry.type === 'liquidation' ? (
          <TokenTypography
            colorToken="white"
            prefixToken="Realized PnL -$"
            token={entry.marginDeltaUSDCompactFormat.compactSuffix}
            typographyToken="secondaryBodySmallRegular"
            value={entry.marginDeltaUSDCompactFormat.compactNumber.replace('-', '')}
          />
        ) : entry.type === 'maturity' ? (
          <TokenTypography
            colorToken="white"
            prefixToken={entry.marginDelta >= 0 ? 'Realized PnL +$' : 'Realized PnL -$'}
            token={entry.marginDeltaUSDCompactFormat.compactSuffix}
            typographyToken="secondaryBodySmallRegular"
            value={entry.marginDeltaUSDCompactFormat.compactNumber.replace('-', '')}
          />
        ) : null}
      </OutcomeBox>
    </EntryBox>
  );
};
