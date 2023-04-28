import { setChainIdThunk } from '../../app/features/network';
import { useAppDispatch } from '../../app/hooks';
import { getDefaultChainId } from '../../components/interface/NetworkSelector/get-default-chain-id';
import { deleteChainId, getChainId } from '../../utilities/network/chain-store';
import { detectIfNetworkSupported } from '../../utilities/network/detect-if-network-supported';

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
      }),
    );
  } else {
    await dispatch(
      setChainIdThunk({
        chainId: networkValidation.chainId,
        isSupportedChain: true,
        triggerApprovalFlow: false,
      }),
    );
  }
  deleteChainId();
};
