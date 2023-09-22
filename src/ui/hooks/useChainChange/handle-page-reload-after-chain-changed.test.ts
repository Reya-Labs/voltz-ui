import {
  deleteChainId,
  detectIfNetworkSupported,
  getChainId,
  getDefaultChainId,
  setChainIdThunk,
} from '../../../app/features/network';
import { useAppDispatch } from '../../../app/hooks';
import { handlePageReloadAfterChainChanged } from './handle-page-reload-after-chain-changed';

// Mock setChainIdThunk
jest.mock('../../../app/features/network', () => ({
  setChainIdThunk: jest.fn(),
  getChainId: jest.fn(),
  deleteChainId: jest.fn(),
  detectIfNetworkSupported: jest.fn(),
  getDefaultChainId: jest.fn(),
}));

// Mock useAppDispatch
jest.mock('../../../app/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

describe('handlePageReloadAfterChainChanged', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should set default chain id when no chain id is stored', async () => {
    (getChainId as jest.Mock).mockReturnValue(null);
    (getDefaultChainId as jest.Mock).mockReturnValue(1);

    await handlePageReloadAfterChainChanged(mockDispatch);

    expect(getChainId).toHaveBeenCalled();
    expect(getDefaultChainId).toHaveBeenCalled();
    expect(setChainIdThunk).toHaveBeenCalledWith({
      chainId: 1,
      isSupportedChain: true,
      triggerApprovalFlow: false,
      reloadPage: true,
    });
  });

  it('should set default chain id when stored chain id is not supported', async () => {
    (getChainId as jest.Mock).mockReturnValue(2);
    (detectIfNetworkSupported as jest.Mock).mockReturnValue({
      isSupported: false,
      chainId: null,
    });
    (getDefaultChainId as jest.Mock).mockReturnValue(1);

    await handlePageReloadAfterChainChanged(mockDispatch);

    expect(getChainId).toHaveBeenCalled();
    expect(detectIfNetworkSupported).toHaveBeenCalledWith(2);
    expect(getDefaultChainId).toHaveBeenCalled();
    expect(setChainIdThunk).toHaveBeenCalledWith({
      chainId: 1,
      isSupportedChain: false,
      triggerApprovalFlow: false,
      reloadPage: true,
    });
    expect(deleteChainId).toHaveBeenCalled();
  });

  it('should set stored chain id when it is supported', async () => {
    (getChainId as jest.Mock).mockReturnValue(3);
    (detectIfNetworkSupported as jest.Mock).mockReturnValue({
      isSupported: true,
      chainId: 3,
    });

    await handlePageReloadAfterChainChanged(mockDispatch);

    expect(getChainId).toHaveBeenCalled();
    expect(detectIfNetworkSupported).toHaveBeenCalledWith(3);
    expect(setChainIdThunk).toHaveBeenCalledWith({
      chainId: 3,
      isSupportedChain: true,
      triggerApprovalFlow: false,
      reloadPage: true,
    });
    expect(deleteChainId).toHaveBeenCalled();
  });
});
