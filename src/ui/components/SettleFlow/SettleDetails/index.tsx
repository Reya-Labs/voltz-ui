import { TokenTypography, Typography, TypographyWithTooltip } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectCompactDepositedMargin,
  selectCompactNetBalance,
  selectCompactNotional,
  selectCompactRealizedPnL,
  selectFixedLower,
  selectFixedUpper,
  selectSettleAMM,
  selectSettleVariant,
} from '../../../../app/features/settle-flow';
import { useAppSelector } from '../../../../app/hooks';
import { RealizedPNLDetails } from '../../RealizedPNLDetails';
import { DetailBox, DetailsBox } from './SettleDetails.styled';

export const SettleDetails: React.FunctionComponent = () => {
  const compactNotional = useAppSelector(selectCompactNotional);
  const compactDepositedMargin = useAppSelector(selectCompactDepositedMargin);
  const compactNetBalance = useAppSelector(selectCompactNetBalance);
  const compactRealizedPnL = useAppSelector(selectCompactRealizedPnL);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);
  const fixedLower = useAppSelector(selectFixedLower);
  const fixedUpper = useAppSelector(selectFixedUpper);
  const variant = useAppSelector(selectSettleVariant);
  const aMM = useAppSelector(selectSettleAMM);

  if (!variant || !aMM) {
    return null;
  }

  return (
    <DetailsBox>
      <DetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Notional
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={`${compactNotional.compactNotionalSuffix}${token}`}
          typographyToken="secondaryBodySmallRegular"
          value={compactNotional.compactNotionalNumber}
        />
      </DetailBox>
      {variant === 'lp' ? (
        <React.Fragment>
          <DetailBox>
            <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
              Fixed Rate Low
            </Typography>
            <TokenTypography
              colorToken="lavenderWeb"
              token="%"
              typographyToken="secondaryBodySmallRegular"
              value={fixedLower || 0}
            />
          </DetailBox>
          <DetailBox>
            <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
              Fixed Rate High
            </Typography>
            <TokenTypography
              colorToken="lavenderWeb"
              token="%"
              typographyToken="secondaryBodySmallRegular"
              value={fixedUpper || 0}
            />
          </DetailBox>
        </React.Fragment>
      ) : null}
      <DetailBox>
        <TypographyWithTooltip
          colorToken="lavenderWeb3"
          tooltip="Deposited Margin = Margin Provided at any time - Margin Removed at any time"
          tooltipColorToken="lavenderWeb2"
          typographyToken="primaryBodySmallRegular"
        >
          Deposited Margin
        </TypographyWithTooltip>
        <TokenTypography
          colorToken="lavenderWeb"
          token={`${compactDepositedMargin.compactDepositedMarginSuffix}${token}`}
          typographyToken="secondaryBodySmallRegular"
          value={compactDepositedMargin.compactDepositedMarginNumber}
        />
      </DetailBox>
      <DetailBox>
        <TypographyWithTooltip
          colorToken="lavenderWeb3"
          tooltip={
            <RealizedPNLDetails
              pnlFromFees={compactRealizedPnL.compactRealizedPnLFees}
              pnlFromSwaps={compactRealizedPnL.compactRealizedPnLSwaps}
              pnlTotal={`${compactRealizedPnL.compactRealizedPnLTotal} ${compactRealizedPnL.compactRealizedPnLSuffix}`}
              underlyingTokenName={aMM.underlyingToken.name}
              variant={variant}
            />
          }
          tooltipColorToken="lavenderWeb2"
          typographyToken="primaryBodySmallRegular"
        >
          Realized PnL
        </TypographyWithTooltip>
        <TokenTypography
          colorToken={
            compactRealizedPnL.compactRealizedPnLTotal === '--'
              ? 'lavenderWeb'
              : compactRealizedPnL.compactRealizedPnLTotal.indexOf('-') !== -1
              ? 'wildStrawberry'
              : 'skyBlueCrayola'
          }
          token={`${compactRealizedPnL.compactRealizedPnLSuffix}${token}`}
          typographyToken="secondaryBodySmallRegular"
          value={compactRealizedPnL.compactRealizedPnLTotal}
        />
      </DetailBox>
      <DetailBox>
        <TypographyWithTooltip
          colorToken="lavenderWeb3"
          tooltip="Settling Balance = Deposited Margin + Realized PnL"
          tooltipColorToken="lavenderWeb2"
          typographyToken="primaryBodySmallRegular"
        >
          Settling Balance
        </TypographyWithTooltip>
        <TokenTypography
          colorToken={
            compactNetBalance.compactNetBalanceNumber === '--'
              ? 'lavenderWeb'
              : compactNetBalance.compactNetBalanceNumber.indexOf('-') !== -1
              ? 'wildStrawberry'
              : 'skyBlueCrayola'
          }
          token={`${compactNetBalance.compactNetBalanceSuffix}${token}`}
          typographyToken="secondaryBodySmallRegular"
          value={compactNetBalance.compactNetBalanceNumber}
        />
      </DetailBox>
      <DetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" "
          typographyToken="secondaryBodySmallRegular"
          value={aMMMaturity}
        />
      </DetailBox>
    </DetailsBox>
  );
};
