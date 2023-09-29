import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import {
  fetchMarginAccountsForSelectionThunk,
  selectMarginAccountsForSelectionLoading,
  selectMarginAccountsForSelectionMarginAccounts,
} from '../../../app/features/portfolio';
import { MarginAccountUI } from '../../../app/features/portfolio/types';
import { useWallet } from '../useWallet';

type UseMarginAccountsForSelectionResult = {
  marginAccounts: MarginAccountUI[];
  loading: boolean;
};
export const useMarginAccountsForSelection = (): UseMarginAccountsForSelectionResult => {
  const { account } = useWallet();
  const dispatch = useAppDispatch();
  const marginAccounts = useAppSelector(selectMarginAccountsForSelectionMarginAccounts);
  const loading = useAppSelector(selectMarginAccountsForSelectionLoading);

  useEffect(() => {
    if (!account) {
      return;
    }

    void dispatch(
      fetchMarginAccountsForSelectionThunk({
        account,
      }),
    );
  }, [dispatch, account]);

  return {
    marginAccounts,
    loading,
  };
};
