import { Typography } from 'brokoli-ui';
import React from 'react';

import { DistributionsBox, TooltipBox } from './CollateralDistribution.styled';
import {
  CollateralDistributionRow,
  CollateralDistributionRowProps,
} from './CollateralDistributionRow';

type CollateralDistributionProps = {
  distributions: CollateralDistributionRowProps[];
};

const sortOrder: Record<CollateralDistributionRowProps['token'], number> = {
  eth: -1, // 'eth' will have priority and will be on top (-1)
  other: 1, // 'other' will be last (1)
  dai: 0, // 'dai' and 'usdc' will be in any order (0)
  usdc: 0,
};

const distributionSorter = (
  dA: CollateralDistributionRowProps,
  dB: CollateralDistributionRowProps,
) => sortOrder[dA.token] - sortOrder[dB.token];
export const CollateralDistribution: React.FunctionComponent<CollateralDistributionProps> = ({
  distributions,
}) => (
  <TooltipBox>
    <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
      Collateral by token
    </Typography>
    <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
      Collateral distribution breakdown by token of assets you've deposited on Voltz so far.
    </Typography>
    <DistributionsBox>
      {distributions.sort(distributionSorter).map((distribution, index) => (
        <CollateralDistributionRow key={index} {...distribution} />
      ))}
    </DistributionsBox>
  </TooltipBox>
);
