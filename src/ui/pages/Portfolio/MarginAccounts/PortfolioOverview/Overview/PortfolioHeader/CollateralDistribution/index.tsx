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
  // 'eth' will have priority and will be on top (-1)
  eth: -3,
  steth: -2,
  reth: -1,
  dai: 0,
  usdc: 1,
  usdt: 2,
  // 'other' will be last (3)
  other: 3,
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
