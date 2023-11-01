import { LabelTokenTypography, PillSelector, TokenTypography, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { useAppSelector } from '../../../../../app';
import { selectPositionsSummary } from '../../../../../app/features/portfolio';
import { PositionsFilterId } from '../../../../../app/features/portfolio/types';
import { capitalize } from '../../../../../utilities/capitalize';
import { PositionsList } from '../PositionsList';
import {
  BottomBox,
  HealthBox,
  HealthStatusBox,
  MarginBox,
  PositionDetailsBox,
  PositionsBox,
  PositionsSelectorBox,
  RealizedPNLBox,
  TopBox,
  TotalNotionalBox,
  TotalPortfolioValueBox,
  UnrealizedPNLBox,
} from './Positions.styled';

export const Positions: React.FunctionComponent = () => {
  const {
    activePositionsLength,
    maturedPositionsLength,
    settledPositionsLength,
    healthyPositionsLength,
    totalPortfolioNotionalValueUSDCompactFormatted,
    totalPortfolioMarginValueUSDFormatted,
    totalPortfolioRealizedPNLValueUSDFormatted,
    totalPortfolioValueUSDFormatted,
    totalPortfolioUnrealizedPNLValueUSDFormatted,
    warningPositionsLength,
    dangerPositionsLength,
    positionsLength,
    filterOptions,
  } = useAppSelector(selectPositionsSummary);
  const [activeFilter, setActiveFilter] = useState<PositionsFilterId>('active');

  return (
    <PositionsBox>
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
      <BottomBox>
        <PositionsSelectorBox>
          <Typography colorToken="white100" typographyToken="primaryBodyMediumBold">
            {activeFilter === 'active'
              ? activePositionsLength
              : activeFilter === 'settled'
              ? settledPositionsLength
              : maturedPositionsLength}{' '}
            {capitalize(activeFilter)} Positions
          </Typography>
          <PillSelector
            activePillId={activeFilter as string}
            disabled={positionsLength === '--'}
            pillOptions={filterOptions}
            variant="regular"
            onPillClick={(id) => setActiveFilter(id as PositionsFilterId)}
          />
        </PositionsSelectorBox>
        <PositionsList positionsFilterId={activeFilter} />
      </BottomBox>
    </PositionsBox>
  );
};
