import { useEffect } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { setChainId } from '../../utilities/network/chain-store';
import { handlePageReloadAfterChainChanged } from './handle-page-reload-after-chain-changed';

export const useChainChange = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void handlePageReloadAfterChainChanged(dispatch);
    (
      window.ethereum as {
        on: (event: string, cb: (chainId: string) => void) => void;
      }
    )?.on('chainChanged', (newChainId: string) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      setChainId(parseInt(newChainId.replace('0x', ''), 16).toString());
      window.location.reload();
    });
  }, [dispatch]);
};
