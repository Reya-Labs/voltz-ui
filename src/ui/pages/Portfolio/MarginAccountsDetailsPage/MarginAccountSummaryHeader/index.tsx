import { LabelTokenTypography, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../../app';
import { selectMarginAccountSummary } from '../../../../../app/features/portfolio';
import { ChainIcon } from '../../../../components/ChainIcon';
import { CollateralDistribution } from '../../../../components/CollateralDistribution';
import { MarginAccountsSearchField } from '../../../../components/MarginAccountsSearchField';
import { MarginRatioDonut, MarginRatioDonutProps } from '../../../../components/MarginRatioDonut';
import { useAppNavigate } from '../../../../hooks/useAppNavigate';
import { useMarginAccountsForSelection } from '../../../../hooks/useMarginAccountsForSelection';
import {
  LeftBox,
  MarginBox,
  MarginRatioBox,
  MarginRatioDonutBox,
  NameBox,
  PositionDetailsBox,
  RealizedPNLBox,
  RightBox,
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
    name,
    chainId,
    totalPortfolioCollateralUSDCompactFormatted,
  } = useAppSelector(selectMarginAccountSummary(marginAccountId));
  const { toMarginAccountDetailsPage } = useAppNavigate();
  const { marginAccountsUI, loading: marginAccountsLoading } = useMarginAccountsForSelection();

  const handleOnMarginAccountClick = (id: string) => {
    toMarginAccountDetailsPage({
      marginAccountId: id,
    });
  };

  const chainIcon = chainId ? <ChainIcon chainId={chainId} hideForChains={[]} /> : null;

  return (
    <TopBox>
      <TotalPortfolioValueBox>
        <LeftBox>
          <NameBox>
            {chainIcon ? chainIcon : null}
            <TokenTypography
              colorToken="white"
              token=" Total Value (USD)"
              typographyToken="primaryBodySmallRegular"
              value={name}
            />
          </NameBox>
          <TokenTypography
            colorToken="white"
            prefixToken="$"
            token=""
            typographyToken="secondaryBodyExtraLargeBold"
            value={totalPortfolioValueUSDFormatted}
          />
        </LeftBox>
        <RightBox>
          <MarginAccountsSearchField
            disabled={marginAccountsLoading}
            marginAccounts={marginAccountsUI}
            selectedMarginAccountId={marginAccountId || ''}
            onMarginAccountClick={handleOnMarginAccountClick}
          />
        </RightBox>
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
        <TotalPositionsBox>
          <LabelTokenTypography
            attentionIndicatorColorToken="primary100"
            colorToken="white"
            label="Positions"
            labelColorToken="white400"
            labelTypographyToken="primaryBodyXSmallRegular"
            token={''}
            typographyToken="secondaryBodyMediumBold"
            value={positionsLength}
          />
        </TotalPositionsBox>
        <MarginRatioBox>
          <Typography colorToken="white400" typographyToken="primaryBodyXSmallRegular">
            Margin Ratio
          </Typography>
          <MarginRatioDonutBox>
            <Typography colorToken="white100" typographyToken="secondaryBodyMediumBold">
              {marginRatioPercentage}%
            </Typography>
            <MarginRatioDonut
              health={marginRatioHealth as MarginRatioDonutProps['health']}
              percentage={marginRatioPercentage}
            />
          </MarginRatioDonutBox>
        </MarginRatioBox>
      </PositionDetailsBox>
    </TopBox>
  );
};
