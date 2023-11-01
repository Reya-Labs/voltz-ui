import { ExternalLink, TokenTypography, Typography, TypographyWithTooltip } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../app';
import {
  selectAMMMaturityFormatted,
  selectAMMToken,
  selectAMMTokenFormatted,
  selectCompactDepositedMargin,
  selectCompactNetBalance,
  selectCompactNotional,
  selectCompactRealizedPnL,
  selectFixedLower,
  selectFixedUpper,
  selectIsArbAaveAugust,
  selectIsGLP28June,
  selectSettleVariant,
} from '../../../../app/features/settle-flow';
import { RealizedPNLDetails } from '../../RealizedPNLDetails';
import { DetailBox, DetailsBox } from './SettleDetails.styled';

export const SettleDetails: React.FunctionComponent = () => {
  const compactNotional = useAppSelector(selectCompactNotional);
  const compactDepositedMargin = useAppSelector(selectCompactDepositedMargin);
  const compactNetBalance = useAppSelector(selectCompactNetBalance);
  const compactRealizedPnL = useAppSelector(selectCompactRealizedPnL);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const tokenFormatted = useAppSelector(selectAMMTokenFormatted);
  const fixedLower = useAppSelector(selectFixedLower);
  const fixedUpper = useAppSelector(selectFixedUpper);
  const variant = useAppSelector(selectSettleVariant);
  const token = useAppSelector(selectAMMToken);
  const isGLP28June = useAppSelector(selectIsGLP28June);
  const isArbAaveAugust = useAppSelector(selectIsArbAaveAugust);

  if (!variant || !token) {
    return null;
  }

  if (isGLP28June) {
    return (
      <DetailsBox>
        <Typography colorToken="white100" typographyToken="primaryBodySmallRegular">
          Warning: Settlement for the GLP pool will take place in line with the decisions made by
          the community in the following &nbsp;
          <ExternalLink
            colorToken="primary"
            href="https://www.voltz.xyz/voltz-snapshot"
            typographyToken="primaryBodySmallRegular"
          >
            Vote
          </ExternalLink>
          <br />
          <br />
        </Typography>
        <Typography colorToken="white100" typographyToken="primaryBodySmallRegular">
          By settling you are confirming agreement to these settlement terms, and fully releasing
          any and all claims you have or may have had against Voltz Labs Technology Limited or its
          subsidiaries, affiliates, or personnel in connection with these matters. For more
          information on our terms and conditions, and our limitations on liability and
          indemnification, see
          <ExternalLink
            colorToken="primary"
            href="https://voltz.xyz/t-cs"
            typographyToken="primaryBodySmallRegular"
          >
            Terms and Conditions
          </ExternalLink>{' '}
          the terms of which apply.
        </Typography>
      </DetailsBox>
    );
  } else if (isArbAaveAugust) {
    return (
      <DetailsBox>
        <DetailBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Settling Balance
          </Typography>
          <TokenTypography
            colorToken={
              compactNetBalance.compactNetBalanceNumber === '--'
                ? 'white'
                : compactNetBalance.compactNetBalanceNumber.indexOf('-') !== -1
                ? 'error'
                : 'primary'
            }
            token={`${compactNetBalance.compactNetBalanceSuffix}${tokenFormatted}`}
            typographyToken="secondaryBodySmallRegular"
            value={compactNetBalance.compactNetBalanceNumber}
          />
        </DetailBox>
        <Typography colorToken="white100" typographyToken="primaryBodySmallRegular">
          Settlement for the Aave pool will take place in line with the decisions made by the
          community in the following &nbsp;
          <ExternalLink
            colorToken="primary"
            href="https://www.voltz.xyz/voltz-snapshot"
            typographyToken="primaryBodySmallRegular"
          >
            Vote
          </ExternalLink>
          <br />
          <br />
        </Typography>
        <Typography colorToken="white100" typographyToken="primaryBodySmallRegular">
          By settling you are confirming agreement to these settlement terms, and fully releasing
          any and all claims you have or may have had against Voltz Labs Technology Limited or its
          subsidiaries, affiliates, or personnel in connection with these matters. For more
          information on our terms and conditions, and our limitations on liability and
          indemnification, see
          <ExternalLink
            colorToken="primary"
            href="https://voltz.xyz/t-cs"
            typographyToken="primaryBodySmallRegular"
          >
            Terms and Conditions
          </ExternalLink>{' '}
          the terms of which apply.
        </Typography>
      </DetailsBox>
    );
  } else {
    return (
      <DetailsBox>
        <DetailBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Notional
          </Typography>
          <TokenTypography
            colorToken="white"
            token={`${compactNotional.compactNotionalSuffix}${tokenFormatted}`}
            typographyToken="secondaryBodySmallRegular"
            value={compactNotional.compactNotionalNumber}
          />
        </DetailBox>
        {variant === 'lp' ? (
          <React.Fragment>
            <DetailBox>
              <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
                Fixed Rate Low
              </Typography>
              <TokenTypography
                colorToken="white"
                token="%"
                typographyToken="secondaryBodySmallRegular"
                value={fixedLower || 0}
              />
            </DetailBox>
            <DetailBox>
              <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
                Fixed Rate High
              </Typography>
              <TokenTypography
                colorToken="white"
                token="%"
                typographyToken="secondaryBodySmallRegular"
                value={fixedUpper || 0}
              />
            </DetailBox>
          </React.Fragment>
        ) : null}
        <DetailBox>
          <TypographyWithTooltip
            colorToken="white400"
            tooltip="Deposited Margin = Margin Provided at any time - Margin Removed at any time"
            tooltipColorToken="white300"
            typographyToken="primaryBodySmallRegular"
          >
            Deposited Margin
          </TypographyWithTooltip>
          <TokenTypography
            colorToken="white"
            token={`${compactDepositedMargin.compactDepositedMarginSuffix}${tokenFormatted}`}
            typographyToken="secondaryBodySmallRegular"
            value={compactDepositedMargin.compactDepositedMarginNumber}
          />
        </DetailBox>
        <DetailBox>
          <TypographyWithTooltip
            colorToken="white400"
            tooltip={
              <RealizedPNLDetails
                pnlFromFees={compactRealizedPnL.compactRealizedPnLFees}
                pnlFromSwaps={compactRealizedPnL.compactRealizedPnLSwaps}
                pnlTotal={`${compactRealizedPnL.compactRealizedPnLTotal} ${compactRealizedPnL.compactRealizedPnLSuffix}`}
                underlyingTokenName={token}
                variant={variant}
              />
            }
            tooltipColorToken="white300"
            typographyToken="primaryBodySmallRegular"
          >
            Realized PnL
          </TypographyWithTooltip>
          <TokenTypography
            colorToken={
              compactRealizedPnL.compactRealizedPnLTotal === '--'
                ? 'white'
                : compactRealizedPnL.compactRealizedPnLTotal.indexOf('-') !== -1
                ? 'error'
                : 'primary'
            }
            token={`${compactRealizedPnL.compactRealizedPnLSuffix}${tokenFormatted}`}
            typographyToken="secondaryBodySmallRegular"
            value={compactRealizedPnL.compactRealizedPnLTotal}
          />
        </DetailBox>
        <DetailBox>
          <TypographyWithTooltip
            colorToken="white400"
            tooltip="Settling Balance = Deposited Margin + Realized PnL"
            tooltipColorToken="white300"
            typographyToken="primaryBodySmallRegular"
          >
            Settling Balance
          </TypographyWithTooltip>
          <TokenTypography
            colorToken={
              compactNetBalance.compactNetBalanceNumber === '--'
                ? 'white'
                : compactNetBalance.compactNetBalanceNumber.indexOf('-') !== -1
                ? 'error'
                : 'primary'
            }
            token={`${compactNetBalance.compactNetBalanceSuffix}${tokenFormatted}`}
            typographyToken="secondaryBodySmallRegular"
            value={compactNetBalance.compactNetBalanceNumber}
          />
        </DetailBox>
        <DetailBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Maturity
          </Typography>
          <TokenTypography
            colorToken="white"
            token=" "
            typographyToken="secondaryBodySmallRegular"
            value={aMMMaturity}
          />
        </DetailBox>
      </DetailsBox>
    );
  }
};
