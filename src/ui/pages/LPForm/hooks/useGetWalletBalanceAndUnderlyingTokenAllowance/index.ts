import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  getUnderlyingTokenAllowanceThunk,
  getWalletBalanceThunk,
  selectLpFormAMM,
} from '../../../../../app/features/forms/lps/lp';
import { selectChainId } from '../../../../../app/features/network';
import { useAMMs } from '../../../../hooks/useAMMs';

export const useGetWalletBalanceAndUnderlyingTokenAllowance = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAMMs();
  const aMM = useAppSelector(selectLpFormAMM);
  const chainId = useAppSelector(selectChainId);

  useEffect(() => {
    if (!aMM || !aMM.signer || !chainId || loading || error) {
      return;
    }

    void dispatch(getWalletBalanceThunk());
    void dispatch(getUnderlyingTokenAllowanceThunk({ chainId }));
  }, [dispatch, aMM, loading, aMM?.signer, chainId, error]);
};
