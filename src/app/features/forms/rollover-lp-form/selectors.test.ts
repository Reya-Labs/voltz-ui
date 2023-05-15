import { formatNumber, stringToBigFloat } from '../../../../utilities/number';
import {
  formCompactFormat,
  formCompactFormatToParts,
  formLimitAndFormatNumber,
} from '../common/utils';
import { selectPositionMarginFormatted } from '../trader/rollover-swap-form';
import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectBottomRightMarginNumber,
  selectInfoPostLp,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectLeverage,
  selectLpFormAMM,
  selectMarginAccountName,
  selectNewPositionCompactNotional,
  selectProspectiveLpMarginFormatted,
  selectProspectiveLpNotionalFormatted,
  selectSubmitButtonInfo,
  selectSubmitButtonText,
  selectUserInputMarginInfo,
  selectUserInputNotionalInfo,
  selectVariableRate24hDelta,
  selectWalletBalance,
} from '.';
import { getAvailableMargin, getProspectiveLpMargin, getProspectiveLpNotional } from './utils';

// Mock number utils
jest.mock('../../../../utilities/number', () => ({
  formatNumber: jest.fn(),
  stringToBigFloat: jest.fn(),
}));

// Mock common utils
jest.mock('../common/utils', () => ({
  formCompactFormat: jest.fn(),
  formLimitAndFormatNumber: jest.fn(),
  formCompactFormatToParts: jest.fn(),
}));

// Mock utils
jest.mock('./utils', () => ({
  getProspectiveLpNotional: jest.fn(),
  getProspectiveLpMargin: jest.fn(),
  getAvailableMargin: jest.fn(),
}));

