import { getAmmProtocol } from '../../../../../../../utilities/amm';
import { extractError } from '../../../../../helpers/extract-error';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import {
  pushSwapTransactionFailedEvent,
  pushSwapTransactionSubmittedEvent,
  pushSwapTransactionSuccessEvent,
} from '../../analytics';
import {
  getExistingPositionId,
  getProspectiveSwapMargin,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
} from '../../utils';
import { confirmSwapThunkHandler } from './index';

jest.mock('../../../../../../../utilities/amm', () => ({
  getAmmProtocol: jest.fn(),
  isV2AMM: jest.fn().mockReturnValue(false),
}));

jest.mock('../../analytics', () => ({
  pushSwapTransactionSubmittedEvent: jest.fn(),
  pushSwapTransactionSuccessEvent: jest.fn(),
  pushSwapTransactionFailedEvent: jest.fn(),
}));

jest.mock('../../../../../helpers/reject-thunk-with-error', () => ({
  rejectThunkWithError: jest.fn(),
}));

jest.mock('../../utils', () => ({
  getProspectiveSwapMargin: jest.fn(),
  getProspectiveSwapMode: jest.fn(),
  getProspectiveSwapNotional: jest.fn(),
  getExistingPositionId: jest.fn(),
}));

jest.mock('../../../../../helpers/extract-error', () => ({
  extractError: jest.fn(),
}));

describe('confirmSwapThunkHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockState = {
    swapForm: {
      amm: {
        swap: jest.fn(() => ({
          hash: 'hashAfterSwap',
        })),
        signer: {
          getAddress: jest.fn(),
        },
      },
      position: {
        value: null,
        status: 'idle',
      },
    },
  };
  const mockThunkAPI = { getState: () => mockState };

  it('should call amm.swap and pushSwapTransactionSubmittedEvent with correct event params', async () => {
    const mockNotional = 123;
    const mockMargin = 456;
    const mockIsEdit = true;
    const mockPool = 'Mock Pool';
    const mockIsFT = true;
    const mockAccount = '0x123';
    const mockEventParams = {
      account: mockAccount,
      notional: mockNotional,
      margin: mockMargin,
      isEdit: mockIsEdit,
      pool: mockPool,
      isFT: mockIsFT,
    };
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(mockNotional);
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(mockMargin);
    (getExistingPositionId as jest.Mock).mockReturnValue('0x1');
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('fixed');
    (getAmmProtocol as jest.Mock).mockReturnValue(mockPool);
    mockState.swapForm.amm.signer.getAddress.mockResolvedValue(mockAccount);
    const result = await confirmSwapThunkHandler(null as never, mockThunkAPI as never);
    expect(pushSwapTransactionSubmittedEvent).toHaveBeenCalledWith(mockEventParams);
    expect(pushSwapTransactionSuccessEvent).toHaveBeenCalledWith(mockEventParams);
    expect(mockState.swapForm.amm.swap).toHaveBeenCalledWith({
      isFT: mockIsFT,
      notional: mockNotional,
      margin: mockMargin,
      fixedLow: 1,
      fixedHigh: 999,
    });
    expect(result).toEqual({
      hash: 'hashAfterSwap',
    });
  });

  it('should call pushSwapTransactionFailedEvent with correct event params if unsuccessful', async () => {
    const mockError = new Error('Mock error');
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(123);
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(456);
    (getExistingPositionId as jest.Mock).mockReturnValue('0x1');
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('fixed');
    (getAmmProtocol as jest.Mock).mockReturnValue('Mock Pool');
    mockState.swapForm.amm.signer.getAddress.mockResolvedValue('0x123');
    (mockState.swapForm.amm.swap as jest.Mock).mockRejectedValue(mockError);
    const mockErrorMessage = 'Mock error message';
    (extractError as jest.Mock).mockReturnValue(mockErrorMessage);
    await confirmSwapThunkHandler(null as never, mockThunkAPI as never);
    const expectedEventParams = {
      account: '0x123',
      notional: 123,
      margin: 456,
      isEdit: true,
      pool: 'Mock Pool',
      isFT: true,
      errorMessage: mockErrorMessage,
    };
    expect(pushSwapTransactionFailedEvent).toHaveBeenCalledWith(expectedEventParams);
  });

  it('should call rejectThunkWithError if unsuccessful', async () => {
    const mockError = new Error('Mock error');
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(123);
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(456);
    (getExistingPositionId as jest.Mock).mockReturnValue('0x1');
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('fixed');
    (getAmmProtocol as jest.Mock).mockReturnValue('Mock Pool');
    (mockState.swapForm.amm.swap as jest.Mock).mockRejectedValue(mockError);
    mockState.swapForm.amm.signer.getAddress.mockResolvedValue('0x123');
    (extractError as jest.Mock).mockReturnValue('Mock error message');
    const mockRejectValue = 'Mock reject value';
    (rejectThunkWithError as jest.Mock).mockReturnValue(mockRejectValue);
    const result = await confirmSwapThunkHandler(null as never, mockThunkAPI as never);
    expect(rejectThunkWithError).toHaveBeenCalledWith(mockThunkAPI, mockError);
    expect(result).toBe(mockRejectValue);
  });
});
