import React from 'react';

import { selectPoolSortOptions } from '../../../../../app/features/aMMs';
import { useAppSelector } from '../../../../../app/hooks';
import {
  FixedAPRBox,
  LeftBox,
  MaturityBox,
  MiddleBox,
  PositionsHeaderBox,
  RightBox,
  VariableAPYBox,
} from './PositionsHeader.styled';
import { PositionSortHeader } from './PositionsSortHeader';

export const PositionsHeader: React.FunctionComponent = () => {
  const sortOptions = useAppSelector(selectPoolSortOptions);
  const poolsSortOption = sortOptions.find((o) => o.id === 'pools');
  const fixedAPRSortOption = sortOptions.find((o) => o.id === 'fixedAPR');
  const variableAPYSortOption = sortOptions.find((o) => o.id === 'variableAPY');
  const maturitySortOption = sortOptions.find((o) => o.id === 'maturity');

  return (
    <PositionsHeaderBox>
      <LeftBox>
        {poolsSortOption ? (
          <PositionSortHeader
            direction={poolsSortOption.direction}
            disabled={poolsSortOption.disabled}
            id={poolsSortOption.id}
            subtext={poolsSortOption.subtext}
            text={poolsSortOption.text}
          />
        ) : null}
      </LeftBox>
      <MiddleBox>
        <FixedAPRBox>
          {fixedAPRSortOption ? (
            <PositionSortHeader
              direction={fixedAPRSortOption.direction}
              disabled={fixedAPRSortOption.disabled}
              id={fixedAPRSortOption.id}
              subtext={fixedAPRSortOption.subtext}
              text={fixedAPRSortOption.text}
            />
          ) : null}
        </FixedAPRBox>
        <VariableAPYBox>
          {variableAPYSortOption ? (
            <PositionSortHeader
              direction={variableAPYSortOption.direction}
              disabled={variableAPYSortOption.disabled}
              id={variableAPYSortOption.id}
              subtext={variableAPYSortOption.subtext}
              text={variableAPYSortOption.text}
            />
          ) : null}
        </VariableAPYBox>
        <MaturityBox>
          {maturitySortOption ? (
            <PositionSortHeader
              direction={maturitySortOption.direction}
              disabled={maturitySortOption.disabled}
              id={maturitySortOption.id}
              subtext={maturitySortOption.subtext}
              text={maturitySortOption.text}
            />
          ) : null}
        </MaturityBox>
      </MiddleBox>
      <RightBox />
    </PositionsHeaderBox>
  );
};
