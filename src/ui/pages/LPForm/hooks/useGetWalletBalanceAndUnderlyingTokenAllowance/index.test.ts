import { renderHook } from '@testing-library/react-hooks';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import {
  getUnderlyingTokenAllowanceThunk,
  getWalletBalanceThunk,
} from '../../../../../app/features/forms/lps/lp';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useAMMs } from '../../../../hooks/useAMMs';
import { useGetWalletBalanceAndUnderlyingTokenAllowance } from '.';

jest.mock('../../../../../app/features/forms/lps/lp', () => ({
  getWalletBalanceThunk: jest.fn(),
  getUnderlyingTokenAllowanceThunk: jest.fn(),
}));

jest.mock('../../../../../app/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../../../../hooks/useAMMs', () => ({
  useAMMs: jest.fn(),
}));

describe('useGetWalletBalanceAndUnderlyingTokenAllowance', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test.each([
    [null, null, null, null, false],
    [{ signer: 'someSigner' }, SupportedChainId.mainnet, false, true, false],
    [{ signer: 'someSigner' }, SupportedChainId.mainnet, true, false, false],
    [{ signer: 'someSigner' }, SupportedChainId.mainnet, false, false, true],
  ])(
    'given aMM=%p, chainId=%p, loading=%p, error=%p arguments, the truth when calling getWalletBalanceThunk and getUnderlyingTokenAllowanceThunk is %p',
    (aMM, chainId, error, loading, expected) => {
      const dispatchMock = jest.fn();

      (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
      (useAMMs as jest.Mock).mockReturnValue({
        loading,
        error,
      });
      (useAppSelector as jest.Mock)
        .mockReturnValueOnce({ signer: 'exampleSigner' }) // for selectLpFormAMM
        .mockReturnValueOnce(chainId); // for selectChainId

      renderHook(() => useGetWalletBalanceAndUnderlyingTokenAllowance());
      if (expected) {
        expect(dispatchMock).toHaveBeenCalledWith(getWalletBalanceThunk());
        expect(dispatchMock).toHaveBeenCalledWith(
          getUnderlyingTokenAllowanceThunk({
            chainId,
          } as never),
        );
      } else {
        expect(dispatchMock).not.toHaveBeenCalled();
      }
    },
  );
});
