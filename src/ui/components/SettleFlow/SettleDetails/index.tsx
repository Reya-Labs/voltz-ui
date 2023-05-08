import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectCompactMargin,
  selectCompactNetBalance,
  selectCompactNotional,
  selectCompactRealizedPnL,
  selectFixedLower,
  selectFixedUpper,
  selectSettleVariant,
} from '../../../../app/features/settle-flow';
import { useAppSelector } from '../../../../app/hooks';
import { DetailBox, DetailsBox } from './SettleDetails.styled';

export const SettleDetails: React.FunctionComponent = () => {
  const compactNotional = useAppSelector(selectCompactNotional);
  const compactMargin = useAppSelector(selectCompactMargin);
  const compactNetBalance = useAppSelector(selectCompactNetBalance);
  const compactRealizedPnL = useAppSelector(selectCompactRealizedPnL);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const token = useAppSelector(selectAMMTokenFormatted);
  const fixedLower = useAppSelector(selectFixedLower);
  const fixedUpper = useAppSelector(selectFixedUpper);
  const variant = useAppSelector(selectSettleVariant);

  if (!variant) {
    return null;
  }

  return (
    <DetailsBox>
      <DetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
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
            <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
              Fixed Low
            </Typography>
            <TokenTypography
              colorToken="lavenderWeb"
              token="%"
              typographyToken="secondaryBodySmallRegular"
              value={fixedLower || 0}
            />
          </DetailBox>
          <DetailBox>
            <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
              Fixed High
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
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Margin
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          token={`${compactMargin.compactMarginSuffix}${token}`}
          typographyToken="secondaryBodySmallRegular"
          value={compactMargin.compactMarginNumber}
        />
      </DetailBox>
      <DetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Realized PnL
        </Typography>
        <TokenTypography
          colorToken={
            compactRealizedPnL.compactRealizedPnLNumber === '--'
              ? 'lavenderWeb'
              : compactRealizedPnL.compactRealizedPnLNumber.indexOf('-') !== -1
              ? 'wildStrawberry'
              : 'skyBlueCrayola'
          }
          token={`${compactRealizedPnL.compactRealizedPnLSuffix}${token}`}
          typographyToken="secondaryBodySmallRegular"
          value={compactRealizedPnL.compactRealizedPnLNumber}
        />
      </DetailBox>
      <DetailBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Net Balance
        </Typography>
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
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
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
