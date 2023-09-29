import { Typography } from 'brokoli-ui';
import React from 'react';

import { HeaderBox, PoolsBox } from './Pools.styled';
import { PoolsInformation } from './PoolsInformation';
import { PoolsList } from './PoolsList';

export const Pools: React.FunctionComponent = () => {
  return (
    <PoolsBox>
      <HeaderBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Black">
          Fixed and Variable Rates Markets
        </Typography>
        <PoolsInformation />
      </HeaderBox>
      <PoolsList />
    </PoolsBox>
  );
};
