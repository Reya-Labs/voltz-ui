import { getPositions, Position } from '@voltz-protocol/v1-sdk';

import { findCurrentPosition } from '../../../../../../../utilities/amm';
import { isBorrowingPosition } from '../../../../../../../utilities/borrowAmm';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { pushPageViewEvent } from '../../analytics';
import { setSignerAndPositionForAMMThunkHandler } from './index';

// Mock dependencies
jest.mock('../../../../../helpers/reject-thunk-with-error', () => ({
  rejectThunkWithError: jest.fn(),
}));

jest.mock('../../../../../../../utilities/amm', () => ({
  findCurrentPosition: jest.fn(),
}));

jest.mock('../../../../../../../utilities/borrowAmm', () => ({
  isBorrowingPosition: jest.fn(),
}));

jest.mock('../../analytics', () => ({
  pushPageViewEvent: jest.fn(),
}));

jest.mock('@voltz-protocol/v1-sdk', () => ({
  getPositions: jest.fn(),
}));

describe('setSignerAndPositionForAMMThunkHandler', () => {
  const getState = () => ({
    swapForm: {
      amm: {
        id: '0x123',
      },
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return early if amm is falsy', async () => {
    // Call function and assert
    const result = await setSignerAndPositionForAMMThunkHandler(
      { signer: {}, chainId: 1 } as never,
      {
        getState: () => ({
          swapForm: {
            amm: null,
          },
        }),
      } as never,
    );
    expect(result).toEqual({ signer: null, position: null });
  });

  it('should return early if signer is falsy', async () => {
    // Call function and assert
    const result = await setSignerAndPositionForAMMThunkHandler({ signer: null, chainId: 1 }, {
      getState,
    } as never);
    expect(pushPageViewEvent).toHaveBeenCalledWith({ account: '', isEdit: false });
    expect(result).toEqual({ signer: null, position: null });
  });

  it('should call getPositions and pushPageViewEvent', async () => {
    // Mock dependencies
    const positions: Position[] = [
      { id: '1', liquidity: 100 },
      { id: '2', liquidity: 200 },
    ] as never;
    const signer = { getAddress: jest.fn().mockResolvedValue('0xabc') };
    const getPositionsResult = { positions, error: null };
    (getPositions as jest.Mock).mockResolvedValue(getPositionsResult);
    (findCurrentPosition as jest.Mock).mockReturnValue(positions[0]);
    (isBorrowingPosition as jest.Mock).mockReturnValue(false);

    // Call function and assert
    const result = await setSignerAndPositionForAMMThunkHandler(
      { signer, chainId: 1 } as never,
      { getState } as never,
    );
    expect(getPositions).toHaveBeenCalledWith({
      chainId: 1,
      userWalletId: '0xabc',
      amms: [{ id: '0x123' }],
      type: 'Trader',
    });
    expect(pushPageViewEvent).toHaveBeenCalledWith({ account: '0xabc', isEdit: true });
    expect(result).toEqual({ signer, position: positions[0] });
  });

  it('should call rejectThunkWithError on error', async () => {
    // Mock dependencies
    const error = new Error('oops');
    const rejectThunkWithErrorResult = { error: true };
    (rejectThunkWithError as jest.Mock).mockReturnValue(rejectThunkWithErrorResult);
    (getPositions as jest.Mock).mockResolvedValue({ positions: [], error });

    // Call function and assert
    const result = await setSignerAndPositionForAMMThunkHandler(
      {
        signer: {
          getAddress: () => '',
        },
        chainId: 1,
      } as never,
      { getState } as never,
    );
    expect(rejectThunkWithError).toHaveBeenCalledWith({ getState }, error);
    expect(result).toEqual(rejectThunkWithErrorResult);
  });
});
