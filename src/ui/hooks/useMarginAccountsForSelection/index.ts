import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import {
  fetchMarginAccountsForSelectionThunk,
  PortfolioMarginAccount,
  selectMarginAccountsForSelectionError,
  selectMarginAccountsForSelectionLoading,
  selectMarginAccountsForSelectionMarginAccounts,
  selectMarginAccountsForSelectionMarginAccountsUI,
} from '../../../app/features/portfolio';
import { MarginAccountUI } from '../../../app/features/portfolio/types';
import { useWallet } from '../useWallet';

type UseMarginAccountsForSelectionResult = {
  marginAccountsUI: MarginAccountUI[];
  marginAccounts: PortfolioMarginAccount[];
  loading: boolean;
  error: boolean;
};

export const useMarginAccountsForSelection = (): UseMarginAccountsForSelectionResult => {
  const { account } = useWallet();
  const dispatch = useAppDispatch();
  const marginAccountsUI = useAppSelector(selectMarginAccountsForSelectionMarginAccountsUI);
  const marginAccounts = useAppSelector(selectMarginAccountsForSelectionMarginAccounts);
  const loading = useAppSelector(selectMarginAccountsForSelectionLoading);
  const error = useAppSelector(selectMarginAccountsForSelectionError);

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
    marginAccountsUI,
    marginAccounts,
    loading,
    error,
  };
};
