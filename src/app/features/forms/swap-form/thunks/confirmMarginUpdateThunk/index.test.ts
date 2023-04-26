import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import { getProspectiveSwapMargin } from '../../utils';
import { confirmMarginUpdateThunkHandler } from '.';

jest.mock('../../../../helpers/reject-thunk-with-error');
jest.mock('../../utils');

describe('confirmMarginUpdateThunkHandler', () => {
  const mockState = {
    swapForm: {
      amm: {
        updatePositionMargin: jest.fn(),
      },
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return undefined when amm is not defined', async () => {
    const getState = jest.fn(() => ({ swapForm: { amm: undefined } }));
    const result = await confirmMarginUpdateThunkHandler(null as never, { getState } as never);
    expect(result).toBeUndefined();
  });

  it('should call updatePositionMargin with the correct arguments', async () => {
    const marginDelta = 123;
    const expectedArgs = {
      fixedLow: 1,
      fixedHigh: 999,
      marginDelta,
    };
    const updatePositionMarginResult = { txHash: '0x123' };
    const updatePositionMarginMock = jest.fn(() => updatePositionMarginResult);
    const getState = jest.fn(() => ({
      swapForm: {
        amm: {
          updatePositionMargin: updatePositionMarginMock,
        },
      },
    }));
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(marginDelta);

    const result = await confirmMarginUpdateThunkHandler(null as never, { getState } as never);

    expect(getProspectiveSwapMargin).toHaveBeenCalledWith(getState().swapForm);
    expect(updatePositionMarginMock).toHaveBeenCalledWith(expectedArgs);
    expect(result).toBe(updatePositionMarginResult);
  });

  it('should call rejectThunkWithError when an error is thrown', async () => {
    const error = new Error('test error');
    const getState = jest.fn(() => mockState);
    mockState.swapForm.amm.updatePositionMargin.mockRejectedValue(error);

    await confirmMarginUpdateThunkHandler(null as never, { getState } as never);

    expect(rejectThunkWithError).toHaveBeenCalledWith(expect.anything(), error);
  });
});
