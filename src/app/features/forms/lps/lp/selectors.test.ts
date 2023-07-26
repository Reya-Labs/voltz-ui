import {
  formCompactFormat,
  formCompactFormatToParts,
  formLimitAndFormatNumber,
} from '../../common';
import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectBottomRightMarginNumber,
  selectExistingPositionCompactNotional,
  selectInfoPostLp,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectLeverage,
  selectLpFormAMM,
  selectLpFormMode,
  selectMarginAccountName,
  selectNewPositionCompactNotional,
  selectProspectiveLpMarginFormatted,
  selectProspectiveLpNotionalFormatted,
  selectSubmitButtonInfo,
  selectSubmitButtonText,
  selectUserInputMarginInfo,
  selectUserInputNotionalInfo,
  selectWalletBalance,
} from '.';
import {
  getAvailableMargin,
  getProspectiveLpMargin,
  getProspectiveLpNotional,
  hasExistingPosition,
} from './utils';

// Mock number utils
jest.mock('../../../../../utilities/number', () => ({
  formatNumber: jest.fn(),
  stringToBigFloat: jest.fn(),
}));

// Mock common utils
jest.mock('../../common/utils', () => ({
  formCompactFormat: jest.fn(),
  formLimitAndFormatNumber: jest.fn(),
  formCompactFormatToParts: jest.fn(),
}));

// Mock utils
jest.mock('./utils', () => ({
  hasExistingPosition: jest.fn(),
  getProspectiveLpNotional: jest.fn(),
  getProspectiveLpMargin: jest.fn(),
  getAvailableMargin: jest.fn(),
}));

