import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ChainSelector as BrokoliChainSelector } from 'brokoli-ui';
import React, { useCallback, useEffect, useMemo } from 'react';

import { selectChainChangeState, selectChainId } from '../../../../app/features/network';
import { setChainIdThunk } from '../../../../app/features/network/thunks';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useWallet } from '../../../../hooks/useWallet';
import { setChainId } from '../../../../utilities/network/chain-store';
import { getChainOptions } from './get-chain-options';

export const ChainSelector: React.FunctionComponent = () => {
  const chainOptions = useMemo(() => getChainOptions(), []);
  const chainId = useAppSelector(selectChainId);
  const chainChangeState = useAppSelector(selectChainChangeState);
  const dispatch = useAppDispatch();
  const { signer } = useWallet();
  const isSignedIn = Boolean(signer);

  const handleOnChainChange = useCallback(
    (selectedChainId: SupportedChainId) => {
      void dispatch(
        setChainIdThunk({
          chainId: selectedChainId,
          isSupportedChain: true,
          triggerApprovalFlow: isSignedIn,
        }),
      );
    },
    [setChainIdThunk, isSignedIn],
  );
  useEffect(() => {
    if (!chainId) {
      return;
    }
    setChainId(chainId.toString());
  }, [chainId]);

  if (Object.keys(chainOptions).length === 0) {
    return null;
  }

  return (
    <BrokoliChainSelector
      approving={chainChangeState === 'pending'}
      chainOptions={chainOptions}
      selectedChainId={chainId!}
      onChainChange={handleOnChainChange}
    ></BrokoliChainSelector>
  );
};
