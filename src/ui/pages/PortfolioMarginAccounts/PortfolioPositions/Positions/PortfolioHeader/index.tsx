import { LabelTokenTypography, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { selectPortfolioSummaryFormatted } from '../../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../../app/hooks';
import { CollateralDistribution } from '../../../../../components/CollateralDistribution';
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
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Total Portfolio Value (USD)
        </Typography>
        <TokenTypography
          colorToken="lavenderWeb"
          prefixToken="$"
          token=""
          typographyToken="secondaryBodyExtraLargeBold"
          value={totalPortfolioValueUSDFormatted}
        />
      </TotalPortfolioValueBox>
      <PositionDetailsBox>
        <MarginBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Margin"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            prefixToken="$"
            token={''}
            typographyToken="secondaryBodyMediumBold"
            value={totalPortfolioMarginValueUSDFormatted}
          />
        </MarginBox>
        <RealizedPNLBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Realised PnL"
            labelColorToken="lavenderWeb3"
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
            colorToken="lavenderWeb"
            label="Unrealised PnL"
            labelColorToken="lavenderWeb3"
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
            colorToken="lavenderWeb"
            label="Total Notional"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            prefixToken="$"
            token={totalPortfolioNotionalValueUSDCompactFormatted.compactSuffix}
            typographyToken="secondaryBodyMediumBold"
            value={totalPortfolioNotionalValueUSDCompactFormatted.compactNumber}
          />
        </TotalNotionalBox>
        <TotalCollateralBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Collateral"
            labelColorToken="lavenderWeb3"
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
              attentionIndicatorColorToken="skyBlueCrayola"
              colorToken="lavenderWeb"
              label="Healthy"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              token={''}
              typographyToken="secondaryBodyMediumBold"
              value={healthyPositionsLength}
            />
          </HealthBox>
          <HealthBox>
            <LabelTokenTypography
              attentionIndicatorColorToken="orangeYellow"
              colorToken="lavenderWeb"
              label="Warning"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              token={''}
              typographyToken="secondaryBodyMediumBold"
              value={warningPositionsLength}
            />
          </HealthBox>
          <HealthBox>
            <LabelTokenTypography
              attentionIndicatorColorToken="wildStrawberry"
              colorToken="lavenderWeb"
              label="Danger"
              labelColorToken="lavenderWeb3"
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
