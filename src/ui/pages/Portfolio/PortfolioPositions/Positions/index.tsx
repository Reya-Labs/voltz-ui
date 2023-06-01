import { LabelTokenTypography, PillSelector, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { selectPositionsSummary } from '../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../app/hooks';
import { capitalize } from '../../../../../utilities/capitalize';
import { PositionsFilterId, PositionsList } from '../PositionsList';
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

const positionFilterOptions: {
  id: PositionsFilterId;
  label: string;
}[] = [
  {
    id: 'active',
    label: 'Active',
  },
  {
    id: 'matured',
    label: 'Matured',
  },
  {
    id: 'settled',
    label: 'Settled',
  },
];

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
  } = useAppSelector(selectPositionsSummary);
  const [activeFilter, setActiveFilter] = useState<PositionsFilterId>('active');

  return (
    <PositionsBox>
      <TopBox>
        <TotalPortfolioValueBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Total Portfolio Value (USD)
          </Typography>
          <Typography colorToken="lavenderWeb" typographyToken="secondaryBodyExtraLargeBold">
            ${totalPortfolioValueUSDFormatted}
          </Typography>
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
      <BottomBox>
        <PositionsSelectorBox>
          <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumBold">
            {activeFilter === 'active'
              ? activePositionsLength
              : activeFilter === 'settled'
              ? settledPositionsLength
              : maturedPositionsLength}{' '}
            {capitalize(activeFilter)} Positions
          </Typography>
          <PillSelector
            activePillId={activeFilter as string}
            pillOptions={positionFilterOptions}
            onPillClick={(id) => setActiveFilter(id as PositionsFilterId)}
          />
        </PositionsSelectorBox>
        <PositionsList positionsFilterId={activeFilter} />
      </BottomBox>
    </PositionsBox>
  );
};
