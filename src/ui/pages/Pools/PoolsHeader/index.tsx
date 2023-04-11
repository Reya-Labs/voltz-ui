import { Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useResponsiveQuery } from '../../../../hooks/useResponsiveQuery';
import {
  FixedAPRBox,
  MaturityBox,
  PoolsBox,
  PoolsHeaderBox,
  RowsBox,
  TradingVolumeBox,
  VariableAPYBox,
} from './PoolsHeader.styled';

export const PoolsHeader: React.FunctionComponent = () => {
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  return (
    <PoolsHeaderBox>
      <PoolsBox>
        <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
          Pools
        </Typography>
      </PoolsBox>
      <FixedAPRBox>
        <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
          Fixed APR
        </Typography>
      </FixedAPRBox>
      <VariableAPYBox>
        <RowsBox>
          <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
            Variable APY
          </Typography>
          <Typography colorToken="lavenderWeb5" typographyToken={typographyToken}>
            24h Change
          </Typography>
        </RowsBox>
      </VariableAPYBox>
      <TradingVolumeBox>
        <RowsBox>
          <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
            Trading volume
          </Typography>
          <Typography colorToken="lavenderWeb5" typographyToken={typographyToken}>
            Last 30 days
          </Typography>
        </RowsBox>
      </TradingVolumeBox>
      <MaturityBox>
        <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
          Maturity
        </Typography>
      </MaturityBox>
    </PoolsHeaderBox>
  );
};
