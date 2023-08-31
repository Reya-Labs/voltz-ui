import { LabelTokenTypography, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';
import { useParams } from 'react-router-dom';

import { selectMarginAccountSummary } from '../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../app/hooks';
import { CollateralDistribution } from '../../../../components/CollateralDistribution';
import { MarginRatioDonut, MarginRatioDonutProps } from '../../../../components/MarginRatioDonut';
import {
  MarginBox,
  MarginRatioBox,
  PositionDetailsBox,
  RealizedPNLBox,
  TopBox,
  TotalCollateralBox,
  TotalNotionalBox,
  TotalPortfolioValueBox,
  TotalPositionsBox,
  UnrealizedPNLBox,
} from './MarginAccountSummaryHeader.styled';

export const MarginAccountSummaryHeader = () => {
  const { marginAccountId } = useParams();

  const {
    positionsLength,
    totalPortfolioNotionalValueUSDCompactFormatted,
    totalPortfolioMarginValueUSDFormatted,
    totalPortfolioRealizedPNLValueUSDFormatted,
    totalPortfolioValueUSDFormatted,
    totalPortfolioUnrealizedPNLValueUSDFormatted,
    marginRatioHealth,
    marginRatioPercentage,
    distributions,
    totalPortfolioCollateralUSDCompactFormatted,
  } = useAppSelector(selectMarginAccountSummary(marginAccountId));

  return (
    <TopBox>
      <TotalPortfolioValueBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Total Value (USD)
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
        <TotalPositionsBox>
          <LabelTokenTypography
            attentionIndicatorColorToken="skyBlueCrayola"
            colorToken="lavenderWeb"
            label="Positions"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token={''}
            typographyToken="secondaryBodyMediumBold"
            value={positionsLength}
          />
        </TotalPositionsBox>
        <MarginRatioBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
            Margin Ratio
          </Typography>
          <Typography colorToken="lavenderWeb" typographyToken="secondaryBodyXSmallRegular">
            {marginRatioPercentage}%
          </Typography>
          <MarginRatioDonut
            health={marginRatioHealth as MarginRatioDonutProps['health']}
            percentage={marginRatioPercentage}
          />
        </MarginRatioBox>
      </PositionDetailsBox>
    </TopBox>
  );
};
