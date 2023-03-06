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
      [Agents.LIQUIDITY_PROVIDER, 0],
      [Agents.FIXED_TRADER, 1.3607542104729577],
      [Agents.VARIABLE_TRADER, 1.3607542104729577],
    ])('given agent=%p - getNetPayingRate should return expected output', (agent, expected) => {
      const retValue = getNetPayingRate(positionsMock, agent);
      expect(retValue).toBe(expected);
    });
  });

  describe('getNetReceivingRate', () => {
    test.each([
      [Agents.LIQUIDITY_PROVIDER, 0],
      [Agents.FIXED_TRADER, 21.48510295343685],
      [Agents.VARIABLE_TRADER, 21.48510295343685],
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
