import { useEffect } from 'react';

import {
  selectLpFormAMM,
  setSignerAndGetPositionsForLPThunk,
} from '../../../../../app/features/forms/lps/lp';
import { selectChainId } from '../../../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useAMMs } from '../../../../hooks/useAMMs';
import { useWallet } from '../../../../hooks/useWallet';

export const useSetSignerAndGetPositionsForLP = () => {
  const dispatch = useAppDispatch();
  const aMM = useAppSelector(selectLpFormAMM);
  const { signer } = useWallet();
  const { loading, error } = useAMMs();
  const chainId = useAppSelector(selectChainId);

  useEffect(() => {
    if (!aMM || !chainId || error || loading) {
      return;
    }
    void dispatch(
      setSignerAndGetPositionsForLPThunk({
        signer,
        chainId,
      }),
    );
  }, [aMM, dispatch, loading, error, chainId, signer]);
};
