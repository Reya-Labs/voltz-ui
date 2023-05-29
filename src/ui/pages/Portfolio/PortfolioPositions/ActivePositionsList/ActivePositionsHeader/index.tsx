import React from 'react';

import {
  selectPositionsLoading,
  selectPositionsSortOptions,
  togglePositionSortingDirectionAction,
} from '../../../../../../app/features/portfolio';
import { PositionSortId } from '../../../../../../app/features/portfolio/types';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { SortHeader } from '../../../../../components/SortHeader';
import {
  ActivePositionsHeaderBox,
  LeftBox,
  MarginBox,
  MaturityBox,
  NotionalBox,
  RealizedPNLBox,
  StatusBox,
  UnrealizedPNLBox,
} from './ActivePositionsHeader.styled';

export const ActivePositionsHeader: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const sortOptions = useAppSelector(selectPositionsSortOptions);
  const marginSortOption = sortOptions.find((o) => o.id === 'margin');
  const notionalSortOption = sortOptions.find((o) => o.id === 'notional');
  const nameSortOption = sortOptions.find((o) => o.id === 'name');
  const maturitySortOption = sortOptions.find((o) => o.id === 'maturity');
  const statusSortOption = sortOptions.find((o) => o.id === 'status');
  const realizedPNLSortOption = sortOptions.find((o) => o.id === 'realizedPNL');
  const unrealizedPNLSortOption = sortOptions.find((o) => o.id === 'unrealizedPNL');
  const loading = useAppSelector(selectPositionsLoading);
  const onSort = (id: PositionSortId) => () => {
    dispatch(
      togglePositionSortingDirectionAction({
        sortId: id,
      }),
    );
  };

  return (
    <ActivePositionsHeaderBox>
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
      <NotionalBox>
        {notionalSortOption ? (
          <SortHeader
            direction={notionalSortOption.direction}
            disabled={notionalSortOption.disabled}
            loading={loading}
            subtext={notionalSortOption.subtext}
            text={notionalSortOption.text}
            onClick={onSort(notionalSortOption.id)}
          />
        ) : null}
      </NotionalBox>
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
      <StatusBox>
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
      <UnrealizedPNLBox>
        {unrealizedPNLSortOption ? (
          <SortHeader
            direction={unrealizedPNLSortOption.direction}
            disabled={unrealizedPNLSortOption.disabled}
            loading={loading}
            subtext={unrealizedPNLSortOption.subtext}
            text={unrealizedPNLSortOption.text}
            onClick={onSort(unrealizedPNLSortOption.id)}
          />
        ) : null}
      </UnrealizedPNLBox>
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
    </ActivePositionsHeaderBox>
  );
};
