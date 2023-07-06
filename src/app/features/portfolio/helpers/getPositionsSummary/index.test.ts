import { PositionUI } from '../../types';
import { getPositionsSummary } from '.';

describe('getPositionsSummary', () => {
  it('should calculate the positions summary correctly', () => {
    const positions: PositionUI[] = [
      {
        status: {
          variant: 'active',
          health: 'healthy',
        },
        notionalUSD: 1000,
        unrealizedPNLUSD: 200,
        type: 'Fixed',
        realizedPNLTotalUSD: 300,
        marginUSD: 500,
      },
      {
        status: {
          variant: 'active',
          health: 'danger',
        },
        notionalUSD: 500,
        unrealizedPNLUSD: 100,
        type: 'Variable',
        realizedPNLTotalUSD: 150,
        marginUSD: 250,
      },
      {
        status: {
          variant: 'active',
          health: 'warning',
        },
        notionalUSD: 800,
        unrealizedPNLUSD: 0,
        type: 'LP',
        realizedPNLTotalUSD: 100,
        marginUSD: 400,
      },
      {
        status: {
          variant: 'matured',
          health: 'healthy',
        },
        notionalUSD: 2000,
        unrealizedPNLUSD: 0,
        type: 'Fixed',
        realizedPNLTotalUSD: 500,
        marginUSD: 1000,
      },
      {
        status: {
          variant: 'settled',
          health: 'danger',
        },
        notionalUSD: 1500,
        unrealizedPNLUSD: 0,
        type: 'LP',
        realizedPNLTotalUSD: 200,
        marginUSD: 800,
      },
      {
        status: {
          variant: 'inactive',
          health: 'warning',
        },
        notionalUSD: 0,
        unrealizedPNLUSD: 0,
        type: 'Variable',
        realizedPNLTotalUSD: 0,
        marginUSD: 0,
      },
    ] as never;

    const summary = getPositionsSummary(positions);

    expect(summary).toEqual({
      maturedPositionsLength: 1,
      activePositionsLength: 3,
      settledPositionsLength: 1,
      healthyPositionsLength: 1,
      dangerPositionsLength: 1,
      warningPositionsLength: 1,
      totalPortfolioMarginValueUSD: 2150,
      totalPortfolioRealizedPNLValueUSD: 1050,
      totalPortfolioNotionalValueUSD: 2300,
      totalPortfolioUnrealizedPNLValueUSD: 300,
    });
  });

  it('should return zeros for all summary values when positions array is empty', () => {
    const positions: PositionUI[] = [];

    const summary = getPositionsSummary(positions);

    expect(summary).toEqual({
      maturedPositionsLength: 0,
      activePositionsLength: 0,
      settledPositionsLength: 0,
      healthyPositionsLength: 0,
      dangerPositionsLength: 0,
      warningPositionsLength: 0,
      totalPortfolioMarginValueUSD: 0,
      totalPortfolioRealizedPNLValueUSD: 0,
      totalPortfolioNotionalValueUSD: 0,
      totalPortfolioUnrealizedPNLValueUSD: 0,
    });
  });
});
