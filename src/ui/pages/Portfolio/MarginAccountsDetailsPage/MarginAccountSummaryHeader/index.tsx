import { LabelTokenTypography, TokenTypography, Typography } from 'brokoli-ui';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  fetchMarginAccountsForSelectionThunk,
  selectMarginAccountsForSelectionLoading,
  selectMarginAccountsForSelectionMarginAccounts,
  selectMarginAccountSummary,
} from '../../../../../app/features/portfolio';
import { ChainIcon } from '../../../../components/ChainIcon';
import { CollateralDistribution } from '../../../../components/CollateralDistribution';
import { MarginAccountsSearchField } from '../../../../components/MarginAccountsSearchField';
import { MarginRatioDonut, MarginRatioDonutProps } from '../../../../components/MarginRatioDonut';
import { useAppNavigate } from '../../../../hooks/useAppNavigate';
import { useWallet } from '../../../../hooks/useWallet';
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
  const { account } = useWallet();
  const dispatch = useAppDispatch();
  const { marginAccountId } = useParams();
  const marginAccounts = useAppSelector(selectMarginAccountsForSelectionMarginAccounts);
  const marginAccountsLoading = useAppSelector(selectMarginAccountsForSelectionLoading);

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

  useEffect(() => {
    if (!account) {
      return;
    }

    void dispatch(
      fetchMarginAccountsForSelectionThunk({
        account,
      }),
    );
  }, [dispatch, account]);

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
              colorToken="lavenderWeb"
              token=" Total Value (USD)"
              typographyToken="primaryBodySmallRegular"
              value={name}
            />
          </NameBox>
          <TokenTypography
            colorToken="lavenderWeb"
            prefixToken="$"
            token=""
            typographyToken="secondaryBodyExtraLargeBold"
            value={totalPortfolioValueUSDFormatted}
          />
        </LeftBox>
        <RightBox>
          <MarginAccountsSearchField
            disabled={marginAccountsLoading}
            marginAccounts={marginAccounts}
            selectedMarginAccountId={marginAccountId || ''}
            onMarginAccountClick={handleOnMarginAccountClick}
          />
        </RightBox>
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
          <MarginRatioDonutBox>
            <Typography colorToken="lavenderWeb" typographyToken="secondaryBodyMediumBold">
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
