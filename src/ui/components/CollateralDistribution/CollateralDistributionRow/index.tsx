import { Typography } from 'brokoli-ui';
import React from 'react';

import {
  DaiIcon,
  EthIcon,
  LeftSide,
  OtherIcon,
  RightSide,
  Row,
  UsdcIcon,
} from './CollateralDistributionRow.styled';

const iconMap: Record<CollateralDistributionRowProps['token'], React.FunctionComponent> = {
  dai: DaiIcon,
  eth: EthIcon,
  other: OtherIcon,
  usdc: UsdcIcon,
};
const labelMap: Record<CollateralDistributionRowProps['token'], string> = {
  dai: 'DAI',
  eth: 'ETH',
  other: 'Other',
  usdc: 'USDC',
};
export type CollateralDistributionRowProps = {
  token: 'dai' | 'eth' | 'other' | 'usdc';
  percentage: number;
  distribution: number;
  distributionUSD: number;
};
export const CollateralDistributionRow: React.FunctionComponent<CollateralDistributionRowProps> = ({
  token,
  percentage,
  distributionUSD,
  distribution,
}) => {
  const Icon = iconMap[token] || React.Fragment;
  const label = labelMap[token] || 'Unknown';
  return (
    <Row>
      <LeftSide>
        <Icon />
        <Typography colorToken="lavenderWeb2" typographyToken="secondaryBodyMediumRegular">
          {percentage}
        </Typography>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          {label}
        </Typography>
      </LeftSide>
      <RightSide>
        <Typography colorToken="lavenderWeb2" typographyToken="secondaryBodySmallRegular">
          {distribution}
        </Typography>
        <Typography colorToken="lavenderWeb3" typographyToken="secondaryBodyXSmallRegular">
          ({token === 'other' ? 'Multiple Token' : distributionUSD})
        </Typography>
      </RightSide>
    </Row>
  );
};
