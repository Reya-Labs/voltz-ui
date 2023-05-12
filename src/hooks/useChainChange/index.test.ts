import { renderHook } from '@testing-library/react-hooks';

import { setChainId } from '../../app/features/network';
import { useAppDispatch } from '../../app/hooks';
import { useChainChange } from '.';
import { handlePageReloadAfterChainChanged } from './handle-page-reload-after-chain-changed';

// Mock handlePageReloadAfterChainChanged and setChainId
jest.mock('./handle-page-reload-after-chain-changed', () => ({
  handlePageReloadAfterChainChanged: jest.fn(),
}));

jest.mock('../../app/features/network', () => ({
  setChainId: jest.fn(),
}));

jest.mock('../../app/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

describe('useChainChange', () => {
  const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: original });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call handlePageReloadAfterChainChanged and setChainId on mount', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    renderHook(() => useChainChange());

    expect(handlePageReloadAfterChainChanged).toHaveBeenCalledWith(mockDispatch);
    expect(setChainId).not.toHaveBeenCalled();
  });

  it('should set the chain ID and reload the page on chainChanged event', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const mockWindowEthereum: {
      on: jest.Mock;
    } = {
      on: jest.fn(),
    };
    const originalWindowEthereum = window.ethereum;
    window.ethereum = mockWindowEthereum as never;
    renderHook(() => useChainChange());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    mockWindowEthereum.on.mock.calls[0][1]('0x1');

    expect(setChainId).toHaveBeenCalledWith('1');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(window.location.reload).toHaveBeenCalled();

    window.ethereum = originalWindowEthereum;
  });
});
