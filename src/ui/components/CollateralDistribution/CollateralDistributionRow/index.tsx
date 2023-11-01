import { TokenIcon, TokenIconProps, Typography } from 'brokoli-ui';
import React from 'react';

import { LeftSide, RightSide, Row } from './CollateralDistributionRow.styled';

const labelMap: Record<TokenIconProps['token'], string> = {
  dai: 'DAI',
  eth: 'ETH',
  usdc: 'USDC',
  reth: 'rETH',
  steth: 'stETH',
  usdt: 'USDT',
  other: 'Other',
};

export type CollateralDistributionRowProps = {
  token: TokenIconProps['token'] | string;
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
  const label = labelMap[token] || 'Unknown';
  return (
    <Row>
      <LeftSide>
        <TokenIcon size={20} token={token} />
        <Typography colorToken="white300" typographyToken="secondaryBodyMediumRegular">
          {percentage}%
        </Typography>
        <Typography colorToken="white100" typographyToken="primaryBodySmallRegular">
          {label}
        </Typography>
      </LeftSide>
      <RightSide>
        <Typography colorToken="white300" typographyToken="secondaryBodySmallRegular">
          {distribution}
        </Typography>
        <Typography colorToken="white400" typographyToken="secondaryBodyXSmallRegular">
          ({token === 'other' ? 'Multiple Token' : `$${distributionUSD}`})
        </Typography>
      </RightSide>
    </Row>
  );
};
