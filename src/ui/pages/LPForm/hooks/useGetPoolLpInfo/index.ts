import { useEffect } from 'react';

import {
  getPoolLpInfoThunk,
  selectLpFormAMM,
  selectUserInputFixedLower,
  selectUserInputFixedUpper,
} from '../../../../../app/features/forms/lps/lp';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';

export const useGetPoolLpInfo = () => {
  const dispatch = useAppDispatch();
  const aMM = useAppSelector(selectLpFormAMM);
  const fixedRateLower = useAppSelector(selectUserInputFixedLower);
  const fixedRateUpper = useAppSelector(selectUserInputFixedUpper);

  useEffect(() => {
    if (!aMM) {
      return;
    }
    void dispatch(getPoolLpInfoThunk());
  }, [dispatch, aMM, fixedRateLower, fixedRateUpper]);
};
