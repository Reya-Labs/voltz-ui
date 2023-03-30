import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatNumber, stringToBigFloat } from '../../../utilities/number';
import {
  selectAccruedCashflowExistingPositionFormatted,
  selectAdditionalCashflow,
  selectAMMMaturityFormatted,
  selectAMMTokenFormatted,
  selectAvailableNotional,
  selectBottomRightMarginNumber,
  selectCashflowInfoStatus,
  selectEditPositionCompactNotional,
  selectEditPositionMode,
  selectEditPositionPayingRateFormatted,
  selectEditPositionReceivingRateFormatted,
  selectEstimatedApy,
  selectExistingPositionCompactNotional,
  selectExistingPositionMode,
  selectExistingPositionPayingRateFormatted,
  selectExistingPositionReceivingRateFormatted,
  selectFixedRateInfo,
  selectInfoPostSwap,
  selectIsGetInfoPostSwapLoading,
  selectIsLeverageDisabled,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectLeverage,
  selectLeverageOptions,
  selectMarginAccountName,
  selectMarginUpdateConfirmationFlowError,
  selectMarginUpdateConfirmationFlowEtherscanLink,
  selectMarginUpdateConfirmationFlowStep,
  selectNewPositionPayingRate,
  selectNewPositionReceivingRate,
  selectPoolSwapInfoStatus,
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
  selectTotalCashflow,
  selectUserInputMarginInfo,
  selectUserInputMode,
  selectUserInputNotionalInfo,
  selectVariableRate24hDelta,
  selectVariableRateInfo,
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
  swapFormCompactFormat,
  swapFormCompactFormatToParts,
  swapFormFormatNumber,
  swapFormLimitAndFormatNumber,
} from './utils';

// Mock @voltz-protocol/v1-sdk
jest.mock('@voltz-protocol/v1-sdk', () => ({
  getViewOnEtherScanLink: jest.fn(),
}));

// Mock number utils
jest.mock('../../../utilities/number', () => ({
  formatNumber: jest.fn(),
  stringToBigFloat: jest.fn(),
}));

