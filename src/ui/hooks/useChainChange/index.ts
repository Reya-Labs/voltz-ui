import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import { selectReloadPageAfterChainChange, setChainId } from '../../../app/features/network';
import { useWallet } from '../useWallet';
import { handlePageReloadAfterChainChanged } from './handle-page-reload-after-chain-changed';

export const useChainChange = () => {
  const dispatch = useAppDispatch();
  const reloadPage = useAppSelector(selectReloadPageAfterChainChange);
  const { reconnect } = useWallet();
  const onChainChangedCallback = useCallback(
    (newChainId: string) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      setChainId(parseInt(newChainId.replace('0x', ''), 16).toString());
      if (reloadPage) {
        window.location.reload();
      } else {
        void reconnect('metamask');
      }
    },
    [reconnect, reloadPage],
  );

  useEffect(() => {
    void handlePageReloadAfterChainChanged(dispatch);
  }, [dispatch]);

  useEffect(() => {
    (
      window.ethereum as {
        on: (event: string, cb: (chainId: string) => void) => void;
      }
    )?.on('chainChanged', onChainChangedCallback);

    return () => {
      (
        window.ethereum as {
          removeListener: (event: string, cb: (chainId: string) => void) => void;
        }
      )?.removeListener('chainChanged', onChainChangedCallback);
    };
  }, [onChainChangedCallback]);
};
