import { Typography, TypographyWithTooltip } from 'brokoli-ui';
import React from 'react';

import {
  DistributionBox,
  MaturityBox,
  MaturityDistributionBox,
  PoolBox,
} from './MaturityDistributionHeader.styled';

export const MaturityDistributionHeader: React.FunctionComponent = () => {
  return (
    <MaturityDistributionBox>
      <DistributionBox>
        <TypographyWithTooltip
          colorToken="lavenderWeb3"
          tooltip="Input what % of your funds you would like to allocate to each maturity. The total must add to 100%."
          typographyToken="primaryBodySmallRegular"
        >
          Distribution
        </TypographyWithTooltip>
      </DistributionBox>
      <MaturityBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Maturity
        </Typography>
      </MaturityBox>
      <PoolBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Pool
        </Typography>
      </PoolBox>
    </MaturityDistributionBox>
  );
};
