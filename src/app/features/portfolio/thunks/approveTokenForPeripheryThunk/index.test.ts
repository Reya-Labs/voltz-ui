import { approveTokenForPeripheryService } from '../../../forms/common';
import { rejectThunkWithError } from '../../../helpers';
import { approveTokenForPeripheryThunkHandler } from './index';

jest.mock('../../../helpers');
jest.mock('../../../forms/common');

describe('approveTokenForPeripheryThunk', () => {
  const thunkAPIMock = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the result of approveUnderlyingToken', async () => {
    (approveTokenForPeripheryService as jest.Mock).mockResolvedValue(123);

    const result = await approveTokenForPeripheryThunkHandler(
      {
        signer: jest.fn(),
        tokenName: 'eth',
      } as never,
      thunkAPIMock as never,
    );

    expect(result).toBe(123);
    expect(approveTokenForPeripheryService).toHaveBeenCalled();
  });

  it('should call rejectThunkWithError if there is an error', async () => {
    const error = new Error('test error');
    const rejectThunkWithErrorResult = { type: 'test' };
    (rejectThunkWithError as jest.MockedFunction<typeof rejectThunkWithError>).mockReturnValue(
      rejectThunkWithErrorResult,
    );
    (approveTokenForPeripheryService as jest.Mock).mockRejectedValue(error);

    const result = await approveTokenForPeripheryThunkHandler(
      {
        signer: jest.fn(),
        tokenName: 'eth',
      } as never,
      thunkAPIMock as never,
    );

    expect(result).toBe(rejectThunkWithErrorResult);
    expect(approveTokenForPeripheryService).toHaveBeenCalled();
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkAPIMock, error);
  });
});
