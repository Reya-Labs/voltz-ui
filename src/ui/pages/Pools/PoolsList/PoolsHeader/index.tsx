import { Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { selectPoolSortOptions } from '../../../../../app/features/aMMs';
import { useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import {
  FixedAPRBox,
  LeftBox,
  MaturityBox,
  MiddleBox,
  PoolsHeaderBox,
  RightBox,
  VariableAPYBox,
} from './PoolsHeader.styled';
import { PoolSortHeader } from './PoolSortHeader';

export const PoolsHeader: React.FunctionComponent = () => {
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';
  const sortOptions = useAppSelector(selectPoolSortOptions);
  const poolsSortOption = sortOptions.find((o) => o.id === 'pools');
  const fixedAPRSortOption = sortOptions.find((o) => o.id === 'fixedAPR');
  const variableAPYSortOption = sortOptions.find((o) => o.id === 'variableAPY');
  const maturitySortOption = sortOptions.find((o) => o.id === 'maturity');

  return (
    <PoolsHeaderBox>
      <LeftBox>
        {poolsSortOption ? (
          <PoolSortHeader
            direction={poolsSortOption.direction}
            id={poolsSortOption.id}
            subtext={poolsSortOption.subtext}
            text={poolsSortOption.text}
          />
        ) : null}
      </LeftBox>
      <MiddleBox>
        <FixedAPRBox>
          {fixedAPRSortOption ? (
            <PoolSortHeader
              direction={fixedAPRSortOption.direction}
              id={fixedAPRSortOption.id}
              subtext={fixedAPRSortOption.subtext}
              text={fixedAPRSortOption.text}
            />
          ) : null}
        </FixedAPRBox>
        <VariableAPYBox>
          {variableAPYSortOption ? (
            <PoolSortHeader
              direction={variableAPYSortOption.direction}
              id={variableAPYSortOption.id}
              subtext={variableAPYSortOption.subtext}
              text={variableAPYSortOption.text}
            />
          ) : null}
        </VariableAPYBox>
        <MaturityBox>
          {maturitySortOption ? (
            <PoolSortHeader
              direction={maturitySortOption.direction}
              id={maturitySortOption.id}
              subtext={maturitySortOption.subtext}
              text={maturitySortOption.text}
            />
          ) : null}
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
