import { PillSelector } from 'brokoli-ui';
import React from 'react';

import {
  fetchPortfolioMarginAccountsThunk,
  selectMarginAccountsLoading,
  selectMarginAccountsSortOptions,
} from '../../../../../app/features/portfolio';
import { MarginAccountSortId } from '../../../../../app/features/portfolio/types';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useWallet } from '../../../../../hooks/useWallet';

export const MarginAccountsSortOptions: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { account } = useWallet();

  const sortOptions = useAppSelector(selectMarginAccountsSortOptions);
  const loading = useAppSelector(selectMarginAccountsLoading);
  const activeSort = sortOptions.find((sO) => sO.direction !== 'noSort');
  const onSort = (id: string) => {
    if (!account) {
      return;
    }
    if (activeSort?.id === id) {
      return;
    }
    void dispatch(
      fetchPortfolioMarginAccountsThunk({
        account,
        sortId: id as MarginAccountSortId,
      }),
    );
  };
  return (
    <PillSelector
      activePillId={activeSort ? activeSort.id : ''}
      disabled={loading}
      pillOptions={sortOptions}
      variant="regular"
      onPillClick={onSort}
    />
  );
};
