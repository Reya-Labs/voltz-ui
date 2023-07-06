import { getAmmProtocol } from '../../../../../../../utilities/amm';
import { extractError, rejectThunkWithError } from '../../../../../helpers';
import {
  pushRolloverFailedEvent,
  pushRolloverSubmittedEvent,
  pushRolloverSuccessEvent,
} from '../../analytics';
import {
  getProspectiveSwapMargin,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
} from '../../utils';
import { confirmSwapRolloverThunkHandler } from './index';

jest.mock('../../../../../../../utilities/amm', () => ({
  getAmmProtocol: jest.fn(),
  isV2AMM: jest.fn().mockReturnValue(false),
}));

jest.mock('../../analytics', () => ({
  pushRolloverFailedEvent: jest.fn(),
  pushRolloverSubmittedEvent: jest.fn(),
  pushRolloverSuccessEvent: jest.fn(),
}));

jest.mock('../../../../../helpers', () => ({
  rejectThunkWithError: jest.fn(),
  extractError: jest.fn(),
}));

jest.mock('../../utils', () => ({
  getProspectiveSwapMargin: jest.fn(),
  getProspectiveSwapMode: jest.fn(),
  getProspectiveSwapNotional: jest.fn(),
}));

describe('confirmRolloverThunkHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockState = {
    rolloverSwapForm: {
      amm: {
        marginEngineAddress: 'amm.address',
        rolloverWithSwap: jest.fn(() => ({
          hash: 'hashAfterSwap',
        })),
        signer: {
          getAddress: jest.fn(),
        },
      },
      previousAMM: {
        rolloverWithSwap: jest.fn(() => ({
          hash: 'hashAfterSwap',
        })),
        signer: {
          getAddress: jest.fn(),
        },
      },
      previousPosition: {
        tickLower: 10,
        tickUpper: 100,
        settlementBalance: 200,
      },
    },
  };
  const mockThunkAPI = { getState: () => mockState };

  it('should call amm.rolloverWithSwap and pushRolloverSubmittedEvent with correct event params', async () => {
    const mockNotional = 123;
    const mockMargin = 456;
    const mockPool = 'Mock Pool';
    const mockIsFT = true;
    const mockAccount = '0x123';
    const mockEventParams = {
      account: mockAccount,
      notional: mockNotional,
      margin: mockMargin,
      pool: mockPool,
      isFT: mockIsFT,
    };
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(mockNotional);
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(mockMargin);
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('fixed');
    (getAmmProtocol as jest.Mock).mockReturnValue(mockPool);
    mockState.rolloverSwapForm.amm.signer.getAddress.mockResolvedValue(mockAccount);
    const result = await confirmSwapRolloverThunkHandler(null as never, mockThunkAPI as never);
    expect(pushRolloverSubmittedEvent).toHaveBeenCalledWith(mockEventParams);
    expect(pushRolloverSuccessEvent).toHaveBeenCalledWith(mockEventParams);
    expect(mockState.rolloverSwapForm.previousAMM.rolloverWithSwap).toHaveBeenCalledWith({
      isFT: mockIsFT,
      notional: mockNotional,
      margin: mockMargin,
      fixedLow: 1,
      fixedHigh: 999,
      newMarginEngine: 'amm.address',
      rolloverPosition: {
        tickLower: 10,
        tickUpper: 100,
        settlementBalance: 200,
      },
    });
    expect(result).toEqual({
      hash: 'hashAfterSwap',
    });
  });

  it('should call pushSwapTransactionFailedEvent with correct event params if unsuccessful', async () => {
    const mockError = new Error('Mock error');
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(123);
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(456);
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('fixed');
    (getAmmProtocol as jest.Mock).mockReturnValue('Mock Pool');
    mockState.rolloverSwapForm.amm.signer.getAddress.mockResolvedValue('0x123');
    (mockState.rolloverSwapForm.previousAMM.rolloverWithSwap as jest.Mock).mockRejectedValue(
      mockError,
    );
    const mockErrorMessage = 'Mock error message';
    (extractError as jest.Mock).mockReturnValue(mockErrorMessage);
    await confirmSwapRolloverThunkHandler(null as never, mockThunkAPI as never);
    const expectedEventParams = {
      account: '0x123',
      notional: 123,
      margin: 456,
      pool: 'Mock Pool',
      isFT: true,
      errorMessage: mockErrorMessage,
    };
    expect(pushRolloverFailedEvent).toHaveBeenCalledWith(expectedEventParams);
  });

  it('should call rejectThunkWithError if unsuccessful', async () => {
    const mockError = new Error('Mock error');
    (getProspectiveSwapNotional as jest.Mock).mockReturnValue(123);
    (getProspectiveSwapMargin as jest.Mock).mockReturnValue(456);
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('fixed');
    (getAmmProtocol as jest.Mock).mockReturnValue('Mock Pool');
    (mockState.rolloverSwapForm.previousAMM.rolloverWithSwap as jest.Mock).mockRejectedValue(
      mockError,
    );
    mockState.rolloverSwapForm.amm.signer.getAddress.mockResolvedValue('0x123');
    (extractError as jest.Mock).mockReturnValue('Mock error message');
    const mockRejectValue = 'Mock reject value';
    (rejectThunkWithError as jest.Mock).mockReturnValue(mockRejectValue);
    const result = await confirmSwapRolloverThunkHandler(null as never, mockThunkAPI as never);
    expect(rejectThunkWithError).toHaveBeenCalledWith(mockThunkAPI, mockError);
    expect(result).toBe(mockRejectValue);
  });
});
