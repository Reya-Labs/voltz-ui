import { Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useResponsiveQuery } from '../../../../../../../../../hooks/useResponsiveQuery';
import {
  LeftBox,
  MarginBox,
  MaturityBox,
  NotionalBox,
  PositionsHeaderBox,
  RealizedPNLBox,
  RightBox,
  StatusBox,
  UnrealizedPNLBox,
} from './PositionsHeader.styled';

export const PositionsHeader: React.FunctionComponent = () => {
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  return (
    <PositionsHeaderBox>
      <LeftBox>
        <Typography colorToken="white400" typographyToken={typographyToken}>
          Side - Pool
        </Typography>
      </LeftBox>
      <RightBox>
        <NotionalBox>
          <Typography colorToken="white400" typographyToken={typographyToken}>
            Notional
          </Typography>
        </NotionalBox>
        <MarginBox>
          <Typography colorToken="white400" typographyToken={typographyToken}>
            Margin
          </Typography>
        </MarginBox>
        <MaturityBox>
          <Typography colorToken="white400" typographyToken={typographyToken}>
            Maturity
          </Typography>
        </MaturityBox>
        <StatusBox variant="large">
          <Typography colorToken="white400" typographyToken={typographyToken}>
            Status
          </Typography>
        </StatusBox>
        <UnrealizedPNLBox>
          <Typography colorToken="white400" typographyToken={typographyToken}>
            Unrealized PnL
          </Typography>
        </UnrealizedPNLBox>
        <RealizedPNLBox>
          <Typography colorToken="white400" typographyToken={typographyToken}>
            Realized PnL
          </Typography>
        </RealizedPNLBox>
      </RightBox>
    </PositionsHeaderBox>
  );
};
