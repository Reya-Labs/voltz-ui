import { Tokens } from '@voltz-protocol/api-sdk-v2';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import {
  fetchMarginAccountsForSwapLPThunk,
  MarginAccountForSwapLP,
  MarginAccountForSwapLPUI,
  selectMarginAccountsForSwapLPError,
  selectMarginAccountsForSwapLPLoading,
  selectMarginAccountsForSwapLPMarginAccounts,
  selectMarginAccountsForSwapLPMarginAccountsUI,
} from '../../../app/features/margin-accounts-for-swap-lp';
import { useWallet } from '../useWallet';

type UseMarginAccountsForSelectionResult = {
  marginAccountsUI: MarginAccountForSwapLPUI[];
  marginAccounts: MarginAccountForSwapLP[];
  loading: boolean;
  error: boolean;
};

export const useMarginAccountsForSwapLP = (
  poolId: string | undefined,
  poolToken: Tokens | undefined,
): UseMarginAccountsForSelectionResult => {
  const { account } = useWallet();
  const dispatch = useAppDispatch();
  const marginAccountsUI = useAppSelector(selectMarginAccountsForSwapLPMarginAccountsUI);
  const marginAccounts = useAppSelector(selectMarginAccountsForSwapLPMarginAccounts);
  const loading = useAppSelector(selectMarginAccountsForSwapLPLoading);
  const error = useAppSelector(selectMarginAccountsForSwapLPError);

  useEffect(() => {
    if (!account || !poolId || !poolToken) {
      return;
    }

    void dispatch(
      fetchMarginAccountsForSwapLPThunk({
        account,
        poolId,
        poolToken,
      }),
    );
  }, [dispatch, poolId, poolToken, account]);

  return {
    marginAccountsUI,
    marginAccounts,
    loading,
    error,
  };
};
