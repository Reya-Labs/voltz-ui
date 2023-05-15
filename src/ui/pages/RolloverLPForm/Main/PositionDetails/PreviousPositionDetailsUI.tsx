import { LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectPreviousPositionCompactNotional,
  selectPreviousPositionDepositedMargin,
  selectPreviousPositionFixedLower,
  selectPreviousPositionFixedUpper,
  selectPreviousPositionRealizedPnLFromFeesFormatted,
  selectPreviousPositionRealizedPnLFromSwapsFormatted,
  selectPreviousPositionRealizedPnLTotalFormatted,
  selectPreviousPositionSettlingBalance,
} from '../../../../../app/features/forms/rollover-lp-form';
import { useAppSelector } from '../../../../../app/hooks';
import { PnLDetailsWithTooltip } from '../../../../components/PnLDetailsWithTooltip';
import {
  CashFlowBox,
  DepositedMarginBox,
  FixedLowerAndUpperBox,
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
  const compactDepositedMargin = useAppSelector(selectPreviousPositionDepositedMargin);
  const compactSettlingBalance = useAppSelector(selectPreviousPositionSettlingBalance);
  const realizedPnLTotal = useAppSelector(selectPreviousPositionRealizedPnLTotalFormatted);
  const realizedPnLFromFees = useAppSelector(selectPreviousPositionRealizedPnLFromFeesFormatted);
  const realizedPnLFromSwaps = useAppSelector(selectPreviousPositionRealizedPnLFromSwapsFormatted);
  const fixedLower = useAppSelector(selectPreviousPositionFixedLower);
  const fixedUpper = useAppSelector(selectPreviousPositionFixedUpper);
  const token = ` ${underlyingTokenName.toUpperCase()}`;

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        <LabelTokenTypography
          colorToken="wildStrawberry"
          label="Previous Position"
          labelColorToken="lavenderWeb"
          labelTypographyToken={actionLabelTypographyToken}
          token=""
          typographyToken={actionTypographyToken}
          value="Liquidity Provider"
        />
      </PositionDetailsLeftBox>
      <PositionDetailsRightBox>
        <NotionalBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Notional"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={compactNotional ? `${compactNotional.compactNotionalSuffix}${token}` : token}
            typographyToken={typographyToken}
            value={compactNotional ? compactNotional.compactNotionalNumber : '--'}
          />
        </NotionalBox>
        <DepositedMarginBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Deposited Margin"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={
              compactDepositedMargin
                ? `${compactDepositedMargin.compactDepositedMarginSuffix}${token}`
                : token
            }
            tooltip="Deposited Margin = Margin Provided at any time - Margin Removed at any time"
            tooltipColorToken="lavenderWeb2"
            typographyToken={typographyToken}
            value={
              compactDepositedMargin ? compactDepositedMargin.compactDepositedMarginNumber : '--'
            }
          />
        </DepositedMarginBox>
        <FixedLowerAndUpperBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Range"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token="%"
            typographyToken={typographyToken}
            value={fixedLower}
            value2={fixedUpper}
          />
        </FixedLowerAndUpperBox>
        <RealisedPNLBox>
          <PnLDetailsWithTooltip
            labelTypographyToken={labelTypographyToken}
            realizedPnLFromFees={realizedPnLFromFees}
            realizedPnLFromSwaps={realizedPnLFromSwaps}
            realizedPnLTotal={realizedPnLTotal}
            typographyToken={typographyToken}
            underlyingTokenName={underlyingTokenName}
            variant="lp"
          />
        </RealisedPNLBox>
        <CashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Settling Balance"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={
              compactSettlingBalance ? `${compactSettlingBalance.compactSuffix}${token}` : token
            }
            tooltip="Settling Balance = Deposited Margin + Realized PnL"
            tooltipColorToken="lavenderWeb2"
            typographyToken={typographyToken}
            value={compactSettlingBalance ? compactSettlingBalance.compactNumber : '--'}
          />
        </CashFlowBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
