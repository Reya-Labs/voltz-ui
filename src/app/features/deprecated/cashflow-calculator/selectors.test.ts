import {
  selectAMMTokenFormatted,
  selectCashflowAMM,
  selectCashflowInfoStatus,
  selectEstimatedApy,
  selectTotalCashflow,
  selectVariableRateInfo,
} from './selectors';

describe('cashflow-calculator.selectors', () => {
  describe('selectCashflowAMM', () => {
    it('should return the AMM object from the state', () => {
      const mockState = {
        deprecatedCashflowCalculator: {
          aMM: {
            address: '0x123456789abcdef',
            name: 'Test AMM',
          },
        },
      } as never;

      const result = selectCashflowAMM(mockState);

      expect(result).toEqual({
        address: '0x123456789abcdef',
        name: 'Test AMM',
      });
    });
  });

  describe('selectAMMTokenFormatted', () => {
    const mockState = {
      deprecatedCashflowCalculator: {
        aMM: {
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
        deprecatedCashflowCalculator: {
          aMM: undefined,
        },
      } as never;

      const result = selectAMMTokenFormatted(emptyState);

      expect(result).toBe('');
    });
  });

  describe('selectCashflowInfoStatus', () => {
    it('should return the cashflow status from the state', () => {
      const mockState = {
        deprecatedCashflowCalculator: {
          cashflowInfo: {
            status: 'success',
          },
        },
      };
      const result = selectCashflowInfoStatus(mockState as never);
      expect(result).toEqual('success');
    });
  });

  describe('selectTotalCashflow', () => {
    it('should return null if cashflowInfo status is not success', () => {
      const mockState = {
        deprecatedCashflowCalculator: {
          cashflowInfo: {
            status: 'pending',
            estimatedTotalCashflow: jest.fn(),
          },
        },
      };
      const result = selectTotalCashflow(mockState as never);
      expect(result).toBeNull();
    });

    it('should call estimatedTotalCashflow with the estimatedApy value', () => {
      const mockState = {
        deprecatedCashflowCalculator: {
          estimatedApy: 0.05,
          cashflowInfo: {
            status: 'success',
            estimatedTotalCashflow: jest.fn().mockReturnValue(5678.9),
          },
        },
      };

      const result = selectTotalCashflow(mockState as never);
      expect(
        mockState.deprecatedCashflowCalculator.cashflowInfo.estimatedTotalCashflow,
      ).toHaveBeenCalledWith(0.05);
      expect(result).toEqual(5678.9);
    });
  });

  describe('selectEstimatedApy', () => {
    it('should return the estimated APY value from the state', () => {
      const mockState = {
        deprecatedCashflowCalculator: {
          estimatedApy: 0.05,
        },
      };
      const result = selectEstimatedApy(mockState as never);
      expect(result).toEqual(0.05);
    });
  });

  describe('selectVariableRateInfo', () => {
    it('returns the variable rate info from the cashflow calculator slice of state', () => {
      const state = {
        deprecatedCashflowCalculator: {
          aMM: {
            variableApy: 0.5,
          },
        },
      } as never;
      const variableInfo = selectVariableRateInfo(state);
      expect(variableInfo).toEqual(0.5);
    });
  });
});
