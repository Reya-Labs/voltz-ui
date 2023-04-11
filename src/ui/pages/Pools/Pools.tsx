import { Typography } from 'brokoli-ui';
import React from 'react';

import { HeaderBox, MainSectionBox, PoolsBox } from './Pools.styled';
import { PoolsHeader } from './PoolsHeader';
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
      <MainSectionBox>
        <PoolsHeader />
        <PoolsList />
      </MainSectionBox>
    </PoolsBox>
  );
};
