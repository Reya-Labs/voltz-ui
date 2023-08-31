import React from 'react';
import { useParams } from 'react-router-dom';

import {
  selectMarginAccountPositionsLoading,
  selectMarginAccountPositionsSortOptions,
  toggleMarginAccountPositionsSortingDirectionAction,
} from '../../../../../../../app/features/portfolio';
import { PositionSortId } from '../../../../../../../app/features/portfolio/types';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { SortHeader } from '../../../../../../components/SortHeader';
import {
  LeftBox,
  MarginBox,
  MaturityBox,
  PositionsHeaderBox,
  RealizedPNLBox,
  RightBox,
  StatusBox,
} from '../PositionsHeader.styled';

export const MaturedPositionsHeader: React.FunctionComponent = () => {
  const { marginAccountId } = useParams();
  const dispatch = useAppDispatch();
  const sortOptions = useAppSelector(selectMarginAccountPositionsSortOptions(marginAccountId));
  const marginSortOption = sortOptions.find((o) => o.id === 'margin');
  const nameSortOption = sortOptions.find((o) => o.id === 'name');
  const maturitySortOption = sortOptions.find((o) => o.id === 'maturity');
  const statusSortOption = sortOptions.find((o) => o.id === 'status');
  const realizedPNLSortOption = sortOptions.find((o) => o.id === 'realizedPNL');
  const loading = useAppSelector(selectMarginAccountPositionsLoading(marginAccountId));
  const onSort = (id: PositionSortId) => () => {
    dispatch(
      toggleMarginAccountPositionsSortingDirectionAction({
        sortId: id,
        marginAccountId,
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
        <MarginBox>
          {marginSortOption ? (
            <SortHeader
              direction={marginSortOption.direction}
              disabled={marginSortOption.disabled}
              loading={loading}
              subtext={marginSortOption.subtext}
              text={marginSortOption.text}
              onClick={onSort(marginSortOption.id)}
            />
          ) : null}
        </MarginBox>
        <RealizedPNLBox>
          {realizedPNLSortOption ? (
            <SortHeader
              direction={realizedPNLSortOption.direction}
              disabled={realizedPNLSortOption.disabled}
              loading={loading}
              subtext={realizedPNLSortOption.subtext}
              text={realizedPNLSortOption.text}
              onClick={onSort(realizedPNLSortOption.id)}
            />
          ) : null}
        </RealizedPNLBox>
      </RightBox>
    </PositionsHeaderBox>
  );
};
