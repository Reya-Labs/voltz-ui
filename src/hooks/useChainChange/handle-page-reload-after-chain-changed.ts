import {
  deleteChainId,
  detectIfNetworkSupported,
  getChainId,
  getDefaultChainId,
  setChainIdThunk,
} from '../../app/features/network';
import { useAppDispatch } from '../../app/hooks';

export const handlePageReloadAfterChainChanged = async (
  dispatch: ReturnType<typeof useAppDispatch>,
) => {
  const storedChainId = getChainId();
  if (!storedChainId) {
    const defaultChainId = getDefaultChainId();
    await dispatch(
      setChainIdThunk({
        chainId: defaultChainId,
        isSupportedChain: Boolean(defaultChainId),
        triggerApprovalFlow: false,
        reloadPage: true,
      }),
    );
    return;
  }

  const networkValidation = detectIfNetworkSupported(storedChainId);
  if (!networkValidation.isSupported || !networkValidation.chainId) {
    await dispatch(
      setChainIdThunk({
        chainId: getDefaultChainId(),
        isSupportedChain: false,
        triggerApprovalFlow: false,
        reloadPage: true,
      }),
    );
  } else {
    await dispatch(
      setChainIdThunk({
        chainId: networkValidation.chainId,
        isSupportedChain: true,
        triggerApprovalFlow: false,
        reloadPage: true,
      }),
    );
  }
  deleteChainId();
};