describe('rollover-lp-form.selectors', () => {
  describe('selectSubmitButtonInfo', () => {
    it('returns the submit button information from the state', () => {
      const state = {
        rolloverLpForm: {
          submitButton: {
            state: 'lp',
            disabled: false,
            message: {
              text: null,
              isError: false,
            },
          },
        },
      } as never;

      expect(selectSubmitButtonInfo(state)).toEqual({
        state: 'lp',
        disabled: false,
        message: {
          text: null,
          isError: false,
        },
      });
    });
  });

  describe('selectLpFormAMM', () => {
    it('should return the AMM object from the state', () => {
      const mockState = {
        rolloverLpForm: {
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

      const result = selectLpFormAMM(mockState);

      expect(result).toEqual({
        address: '0x123456789abcdef',
        name: 'Test AMM',
      });
    });
  });

  describe('selectWalletBalance', () => {
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns "--" if wallet balance status is not "success"', () => {
      const state = {
        rolloverLpForm: {
          walletBalance: {
            status: 'failure',
            value: 0,
          },
        },
      } as never;

      expect(selectWalletBalance(state)).toEqual('--');
    });

    it('calls formCompactFormat with wallet balance value if status is "success"', () => {
      const state = {
        rolloverLpForm: {
          walletBalance: {
            status: 'success',
            value: 1000,
          },
        },
      } as never;

      // Call selectWalletBalance function
      selectWalletBalance(state);

      // Assert that formCompactFormat is called with wallet balance value
      expect(formCompactFormat).toHaveBeenCalledWith(1000);
    });

    it('returns formatted wallet balance if status is "success"', () => {
      const state = {
        rolloverLpForm: {
          walletBalance: {
            status: 'success',
            value: 1000,
          },
        },
      } as never;

      // Mock return value of formCompactFormat
      (formCompactFormat as jest.Mock).mockReturnValue('$1,000');

      expect(selectWalletBalance(state)).toEqual('$1,000');
    });
  });

  describe('selectAMMTokenFormatted', () => {
    const mockState = {
      rolloverLpForm: {
        amm: {
          id: '1',
          underlyingToken: {
            name: 'usdc',
          },
        },
      },
    } as never;

    it('returns the formatted AMM token name when aMM is defined', () => {
      const result = selectAMMTokenFormatted(mockState);
      expect(result).toBe(' USDC');
    });

    it('returns an empty string when aMM is not defined', () => {
      const emptyState = {
        rolloverLpForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectAMMTokenFormatted(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectAMMMaturityFormatted', () => {
    const mockState = {
      rolloverLpForm: {
        amm: {
          id: '1',
          termEndTimestampInMS: 1614667200000,
        },
      },
    } as never;

    it('returns the formatted AMM token name when aMM is defined', () => {
      const result = selectAMMMaturityFormatted(mockState);
      expect(result).toBe('02 Mar 2021');
    });

    it('returns an empty string when aMM is not defined', () => {
      const emptyState = {
        rolloverLpForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectAMMMaturityFormatted(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectMarginAccountName', () => {
    const mockState = {
      rolloverLpForm: {
        amm: {
          id: '1',
          termEndTimestampInMS: 1614667200000,
          protocol: 'PROTOCOL_A',
        },
      },
    } as never;

    it('returns the formatted margin account name when aMM is defined', () => {
      const result = selectMarginAccountName(mockState);
      expect(result).toBe('PROTOCOL_A 02 Mar 2021');
    });

    it('returns an empty string when aMM is not defined', () => {
      const emptyState = {
        rolloverLpForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectMarginAccountName(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectUserInputNotionalInfo', () => {
    const mockState = {
      rolloverLpForm: {
        userInput: {
          notionalAmount: {
            value: 100,
          },
        },
      },
    } as never;

    it('returns the correct user input notional amount', () => {
      const result = selectUserInputNotionalInfo(mockState);

      expect(result).toEqual({
        value: 100,
      });
    });
  });

  describe('selectUserInputMarginInfo', () => {
    const mockState = {
      rolloverLpForm: {
        userInput: {
          marginAmount: {
            value: 50,
          },
        },
      },
    } as never;

    it('returns the correct user input margin amount', () => {
      const result = selectUserInputMarginInfo(mockState);
      expect(result).toStrictEqual({
        value: 50,
      });
    });
  });

  describe('selectProspectiveLpNotionalFormatted', () => {
    const mockState = {
      rolloverLpForm: {},
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('calls getProspectiveLpNotional with the correct arguments', () => {
      selectProspectiveLpNotionalFormatted(mockState as never);

      expect(getProspectiveLpNotional).toHaveBeenCalledTimes(1);
      expect(getProspectiveLpNotional).toHaveBeenCalledWith(mockState.rolloverLpForm);
    });

    it('calls formCompactFormat with the correct arguments', () => {
      const mockNotional = 'test';
      (getProspectiveLpNotional as jest.Mock).mockReturnValue(mockNotional);

      selectProspectiveLpNotionalFormatted(mockState as never);

      expect(formCompactFormat).toHaveBeenCalledTimes(1);
      expect(formCompactFormat).toHaveBeenCalledWith(mockNotional);
    });

    it('returns the correctly formatted prospective swap notional', () => {
      const mockFormattedNotional = 'test';
      (formCompactFormat as jest.Mock).mockReturnValue(mockFormattedNotional);

      const result = selectProspectiveLpNotionalFormatted(mockState as never);
      expect(result).toBe(mockFormattedNotional);
    });
  });

  describe('selectPositionMarginFormatted', () => {
    it('should return --', () => {
      const result = selectPositionMarginFormatted();
      expect(result).toBe('--');
    });
  });

  describe('selectProspectiveLpMarginFormatted', () => {
    const mockState = {
      rolloverLpForm: {
        userInput: {
          marginAmount: {
            value: 10,
          },
        },
        prospectiveLp: {
          infoPostLp: {
            value: {
              fee: 10,
            },
          },
        },
      },
    };

    it('returns formatted prospective swap margin minus fee', () => {
      const prospectiveMargin = 100;
      const formattedMargin = '90.00';
      (
        getProspectiveLpMargin as jest.MockedFunction<typeof getProspectiveLpMargin>
      ).mockReturnValue(prospectiveMargin);
      (formCompactFormat as jest.MockedFunction<typeof formCompactFormat>).mockReturnValue(
        formattedMargin,
      );

      const result = selectProspectiveLpMarginFormatted(mockState as never);

      expect(result).toEqual(formattedMargin);
      expect(getProspectiveLpMargin).toHaveBeenCalledWith(mockState.rolloverLpForm);
      expect(formCompactFormat).toHaveBeenCalledWith(prospectiveMargin);
    });
  });

  describe('selectLeverage', () => {
    it('should select leverage from state', () => {
      const state = {
        rolloverLpForm: {
          userInput: {
            leverage: 5,
          },
        },
      } as never;
      expect(selectLeverage(state)).toEqual(5);
    });
  });

  describe('selectInfoPostLp', () => {
    it('should select infoPostLp from state', () => {
      const state = {
        rolloverLpForm: {
          prospectiveLp: {
            infoPostLp: { foo: 'bar' },
          },
        },
      } as never;
      expect(selectInfoPostLp(state)).toEqual({ foo: 'bar' });
    });
  });

  describe('selectIsMarginRequiredError', () => {
    it('should return true if there is a margin amount error other than WLT', () => {
      const state = {
        rolloverLpForm: {
          userInput: {
            marginAmount: {
              error: 'some error message',
            },
          },
        },
      } as never;
      expect(selectIsMarginRequiredError(state)).toBe(true);
    });

    it('should return false if there is no margin amount error', () => {
      const state = {
        rolloverLpForm: {
          userInput: {
            marginAmount: {
              error: null,
            },
          },
        },
      } as never;
      expect(selectIsMarginRequiredError(state)).toBe(false);
    });

    it('should return false if the margin amount error is "WLT"', () => {
      const state = {
        rolloverLpForm: {
          userInput: {
            marginAmount: {
              error: 'WLT',
            },
          },
        },
      } as never;
      expect(selectIsMarginRequiredError(state)).toBe(false);
    });
  });

  describe('selectIsWalletMarginError', () => {
    it('should return true if the margin amount error is "WLT"', () => {
      const state = {
        rolloverLpForm: {
          userInput: {
            marginAmount: {
              error: 'WLT',
            },
          },
        },
      } as never;

      expect(selectIsWalletMarginError(state)).toBe(true);
    });

    it('should return false if the margin amount error is not "WLT"', () => {
      const state = {
        rolloverLpForm: {
          userInput: {
            marginAmount: {
              error: 'some other error message',
            },
          },
        },
      } as never;

      expect(selectIsWalletMarginError(state)).toBe(false);
    });
  });

  describe('selectBottomRightMarginNumber', () => {
    beforeEach(() => {
      (formLimitAndFormatNumber as jest.Mock).mockImplementationOnce(
        (value: number, mode: string) => {
          return mode === 'floor' ? Math.floor(value) : Math.ceil(value);
        },
      );
      (getAvailableMargin as jest.Mock).mockImplementationOnce(
        (state: { availableMargin: number }) => {
          return state.availableMargin;
        },
      );
    });
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('should return a formatted margin requirement if the swap was successful', () => {
      const state = {
        rolloverLpForm: {
          userInput: {
            marginAmount: {
              value: 100,
            },
          },
          prospectiveLp: {
            infoPostLp: {
              status: 'success',
              value: {
                marginRequirement: 5678.1234,
              },
            },
          },
        },
      } as never;

      const result = selectBottomRightMarginNumber(state);

      expect(result).toBe(5679); // ceil of 5678.1234
      expect(formLimitAndFormatNumber).toHaveBeenCalledWith(5678.1234, 'ceil');
      expect(getAvailableMargin).not.toHaveBeenCalled(); // should not be called in this case
    });

    it('should return null if neither condition is met', () => {
      const state = {
        rolloverLpForm: {
          userInput: {
            marginAmount: {
              value: 100,
            },
          },
          prospectiveLp: {
            infoPostLp: {
              status: 'failure',
            },
          },
        },
      } as never;

      const result = selectBottomRightMarginNumber(state);

      expect(result).toBeNull();
      expect(formLimitAndFormatNumber).not.toHaveBeenCalled(); // should not be called in this case
      expect(getAvailableMargin).not.toHaveBeenCalled(); // should not be called in this case
    });
  });

  describe('selectNewPositionCompactNotional', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should return null if notional amount has an error', () => {
      const stateWithNotionalAmountError = {
        rolloverLpForm: {
          userInput: {
            notionalAmount: {
              error: 'Invalid notional amount',
              value: '',
            },
          },
        },
      };

      const result = selectNewPositionCompactNotional(stateWithNotionalAmountError as never);

      expect(result).toBeNull();
    });

    it('should return compact notional suffix and number if notional amount is valid', () => {
      const mockCompactParts = {
        compactSuffix: 'M',
        compactNumber: '1.23',
      };

      const mockedState = {
        rolloverLpForm: {
          userInput: {
            notionalAmount: {
              error: '',
            },
          },
        },
      };

      (
        getProspectiveLpNotional as jest.MockedFunction<typeof getProspectiveLpNotional>
      ).mockReturnValue(1000000);
      (
        formCompactFormatToParts as jest.MockedFunction<typeof formCompactFormatToParts>
      ).mockReturnValue(mockCompactParts);

      const result = selectNewPositionCompactNotional(mockedState as never);

      expect(result).toEqual({
        compactNotionalSuffix: 'M',
        compactNotionalNumber: '1.23',
      });
      expect(getProspectiveLpNotional).toHaveBeenCalledWith(mockedState.rolloverLpForm);
      expect(formCompactFormatToParts).toHaveBeenCalledWith(1000000);
    });
  });

  describe('selectVariableRate24hDelta', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('calls formatNumber and stringToBigFloat with the correct arguments', () => {
      const state = {
        rolloverLpForm: {
          amm: {
            variableApy: 150,
            variableApy24Ago: 100,
          },
        },
      };
      (formatNumber as jest.Mock).mockReturnValueOnce('50');
      selectVariableRate24hDelta(state as never);

      expect(formatNumber).toHaveBeenCalledWith(50, 0, 3);
      expect(stringToBigFloat).toHaveBeenCalledWith('50');
    });

    it('returns undefined if amm is null', () => {
      const state = {
        rolloverLpForm: {
          amm: null,
        },
      };

      expect(selectVariableRate24hDelta(state as never)).toBeUndefined();
    });

    it('returns the correct value', () => {
      (formatNumber as jest.Mock).mockReturnValueOnce('50');
      (stringToBigFloat as jest.Mock).mockReturnValueOnce(50);

      const state = {
        rolloverLpForm: {
          amm: {
            variableApy: 150,
            variableApy24Ago: 100,
          },
        },
      };

      expect(selectVariableRate24hDelta(state as never)).toEqual(50);
    });
  });

  describe('selectSubmitButtonText', () => {
    it('returns the correct text for the "rollover" state', () => {
      expect(
        selectSubmitButtonText({
          rolloverLpForm: {
            submitButton: {
              state: 'rollover',
            },
            userInput: {
              notionalAmount: {
                value: 10,
              },
            },
          },
        } as never),
      ).toBe('Rollover');
    });

    it('returns the correct text for the "not-enough-balance" state', () => {
      const state = {
        rolloverLpForm: {
          submitButton: {
            state: 'not-enough-balance',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Not enough balance');
    });

    it('returns the correct text for the "approve" state', () => {
      const state = {
        rolloverLpForm: {
          submitButton: {
            state: 'approve',
          },
          amm: {
            underlyingToken: {
              name: 'token',
            },
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Approve TOKEN');
    });

    it('returns the correct text for the "approving" state', () => {
      const state = {
        rolloverLpForm: {
          submitButton: {
            state: 'approving',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Approving...');
    });

    it('returns the correct text for the "connect-wallet" state', () => {
      const state = {
        rolloverLpForm: {
          submitButton: {
            state: 'connect-wallet',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Connect Your Wallet to Start Trading');
    });

    it('returns the correct text for the "fixed-range-error" state', () => {
      const state = {
        rolloverLpForm: {
          submitButton: {
            state: 'fixed-range-error',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Invalid Fixed Range');
    });
  });
});
