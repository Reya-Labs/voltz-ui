import { ExpectedCashflowInfo } from '@voltz-protocol/v1-sdk';

import { getAmmProtocol } from '../../../../utilities/amm';
import { pushEstimatedApyChangeEvent } from './analytics';
import { deprecatedCashflowCalculatorReducer, setCashflowAMMAction } from './reducer';
import { initialState, SliceState } from './state';
import { getExpectedCashflowInfoThunk } from './thunks';

jest.mock('./analytics', () => ({
  pushEstimatedApyChangeEvent: jest.fn(),
}));

jest.mock('../../../../utilities/amm', () => ({
  getAmmProtocol: jest.fn(),
}));

describe('deprecatedCashflowCalculatorReducer', () => {
  let state: SliceState;

  beforeEach(() => {
    state = initialState;
  });

  it('should set the cashflow AMM', () => {
    const amm = jest.fn() as never;
    const nextState = deprecatedCashflowCalculatorReducer(
      {} as never,
      setCashflowAMMAction({
        amm,
      }),
    );
    expect(nextState.aMM).toEqual(amm);
  });

  it('should set the estimated APY', () => {
    const value = 5;
    const account = '0x123';
    const mode = 'fixed';
    const action = {
      type: 'deprecatedCashflowCalculator/setEstimatedApyAction',
      payload: { value, account, mode },
    };
    const nextState = deprecatedCashflowCalculatorReducer(state, action);
    expect(nextState.estimatedApy).toEqual(value);
  });

  it('should push an estimated APY change event if value is not NaN', () => {
    const value = 5;
    const account = '0x123';
    const mode = 'fixed';
    const amm = jest.fn() as never;
    const action = {
      type: 'deprecatedCashflowCalculator/setEstimatedApyAction',
      payload: { value, account, mode },
    };
    (getAmmProtocol as jest.Mock).mockReturnValue('POOL');
    const nextState = deprecatedCashflowCalculatorReducer({ ...state, aMM: amm }, action);
    expect(pushEstimatedApyChangeEvent).toHaveBeenCalledWith({
      estimatedApy: value,
      account,
      pool: 'POOL',
      isFT: true,
    });
    expect(getAmmProtocol).toHaveBeenCalledWith(amm);
    expect(nextState.estimatedApy).toEqual(value);
  });

  it('should set the cashflowInfo status to pending when getExpectedCashflowInfoThunk is pending', () => {
    const nextState = deprecatedCashflowCalculatorReducer(state, {
      type: getExpectedCashflowInfoThunk.pending,
    });
    expect(nextState.cashflowInfo.status).toEqual('pending');
  });

  it('should set the cashflowInfo status to error when getExpectedCashflowInfoThunk is rejected', () => {
    const nextState = deprecatedCashflowCalculatorReducer(state, {
      type: getExpectedCashflowInfoThunk.rejected,
    });
    expect(nextState.cashflowInfo.status).toEqual('error');
  });

  it('should set the cashflowInfo and status to success when getExpectedCashflowInfoThunk is fulfilled', () => {
    const expectedCashflowInfo: ExpectedCashflowInfo = {
      averageFixedRate: 10,
      accruedCashflowEditPosition: 15,
      accruedCashflowExistingPosition: 20,
      estimatedAdditionalCashflow: jest.fn(),
      estimatedTotalCashflow: jest.fn(),
    };
    const action = {
      type: getExpectedCashflowInfoThunk.fulfilled,
      payload: expectedCashflowInfo,
    };
    const nextState = deprecatedCashflowCalculatorReducer(state, action);
    expect(nextState.cashflowInfo).toEqual({
      averageFixedRate: expectedCashflowInfo.averageFixedRate,
      accruedCashflowExistingPosition: expectedCashflowInfo.accruedCashflowExistingPosition,
      accruedCashflowEditPosition: expectedCashflowInfo.accruedCashflowEditPosition,
      estimatedAdditionalCashflow: expectedCashflowInfo.estimatedAdditionalCashflow,
      estimatedTotalCashflow: expectedCashflowInfo.estimatedTotalCashflow,
      status: 'success',
    });
  });
});
