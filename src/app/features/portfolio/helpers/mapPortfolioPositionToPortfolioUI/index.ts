import {
  generateAmmIdForRoute,
  generatePoolId,
  generatePositionIdForRoute,
} from '../../../../../utilities/amm';
import { formatPOSIXTimestamp } from '../../../../../utilities/date';
import { compactFormatToParts } from '../../../../../utilities/number';
import { PortfolioPosition } from '../../thunks';
import { PositionUI } from '../../types';

export const mapPortfolioPositionToPortfolioUI = (position: PortfolioPosition): PositionUI => {
  const pool = position.pool;
  const isV2 = pool.isV2;
  const isBorrowing = pool.isBorrowing;
  const market = pool.market;
  const token = pool.underlyingToken.name;
  const tokenPriceUSD = position.pool.underlyingToken.priceUSD;
  const notionalUSD = position.notional * tokenPriceUSD;
  const marginUSD = position.margin * tokenPriceUSD;
  const type = position.type;
  const unrealizedPNLUSD = position.unrealizedPNL * tokenPriceUSD;
  const realizedPNLTotalUSD = position.realizedPNLTotal * tokenPriceUSD;
  const realizedPNLFeesUSD = position.realizedPNLFees * tokenPriceUSD;
  const realizedPNLCashflowUSD = position.realizedPNLCashflow * tokenPriceUSD;
  const creationTimestampInMS = position.creationTimestampInMS;

  const fixHigh = position.fixHigh * 100;
  const fixLow = position.fixLow * 100;
  const currentFixed = position.poolCurrentFixedRate * 100;
  const receiving = position.receiving * 100;
  const paying = position.paying * 100;

  const health = position.health;
  const variant = position.variant;

  return {
    creationTimestampInMS,
    type,
    market,
    token,
    isBorrowing,
    isV2,
    marginUSDCompactFormat: compactFormatToParts(marginUSD, 2, 2),
    marginUSD,
    notionalUSDCompactFormat: compactFormatToParts(notionalUSD, 2, 2),
    notionalUSD,
    maturityEndTimestampInMS: pool.termEndTimestampInMS,
    maturityStartTimestampInMS: pool.termStartTimestampInMS,
    maturityFormatted: formatPOSIXTimestamp(pool.termEndTimestampInMS),
    id: position.id,
    chainId: pool.chainId,
    routeAmmId: generateAmmIdForRoute(pool),
    routePositionId: generatePositionIdForRoute(position),
    routePoolId: generatePoolId(pool),
    name: `${type} - ${market} - ${token as string}${isBorrowing ? ' - Borrowing' : ''}`,
    status: {
      fixHigh,
      fixLow,
      currentFixed,
      health,
      receiving,
      paying,
      variant,
    },
    unrealizedPNLUSD,
    unrealizedPNLUSDCompactFormat: compactFormatToParts(unrealizedPNLUSD, 2, 2),
    realizedPNLTotalUSD,
    realizedPNLTotalUSDCompactFormat: compactFormatToParts(realizedPNLTotalUSD, 2, 2),
    realizedPNLFeesUSD,
    realizedPNLFeesUSDCompactFormat: compactFormatToParts(realizedPNLFeesUSD, 2, 2),
    realizedPNLCashflowUSD,
    realizedPNLCashflowUSDCompactFormat: compactFormatToParts(realizedPNLCashflowUSD, 2, 2),
  };
};
