import { renderHook } from '@testing-library/react-hooks';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import { getInfoPostLpThunk } from '../../../../../app/features/forms/lps/lp';
import { useGetInfoPostLP } from '.';

jest.mock('../../../../../app/features/forms/lps/lp', () => ({
  getInfoPostLpThunk: jest.fn(),
}));

jest.mock('../../../../../app/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('useGetInfoPostLP', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should dispatch getInfoPostLpThunk when aMM and aMM.signer are defined', () => {
    const dispatchMock = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useAppSelector as jest.Mock)
      .mockReturnValueOnce({ signer: 'exampleSigner' }) // for aMM
      .mockReturnValueOnce('examplePosition'); // for selectedPosition

    renderHook(() => useGetInfoPostLP());

    expect(dispatchMock).toHaveBeenCalledWith(getInfoPostLpThunk());
  });

  it('should not dispatch getInfoPostLpThunk when aMM or aMM.signer is undefined', () => {
    const dispatchMock = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useAppSelector as jest.Mock)
      .mockReturnValueOnce(null) // for aMM
      .mockReturnValueOnce('examplePosition'); // for selectedPosition

    renderHook(() => useGetInfoPostLP());

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should dispatch getInfoPostLpThunk when selectedPosition changes', () => {
    const dispatchMock = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useAppSelector as jest.Mock)
      .mockReturnValueOnce({ signer: 'exampleSigner' }) // for aMM
      .mockReturnValueOnce('initialPosition'); // for selectedPosition

    const { rerender } = renderHook(() => useGetInfoPostLP());

    (useAppSelector as jest.Mock)
      .mockReturnValueOnce({ signer: 'exampleSigner' }) // for aMM
      .mockReturnValueOnce('newPosition'); // for selectedPosition

    rerender();

    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });
});
