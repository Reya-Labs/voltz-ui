import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../../app';
import {
  selectPoolSortOptions,
  selectV1V2PoolsLoading,
  togglePoolSortingDirectionAction,
} from '../../../../../../app/features/aMMs';
import { PoolSortId } from '../../../../../../app/features/aMMs/types';
import { SortHeader } from '../../../../../components/SortHeader';
import {
  FixedAPRBox,
  LeftBox,
  MaturityBox,
  MiddleBox,
  PoolsHeaderBox,
  RightBox,
  VariableAPYBox,
} from './PoolsHeader.styled';

export const PoolsHeader: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const sortOptions = useAppSelector(selectPoolSortOptions);
  const poolsSortOption = sortOptions.find((o) => o.id === 'pools');
  const fixedAPRSortOption = sortOptions.find((o) => o.id === 'fixedAPR');
  const variableAPYSortOption = sortOptions.find((o) => o.id === 'variableAPY');
  const maturitySortOption = sortOptions.find((o) => o.id === 'maturity');
  const loading = useAppSelector(selectV1V2PoolsLoading);
  const onSort = (id: PoolSortId) => () => {
    dispatch(
      togglePoolSortingDirectionAction({
        sortId: id,
      }),
    );
  };

  return (
    <PoolsHeaderBox>
      <LeftBox>
        {poolsSortOption ? (
          <SortHeader
            direction={poolsSortOption.direction}
            disabled={poolsSortOption.disabled}
            loading={loading}
            subtext={poolsSortOption.subtext}
            text={poolsSortOption.text}
            onClick={onSort(poolsSortOption.id)}
          />
        ) : null}
      </LeftBox>
      <MiddleBox>
        <FixedAPRBox>
          {fixedAPRSortOption ? (
            <SortHeader
              direction={fixedAPRSortOption.direction}
              disabled={fixedAPRSortOption.disabled}
              loading={loading}
              subtext={fixedAPRSortOption.subtext}
              text={fixedAPRSortOption.text}
              onClick={onSort(fixedAPRSortOption.id)}
            />
          ) : null}
        </FixedAPRBox>
        <VariableAPYBox>
          {variableAPYSortOption ? (
            <SortHeader
              direction={variableAPYSortOption.direction}
              disabled={variableAPYSortOption.disabled}
              loading={loading}
              subtext={variableAPYSortOption.subtext}
              text={variableAPYSortOption.text}
              onClick={onSort(variableAPYSortOption.id)}
            />
          ) : null}
        </VariableAPYBox>
        <MaturityBox>
          {maturitySortOption ? (
            <SortHeader
              direction={maturitySortOption.direction}
              disabled={maturitySortOption.disabled}
              loading={loading}
              subtext={maturitySortOption.subtext}
              text={maturitySortOption.text}
              onClick={onSort(maturitySortOption.id)}
            />
          ) : null}
        </MaturityBox>
      </MiddleBox>
      <RightBox />
    </PoolsHeaderBox>
  );
};
