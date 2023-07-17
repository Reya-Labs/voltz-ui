import { useEffect } from 'react';

import {
  selectLpFormPositionsFetchingStatus,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
  trackPageViewAction,
} from '../../../../../app/features/forms/lps/lp';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useAppSearchParams } from '../../../../../hooks/useAppSearchParams';
import { useWallet } from '../../../../../hooks/useWallet';

export const useLPFormOpened = () => {
  const dispatch = useAppDispatch();
  const positionsFetchingStatus = useAppSelector(selectLpFormPositionsFetchingStatus);
  const [queryFixedLower, queryFixedUpper] = useAppSearchParams(['fixedLower', 'fixedUpper']);
  const { account } = useWallet();

  useEffect(() => {
    if (positionsFetchingStatus !== 'success') {
      return;
    }
    if (!queryFixedLower || !queryFixedUpper) {
      return;
    }
    const fixedLower = parseFloat(queryFixedLower);
    const fixedUpper = parseFloat(queryFixedUpper);
    if (isNaN(fixedLower) || isNaN(fixedUpper)) {
      dispatch(
        trackPageViewAction({
          isEdit: false,
          account: account || '',
        }),
      );
      return;
    }

    dispatch(
      trackPageViewAction({
        isEdit: true,
        account: account || '',
      }),
    );
    dispatch(
      setUserInputFixedLowerAction({
        value: fixedLower,
      }),
    );
    dispatch(
      setUserInputFixedUpperAction({
        value: fixedUpper,
      }),
    );
  }, [dispatch, positionsFetchingStatus, queryFixedLower, queryFixedUpper]);
};
