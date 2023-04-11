import { Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import {
  FixedAPRBox,
  LeftBox,
  MaturityBox,
  MiddleBox,
  PoolsHeaderBox,
  RightBox,
  RowsBox,
  VariableAPYBox,
} from './PoolsHeader.styled';

export const PoolsHeader: React.FunctionComponent = () => {
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  return (
    <PoolsHeaderBox>
      <LeftBox>
        <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
          Pools
        </Typography>
      </LeftBox>
      <MiddleBox>
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
        <MaturityBox>
          <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
            Maturity
          </Typography>
        </MaturityBox>
      </MiddleBox>
      <RightBox>
        <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
          Trade or LP
        </Typography>
      </RightBox>
    </PoolsHeaderBox>
  );
};
