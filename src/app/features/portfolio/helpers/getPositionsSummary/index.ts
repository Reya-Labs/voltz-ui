import { PositionUI } from '../../types';

export const getPositionsSummary = (
  positions: PositionUI[],
): {
  maturedPositionsLength: number;
  activePositionsLength: number;
  settledPositionsLength: number;
  healthyPositionsLength: number;
  dangerPositionsLength: number;
  warningPositionsLength: number;
  totalPortfolioMarginValueUSD: number;
  totalPortfolioRealizedPNLValueUSD: number;
  totalPortfolioNotionalValueUSD: number;
  totalPortfolioUnrealizedPNLValueUSD: number;
} =>
  positions.reduce(
    (summary, position) => {
      const variant = position.status.variant;
      const health = position.status.health;

      if (variant === 'active') {
        summary.activePositionsLength++;
        summary.totalPortfolioNotionalValueUSD += position.notionalUSD;
        if (position.type !== 'LP') {
          summary.totalPortfolioUnrealizedPNLValueUSD += position.unrealizedPNLUSD;
        }

        if (health === 'healthy') {
          summary.healthyPositionsLength++;
        } else if (health === 'danger') {
          summary.dangerPositionsLength++;
        } else if (health === 'warning') {
          summary.warningPositionsLength++;
        }
      }

      if (variant === 'matured') {
        summary.maturedPositionsLength++;
      }

      if (variant === 'settled') {
        summary.settledPositionsLength++;
      }

      if (variant === 'active' || variant === 'matured') {
        summary.totalPortfolioRealizedPNLValueUSD += position.realizedPNLTotalUSD;
        summary.totalPortfolioMarginValueUSD += position.marginUSD;
      }

      return summary;
    },
    {
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
    },
  );
