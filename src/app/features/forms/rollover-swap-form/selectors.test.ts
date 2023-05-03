import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatNumber, stringToBigFloat } from '../../../../utilities/number';
import {
  formCompactFormat,
  formCompactFormatToParts,
  formFormatNumber,
  formLimitAndFormatNumber,
} from '../common/utils';
import {
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectAvailableNotional,
  selectBottomRightMarginNumber,
  selectEditPositionCompactNotional,
  selectEditPositionMode,
  selectEditPositionPayingRateFormatted,
  selectEditPositionReceivingRateFormatted,
  selectExistingPositionCompactNotional,
  selectExistingPositionMode,
  selectExistingPositionPayingRateFormatted,
  selectExistingPositionReceivingRateFormatted,
  selectFixedRateInfo,
  selectFixedRateValueFormatted,
  selectInfoPostSwap,
  selectIsGetInfoPostSwapLoading,
  selectIsLeverageDisabled,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectLeverage,
  selectLeverageOptions,
  selectMarginAccountName,
  selectMarginRequirementFormatted,
  selectNewPositionCompactNotional,
  selectNewPositionPayingRate,
  selectNewPositionReceivingRate,
  selectPoolSwapInfoStatus,
  selectPositionMarginFormatted,
  selectProspectiveSwapFeeFormatted,
  selectProspectiveSwapMarginFormatted,
  selectProspectiveSwapMode,
  selectProspectiveSwapNotionalFormatted,
  selectShowLeverageNotification,
  selectSlippageFormatted,
  selectSubmitButtonInfo,
  selectSubmitButtonText,
  selectSwapConfirmationFlowError,
  selectSwapConfirmationFlowEtherscanLink,
  selectSwapConfirmationFlowStep,
  selectSwapFormAMM,
  selectSwapFormMode,
  selectSwapFormPosition,
  selectSwapFormPositionFetchingStatus,
  selectUserInputMarginInfo,
  selectUserInputMode,
  selectUserInputNotionalInfo,
  selectVariableRate24hDelta,
  selectVariableRateInfo,
  selectVariableRateValueFormatted,
  selectWalletBalance,
} from './selectors';
import {
  getAvailableMargin,
  getAvailableNotional,
  getEditPositionFixedRate,
  getEditPositionMode,
  getEditPositionNotional,
  getEditPositionVariableRate,
  getExistingPositionFixedRate,
  getExistingPositionMode,
  getExistingPositionVariableRate,
  getNewPositionFixedRate,
  getProspectiveSwapMargin,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
  getVariableRate,
  hasExistingPosition,
} from './utils';

// Mock @voltz-protocol/v1-sdk
jest.mock('@voltz-protocol/v1-sdk', () => ({
  getViewOnEtherScanLink: jest.fn(),
}));

// Mock number utils
jest.mock('../../../../utilities/number', () => ({
  formatNumber: jest.fn(),
  stringToBigFloat: jest.fn(),
}));

// Mock common utils
jest.mock('../common/utils', () => ({
  formCompactFormat: jest.fn(),
  formFormatNumber: jest.fn(),
  formLimitAndFormatNumber: jest.fn(),
  formCompactFormatToParts: jest.fn(),
}));

// Mock utils
jest.mock('./utils', () => ({
  hasExistingPosition: jest.fn(),
  getProspectiveSwapMode: jest.fn(),
  getProspectiveSwapNotional: jest.fn(),
  getProspectiveSwapMargin: jest.fn(),
  getAvailableMargin: jest.fn(),
  getAvailableNotional: jest.fn(),
  getNewPositionFixedRate: jest.fn(),
  getVariableRate: jest.fn(),
  getExistingPositionMode: jest.fn(),
  getExistingPositionFixedRate: jest.fn(),
  getExistingPositionVariableRate: jest.fn(),
  getEditPositionMode: jest.fn(),
  getEditPositionFixedRate: jest.fn(),
  getEditPositionVariableRate: jest.fn(),
  getEditPositionNotional: jest.fn(),
}));

