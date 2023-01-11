import { Agents } from '../../contexts/AgentContext/types';
import {
  getHealthCounters,
  getNetPayingRate,
  getNetReceivingRate,
  getTotalAccruedCashflow,
  getTotalMargin,
  getTotalNotional,
} from './helpers';
import { positionsMock } from './positions.mock';

describe('usePortfolioPositionsSummary.helpers', () => {
  describe('getHealthCounters', () => {
    it('getHealthCounters should return expected output', () => {
      const retValue = getHealthCounters(positionsMock);
      expect(retValue).toStrictEqual({ danger: 2, healthy: 2, warning: 1 });
    });
  });

  describe('getNetPayingRate', () => {
    test.each([
      [Agents.LIQUIDITY_PROVIDER, 5.130086649572149],
      [Agents.FIXED_TRADER, 0.3728180041060878],
      [Agents.VARIABLE_TRADER, 0.3728180041060878],
    ])('given agent=%p - getNetPayingRate should return expected output', (agent, expected) => {
      const retValue = getNetPayingRate(positionsMock, agent);
      expect(retValue).toBe(expected);
    });
  });

  describe('getNetReceivingRate', () => {
    test.each([
      [Agents.LIQUIDITY_PROVIDER, 93.89919414352443],
      [Agents.FIXED_TRADER, 6.823921804649917],
      [Agents.VARIABLE_TRADER, 6.823921804649917],
    ])('given agent=%p - getNetReceivingRate should return expected output', (agent, expected) => {
      const retValue = getNetReceivingRate(positionsMock, agent);
      expect(retValue).toBe(expected);
    });
  });

  describe('getTotalAccruedCashflow', () => {
    it('getTotalAccruedCashflow should return expected output', () => {
      const retValue = getTotalAccruedCashflow(positionsMock);
      expect(retValue).toBe(29.596643584990144);
    });
  });

  describe('getTotalMargin', () => {
    it('getTotalMargin should return expected output', () => {
      const retValue = getTotalMargin(positionsMock);
      expect(retValue).toBe(783.0346999999999);
    });
  });

  describe('getTotalNotional', () => {
    it('getTotalNotional should return expected output', () => {
      const retValue = getTotalNotional(positionsMock);
      expect(retValue).toBe(4775.31221186018);
    });
  });
});
