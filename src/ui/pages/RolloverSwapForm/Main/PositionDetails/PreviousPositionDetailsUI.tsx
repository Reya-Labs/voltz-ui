import { LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import {
  selectPreviousPositionCompactNotional,
  selectPreviousPositionDepositedMargin,
  selectPreviousPositionRealizedPnLFromFeesFormatted,
  selectPreviousPositionRealizedPnLFromSwapsFormatted,
  selectPreviousPositionRealizedPnLTotalFormatted,
  selectPreviousPositionSettlingBalance,
  selectPreviousPositionSwapMode,
} from '../../../../../app/features/forms/trader/rollover-swap';
import { PnLDetailsWithTooltip } from '../../../../components/PnLDetailsWithTooltip';
import { MODE_COLOR_TOKEN_MAP } from '../../helpers';
import {
  CashFlowBox,
  DepositedMarginBox,
  NotionalBox,
  PositionDetailsBox,
  PositionDetailsLeftBox,
  PositionDetailsRightBox,
  RealisedPNLBox,
} from './PositionDetails.styled';

type PreviousPositionDetailsUIProps = {
  underlyingTokenName: string;
  actionLabelTypographyToken: TypographyToken;
  actionTypographyToken: TypographyToken;
  labelTypographyToken: TypographyToken;
  typographyToken: TypographyToken;
};

export const PreviousPositionDetailsUI: React.FunctionComponent<PreviousPositionDetailsUIProps> = ({
  underlyingTokenName,
  actionLabelTypographyToken,
  actionTypographyToken,
  labelTypographyToken,
  typographyToken,
}) => {
  const compactNotional = useAppSelector(selectPreviousPositionCompactNotional);
  const mode = useAppSelector(selectPreviousPositionSwapMode);
  const compactDepositedMargin = useAppSelector(selectPreviousPositionDepositedMargin);
  const compactSettlingBalance = useAppSelector(selectPreviousPositionSettlingBalance);
  const realizedPnLTotal = useAppSelector(selectPreviousPositionRealizedPnLTotalFormatted);
  const realizedPnLFromFees = useAppSelector(selectPreviousPositionRealizedPnLFromFeesFormatted);
  const realizedPnLFromSwaps = useAppSelector(selectPreviousPositionRealizedPnLFromSwapsFormatted);
  const token = ` ${underlyingTokenName.toUpperCase()}`;

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        <LabelTokenTypography
          colorToken={MODE_COLOR_TOKEN_MAP[mode]}
          label="Previous Position"
          labelColorToken="white100"
          labelTypographyToken={actionLabelTypographyToken}
          token=""
          typographyToken={actionTypographyToken}
          value={mode === 'fixed' ? 'Fixed Taker' : 'Variable Taker'}
        />
      </PositionDetailsLeftBox>
      <PositionDetailsRightBox>
        <NotionalBox>
          <LabelTokenTypography
            colorToken="white"
            label="Notional"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token={compactNotional ? `${compactNotional.compactNotionalSuffix}${token}` : token}
            typographyToken={typographyToken}
            value={compactNotional ? compactNotional.compactNotionalNumber : '--'}
          />
        </NotionalBox>
        <DepositedMarginBox>
          <LabelTokenTypography
            colorToken="white"
            label="Deposited Margin"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token={
              compactDepositedMargin
                ? `${compactDepositedMargin.compactDepositedMarginSuffix}${token}`
                : token
            }
            tooltip="Deposited Margin = Margin Provided at any time - Margin Removed at any time"
            tooltipColorToken="white300"
            typographyToken={typographyToken}
            value={
              compactDepositedMargin ? compactDepositedMargin.compactDepositedMarginNumber : '--'
            }
          />
        </DepositedMarginBox>
        <RealisedPNLBox>
          <PnLDetailsWithTooltip
            labelTypographyToken={labelTypographyToken}
            realizedPnLFromFees={realizedPnLFromFees}
            realizedPnLFromSwaps={realizedPnLFromSwaps}
            realizedPnLTotal={realizedPnLTotal}
            typographyToken={typographyToken}
            underlyingTokenName={underlyingTokenName}
            variant="trader"
          />
        </RealisedPNLBox>
        <CashFlowBox>
          <LabelTokenTypography
            colorToken="white"
            label="Settling Balance"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token={
              compactSettlingBalance ? `${compactSettlingBalance.compactSuffix}${token}` : token
            }
            tooltip="Settling Balance = Deposited Margin + Realized PnL"
            tooltipColorToken="white300"
            typographyToken={typographyToken}
            value={compactSettlingBalance ? compactSettlingBalance.compactNumber : '--'}
          />
        </CashFlowBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