describe('swap-form.selectors', () => {
  describe('selectSubmitButtonInfo', () => {
    it('returns the submit button information from the state', () => {
      const state = {
        rolloverSwapForm: {
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
        rolloverSwapForm: {
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
    it('returns the position value from rolloverSwapForm', () => {
      const state = {
        rolloverSwapForm: {
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
        rolloverSwapForm: {
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
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns "--" if wallet balance status is not "success"', () => {
      const state = {
        rolloverSwapForm: {
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
        rolloverSwapForm: {
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
        rolloverSwapForm: {
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

  describe('selectFixedRateInfo', () => {
    it('returns the fixed rate info from the swap form slice of state', () => {
      const state = {
        rolloverSwapForm: {
          amm: {
            fixedApr: 0.5,
          },
        },
      } as never;
      const fixedRateInfo = selectFixedRateInfo(state);
      expect(fixedRateInfo).toEqual(0.5);
    });
  });

  describe('selectVariableRateInfo', () => {
    it('returns the variable rate info from the swap form slice of state', () => {
      const state = {
        rolloverSwapForm: {
          amm: {
            variableApy: 0.5,
          },
        },
      } as never;
      const variableInfo = selectVariableRateInfo(state);
      expect(variableInfo).toEqual(0.5);
    });
  });

  describe('selectPoolSwapInfoStatus', () => {
    const mockRootState = {
      rolloverSwapForm: {
        poolSwapInfo: {
          availableNotional: {
            fixed: 10,
            variable: 15,
          },
          maxLeverage: {
            fixed: 10,
            variable: 15,
          },
          status: 'success',
        },
      },
    } as never;

    it('should select the correct pool swap info status', () => {
      const result = selectPoolSwapInfoStatus(mockRootState);
      expect(result).toEqual('success');
    });
  });

  describe('selectSwapFormMode', () => {
    const mockState = {
      rolloverSwapForm: {
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

      const result = selectSwapFormMode(mockState as never);

      expect(hasExistingPosition).toHaveBeenCalledWith(mockState.rolloverSwapForm);
      expect(result).toBe('edit');
    });

    it('returns "new" when hasExistingPosition returns false', () => {
      (hasExistingPosition as jest.Mock).mockReturnValueOnce(false);

      const result = selectSwapFormMode(mockState as never);

      expect(hasExistingPosition).toHaveBeenCalledWith(mockState.rolloverSwapForm);
      expect(result).toBe('new');
    });
  });

  describe('selectAMMTokenFormatted', () => {
    const mockState = {
      rolloverSwapForm: {
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
        rolloverSwapForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectAMMTokenFormatted(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectAMMMaturityFormatted', () => {
    const mockState = {
      rolloverSwapForm: {
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
        rolloverSwapForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectAMMMaturityFormatted(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectMarginAccountName', () => {
    const mockState = {
      rolloverSwapForm: {
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
        rolloverSwapForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectMarginAccountName(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectUserInputMode', () => {
    const mockState = {
      rolloverSwapForm: {
        userInput: {
          mode: 'fixed',
        },
      },
    } as never;

    it('returns the correct user input mode', () => {
      const result = selectUserInputMode(mockState);
      expect(result).toBe('fixed');
    });
  });

  describe('selectUserInputNotionalInfo', () => {
    const mockState = {
      rolloverSwapForm: {
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
      rolloverSwapForm: {
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

  describe('selectProspectiveSwapMode', () => {
    const mockState = {
      rolloverSwapForm: {},
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('calls getProspectiveSwapMode with the correct arguments', () => {
      selectProspectiveSwapMode(mockState as never);

      expect(getProspectiveSwapMode).toHaveBeenCalledTimes(1);
      expect(getProspectiveSwapMode).toHaveBeenCalledWith(mockState.rolloverSwapForm);
    });

    it('returns the correct prospective swap mode', () => {
      const mockProspectiveSwapMode = 'test';
      (getProspectiveSwapMode as jest.Mock).mockReturnValue(mockProspectiveSwapMode);

      const result = selectProspectiveSwapMode(mockState as never);
      expect(result).toBe(mockProspectiveSwapMode);
    });
  });

  describe('selectProspectiveSwapNotionalFormatted', () => {
    const mockState = {
      rolloverSwapForm: {},
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('calls getProspectiveSwapNotional with the correct arguments', () => {
      selectProspectiveSwapNotionalFormatted(mockState as never);

      expect(getProspectiveSwapNotional).toHaveBeenCalledTimes(1);
      expect(getProspectiveSwapNotional).toHaveBeenCalledWith(mockState.rolloverSwapForm);
    });

    it('calls formCompactFormat with the correct arguments', () => {
      const mockNotional = 'test';
      (getProspectiveSwapNotional as jest.Mock).mockReturnValue(mockNotional);

      selectProspectiveSwapNotionalFormatted(mockState as never);

      expect(formCompactFormat).toHaveBeenCalledTimes(1);
      expect(formCompactFormat).toHaveBeenCalledWith(mockNotional);
    });

    it('returns the correctly formatted prospective swap notional', () => {
      const mockFormattedNotional = 'test';
      (formCompactFormat as jest.Mock).mockReturnValue(mockFormattedNotional);

      const result = selectProspectiveSwapNotionalFormatted(mockState as never);
      expect(result).toBe(mockFormattedNotional);
    });
  });

  describe('selectProspectiveSwapMarginFormatted', () => {
    const mockState = {
      rolloverSwapForm: {
        userInput: {
          marginAmount: {
            editMode: 'add',
          },
        },
        prospectiveSwap: {
          infoPostSwap: {
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
        getProspectiveSwapMargin as jest.MockedFunction<typeof getProspectiveSwapMargin>
      ).mockReturnValue(prospectiveMargin);
      (formCompactFormat as jest.MockedFunction<typeof formCompactFormat>).mockReturnValue(
        formattedMargin,
      );

      const result = selectProspectiveSwapMarginFormatted(mockState as never);

      expect(result).toEqual(formattedMargin);
      expect(getProspectiveSwapMargin).toHaveBeenCalledWith(mockState.rolloverSwapForm);
      expect(formCompactFormat).toHaveBeenCalledWith(
        prospectiveMargin - mockState.rolloverSwapForm.prospectiveSwap.infoPostSwap.value.fee,
      );
    });

    it('returns formatted prospective swap margin minus fee when editMode is "add"', () => {
      const prospectiveMargin = 100;
      const formattedMargin = '90.00';
      (
        getProspectiveSwapMargin as jest.MockedFunction<typeof getProspectiveSwapMargin>
      ).mockReturnValue(prospectiveMargin);
      (formCompactFormat as jest.MockedFunction<typeof formCompactFormat>).mockReturnValue(
        formattedMargin,
      );

      const result = selectProspectiveSwapMarginFormatted(mockState as never);

      expect(result).toEqual(formattedMargin);
      expect(getProspectiveSwapMargin).toHaveBeenCalledWith(mockState.rolloverSwapForm);
      expect(formCompactFormat).toHaveBeenCalledWith(prospectiveMargin - 10);
    });
  });

  describe('selectProspectiveSwapFeeFormatted', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('returns the fee formatted correctly when the infoPostSwap status is "success"', () => {
      const mockRootState = {
        rolloverSwapForm: {
          userInput: {
            marginAmount: {
              editMode: 'add',
            },
          },
          prospectiveSwap: {
            infoPostSwap: {
              status: 'success',
              value: {
                fee: 10,
              },
            },
          },
        },
      };
      (formFormatNumber as jest.Mock).mockReturnValueOnce('10.00');

      const result = selectProspectiveSwapFeeFormatted(mockRootState as never);
      expect(result).toEqual('10.00');
      expect(formFormatNumber).toHaveBeenCalledWith(10);
    });

    it('returns "--" when the infoPostSwap status is not "success"', () => {
      const mockRootState = {
        rolloverSwapForm: {
          userInput: {
            marginAmount: {
              editMode: 'add',
            },
          },
          prospectiveSwap: {
            infoPostSwap: {
              status: 'failure',
            },
          },
        },
      };

      const result = selectProspectiveSwapFeeFormatted(mockRootState as never);
      expect(result).toEqual('--');
      expect(formFormatNumber).not.toHaveBeenCalled();
    });
  });

  describe('selectLeverage', () => {
    it('should select leverage from state', () => {
      const state = {
        rolloverSwapForm: {
          userInput: {
            leverage: 5,
          },
        },
      } as never;
      expect(selectLeverage(state)).toEqual(5);
    });
  });

  describe('selectInfoPostSwap', () => {
    it('should select infoPostSwap from state', () => {
      const state = {
        rolloverSwapForm: {
          prospectiveSwap: {
            infoPostSwap: { foo: 'bar' },
          },
        },
      } as never;
      expect(selectInfoPostSwap(state)).toEqual({ foo: 'bar' });
    });
  });

  describe('selectIsMarginRequiredError', () => {
    it('should return true if there is a margin amount error other than WLT', () => {
      const state = {
        rolloverSwapForm: {
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
        rolloverSwapForm: {
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
        rolloverSwapForm: {
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
        rolloverSwapForm: {
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
        rolloverSwapForm: {
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
        rolloverSwapForm: {
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
        rolloverSwapForm: {
          userInput: {
            marginAmount: {
              editMode: 'add',
            },
          },
          prospectiveSwap: {
            infoPostSwap: {
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
        rolloverSwapForm: {
          userInput: {
            marginAmount: {
              editMode: 'add',
            },
          },
          prospectiveSwap: {
            infoPostSwap: {
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

  describe('selectAvailableNotional', () => {
    beforeEach(() => {
      (getAvailableNotional as jest.Mock).mockImplementationOnce(
        (state: {
          userInput: {
            notionalAmount: {
              value: number;
            };
          };
          availableMargin: number;
        }) => {
          return state.userInput.notionalAmount.value + state.availableMargin;
        },
      );
    });
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('should call getAvailableNotional with the rolloverSwapForm state', () => {
      const state = {
        rolloverSwapForm: {
          userInput: {
            notionalAmount: {
              value: 1234.5678,
            },
          },
          availableMargin: 5678.1234,
        },
      };
      const result = selectAvailableNotional(state as never);

      expect(result).toBe(6912.6912); // 1234.5678 + 5678.1234
      expect(getAvailableNotional).toHaveBeenCalledWith(state.rolloverSwapForm);
    });
  });

  describe('selectNewPositionReceivingRate', () => {
    beforeEach(() => {
      (getProspectiveSwapMode as jest.Mock).mockImplementationOnce(
        (state: {
          prospectiveSwap: {
            mode: 'fixed' | 'variable';
          };
        }) => {
          return state.prospectiveSwap.mode;
        },
      );
      (getNewPositionFixedRate as jest.Mock).mockImplementationOnce(
        (state: {
          prospectiveSwap: {
            fixedRate: number;
          };
        }) => {
          return state.prospectiveSwap.fixedRate;
        },
      );
      (getVariableRate as jest.Mock).mockImplementationOnce(
        (state: {
          prospectiveSwap: {
            variableRate: number;
          };
        }) => {
          return state.prospectiveSwap.variableRate;
        },
      );
    });
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('should call getNewPositionFixedRate when prospectiveSwap mode is fixed', () => {
      const state = {
        rolloverSwapForm: {
          prospectiveSwap: {
            mode: 'fixed',
            fixedRate: 1.2345,
          },
        },
      };
      const result = selectNewPositionReceivingRate(state as never);

      expect(result).toBe(1.2345);
      expect(getProspectiveSwapMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getNewPositionFixedRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getVariableRate).not.toHaveBeenCalled();
    });

    it('should call getVariableRate when prospectiveSwap mode is variable', () => {
      const state = {
        rolloverSwapForm: {
          prospectiveSwap: {
            mode: 'variable',
            variableRate: 2.3456,
          },
        },
      };

      const result = selectNewPositionReceivingRate(state as never);

      expect(result).toBe(2.3456);
      expect(getProspectiveSwapMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getNewPositionFixedRate).not.toHaveBeenCalled();
      expect(getVariableRate).toHaveBeenCalledWith(state.rolloverSwapForm);
    });
  });

  describe('selectNewPositionPayingRate', () => {
    beforeEach(() => {
      (getProspectiveSwapMode as jest.Mock).mockImplementationOnce(
        (state: {
          prospectiveSwap: {
            mode: 'fixed' | 'variable';
          };
        }) => {
          return state.prospectiveSwap.mode;
        },
      );
      (getNewPositionFixedRate as jest.Mock).mockImplementationOnce(
        (state: {
          prospectiveSwap: {
            fixedRate: number;
          };
        }) => {
          return state.prospectiveSwap.fixedRate;
        },
      );
      (getVariableRate as jest.Mock).mockImplementationOnce(
        (state: {
          prospectiveSwap: {
            variableRate: number;
          };
        }) => {
          return state.prospectiveSwap.variableRate;
        },
      );
    });
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('should call getVariableRate when prospectiveSwap mode is fixed', () => {
      const state = {
        rolloverSwapForm: {
          prospectiveSwap: {
            mode: 'fixed',
            variableRate: 1.2345,
          },
        },
      };
      const result = selectNewPositionPayingRate(state as never);

      expect(result).toBe(1.2345);
      expect(getProspectiveSwapMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getNewPositionFixedRate).not.toHaveBeenCalled();
      expect(getVariableRate).toHaveBeenCalledWith(state.rolloverSwapForm);
    });

    it('should call getNewPositionFixedRate when prospectiveSwap mode is variable', () => {
      const state = {
        rolloverSwapForm: {
          prospectiveSwap: {
            mode: 'variable',
            fixedRate: 2.3456,
          },
        },
      };

      const result = selectNewPositionPayingRate(state as never);

      expect(result).toBe(2.3456);
      expect(getProspectiveSwapMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getNewPositionFixedRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getVariableRate).not.toHaveBeenCalled();
    });
  });

  describe('selectNewPositionCompactNotional', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should return null if notional amount has an error', () => {
      const stateWithNotionalAmountError = {
        rolloverSwapForm: {
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
        rolloverSwapForm: {
          userInput: {
            notionalAmount: {
              error: '',
            },
          },
        },
      };

      (
        getProspectiveSwapNotional as jest.MockedFunction<typeof getProspectiveSwapNotional>
      ).mockReturnValue(1000000);
      (
        formCompactFormatToParts as jest.MockedFunction<typeof formCompactFormatToParts>
      ).mockReturnValue(mockCompactParts);

      const result = selectNewPositionCompactNotional(mockedState as never);

      expect(result).toEqual({
        compactNotionalSuffix: 'M',
        compactNotionalNumber: '1.23',
      });
      expect(getProspectiveSwapNotional).toHaveBeenCalledWith(mockedState.rolloverSwapForm);
      expect(formCompactFormatToParts).toHaveBeenCalledWith(1000000);
    });
  });

  describe('selectExistingPositionMode', () => {
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns the existing position mode from state', () => {
      const state = {
        rolloverSwapForm: {
          position: {
            value: jest.fn(),
          },
        },
      };
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('variable');
      const result = selectExistingPositionMode(state as never);
      expect(getExistingPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(result).toEqual('variable');
    });
  });

  describe('selectExistingPositionReceivingRateFormatted', () => {
    const state = {
      rolloverSwapForm: jest.fn(),
    };
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns the formatted receiving rate for an existing fixed position', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getExistingPositionFixedRate as jest.Mock).mockReturnValueOnce(1.5);
      (formFormatNumber as jest.Mock).mockReturnValueOnce('1.50');

      const result = selectExistingPositionReceivingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getExistingPositionFixedRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(formFormatNumber).toHaveBeenCalledWith(1.5);
      expect(result).toEqual('1.50');
    });

    it('returns the formatted receiving rate for an existing variable position', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('variable');
      (getExistingPositionVariableRate as jest.Mock).mockReturnValueOnce(1.2);
      (formFormatNumber as jest.Mock).mockReturnValueOnce('1.20');

      const result = selectExistingPositionReceivingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getExistingPositionVariableRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(formFormatNumber).toHaveBeenCalledWith(1.2);
      expect(result).toEqual('1.20');
    });

    it('returns "--" if receiving rate is null', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getExistingPositionFixedRate as jest.Mock).mockReturnValueOnce(null);

      const result = selectExistingPositionReceivingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getExistingPositionFixedRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(result).toEqual('--');
    });
  });

  describe('selectExistingPositionPayingRateFormatted', () => {
    const state = {
      rolloverSwapForm: jest.fn(),
    };
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns the formatted paying rate for an existing fixed position', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getExistingPositionVariableRate as jest.Mock).mockReturnValueOnce(1.5);
      (formFormatNumber as jest.Mock).mockReturnValueOnce('1.50');

      const result = selectExistingPositionPayingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getExistingPositionVariableRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(formFormatNumber).toHaveBeenCalledWith(1.5);
      expect(result).toEqual('1.50');
    });

    it('returns the formatted paying rate for an existing variable position', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('variable');
      (getExistingPositionFixedRate as jest.Mock).mockReturnValueOnce(1.2);
      (formFormatNumber as jest.Mock).mockReturnValueOnce('1.20');

      const result = selectExistingPositionPayingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getExistingPositionFixedRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(formFormatNumber).toHaveBeenCalledWith(1.2);
      expect(result).toEqual('1.20');
    });

    it('returns "--" if receiving rate is null', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getExistingPositionVariableRate as jest.Mock).mockReturnValueOnce(null);

      const result = selectExistingPositionPayingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getExistingPositionVariableRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(result).toEqual('--');
    });
  });

  describe('selectExistingPositionCompactNotional', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return null when position status is not "success"', () => {
      const state = {
        rolloverSwapForm: {
          position: {
            status: 'pending',
            value: null,
          },
        },
      } as never;

      const result = selectExistingPositionCompactNotional(state);

      expect(result).toBeNull();
    });

    it('should return null when position value is falsy', () => {
      const state = {
        rolloverSwapForm: {
          position: {
            status: 'success',
            value: null,
          },
        },
      } as never;

      const result = selectExistingPositionCompactNotional(state);

      expect(result).toBeNull();
    });

    it('should return an object with the correct properties when position status is "success" and position value is truthy', () => {
      const state = {
        rolloverSwapForm: {
          position: {
            status: 'success',
            value: {
              notional: '1000000000000000000',
            },
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

  describe('selectEditPositionMode', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call getEditPositionMode with the correct argument', () => {
      const state = {
        rolloverSwapForm: {
          position: {
            status: 'success',
            value: {
              tokenA: 'USDC',
              tokenB: 'ETH',
            },
          },
        },
      };

      selectEditPositionMode(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith({
        position: {
          status: 'success',
          value: {
            tokenA: 'USDC',
            tokenB: 'ETH',
          },
        },
      });
    });

    it('should return the value returned by getEditPositionMode', () => {
      const state = {
        rolloverSwapForm: {
          position: {
            status: 'success',
            value: {
              tokenA: 'USDC',
              tokenB: 'ETH',
            },
          },
        },
      } as never;

      const mode = {
        type: 'my-mode',
        params: {},
      };

      (getEditPositionMode as jest.Mock).mockReturnValueOnce(mode);

      const result = selectEditPositionMode(state);
      expect(result).toEqual(mode);
    });
  });

  describe('selectEditPositionReceivingRateFormatted', () => {
    const state = {
      rolloverSwapForm: jest.fn(),
      cashflowCalculator: jest.fn(),
    };
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns the formatted receiving rate for an editing fixed position', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getEditPositionFixedRate as jest.Mock).mockReturnValueOnce(1.5);
      (formFormatNumber as jest.Mock).mockReturnValueOnce('1.50');

      const result = selectEditPositionReceivingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getEditPositionFixedRate).toHaveBeenCalledWith(
        state.cashflowCalculator,
        state.rolloverSwapForm,
      );
      expect(formFormatNumber).toHaveBeenCalledWith(1.5);
      expect(result).toEqual('1.50');
    });

    it('returns the formatted receiving rate for an editing variable position', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('variable');
      (getEditPositionVariableRate as jest.Mock).mockReturnValueOnce(1.2);
      (formFormatNumber as jest.Mock).mockReturnValueOnce('1.20');

      const result = selectEditPositionReceivingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getEditPositionVariableRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(formFormatNumber).toHaveBeenCalledWith(1.2);
      expect(result).toEqual('1.20');
    });

    it('returns "--" if receiving rate is null', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getEditPositionFixedRate as jest.Mock).mockReturnValueOnce(null);

      const result = selectEditPositionReceivingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getEditPositionFixedRate).toHaveBeenCalledWith(
        state.cashflowCalculator,
        state.rolloverSwapForm,
      );
      expect(result).toEqual('--');
    });
  });

  describe('selectEditPositionPayingRateFormatted', () => {
    const state = {
      rolloverSwapForm: jest.fn(),
      cashflowCalculator: jest.fn(),
    };
    beforeEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns the formatted paying rate for an editing fixed position', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getEditPositionVariableRate as jest.Mock).mockReturnValueOnce(1.5);
      (formFormatNumber as jest.Mock).mockReturnValueOnce('1.50');

      const result = selectEditPositionPayingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getEditPositionVariableRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(formFormatNumber).toHaveBeenCalledWith(1.5);
      expect(result).toEqual('1.50');
    });

    it('returns the formatted paying rate for an editing variable position', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('variable');
      (getEditPositionFixedRate as jest.Mock).mockReturnValueOnce(1.2);
      (formFormatNumber as jest.Mock).mockReturnValueOnce('1.20');

      const result = selectEditPositionPayingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getEditPositionFixedRate).toHaveBeenCalledWith(
        state.cashflowCalculator,
        state.rolloverSwapForm,
      );
      expect(formFormatNumber).toHaveBeenCalledWith(1.2);
      expect(result).toEqual('1.20');
    });

    it('returns "--" if receiving rate is null', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getEditPositionVariableRate as jest.Mock).mockReturnValueOnce(null);

      const result = selectEditPositionPayingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(getEditPositionVariableRate).toHaveBeenCalledWith(state.rolloverSwapForm);
      expect(result).toEqual('--');
    });
  });

  describe('selectEditPositionCompactNotional', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return an object with the correct properties when position status is "success" and position value is truthy', () => {
      const state = {
        rolloverSwapForm: jest.fn(),
      } as never;
      (getEditPositionNotional as jest.Mock).mockReturnValueOnce(1000000000000000000);

      (formCompactFormatToParts as jest.Mock).mockReturnValueOnce({
        compactSuffix: 'ETH',
        compactNumber: '1',
      });

      const result = selectEditPositionCompactNotional(state);

      expect(formCompactFormatToParts as jest.Mock).toHaveBeenCalledWith(1000000000000000000);
      expect(result).toEqual({
        compactNotionalSuffix: 'ETH',
        compactNotionalNumber: '1',
      });
    });
  });

  describe('selectSlippageFormatted', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should return -- if fixedRate status is not success', () => {
      const mockState = {
        rolloverSwapForm: {
          fixedRate: {
            status: 'pending',
            value: null,
          },
          prospectiveSwap: {
            infoPostSwap: {
              status: 'success',
              value: {
                averageFixedRate: 0.08,
              },
            },
          },
        },
      };
      const result = selectSlippageFormatted(mockState as never);
      expect(result).toBe('--');
    });

    it('should return -- if infoPostSwap status is not success', () => {
      const mockState = {
        rolloverSwapForm: {
          fixedRate: {
            status: 'success',
            value: 0.1,
          },
          prospectiveSwap: {
            infoPostSwap: {
              status: 'pending',
              value: null,
            },
          },
        },
      };
      const result = selectSlippageFormatted(mockState as never);
      expect(result).toBe('--');
    });

    it('should return a formatted slippage value', () => {
      const mockState = {
        rolloverSwapForm: {
          amm: {
            fixedApr: 0.1,
          },
          prospectiveSwap: {
            infoPostSwap: {
              status: 'success',
              value: {
                averageFixedRate: 0.008,
              },
            },
          },
        },
      };
      (formFormatNumber as jest.Mock).mockImplementationOnce((n: number) => n.toFixed(3));
      const result = selectSlippageFormatted(mockState as never);
      expect(result).toBe('0.092');
    });

    it('should return 0 if info post swap has 0 notional', () => {
      const mockState = {
        rolloverSwapForm: {
          amm: {
            fixedApr: 0.1,
          },
          prospectiveSwap: {
            infoPostSwap: {
              status: 'success',
              value: {
                variableTokenDeltaBalance: 0,
              },
            },
          },
        },
      };
      (formFormatNumber as jest.Mock).mockImplementationOnce((n: number) => n.toFixed());
      const result = selectSlippageFormatted(mockState as never);
      expect(result).toBe('0');
    });
  });

  describe('selectSwapConfirmationFlowStep', () => {
    it('returns the correct step', () => {
      const state = {
        rolloverSwapForm: {
          swapConfirmationFlow: {
            step: 'confirmSwap',
          },
        },
      };

      expect(selectSwapConfirmationFlowStep(state as never)).toEqual('confirmSwap');
    });
  });

  describe('selectSwapConfirmationFlowError', () => {
    it('returns the correct step', () => {
      const state = {
        rolloverSwapForm: {
          swapConfirmationFlow: {
            error: 'error',
          },
        },
      };

      expect(selectSwapConfirmationFlowError(state as never)).toEqual('error');
    });
  });

  describe('selectSwapConfirmationFlowEtherscanLink', () => {
    it('returns the correct link', () => {
      (getViewOnEtherScanLink as jest.Mock).mockReturnValueOnce('https://etherscan.io/tx/0xabc123');

      const state = {
        network: {
          chainId: 1,
        },
        rolloverSwapForm: {
          swapConfirmationFlow: {
            txHash: '0xabc123',
          },
        },
      };
      const result = selectSwapConfirmationFlowEtherscanLink(state as never);
      expect(getViewOnEtherScanLink).toHaveBeenCalledWith(1, '0xabc123');
      expect(result).toEqual('https://etherscan.io/tx/0xabc123');
    });
  });

  describe('selectVariableRate24hDelta', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('calls formatNumber and stringToBigFloat with the correct arguments', () => {
      const state = {
        rolloverSwapForm: {
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
        rolloverSwapForm: {
          amm: null,
        },
      };

      expect(selectVariableRate24hDelta(state as never)).toBeUndefined();
    });

    it('returns the correct value', () => {
      (formatNumber as jest.Mock).mockReturnValueOnce('50');
      (stringToBigFloat as jest.Mock).mockReturnValueOnce(50);

      const state = {
        rolloverSwapForm: {
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
    it('returns the correct text for the "swap" state', () => {
      const state = {
        rolloverSwapForm: {
          submitButton: {
            state: 'swap',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Swap');
    });

    it('returns the correct text for the "not-enough-balance" state', () => {
      const state = {
        rolloverSwapForm: {
          submitButton: {
            state: 'not-enough-balance',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Not enough balance');
    });

    it('returns the correct text for the "approve" state', () => {
      const state = {
        rolloverSwapForm: {
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
        rolloverSwapForm: {
          submitButton: {
            state: 'approving',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Approving...');
    });

    it('returns the correct text for the "connect-wallet" state', () => {
      const state = {
        rolloverSwapForm: {
          submitButton: {
            state: 'connect-wallet',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Connect Your Wallet to Start Trading');
    });
  });

  describe('selectIsLeverageDisabled', () => {
    const mockState = {
      rolloverSwapForm: jest.fn(),
    };

    it('returns true if getProspectiveSwapNotional returns 0', () => {
      (getProspectiveSwapNotional as jest.Mock).mockReturnValue(0);

      const result = selectIsLeverageDisabled(mockState as never);

      expect(result).toBe(true);
      expect(getProspectiveSwapNotional).toHaveBeenCalledWith(mockState.rolloverSwapForm);
    });

    it('returns false if getProspectiveSwapNotional returns a non-zero value', () => {
      (getProspectiveSwapNotional as jest.Mock).mockReturnValue(100);

      const result = selectIsLeverageDisabled(mockState as never);

      expect(result).toBe(false);
      expect(getProspectiveSwapNotional).toHaveBeenCalledWith(mockState.rolloverSwapForm);
    });
  });

  describe('selectShowLeverageNotification', () => {
    it('returns the value of showLowLeverageNotification from state', () => {
      const state = {
        rolloverSwapForm: {
          showLowLeverageNotification: true,
        },
      };

      const result = selectShowLeverageNotification(state as never);
      expect(result).toEqual(true);
    });
  });

  describe('selectLeverageOptions', () => {
    it('should return the correct leverage options', () => {
      const state = {
        rolloverSwapForm: {
          prospectiveSwap: {
            leverage: {
              maxLeverage: 5,
              options: [2, 3, 4, 5],
            },
          },
        },
      };

      const result = selectLeverageOptions(state as never);

      expect(result).toEqual({
        maxLeverage: 5,
        leverageOptions: ['2', '3', '4', '5'],
      });
    });
  });

  describe('selectIsGetInfoPostSwapLoading', () => {
    it('returns true when infoPostSwap status is "pending"', () => {
      const state = {
        rolloverSwapForm: {
          prospectiveSwap: {
            infoPostSwap: {
              status: 'pending',
            },
          },
        },
      };

      const result = selectIsGetInfoPostSwapLoading(state as never);
      expect(result).toBe(true);
    });

    it('returns false when infoPostSwap status is not "pending"', () => {
      const state = {
        rolloverSwapForm: {
          prospectiveSwap: {
            infoPostSwap: {
              status: 'success',
            },
          },
        },
      };

      const result = selectIsGetInfoPostSwapLoading(state as never);
      expect(result).toBe(false);
    });
  });

  describe('selectPositionMarginFormatted', () => {
    it('should return -- when position value is not available', () => {
      const state = { rolloverSwapForm: { position: { value: null } } };
      const result = selectPositionMarginFormatted(state as never);
      expect(result).toBe('--');
    });

    it('should return the formatted margin value when position value is available', () => {
      const margin = 1234567.89;
      const state = { rolloverSwapForm: { position: { value: { margin } } } };
      const formattedMargin = '1,234,567.89';
      (formCompactFormat as jest.Mock).mockReturnValueOnce(formattedMargin);
      const result = selectPositionMarginFormatted(state as never);
      expect(result).toBe(formattedMargin);
      expect(formCompactFormat).toHaveBeenCalledWith(margin);
    });
  });

  describe('selectFixedRateValueFormatted', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return "--" if amm is null', () => {
      const state = {
        rolloverSwapForm: {
          amm: null,
        },
      };
      const result = selectFixedRateValueFormatted(state as never);
      expect(result).toBe('--');
    });

    it('should return formatted fixed rate value', () => {
      const state = {
        rolloverSwapForm: {
          amm: { fixedApr: 123.456 },
        },
      };
      (formatNumber as jest.Mock).mockImplementationOnce((value: number) => `formatted_${value}`);
      const result = selectFixedRateValueFormatted(state as never);
      expect(result).toBe('formatted_123.456');
      expect(formatNumber).toHaveBeenCalledWith(123.456);
    });
  });

  describe('selectVariableRateValueFormatted', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return "--" if amm is null', () => {
      const state = {
        rolloverSwapForm: {
          amm: null,
        },
      };
      const result = selectVariableRateValueFormatted(state as never);
      expect(result).toBe('--');
    });

    it('should return formatted variable rate value', () => {
      const state = {
        rolloverSwapForm: {
          amm: { variableApy: 123.456 },
        },
      };
      (formatNumber as jest.Mock).mockImplementationOnce((value: number) => `formatted_${value}`);
      const result = selectVariableRateValueFormatted(state as never);
      expect(result).toBe('formatted_123.456');
      expect(formatNumber).toHaveBeenCalledWith(123.456);
    });
  });

  describe('selectMarginRequirementFormatted', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return formatted margin requirement when infoPostSwap status is success', () => {
      const state = {
        rolloverSwapForm: {
          prospectiveSwap: {
            infoPostSwap: {
              status: 'success',
              value: {
                marginRequirement: 0.05,
              },
            },
          },
        },
      };
      (formatNumber as jest.Mock).mockImplementationOnce((value: number) => String(value));

      const result = selectMarginRequirementFormatted(state as never);

      expect(result).toEqual('0.05');
      expect(formatNumber).toHaveBeenCalledWith(0.05, 2, 4);
    });

    it('should return -- when infoPostSwap status is not success', () => {
      const state = {
        rolloverSwapForm: {
          prospectiveSwap: {
            infoPostSwap: {
              status: 'pending',
            },
          },
        },
      };

      const result = selectMarginRequirementFormatted(state as never);
      expect(result).toEqual('--');
    });
  });
});
