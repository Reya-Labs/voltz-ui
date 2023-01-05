import { Agents } from '../../contexts/AgentContext/types';
import { getPoolButtonId, getRowButtonId } from './helpers';

describe('googleAnalytics.helpers', () => {
  describe('getPoolButtonId', () => {
    test.each([
      [
        'marginAction',
        'liquidityAction',
        'notionalAction',
        'Fixed Trader',
        true,
        'protocol',
        'Protocol:protocol_borrow_MarginAction:marginAction_LiquidityAction:liquidityAction_NotionalAction:notionalAction_Agent:ft',
      ],
      [
        'marginAction',
        'liquidityAction',
        'notionalAction',
        'Fixed Trader',
        false,
        'protocol',
        'Protocol:protocol_MarginAction:marginAction_LiquidityAction:liquidityAction_NotionalAction:notionalAction_Agent:ft',
      ],
      [
        'marginAction',
        'liquidityAction',
        'notionalAction',
        'Variable Trader',
        true,
        'protocol',
        'Protocol:protocol_borrow_MarginAction:marginAction_LiquidityAction:liquidityAction_NotionalAction:notionalAction_Agent:vt',
      ],
      [
        'marginAction',
        'liquidityAction',
        'notionalAction',
        'Variable Trader',
        false,
        'protocol',
        'Protocol:protocol_MarginAction:marginAction_LiquidityAction:liquidityAction_NotionalAction:notionalAction_Agent:vt',
      ],
      [
        'marginAction',
        'liquidityAction',
        'notionalAction',
        'Liquidity Provider',
        true,
        'protocol',
        'Protocol:protocol_borrow_MarginAction:marginAction_LiquidityAction:liquidityAction_NotionalAction:notionalAction_Agent:lp',
      ],
      [
        'marginAction',
        'liquidityAction',
        'notionalAction',
        'Liquidity Provider',
        false,
        'protocol',
        'Protocol:protocol_MarginAction:marginAction_LiquidityAction:liquidityAction_NotionalAction:notionalAction_Agent:lp',
      ],
    ])(
      'given: marginAction=%p,liquidityAction=%p,notionalAction=%p,agent=%p,isBorrowing=%p,protocol=%p - getPoolButtonId should return expected output',
      (marginAction, liquidityAction, notionalAction, agent, isBorrowing, protocol, expected) => {
        const retValue = getPoolButtonId(
          marginAction,
          liquidityAction,
          notionalAction,
          agent as Agents,
          isBorrowing,
          protocol,
        );
        expect(retValue).toBe(expected);
      },
    );
  });
  describe('getRowButtonId', () => {
    test.each([
      [true, 'protocol', true, 'ROW_Protocol:protocol_borrow_Agent:lp'],
      [true, 'protocol', false, 'ROW_Protocol:protocol_Agent:lp'],
      [false, 'protocol', true, 'ROW_Protocol:protocol_borrow_Agent:trader'],
      [false, 'protocol', false, 'ROW_Protocol:protocol_Agent:trader'],
    ])(
      'given isLp=%p,protocol=%p,borrow=%p - getRowButtonId should return expected output',
      (isLp, protocol, borrow, expected) => {
        const retValue = getRowButtonId(isLp, protocol, borrow);
        expect(retValue).toBe(expected);
      },
    );
  });
});
