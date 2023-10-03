import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatNumber } from '../../../../../utilities/number';
import { formCompactFormat, formCompactFormatToParts, formFormatNumber } from '../../common';
import {
  selectAvailableNotional,
  selectFixedRateInfo,
  selectFixedRateValueFormatted,
  selectInfoPostSwap,
  selectIsGetInfoPostSwapLoading,
  selectIsLeverageDisabled,
  selectMarginRequirementFormatted,
  selectNewPositionCompactNotional,
  selectNewPositionPayingRate,
  selectNewPositionReceivingRate,
  selectPoolMaturityFormatted,
  selectPoolTokenFormatted,
  selectProspectiveSwapFeeFormatted,
  selectProspectiveSwapMode,
  selectProspectiveSwapNotionalFormatted,
  selectSlippageFormatted,
  selectSubmitButtonInfo,
  selectSubmitButtonText,
  selectSwapConfirmationFlowError,
  selectSwapConfirmationFlowEtherscanLink,
  selectSwapConfirmationFlowStep,
  selectSwapFormPool,
  selectUserInputMode,
  selectUserInputNotionalInfo,
  selectVariableRateInfo,
  selectVariableRateValueFormatted,
  selectWalletBalance,
} from './selectors';
import {
  getAvailableNotional,
  getNewPositionFixedRate,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
  getVariableRate,
} from './utils';

// Mock @voltz-protocol/v1-sdk
jest.mock('@voltz-protocol/v1-sdk');

// Mock number utils
jest.mock('../../../../../utilities/number');

// Mock common utils
jest.mock('../../common/utils');

// Mock utils
jest.mock('./utils');

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
          pool: {
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

      const result = selectSwapFormPool(mockState);

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
        swapForm: {
          maxNotionalAvailable: {
            status: 'failure',
            value: 0,
          },
        },
      } as never;

      expect(selectWalletBalance(state)).toEqual('--');
    });

    it('calls formCompactFormat with wallet balance value if status is "success"', () => {
      const state = {
        swapForm: {
          maxNotionalAvailable: {
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
        swapForm: {
          maxNotionalAvailable: {
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
        swapForm: {
          pool: {
            currentFixedRate: 0.5,
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
        swapForm: {
          pool: {
            currentVariableRate: 0.5,
          },
        },
      } as never;
      const variableInfo = selectVariableRateInfo(state);
      expect(variableInfo).toEqual(0.5);
    });
  });

  describe('selectAMMTokenFormatted', () => {
    const mockState = {
      swapForm: {
        pool: {
          id: '1',
          underlyingToken: {
            name: 'usdc',
          },
        },
      },
    } as never;

    it('returns the formatted AMM token name when aMM is defined', () => {
      const result = selectPoolTokenFormatted(mockState);
      expect(result).toBe(' USDC');
    });

    it('returns an empty string when aMM is not defined', () => {
      const emptyState = {
        swapForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectPoolTokenFormatted(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectAMMMaturityFormatted', () => {
    const mockState = {
      swapForm: {
        pool: {
          id: '1',
          termEndTimestampInMS: 1614667200000,
        },
      },
    } as never;

    it('returns the formatted AMM token name when aMM is defined', () => {
      const result = selectPoolMaturityFormatted(mockState);
      expect(result).toBe('02 Mar 2021');
    });

    it('returns an empty string when aMM is not defined', () => {
      const emptyState = {
        swapForm: {
          aMM: undefined,
        },
      } as never;

      const result = selectPoolMaturityFormatted(emptyState);

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

  describe('selectProspectiveSwapFeeFormatted', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('returns the fee formatted correctly when the swapSimulation status is "success"', () => {
      const mockRootState = {
        swapForm: {
          userInput: {
            marginAmount: {
              editMode: 'add',
            },
          },
          prospectiveSwap: {
            swapSimulation: {
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

    it('returns "--" when the swapSimulation status is not "success"', () => {
      const mockRootState = {
        swapForm: {
          userInput: {
            marginAmount: {
              editMode: 'add',
            },
          },
          prospectiveSwap: {
            swapSimulation: {
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

  describe('selectInfoPostSwap', () => {
    it('should select swapSimulation from state', () => {
      const state = {
        swapForm: {
          prospectiveSwap: {
            swapSimulation: { foo: 'bar' },
          },
        },
      } as never;
      expect(selectInfoPostSwap(state)).toEqual({ foo: 'bar' });
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
    beforeEach(() => {
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
    beforeEach(() => {
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
    beforeEach(() => {
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

  describe('selectNewPositionCompactNotional', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should return null if notional amount has an error', () => {
      const stateWithNotionalAmountError = {
        swapForm: {
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
        swapForm: {
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
      expect(getProspectiveSwapNotional).toHaveBeenCalledWith(mockedState.swapForm);
      expect(formCompactFormatToParts).toHaveBeenCalledWith(1000000);
    });
  });

  describe('selectSlippageFormatted', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should return -- if fixedRate status is not success', () => {
      const mockState = {
        swapForm: {
          fixedRate: {
            status: 'pending',
            value: null,
          },
          prospectiveSwap: {
            swapSimulation: {
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

    it('should return -- if swapSimulation status is not success', () => {
      const mockState = {
        swapForm: {
          fixedRate: {
            status: 'success',
            value: 0.1,
          },
          prospectiveSwap: {
            swapSimulation: {
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
          pool: {
            currentFixedRate: 0.1,
          },
          prospectiveSwap: {
            swapSimulation: {
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
        swapForm: {
          pool: {
            currentFixedRate: 0.1,
          },
          prospectiveSwap: {
            swapSimulation: {
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
  });

  describe('selectSubmitButtonText', () => {
    it('returns the correct text for the "paused" state', () => {
      const state = {
        swapForm: {
          submitButton: {
            state: 'paused',
          },
        },
      };
      expect(selectSubmitButtonText(state as never)).toBe('Paused');
    });

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

  describe('selectIsGetInfoPostSwapLoading', () => {
    it('returns true when swapSimulation status is "pending"', () => {
      const state = {
        swapForm: {
          prospectiveSwap: {
            swapSimulation: {
              status: 'pending',
            },
          },
        },
      };

      const result = selectIsGetInfoPostSwapLoading(state as never);
      expect(result).toBe(true);
    });

    it('returns false when swapSimulation status is not "pending"', () => {
      const state = {
        swapForm: {
          prospectiveSwap: {
            swapSimulation: {
              status: 'success',
            },
          },
        },
      };

      const result = selectIsGetInfoPostSwapLoading(state as never);
      expect(result).toBe(false);
    });
  });

  describe('selectFixedRateValueFormatted', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return "--" if amm is null', () => {
      const state = {
        swapForm: {
          pool: null,
        },
      };
      const result = selectFixedRateValueFormatted(state as never);
      expect(result).toBe('--');
    });

    it('should return formatted fixed rate value', () => {
      const state = {
        swapForm: {
          pool: { currentFixedRate: 123.456 },
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
        swapForm: {
          pool: null,
        },
      };
      const result = selectVariableRateValueFormatted(state as never);
      expect(result).toBe('--');
    });

    it('should return formatted variable rate value', () => {
      const state = {
        swapForm: {
          pool: { currentVariableRate: 123.456 },
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

    it('should return formatted margin requirement when swapSimulation status is success', () => {
      const state = {
        swapForm: {
          prospectiveSwap: {
            swapSimulation: {
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

    it('should return -- when swapSimulation status is not success', () => {
      const state = {
        swapForm: {
          prospectiveSwap: {
            swapSimulation: {
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
