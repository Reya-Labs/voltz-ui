import {
  selectFixedRateInfo,
  selectSubmitButtonInfo,
  selectSwapFormAMM,
  selectSwapFormPosition,
  selectSwapFormPositionFetchingStatus,
  selectVariableRateInfo,
  selectWalletBalance,
} from './selectors';
import { swapFormCompactFormat } from './utils';

// Mock swapFormCompactFormat
jest.mock('./utils', () => ({
  swapFormCompactFormat: jest.fn(),
}));

describe('swap-form.selectors', () => {
  describe('selectSubmitButtonInfo', () => {
    it('returns the submit button information from the state', () => {
      const state = {
        swapForm: {
          submitButton: {
            state: 'swap',
            disabled: false,
            message: {
              text: null,
              isError: false,
            },
          },
        },
      } as never;

      expect(selectSubmitButtonInfo(state)).toEqual({
        state: 'swap',
        disabled: false,
        message: {
          text: null,
          isError: false,
        },
      });
    });
  });
  describe('selectSwapFormAMM', () => {
    it('should return the AMM object from the state', () => {
      const mockState = {
        swapForm: {
          amm: {
            address: '0x123456789abcdef',
            name: 'Test AMM',
          },
          submitButton: {
            state: 'swap',
            disabled: false,
            message: {
              text: null,
              isError: false,
            },
          },
        },
      } as never;

      const result = selectSwapFormAMM(mockState);

      expect(result).toEqual({
        address: '0x123456789abcdef',
        name: 'Test AMM',
      });
    });
  });
  describe('selectSwapFormPosition', () => {
    it('returns the position value from swapForm', () => {
      const state = {
        swapForm: {
          position: {
            value: 'long',
          },
        },
      } as never;

      const position = selectSwapFormPosition(state);

      expect(position).toEqual('long');
    });
  });
  describe('selectSwapFormPositionFetchingStatus', () => {
    it('should return the position fetching status from the swap form state', () => {
      const positionFetchingStatus = 'pending';
      const state = {
        swapForm: {
          position: {
            status: positionFetchingStatus,
            value: null,
          },
        },
      } as never;

      expect(selectSwapFormPositionFetchingStatus(state)).toBe(positionFetchingStatus);
    });
  });
  describe('selectWalletBalance', () => {
    afterEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns "--" if wallet balance status is not "success"', () => {
      const state = {
        swapForm: {
          walletBalance: {
            status: 'failure',
            value: 0,
          },
        },
      } as never;

      expect(selectWalletBalance(state)).toEqual('--');
    });

    it('calls swapFormCompactFormat with wallet balance value if status is "success"', () => {
      const state = {
        swapForm: {
          walletBalance: {
            status: 'success',
            value: 1000,
          },
        },
      } as never;

      // Call selectWalletBalance function
      selectWalletBalance(state);

      // Assert that swapFormCompactFormat is called with wallet balance value
      expect(swapFormCompactFormat).toHaveBeenCalledWith(1000);
    });

    it('returns formatted wallet balance if status is "success"', () => {
      const state = {
        swapForm: {
          walletBalance: {
            status: 'success',
            value: 1000,
          },
        },
      } as never;

      // Mock return value of swapFormCompactFormat
      (swapFormCompactFormat as jest.Mock).mockReturnValue('$1,000');

      expect(selectWalletBalance(state)).toEqual('$1,000');
    });
  });
  describe('selectFixedRateInfo', () => {
    it('returns the fixed rate info from the swap form slice of state', () => {
      const state = {
        swapForm: {
          fixedRate: {
            value: 0.5,
            status: 'success',
          },
        },
      } as never;
      const fixedRateInfo = selectFixedRateInfo(state);
      expect(fixedRateInfo).toEqual({
        value: 0.5,
        status: 'success',
      });
    });
  });
  describe('selectVariableRateInfo', () => {
    it('returns the variable rate info from the swap form slice of state', () => {
      const state = {
        swapForm: {
          variableRate: {
            value: 0.5,
            status: 'success',
          },
        },
      } as never;
      const variableInfo = selectVariableRateInfo(state);
      expect(variableInfo).toEqual({
        value: 0.5,
        status: 'success',
      });
    });
  });
});
