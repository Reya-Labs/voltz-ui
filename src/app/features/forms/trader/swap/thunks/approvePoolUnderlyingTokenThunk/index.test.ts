import { rejectThunkWithError } from '../../../../../helpers';
import { approvePoolUnderlyingTokenService } from '../../../../common';
import { approvePoolUnderlyingTokenThunkHandler } from '.';

jest.mock('../../../../../helpers', () => ({
  rejectThunkWithError: jest.fn(),
}));

jest.mock('../../../../../../../utilities/amm', () => ({
  isV2AMM: jest.fn().mockReturnValue(false),
}));
jest.mock('../../../../common', () => ({
  approvePoolUnderlyingTokenService: jest.fn(),
}));

describe('approvePoolUnderlyingTokenThunk', () => {
  const getStateMock = jest.fn();
  const thunkAPIMock = { getState: getStateMock };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the result of approveUnderlyingToken', async () => {
    (approvePoolUnderlyingTokenService as jest.Mock).mockResolvedValue(123);
    getStateMock.mockReturnValue({ swapForm: { pool: {}, signer: true } });

    const result = await approvePoolUnderlyingTokenThunkHandler(
      null as never,
      thunkAPIMock as never,
    );

    expect(result).toBe(123);
    expect(approvePoolUnderlyingTokenService).toHaveBeenCalled();
    expect(getStateMock).toHaveBeenCalled();
  });

  it('should call rejectThunkWithError if there is an error', async () => {
    const error = new Error('test error');
    const rejectThunkWithErrorResult = { type: 'test' };
    (rejectThunkWithError as jest.MockedFunction<typeof rejectThunkWithError>).mockReturnValue(
      rejectThunkWithErrorResult,
    );
    (approvePoolUnderlyingTokenService as jest.Mock).mockRejectedValue(error);

    getStateMock.mockReturnValue({ swapForm: { pool: {}, signer: true } });

    const result = await approvePoolUnderlyingTokenThunkHandler(
      null as never,
      thunkAPIMock as never,
    );

    expect(result).toBe(rejectThunkWithErrorResult);
    expect(approvePoolUnderlyingTokenService).toHaveBeenCalled();
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkAPIMock, error);
    expect(getStateMock).toHaveBeenCalled();
  });
});
