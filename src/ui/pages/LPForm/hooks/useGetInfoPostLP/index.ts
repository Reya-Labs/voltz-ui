import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  getInfoPostLpThunk,
  selectLpFormAMM,
  selectLpFormSelectedPosition,
} from '../../../../../app/features/forms/lps/lp';

export const useGetInfoPostLP = () => {
  const dispatch = useAppDispatch();
  const aMM = useAppSelector(selectLpFormAMM);
  const selectedPosition = useAppSelector(selectLpFormSelectedPosition);

  useEffect(() => {
    if (!aMM || !aMM.signer) {
      return;
    }
    void dispatch(getInfoPostLpThunk());
  }, [dispatch, aMM, aMM?.signer, selectedPosition]);
};
