import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import { approveUnderlyingTokenThunkHandler } from '.';

jest.mock('../../../../helpers/reject-thunk-with-error', () => ({
  rejectThunkWithError: jest.fn(),
}));

describe('approveUnderlyingTokenThunkHandler', () => {
  const getStateMock = jest.fn();
  const thunkAPIMock = { getState: getStateMock };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the result of amm.approveUnderlyingTokenForPeripheryV1', async () => {
    const approveUnderlyingTokenForPeripheryV1Mock = jest.fn().mockResolvedValue(123);

    const amm = {
      signer: true,
      approveUnderlyingTokenForPeripheryV1: approveUnderlyingTokenForPeripheryV1Mock,
    };
    getStateMock.mockReturnValue({ rolloverSwapForm: { amm } });

    const result = await approveUnderlyingTokenThunkHandler(null as never, thunkAPIMock as never);

    expect(result).toBe(123);
    expect(approveUnderlyingTokenForPeripheryV1Mock).toHaveBeenCalled();
    expect(getStateMock).toHaveBeenCalled();
  });

  it('should call rejectThunkWithError if there is an error', async () => {
    const error = new Error('test error');
    const rejectThunkWithErrorResult = { type: 'test' };
    (rejectThunkWithError as jest.MockedFunction<typeof rejectThunkWithError>).mockReturnValue(
      rejectThunkWithErrorResult,
    );

    const amm = {
      signer: true,
      approveUnderlyingTokenForPeripheryV1: jest.fn().mockRejectedValue(error),
    };
    getStateMock.mockReturnValue({ rolloverSwapForm: { amm } });

    const result = await approveUnderlyingTokenThunkHandler(null as never, thunkAPIMock as never);

    expect(result).toBe(rejectThunkWithErrorResult);
    expect(rejectThunkWithError).toHaveBeenCalledWith(thunkAPIMock, error);
    expect(getStateMock).toHaveBeenCalled();
  });

  it('should not call amm.approveUnderlyingTokenForPeripheryV1 if amm or amm.signer are undefined', async () => {
    const amm = null;
    getStateMock.mockReturnValue({ rolloverSwapForm: { amm } });

    const result = await approveUnderlyingTokenThunkHandler(null as never, thunkAPIMock as never);

    expect(result).toBeUndefined();
    expect(getStateMock).toHaveBeenCalled();
  });
});