describe('lp-form.selectors', () => {
  describe('selectSubmitButtonInfo', () => {
    it('returns the submit button information from the state', () => {
      const state = {
        lpForm: {
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
        lpForm: {
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
        lpForm: {
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
        lpForm: {
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
        lpForm: {
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

  describe('selectLpFormMode', () => {
    const mockState = {
      lpForm: {
        position: {
          value: {},
        },
      },
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('returns "edit" when hasExistingPosition returns true', () => {
      (hasExistingPosition as jest.Mock).mockReturnValueOnce(true);

      const result = selectLpFormMode(mockState as never);

      expect(hasExistingPosition).toHaveBeenCalledWith(mockState.lpForm);
      expect(result).toBe('edit');
    });

    it('returns "new" when hasExistingPosition returns false', () => {
      (hasExistingPosition as jest.Mock).mockReturnValueOnce(false);

      const result = selectLpFormMode(mockState as never);

      expect(hasExistingPosition).toHaveBeenCalledWith(mockState.lpForm);
      expect(result).toBe('new');
    });
  });

  describe('selectAMMTokenFormatted', () => {
    const mockState = {
      lpForm: {
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
        lpForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectAMMTokenFormatted(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectAMMMaturityFormatted', () => {
    const mockState = {
      lpForm: {
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
        lpForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectAMMMaturityFormatted(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectMarginAccountName', () => {
    const mockState = {
      lpForm: {
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
        lpForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectMarginAccountName(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectUserInputNotionalInfo', () => {
    const mockState = {
      lpForm: {
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
      lpForm: {
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
      lpForm: {},
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('calls getProspectiveLpNotional with the correct arguments', () => {
      selectProspectiveLpNotionalFormatted(mockState as never);

      expect(getProspectiveLpNotional).toHaveBeenCalledTimes(1);
      expect(getProspectiveLpNotional).toHaveBeenCalledWith(mockState.lpForm);
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

  describe('selectProspectiveLpMarginFormatted', () => {
    const mockState = {
      lpForm: {
        userInput: {
          marginAmount: {
            editMode: 'add',
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

    it('returns formatted prospective swap margin when editMode is not "add"', () => {
      const prospectiveMargin = 100;
      const formattedMargin = '100.00';
      (
        getProspectiveLpMargin as jest.MockedFunction<typeof getProspectiveLpMargin>
      ).mockReturnValue(prospectiveMargin);
      (formCompactFormat as jest.MockedFunction<typeof formCompactFormat>).mockReturnValue(
        formattedMargin,
      );

      const result = selectProspectiveLpMarginFormatted(mockState as never);

      expect(result).toEqual(formattedMargin);
      expect(getProspectiveLpMargin).toHaveBeenCalledWith(mockState.lpForm);
      expect(formCompactFormat).toHaveBeenCalledWith(prospectiveMargin);
    });

    it('returns formatted prospective swap margin minus fee when editMode is "add"', () => {
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
      expect(getProspectiveLpMargin).toHaveBeenCalledWith(mockState.lpForm);
      expect(formCompactFormat).toHaveBeenCalledWith(prospectiveMargin);
    });
  });

  describe('selectLeverage', () => {
    it('should select leverage from state', () => {
      const state = {
        lpForm: {
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
        lpForm: {
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
        lpForm: {
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
        lpForm: {
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
        lpForm: {
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
        lpForm: {
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
        lpForm: {
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

    it('should return a formatted available margin if margin amount edit mode is "remove"', () => {
      const state = {
        lpForm: {
          userInput: {
            marginAmount: {
              editMode: 'remove',
            },
          },
          availableMargin: 1234.5678,
        },
      } as never;

      const result = selectBottomRightMarginNumber(state);

      expect(result).toBe(1234);
      expect(formLimitAndFormatNumber).toHaveBeenCalledWith(1234.5678, 'floor');
      expect(getAvailableMargin).toHaveBeenCalledWith({
        userInput: {
          marginAmount: {
            editMode: 'remove',
          },
        },
        availableMargin: 1234.5678,
      });
    });

    it('should return a formatted margin requirement if the swap was successful', () => {
      const state = {
        lpForm: {
          userInput: {
            marginAmount: {
              editMode: 'add',
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
        lpForm: {
          userInput: {
            marginAmount: {
              editMode: 'add',
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
        lpForm: {
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
        lpForm: {
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
      expect(getProspectiveLpNotional).toHaveBeenCalledWith(mockedState.lpForm);
      expect(formCompactFormatToParts).toHaveBeenCalledWith(1000000);
    });
  });

  describe('selectExistingPositionCompactNotional', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return null when position value is falsy', () => {
      const state = {
        lpForm: {
          selectedPosition: null,
        },
      } as never;

      const result = selectExistingPositionCompactNotional(state);

      expect(result).toBeNull();
    });

    it('should return an object with the correct properties when position status is "success" and position value is truthy', () => {
      const state = {
        lpForm: {
          selectedPosition: {
            notional: '1000000000000000000',
          },
        },
      } as never;

      (formCompactFormatToParts as jest.Mock).mockReturnValueOnce({
        compactSuffix: 'ETH',
        compactNumber: '1',
      });

      const result = selectExistingPositionCompactNotional(state);

      expect(formCompactFormatToParts as jest.Mock).toHaveBeenCalledWith('1000000000000000000');
      expect(result).toEqual({
        compactNotionalSuffix: 'ETH',
        compactNotionalNumber: '1',
      });
    });
  });

  describe('selectSubmitButtonText', () => {
    it('returns the correct text for the "lp" state', () => {
      expect(
        selectSubmitButtonText({
          lpForm: {
            submitButton: {
              state: 'lp',
            },
            userInput: {
              notionalAmount: {
                editMode: 'add',
              },
            },
          },
        } as never),
      ).toBe('Add Liquidity');
      expect(
        selectSubmitButtonText({
          lpForm: {
            submitButton: {
              state: 'lp',
            },
            userInput: {
              notionalAmount: {
                editMode: 'remove',
              },
            },
          },
        } as never),
      ).toBe('Remove Liquidity');
    });

    it('returns the correct text for the "margin-update" state', () => {
      const state = {
        lpForm: {
          submitButton: {
            state: 'margin-update',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Update margin');
    });

    it('returns the correct text for the "not-enough-balance" state', () => {
      const state = {
        lpForm: {
          submitButton: {
            state: 'not-enough-balance',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Not enough balance');
    });

    it('returns the correct text for the "approve" state', () => {
      const state = {
        lpForm: {
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
        lpForm: {
          submitButton: {
            state: 'approving',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Approving...');
    });

    it('returns the correct text for the "connect-wallet" state', () => {
      const state = {
        lpForm: {
          submitButton: {
            state: 'connect-wallet',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Connect Your Wallet to Start Trading');
    });

    it('returns the correct text for the "fixed-range-error" state', () => {
      const state = {
        lpForm: {
          submitButton: {
            state: 'fixed-range-error',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Invalid Fixed Range');
    });
  });
});
