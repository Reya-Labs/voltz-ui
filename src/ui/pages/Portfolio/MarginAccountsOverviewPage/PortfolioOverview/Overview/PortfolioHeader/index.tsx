import { LabelTokenTypography, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../../app';
import { selectPortfolioSummaryFormatted } from '../../../../../../../app/features/portfolio';
import { CollateralDistribution } from '../../../../../../components/CollateralDistribution';
import {
  HealthBox,
  HealthStatusBox,
  MarginBox,
  PositionDetailsBox,
  RealizedPNLBox,
  TopBox,
  TotalCollateralBox,
  TotalNotionalBox,
  TotalPortfolioValueBox,
  UnrealizedPNLBox,
} from './PortfolioHeader.styled';

export const PortfolioHeader = () => {
  const {
    healthyPositionsLength,
    distributions,
    totalPortfolioNotionalValueUSDCompactFormatted,
    totalPortfolioMarginValueUSDFormatted,
    totalPortfolioRealizedPNLValueUSDFormatted,
    totalPortfolioValueUSDFormatted,
    totalPortfolioUnrealizedPNLValueUSDFormatted,
    warningPositionsLength,
    dangerPositionsLength,
    totalPortfolioCollateralUSDCompactFormatted,
  } = useAppSelector(selectPortfolioSummaryFormatted);

  return (
    <TopBox>
      <TotalPortfolioValueBox>
        <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
          Total Portfolio Value (USD)
        </Typography>
        <TokenTypography
          colorToken="white"
          prefixToken="$"
          token=""
          typographyToken="secondaryBodyExtraLargeBold"
          value={totalPortfolioValueUSDFormatted}
        />
      </TotalPortfolioValueBox>
      <PositionDetailsBox>
        <MarginBox>
          <LabelTokenTypography
            colorToken="white"
            label="Margin"
            labelColorToken="white400"
            labelTypographyToken="primaryBodyXSmallRegular"
            prefixToken="$"
            token={''}
            typographyToken="secondaryBodyMediumBold"
            value={totalPortfolioMarginValueUSDFormatted}
          />
        </MarginBox>
        <RealizedPNLBox>
          <LabelTokenTypography
            colorToken="white"
            label="Realised PnL"
            labelColorToken="white400"
            labelTypographyToken="primaryBodyXSmallRegular"
            prefixToken={
              totalPortfolioRealizedPNLValueUSDFormatted === '--'
                ? ''
                : totalPortfolioRealizedPNLValueUSDFormatted.indexOf('-') === -1
                ? '+$'
                : '-$'
            }
            token={''}
            typographyToken="secondaryBodyMediumBold"
            value={
              totalPortfolioRealizedPNLValueUSDFormatted === '--'
                ? totalPortfolioRealizedPNLValueUSDFormatted
                : totalPortfolioRealizedPNLValueUSDFormatted.replace('-', '')
            }
          />
        </RealizedPNLBox>
        <UnrealizedPNLBox>
          <LabelTokenTypography
            colorToken="white"
            label="Unrealised PnL"
            labelColorToken="white400"
            labelTypographyToken="primaryBodyXSmallRegular"
            prefixToken={
              totalPortfolioUnrealizedPNLValueUSDFormatted === '--'
                ? ''
                : totalPortfolioUnrealizedPNLValueUSDFormatted.indexOf('-') === -1
                ? '+$'
                : '-$'
            }
            token={''}
            typographyToken="secondaryBodyMediumBold"
            value={
              totalPortfolioUnrealizedPNLValueUSDFormatted === '--'
                ? totalPortfolioUnrealizedPNLValueUSDFormatted
                : totalPortfolioUnrealizedPNLValueUSDFormatted.replace('-', '')
            }
          />
        </UnrealizedPNLBox>
        <TotalNotionalBox>
          <LabelTokenTypography
            colorToken="white"
            label="Total Notional"
            labelColorToken="white400"
            labelTypographyToken="primaryBodyXSmallRegular"
            prefixToken="$"
            token={totalPortfolioNotionalValueUSDCompactFormatted.compactSuffix}
            typographyToken="secondaryBodyMediumBold"
            value={totalPortfolioNotionalValueUSDCompactFormatted.compactNumber}
          />
        </TotalNotionalBox>
        <TotalCollateralBox>
          <LabelTokenTypography
            colorToken="white"
            label="Collateral"
            labelColorToken="white400"
            labelTypographyToken="primaryBodyXSmallRegular"
            prefixToken="$"
            token={totalPortfolioCollateralUSDCompactFormatted.compactSuffix}
            tooltip={<CollateralDistribution distributions={distributions} />}
            typographyToken="secondaryBodyMediumBold"
            value={totalPortfolioCollateralUSDCompactFormatted.compactNumber}
          />
        </TotalCollateralBox>
        <HealthStatusBox>
          <HealthBox>
            <LabelTokenTypography
              attentionIndicatorColorToken="primary100"
              colorToken="white"
              label="Healthy"
              labelColorToken="white400"
              labelTypographyToken="primaryBodyXSmallRegular"
              token={''}
              typographyToken="secondaryBodyMediumBold"
              value={healthyPositionsLength}
            />
          </HealthBox>
          <HealthBox>
            <LabelTokenTypography
              attentionIndicatorColorToken="warning100"
              colorToken="white"
              label="Warning"
              labelColorToken="white400"
              labelTypographyToken="primaryBodyXSmallRegular"
              token={''}
              typographyToken="secondaryBodyMediumBold"
              value={warningPositionsLength}
            />
          </HealthBox>
          <HealthBox>
            <LabelTokenTypography
              attentionIndicatorColorToken="error100"
              colorToken="white"
              label="Danger"
              labelColorToken="white400"
              labelTypographyToken="primaryBodyXSmallRegular"
              token={''}
              typographyToken="secondaryBodyMediumBold"
              value={dangerPositionsLength}
            />
          </HealthBox>
        </HealthStatusBox>
      </PositionDetailsBox>
    </TopBox>
  );
};
