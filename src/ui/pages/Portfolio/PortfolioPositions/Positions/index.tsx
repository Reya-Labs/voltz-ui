import { LabelTokenTypography, PillSelector, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import {
  selectDangerPositionsLength,
  selectHealthyPositionsLength,
  selectPositionsLength,
  selectWarningPositionsLength,
} from '../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../app/hooks';
import { PositionsFilterId, PositionsList } from '../PositionsList';
import {
  BottomBox,
  HealthBox,
  HealthStatusBox,
  MarginBox,
  MidBox,
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
    id: 'settled',
    label: 'Settled',
  },
];

export const Positions: React.FunctionComponent = () => {
  const positionsLength = useAppSelector(selectPositionsLength);
  const healthyPositionsLength = useAppSelector(selectHealthyPositionsLength);
  const warningPositionsLength = useAppSelector(selectWarningPositionsLength);
  const dangerPositionsLength = useAppSelector(selectDangerPositionsLength);
  const [activeFilter, setActiveFilter] = useState<PositionsFilterId>('active');

  return (
    <PositionsBox>
      <TopBox>
        <TotalPortfolioValueBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Total Portfolio Value (USD)
          </Typography>
          <Typography colorToken="lavenderWeb" typographyToken="secondaryBodyExtraLargeBold">
            $189,099.01
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
              value={'12,999.00'}
            />
          </MarginBox>
          <RealizedPNLBox>
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Realised PnL"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              prefixToken="+$"
              token={''}
              typographyToken="secondaryBodyMediumBold"
              value={'54,988'}
            />
          </RealizedPNLBox>
          <UnrealizedPNLBox>
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Unrealised PnL"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              prefixToken="-$"
              token={''}
              typographyToken="secondaryBodyMediumBold"
              value={'54,988'}
            />
          </UnrealizedPNLBox>
          <TotalNotionalBox>
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Total Notional"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              prefixToken="$"
              token={'M'}
              typographyToken="secondaryBodyMediumBold"
              value={'245.004'}
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
      <MidBox>
        <Typography colorToken="lavenderWeb" typographyToken="secondaryBodyMediumBold">
          {positionsLength}
        </Typography>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Positions
        </Typography>
      </MidBox>
      <BottomBox>
        <PositionsSelectorBox>
          <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumBold">
            Positions in this account
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