// Mock utils
jest.mock('./utils', () => ({
  swapFormCompactFormat: jest.fn(),
  hasExistingPosition: jest.fn(),
  getProspectiveSwapMode: jest.fn(),
  getProspectiveSwapNotional: jest.fn(),
  getProspectiveSwapMargin: jest.fn(),
  swapFormFormatNumber: jest.fn(),
  swapFormLimitAndFormatNumber: jest.fn(),
  getAvailableMargin: jest.fn(),
  getAvailableNotional: jest.fn(),
  getNewPositionFixedRate: jest.fn(),
  getVariableRate: jest.fn(),
  getExistingPositionMode: jest.fn(),
  getExistingPositionFixedRate: jest.fn(),
  getExistingPositionVariableRate: jest.fn(),
  swapFormCompactFormatToParts: jest.fn(),
  getEditPositionMode: jest.fn(),
  getEditPositionFixedRate: jest.fn(),
  getEditPositionVariableRate: jest.fn(),
  getEditPositionNotional: jest.fn(),
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

  describe('selectPoolSwapInfoStatus', () => {
    const mockRootState = {
      swapForm: {
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
      swapForm: {
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

      expect(hasExistingPosition).toHaveBeenCalledWith(mockState.swapForm);
      expect(result).toBe('edit');
    });

    it('returns "new" when hasExistingPosition returns false', () => {
      (hasExistingPosition as jest.Mock).mockReturnValueOnce(false);

      const result = selectSwapFormMode(mockState as never);

      expect(hasExistingPosition).toHaveBeenCalledWith(mockState.swapForm);
      expect(result).toBe('new');
    });
  });

  describe('selectAMMTokenFormatted', () => {
    const mockState = {
      swapForm: {
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
        swapForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectAMMTokenFormatted(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectAMMMaturityFormatted', () => {
    const mockState = {
      swapForm: {
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
        swapForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectAMMMaturityFormatted(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectMarginAccountName', () => {
    const mockState = {
      swapForm: {
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
        swapForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectMarginAccountName(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectUserInputMode', () => {
    const mockState = {
      swapForm: {
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
      swapForm: {
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
      swapForm: {
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
      swapForm: {},
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('calls getProspectiveSwapMode with the correct arguments', () => {
      selectProspectiveSwapMode(mockState as never);

      expect(getProspectiveSwapMode).toHaveBeenCalledTimes(1);
      expect(getProspectiveSwapMode).toHaveBeenCalledWith(mockState.swapForm);
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
      swapForm: {},
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('calls getProspectiveSwapNotional with the correct arguments', () => {
      selectProspectiveSwapNotionalFormatted(mockState as never);

      expect(getProspectiveSwapNotional).toHaveBeenCalledTimes(1);
      expect(getProspectiveSwapNotional).toHaveBeenCalledWith(mockState.swapForm);
    });

    it('calls swapFormCompactFormat with the correct arguments', () => {
      const mockNotional = 'test';
      (getProspectiveSwapNotional as jest.Mock).mockReturnValue(mockNotional);

      selectProspectiveSwapNotionalFormatted(mockState as never);

      expect(swapFormCompactFormat).toHaveBeenCalledTimes(1);
      expect(swapFormCompactFormat).toHaveBeenCalledWith(mockNotional);
    });

    it('returns the correctly formatted prospective swap notional', () => {
      const mockFormattedNotional = 'test';
      (swapFormCompactFormat as jest.Mock).mockReturnValue(mockFormattedNotional);

      const result = selectProspectiveSwapNotionalFormatted(mockState as never);
      expect(result).toBe(mockFormattedNotional);
    });
  });

  describe('selectProspectiveSwapMarginFormatted', () => {
    const mockState = {
      swapForm: {
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
      (swapFormCompactFormat as jest.MockedFunction<typeof swapFormCompactFormat>).mockReturnValue(
        formattedMargin,
      );

      const result = selectProspectiveSwapMarginFormatted(mockState as never);

      expect(result).toEqual(formattedMargin);
      expect(getProspectiveSwapMargin).toHaveBeenCalledWith(mockState.swapForm);
      expect(swapFormCompactFormat).toHaveBeenCalledWith(
        prospectiveMargin - mockState.swapForm.prospectiveSwap.infoPostSwap.value.fee,
      );
    });

    it('returns formatted prospective swap margin minus fee when editMode is "add"', () => {
      const prospectiveMargin = 100;
      const formattedMargin = '90.00';
      (
        getProspectiveSwapMargin as jest.MockedFunction<typeof getProspectiveSwapMargin>
      ).mockReturnValue(prospectiveMargin);
      (swapFormCompactFormat as jest.MockedFunction<typeof swapFormCompactFormat>).mockReturnValue(
        formattedMargin,
      );

      const result = selectProspectiveSwapMarginFormatted(mockState as never);

      expect(result).toEqual(formattedMargin);
      expect(getProspectiveSwapMargin).toHaveBeenCalledWith(mockState.swapForm);
      expect(swapFormCompactFormat).toHaveBeenCalledWith(prospectiveMargin - 10);
    });
  });

  describe('selectProspectiveSwapFeeFormatted', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('returns the fee formatted correctly when the infoPostSwap status is "success"', () => {
      const mockRootState = {
        swapForm: {
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
      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('10.00');

      const result = selectProspectiveSwapFeeFormatted(mockRootState as never);
      expect(result).toEqual('10.00');
      expect(swapFormFormatNumber).toHaveBeenCalledWith(10);
    });

    it('returns "--" when the infoPostSwap status is not "success"', () => {
      const mockRootState = {
        swapForm: {
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
      expect(swapFormFormatNumber).not.toHaveBeenCalled();
    });
  });

  describe('selectLeverage', () => {
    it('should select leverage from state', () => {
      const state = {
        swapForm: {
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
        swapForm: {
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
        swapForm: {
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
        swapForm: {
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
        swapForm: {
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
        swapForm: {
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
        swapForm: {
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
      (swapFormLimitAndFormatNumber as jest.Mock).mockImplementationOnce(
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
    afterEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('should return a formatted available margin if margin amount edit mode is "remove"', () => {
      const state = {
        swapForm: {
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
      expect(swapFormLimitAndFormatNumber).toHaveBeenCalledWith(1234.5678, 'floor');
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
        swapForm: {
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
      expect(swapFormLimitAndFormatNumber).toHaveBeenCalledWith(5678.1234, 'ceil');
      expect(getAvailableMargin).not.toHaveBeenCalled(); // should not be called in this case
    });

    it('should return null if neither condition is met', () => {
      const state = {
        swapForm: {
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
      expect(swapFormLimitAndFormatNumber).not.toHaveBeenCalled(); // should not be called in this case
      expect(getAvailableMargin).not.toHaveBeenCalled(); // should not be called in this case
    });
  });

  describe('selectAvailableNotional', () => {
    beforeEach(() => {
      (getAvailableNotional as jest.Mock).mockImplementationOnce(
        (swapFormState: {
          userInput: {
            notionalAmount: {
              value: number;
            };
          };
          availableMargin: number;
        }) => {
          return swapFormState.userInput.notionalAmount.value + swapFormState.availableMargin;
        },
      );
    });
    afterEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('should call getAvailableNotional with the swapForm state', () => {
      const state = {
        swapForm: {
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
      expect(getAvailableNotional).toHaveBeenCalledWith(state.swapForm);
    });
  });

  describe('selectNewPositionReceivingRate', () => {
    beforeEach(() => {
      (getProspectiveSwapMode as jest.Mock).mockImplementationOnce(
        (swapFormState: {
          prospectiveSwap: {
            mode: 'fixed' | 'variable';
          };
        }) => {
          return swapFormState.prospectiveSwap.mode;
        },
      );
      (getNewPositionFixedRate as jest.Mock).mockImplementationOnce(
        (swapFormState: {
          prospectiveSwap: {
            fixedRate: number;
          };
        }) => {
          return swapFormState.prospectiveSwap.fixedRate;
        },
      );
      (getVariableRate as jest.Mock).mockImplementationOnce(
        (swapFormState: {
          prospectiveSwap: {
            variableRate: number;
          };
        }) => {
          return swapFormState.prospectiveSwap.variableRate;
        },
      );
    });
    afterEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('should call getNewPositionFixedRate when prospectiveSwap mode is fixed', () => {
      const state = {
        swapForm: {
          prospectiveSwap: {
            mode: 'fixed',
            fixedRate: 1.2345,
          },
        },
      };
      const result = selectNewPositionReceivingRate(state as never);

      expect(result).toBe(1.2345);
      expect(getProspectiveSwapMode).toHaveBeenCalledWith(state.swapForm);
      expect(getNewPositionFixedRate).toHaveBeenCalledWith(state.swapForm);
      expect(getVariableRate).not.toHaveBeenCalled();
    });

    it('should call getVariableRate when prospectiveSwap mode is variable', () => {
      const state = {
        swapForm: {
          prospectiveSwap: {
            mode: 'variable',
            variableRate: 2.3456,
          },
        },
      };

      const result = selectNewPositionReceivingRate(state as never);

      expect(result).toBe(2.3456);
      expect(getProspectiveSwapMode).toHaveBeenCalledWith(state.swapForm);
      expect(getNewPositionFixedRate).not.toHaveBeenCalled();
      expect(getVariableRate).toHaveBeenCalledWith(state.swapForm);
    });
  });

  describe('selectNewPositionPayingRate', () => {
    beforeEach(() => {
      (getProspectiveSwapMode as jest.Mock).mockImplementationOnce(
        (swapFormState: {
          prospectiveSwap: {
            mode: 'fixed' | 'variable';
          };
        }) => {
          return swapFormState.prospectiveSwap.mode;
        },
      );
      (getNewPositionFixedRate as jest.Mock).mockImplementationOnce(
        (swapFormState: {
          prospectiveSwap: {
            fixedRate: number;
          };
        }) => {
          return swapFormState.prospectiveSwap.fixedRate;
        },
      );
      (getVariableRate as jest.Mock).mockImplementationOnce(
        (swapFormState: {
          prospectiveSwap: {
            variableRate: number;
          };
        }) => {
          return swapFormState.prospectiveSwap.variableRate;
        },
      );
    });
    afterEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('should call getVariableRate when prospectiveSwap mode is fixed', () => {
      const state = {
        swapForm: {
          prospectiveSwap: {
            mode: 'fixed',
            variableRate: 1.2345,
          },
        },
      };
      const result = selectNewPositionPayingRate(state as never);

      expect(result).toBe(1.2345);
      expect(getProspectiveSwapMode).toHaveBeenCalledWith(state.swapForm);
      expect(getNewPositionFixedRate).not.toHaveBeenCalled();
      expect(getVariableRate).toHaveBeenCalledWith(state.swapForm);
    });

    it('should call getNewPositionFixedRate when prospectiveSwap mode is variable', () => {
      const state = {
        swapForm: {
          prospectiveSwap: {
            mode: 'variable',
            fixedRate: 2.3456,
          },
        },
      };

      const result = selectNewPositionPayingRate(state as never);

      expect(result).toBe(2.3456);
      expect(getProspectiveSwapMode).toHaveBeenCalledWith(state.swapForm);
      expect(getNewPositionFixedRate).toHaveBeenCalledWith(state.swapForm);
      expect(getVariableRate).not.toHaveBeenCalled();
    });
  });

  describe('selectExistingPositionMode', () => {
    afterEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns the existing position mode from state', () => {
      const state = {
        swapForm: {
          position: {
            value: jest.fn(),
          },
        },
      };
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('variable');
      const result = selectExistingPositionMode(state as never);
      expect(getExistingPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(result).toEqual('variable');
    });
  });

  describe('selectExistingPositionReceivingRateFormatted', () => {
    const state = {
      swapForm: jest.fn(),
    };
    afterEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns the formatted receiving rate for an existing fixed position', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getExistingPositionFixedRate as jest.Mock).mockReturnValueOnce(1.5);
      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('1.50');

      const result = selectExistingPositionReceivingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getExistingPositionFixedRate).toHaveBeenCalledWith(state.swapForm);
      expect(swapFormFormatNumber).toHaveBeenCalledWith(1.5);
      expect(result).toEqual('1.50');
    });

    it('returns the formatted receiving rate for an existing variable position', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('variable');
      (getExistingPositionVariableRate as jest.Mock).mockReturnValueOnce(1.2);
      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('1.20');

      const result = selectExistingPositionReceivingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getExistingPositionVariableRate).toHaveBeenCalledWith(state.swapForm);
      expect(swapFormFormatNumber).toHaveBeenCalledWith(1.2);
      expect(result).toEqual('1.20');
    });

    it('returns "--" if receiving rate is null', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getExistingPositionFixedRate as jest.Mock).mockReturnValueOnce(null);

      const result = selectExistingPositionReceivingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getExistingPositionFixedRate).toHaveBeenCalledWith(state.swapForm);
      expect(result).toEqual('--');
    });
  });

  describe('selectExistingPositionPayingRateFormatted', () => {
    const state = {
      swapForm: jest.fn(),
    };
    afterEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns the formatted paying rate for an existing fixed position', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getExistingPositionVariableRate as jest.Mock).mockReturnValueOnce(1.5);
      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('1.50');

      const result = selectExistingPositionPayingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getExistingPositionVariableRate).toHaveBeenCalledWith(state.swapForm);
      expect(swapFormFormatNumber).toHaveBeenCalledWith(1.5);
      expect(result).toEqual('1.50');
    });

    it('returns the formatted paying rate for an existing variable position', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('variable');
      (getExistingPositionFixedRate as jest.Mock).mockReturnValueOnce(1.2);
      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('1.20');

      const result = selectExistingPositionPayingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getExistingPositionFixedRate).toHaveBeenCalledWith(state.swapForm);
      expect(swapFormFormatNumber).toHaveBeenCalledWith(1.2);
      expect(result).toEqual('1.20');
    });

    it('returns "--" if receiving rate is null', () => {
      (getExistingPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getExistingPositionVariableRate as jest.Mock).mockReturnValueOnce(null);

      const result = selectExistingPositionPayingRateFormatted(state as never);

      expect(getExistingPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getExistingPositionVariableRate).toHaveBeenCalledWith(state.swapForm);
      expect(result).toEqual('--');
    });
  });

  describe('selectExistingPositionCompactNotional', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return null when position status is not "success"', () => {
      const state = {
        swapForm: {
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
        swapForm: {
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
        swapForm: {
          position: {
            status: 'success',
            value: {
              notional: '1000000000000000000',
            },
          },
        },
      } as never;

      (swapFormCompactFormatToParts as jest.Mock).mockReturnValueOnce({
        compactSuffix: 'ETH',
        compactNumber: '1',
      });

      const result = selectExistingPositionCompactNotional(state);

      expect(swapFormCompactFormatToParts as jest.Mock).toHaveBeenCalledWith('1000000000000000000');
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
        swapForm: {
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
        swapForm: {
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
      swapForm: jest.fn(),
    };
    afterEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns the formatted receiving rate for an editing fixed position', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getEditPositionFixedRate as jest.Mock).mockReturnValueOnce(1.5);
      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('1.50');

      const result = selectEditPositionReceivingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getEditPositionFixedRate).toHaveBeenCalledWith(state.swapForm);
      expect(swapFormFormatNumber).toHaveBeenCalledWith(1.5);
      expect(result).toEqual('1.50');
    });

    it('returns the formatted receiving rate for an editing variable position', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('variable');
      (getEditPositionVariableRate as jest.Mock).mockReturnValueOnce(1.2);
      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('1.20');

      const result = selectEditPositionReceivingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getEditPositionVariableRate).toHaveBeenCalledWith(state.swapForm);
      expect(swapFormFormatNumber).toHaveBeenCalledWith(1.2);
      expect(result).toEqual('1.20');
    });

    it('returns "--" if receiving rate is null', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getEditPositionFixedRate as jest.Mock).mockReturnValueOnce(null);

      const result = selectEditPositionReceivingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getEditPositionFixedRate).toHaveBeenCalledWith(state.swapForm);
      expect(result).toEqual('--');
    });
  });

  describe('selectEditPositionPayingRateFormatted', () => {
    const state = {
      swapForm: jest.fn(),
    };
    afterEach(() => {
      // Clear mock call history after each test
      jest.clearAllMocks();
    });

    it('returns the formatted paying rate for an editing fixed position', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getEditPositionVariableRate as jest.Mock).mockReturnValueOnce(1.5);
      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('1.50');

      const result = selectEditPositionPayingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getEditPositionVariableRate).toHaveBeenCalledWith(state.swapForm);
      expect(swapFormFormatNumber).toHaveBeenCalledWith(1.5);
      expect(result).toEqual('1.50');
    });

    it('returns the formatted paying rate for an editing variable position', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('variable');
      (getEditPositionFixedRate as jest.Mock).mockReturnValueOnce(1.2);
      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('1.20');

      const result = selectEditPositionPayingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getEditPositionFixedRate).toHaveBeenCalledWith(state.swapForm);
      expect(swapFormFormatNumber).toHaveBeenCalledWith(1.2);
      expect(result).toEqual('1.20');
    });

    it('returns "--" if receiving rate is null', () => {
      (getEditPositionMode as jest.Mock).mockReturnValueOnce('fixed');
      (getEditPositionVariableRate as jest.Mock).mockReturnValueOnce(null);

      const result = selectEditPositionPayingRateFormatted(state as never);

      expect(getEditPositionMode).toHaveBeenCalledWith(state.swapForm);
      expect(getEditPositionVariableRate).toHaveBeenCalledWith(state.swapForm);
      expect(result).toEqual('--');
    });
  });

  describe('selectEditPositionCompactNotional', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return an object with the correct properties when position status is "success" and position value is truthy', () => {
      const state = {
        swapForm: jest.fn(),
      } as never;
      (getEditPositionNotional as jest.Mock).mockReturnValueOnce(1000000000000000000);

      (swapFormCompactFormatToParts as jest.Mock).mockReturnValueOnce({
        compactSuffix: 'ETH',
        compactNumber: '1',
      });

      const result = selectEditPositionCompactNotional(state);

      expect(swapFormCompactFormatToParts as jest.Mock).toHaveBeenCalledWith(1000000000000000000);
      expect(result).toEqual({
        compactNotionalSuffix: 'ETH',
        compactNotionalNumber: '1',
      });
    });
  });

  describe('selectEstimatedApy', () => {
    it('should return the estimated APY value from the state', () => {
      const mockState = {
        swapForm: {
          userInput: {
            estimatedApy: 0.05,
          },
          prospectiveSwap: {
            cashflowInfo: {
              status: 'success',
            },
          },
        },
      };
      const result = selectEstimatedApy(mockState as never);
      expect(result).toEqual(0.05);
    });
  });

  describe('selectCashflowInfoStatus', () => {
    it('should return the estimated APY value from the state', () => {
      const mockState = {
        swapForm: {
          userInput: {
            estimatedApy: 0.05,
          },
          prospectiveSwap: {
            cashflowInfo: {
              status: 'success',
            },
          },
        },
      };
      const result = selectCashflowInfoStatus(mockState as never);
      expect(result).toEqual('success');
    });
  });

  describe('selectAccruedCashflowExistingPositionFormatted', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should call swapFormFormatNumber with the accrued cashflow value when cashflowInfo status is success', () => {
      const mockState = {
        swapForm: {
          userInput: {},
          prospectiveSwap: {
            cashflowInfo: {
              status: 'success',
              accruedCashflowExistingPosition: 1234.5678,
            },
          },
        },
      };
      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('1,234.57');

      const result = selectAccruedCashflowExistingPositionFormatted(mockState as never);
      expect(swapFormFormatNumber).toHaveBeenCalledWith(1234.5678);
      expect(result).toEqual('1,234.57');
    });

    it('should return "--" when cashflowInfo status is pending', () => {
      const mockState = {
        swapForm: {
          userInput: {},
          prospectiveSwap: {
            cashflowInfo: {
              status: 'pending',
              accruedCashflowExistingPosition: 0,
            },
          },
        },
      } as never;

      (swapFormFormatNumber as jest.Mock).mockReturnValueOnce('1,234.57');

      const result = selectAccruedCashflowExistingPositionFormatted(mockState);
      expect(swapFormFormatNumber).not.toHaveBeenCalled();
      expect(result).toEqual('--');
    });
  });

  describe('selectAdditionalCashflow', () => {
    it('should return null if cashflowInfo status is not success', () => {
      const mockState = {
        swapForm: {
          userInput: {
            estimatedApy: 0.05,
          },
          prospectiveSwap: {
            cashflowInfo: {
              status: 'pending',
              estimatedAdditionalCashflow: jest.fn(),
            },
          },
        },
      };
      const result = selectAdditionalCashflow(mockState as never);
      expect(result).toBeNull();
    });

    it('should call estimatedAdditionalCashflow with the estimatedApy value from userInput', () => {
      const mockState = {
        swapForm: {
          userInput: {
            estimatedApy: 0.05,
          },
          prospectiveSwap: {
            cashflowInfo: {
              status: 'success',
              estimatedAdditionalCashflow: jest.fn().mockReturnValue(1234.56),
            },
          },
        },
      };
      const result = selectAdditionalCashflow(mockState as never);
      expect(
        mockState.swapForm.prospectiveSwap.cashflowInfo.estimatedAdditionalCashflow,
      ).toHaveBeenCalledWith(0.05);
      expect(result).toEqual(1234.56);
    });
  });

  describe('selectTotalCashflow', () => {
    it('should return null if cashflowInfo status is not success', () => {
      const mockState = {
        swapForm: {
          userInput: {
            estimatedApy: 0.05,
          },
          prospectiveSwap: {
            cashflowInfo: {
              status: 'pending',
              estimatedTotalCashflow: jest.fn(),
            },
          },
        },
      };
      const result = selectTotalCashflow(mockState as never);
      expect(result).toBeNull();
    });

    it('should call estimatedTotalCashflow with the estimatedApy value from userInput', () => {
      const mockState = {
        swapForm: {
          userInput: {
            estimatedApy: 0.05,
          },
          prospectiveSwap: {
            cashflowInfo: {
              status: 'success',
              estimatedTotalCashflow: jest.fn().mockReturnValue(5678.9),
            },
          },
        },
      };

      const result = selectTotalCashflow(mockState as never);
      expect(
        mockState.swapForm.prospectiveSwap.cashflowInfo.estimatedTotalCashflow,
      ).toHaveBeenCalledWith(0.05);
      expect(result).toEqual(5678.9);
    });
  });

  describe('selectSlippageFormatted', () => {
    it('should return -- if fixedRate status is not success', () => {
      const mockState = {
        swapForm: {
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
        swapForm: {
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
        swapForm: {
          fixedRate: {
            status: 'success',
            value: 0.1,
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
      (formatNumber as jest.Mock).mockImplementationOnce((n) => n.toFixed(2));
      const result = selectSlippageFormatted(mockState as never);
      expect(result).toBe('0.02');
    });
  });

  describe('selectSwapConfirmationFlowStep', () => {
    it('returns the correct step', () => {
      const state = {
        swapForm: {
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
        swapForm: {
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
        swapForm: {
          swapConfirmationFlow: {
            txHash: '0xabc123',
          },
        },
      };
      const result = selectSwapConfirmationFlowEtherscanLink(state as never);
      expect(getViewOnEtherScanLink).toHaveBeenCalledWith(1, '0xabc123');
      expect(result).toEqual('https://etherscan.io/tx/0xabc123');
    });

    describe('selectMarginUpdateConfirmationFlowStep', () => {
      it('returns the correct step', () => {
        const state = {
          swapForm: {
            marginUpdateConfirmationFlow: {
              step: 'confirmSwap',
            },
          },
        };

        expect(selectMarginUpdateConfirmationFlowStep(state as never)).toEqual('confirmSwap');
      });
    });

    describe('selectMarginUpdateConfirmationFlowError', () => {
      it('returns the correct step', () => {
        const state = {
          swapForm: {
            marginUpdateConfirmationFlow: {
              error: 'error',
            },
          },
        };

        expect(selectMarginUpdateConfirmationFlowError(state as never)).toEqual('error');
      });
    });

    describe('selectMarginUpdateConfirmationFlowEtherscanLink', () => {
      it('returns the correct link', () => {
        (getViewOnEtherScanLink as jest.Mock).mockReturnValueOnce(
          'https://etherscan.io/tx/0xabc123',
        );

        const state = {
          network: {
            chainId: 1,
          },
          swapForm: {
            marginUpdateConfirmationFlow: {
              txHash: '0xabc123',
            },
          },
        };
        const result = selectMarginUpdateConfirmationFlowEtherscanLink(state as never);
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
          swapForm: {
            variableRate24hAgo: {
              status: 'success',
              value: 100,
            },
            variableRate: {
              status: 'success',
              value: 150,
            },
          },
        };
        (formatNumber as jest.Mock).mockReturnValueOnce('50');
        selectVariableRate24hDelta(state as never);

        expect(formatNumber).toHaveBeenCalledWith(50, 0, 3);
        expect(stringToBigFloat).toHaveBeenCalledWith('50');
      });

      it('returns undefined if either variableRate24hAgo or variableRate has a status other than success', () => {
        const state1 = {
          swapForm: {
            variableRate24hAgo: {
              status: 'failure',
              value: null,
            },
            variableRate: {
              status: 'success',
              value: 150,
            },
          },
        };

        const state2 = {
          swapForm: {
            variableRate24hAgo: {
              status: 'success',
              value: 100,
            },
            variableRate: {
              status: 'failure',
              value: null,
            },
          },
        };

        expect(selectVariableRate24hDelta(state1 as never)).toBeUndefined();
        expect(selectVariableRate24hDelta(state2 as never)).toBeUndefined();
      });

      it('returns the correct value', () => {
        (formatNumber as jest.Mock).mockReturnValueOnce('50');
        (stringToBigFloat as jest.Mock).mockReturnValueOnce(50);

        const state = {
          swapForm: {
            variableRate24hAgo: {
              status: 'success',
              value: 100,
            },
            variableRate: {
              status: 'success',
              value: 150,
            },
          },
        };

        expect(selectVariableRate24hDelta(state as never)).toEqual(50);
      });
    });

    describe('selectSubmitButtonText', () => {
      it('returns the correct text for the "swap" state', () => {
        const state = {
          swapForm: {
            submitButton: {
              state: 'swap',
            },
          },
        };
        expect(selectSubmitButtonText(state as never)).toBe('Swap');
      });

      it('returns the correct text for the "margin-update" state', () => {
        const state = {
          swapForm: {
            submitButton: {
              state: 'margin-update',
            },
          },
        };
        expect(selectSubmitButtonText(state as never)).toBe('Update margin');
      });

      it('returns the correct text for the "not-enough-balance" state', () => {
        const state = {
          swapForm: {
            submitButton: {
              state: 'not-enough-balance',
            },
          },
        };
        expect(selectSubmitButtonText(state as never)).toBe('Not enough balance');
      });

      it('returns the correct text for the "approve" state', () => {
        const state = {
          swapForm: {
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
          swapForm: {
            submitButton: {
              state: 'approving',
            },
          },
        };
        expect(selectSubmitButtonText(state as never)).toBe('Approving...');
      });

      it('returns the correct text for the "connect-wallet" state', () => {
        const state = {
          swapForm: {
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
        swapForm: jest.fn(),
      };

      it('returns true if getProspectiveSwapNotional returns 0', () => {
        (getProspectiveSwapNotional as jest.Mock).mockReturnValue(0);

        const result = selectIsLeverageDisabled(mockState as never);

        expect(result).toBe(true);
        expect(getProspectiveSwapNotional).toHaveBeenCalledWith(mockState.swapForm);
      });

      it('returns false if getProspectiveSwapNotional returns a non-zero value', () => {
        (getProspectiveSwapNotional as jest.Mock).mockReturnValue(100);

        const result = selectIsLeverageDisabled(mockState as never);

        expect(result).toBe(false);
        expect(getProspectiveSwapNotional).toHaveBeenCalledWith(mockState.swapForm);
      });
    });

    describe('selectShowLeverageNotification', () => {
      it('returns the value of showLowLeverageNotification from state', () => {
        const state = {
          swapForm: {
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
          swapForm: {
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
          swapForm: {
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
          swapForm: {
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
  });
});
