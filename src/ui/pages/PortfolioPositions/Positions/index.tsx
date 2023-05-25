import { LabelTokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { PositionsList } from '../PositionsList';
import {
  BottomBox,
  HealthBox,
  HealthStatusBox,
  MarginBox,
  MidBox,
  PositionDetailsBox,
  PositionsBox,
  RealizedPNLBox,
  TopBox,
  TotalNotionalBox,
  TotalPortfolioValueBox,
  UnrealizedPNLBox,
} from './Positions.styled';

export const Positions: React.FunctionComponent = () => {
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
              token={''}
              typographyToken="secondaryBodyMediumBold"
              value={'$12,999.00'}
            />
          </MarginBox>
          <RealizedPNLBox>
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Realised PnL"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              token={''}
              typographyToken="secondaryBodyMediumBold"
              value={'+$54,988'}
            />
          </RealizedPNLBox>
          <UnrealizedPNLBox>
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Unrealised PnL"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              token={''}
              typographyToken="secondaryBodyMediumBold"
              value={'-$54,988'}
            />
          </UnrealizedPNLBox>
          <TotalNotionalBox>
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Total Notional"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              token={'M'}
              typographyToken="secondaryBodyMediumBold"
              value={'$245.004'}
            />
          </TotalNotionalBox>
          <HealthStatusBox>
            <HealthBox>
              <LabelTokenTypography
                colorToken="lavenderWeb"
                label="Healthy"
                labelColorToken="lavenderWeb3"
                labelTypographyToken="primaryBodyXSmallRegular"
                token={''}
                typographyToken="secondaryBodyMediumBold"
                value={2}
              />
            </HealthBox>
            <HealthBox>
              <LabelTokenTypography
                colorToken="lavenderWeb"
                label="Warning"
                labelColorToken="lavenderWeb3"
                labelTypographyToken="primaryBodyXSmallRegular"
                token={''}
                typographyToken="secondaryBodyMediumBold"
                value={0}
              />
            </HealthBox>
            <HealthBox>
              <LabelTokenTypography
                colorToken="lavenderWeb"
                label="Danger"
                labelColorToken="lavenderWeb3"
                labelTypographyToken="primaryBodyXSmallRegular"
                token={''}
                typographyToken="secondaryBodyMediumBold"
                value={1}
              />
            </HealthBox>
          </HealthStatusBox>
        </PositionDetailsBox>
      </TopBox>
      <MidBox>
        <Typography colorToken="lavenderWeb" typographyToken="secondaryBodyMediumBold">
          12
        </Typography>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Positions
        </Typography>
      </MidBox>
      <BottomBox>
        <Typography colorToken="lavenderWeb" typographyToken="secondaryBodyMediumBold">
          Positions in this account
        </Typography>
        <PositionsList />
      </BottomBox>
    </PositionsBox>
  );
};
