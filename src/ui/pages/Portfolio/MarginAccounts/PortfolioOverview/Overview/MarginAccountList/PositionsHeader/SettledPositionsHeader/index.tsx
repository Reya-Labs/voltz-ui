import React from 'react';

import {
  selectPositionsLoading,
  selectPositionsSortOptions,
  togglePositionSortingDirectionAction,
} from '../../../../../../../../../app/features/portfolio';
import { PositionSortId } from '../../../../../../../../../app/features/portfolio/types';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../app/hooks';
import { SortHeader } from '../../../../../../../../components/SortHeader';
import {
  LeftBox,
  MaturityBox,
  PositionsHeaderBox,
  RightBox,
  StatusBox,
} from '../PositionsHeader.styled';

export const SettledPositionsHeader: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const sortOptions = useAppSelector(selectPositionsSortOptions);
  const nameSortOption = sortOptions.find((o) => o.id === 'name');
  const maturitySortOption = sortOptions.find((o) => o.id === 'maturity');
  const statusSortOption = sortOptions.find((o) => o.id === 'status');
  const loading = useAppSelector(selectPositionsLoading);
  const onSort = (id: PositionSortId) => () => {
    dispatch(
      togglePositionSortingDirectionAction({
        sortId: id,
      }),
    );
  };

  return (
    <PositionsHeaderBox>
      <LeftBox>
        {nameSortOption ? (
          <SortHeader
            direction={nameSortOption.direction}
            disabled={nameSortOption.disabled}
            loading={loading}
            subtext={nameSortOption.subtext}
            text={nameSortOption.text}
            onClick={onSort(nameSortOption.id)}
          />
        ) : null}
      </LeftBox>
      <RightBox>
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
        <StatusBox variant="small">
          {statusSortOption ? (
            <SortHeader
              direction={statusSortOption.direction}
              disabled={statusSortOption.disabled}
              loading={loading}
              subtext={statusSortOption.subtext}
              text={statusSortOption.text}
              onClick={onSort(statusSortOption.id)}
            />
          ) : null}
        </StatusBox>
      </RightBox>
    </PositionsHeaderBox>
  );
};
