import { AMM, Position } from '@voltz-protocol/v1-sdk';

import { getConfig } from '../hooks/voltz-config/config';
import { isBorrowing } from './isBorrowing';

/**
 * Returns the current position that the user has for the given amm
 * @param positions - the array of positions the user has
 * @param selectedAmm - the selected amm
 * @param positionTypes - an array of position type ids to match. 1=Fixed, 2=Variable, 3=LP
 */
export const findCurrentPosition = (positions: Position[], selectedAmm: AMM) => {
  return (positions || []).find((p) => {
    return p.amm.id === selectedAmm.id;
  });
};

/**
 * Finds the latest amm that corresponds to the given position.
 * Please note that the returned amm will be for the latest pool, whereas the position amm may correspond to an old (matured) pool.
 * @param amms - the array of available pools
 * @param selectedPosition - the selected position to find the current amm for
 */
export const findCurrentAmm = (amms: AMM[], selectedPosition: Position) => {
  // First see if there's strong preference for some rollover pool
  const config = getConfig();
  const pool = config.pools.find(
    (p) => p.id.toLowerCase() === selectedPosition.amm.id.toLowerCase(),
  );

  if (pool && pool.rollover) {
    const customRollover = pool.rollover;
    return amms.find((amm) => amm.id.toLowerCase() === customRollover.toLowerCase());
  }

  // Otherwise, find pools that match rate oracle and underlying token
  const matchingAmms = (amms || []).filter((amm) => {
    return (
      amm.rateOracle.id === selectedPosition.amm.rateOracle.id && // check that these are from the same source - rocket, lido etc
      amm.underlyingToken.id === selectedPosition.amm.underlyingToken.id && // check that the tokens match - aDAI !== aUSDC
      +amm.endDateTime - Date.now() >= 24 * (1000 * 60 * 60) // Has at least 24 hours until it matures
    );
  });

  // There could be multiple pools that match. Find the one with the latest end time
  if (matchingAmms.length > 0) {
    matchingAmms.sort((a, b) => +a.endDateTime - +b.endDateTime);
    return matchingAmms.pop();
  }

  return undefined;
};

/**
 * Returns AMM pool name and includes borrowing tag
 * @param amm - the amm
 */
export const getAmmProtocol = (amm: AMM) => {
  if (!amm.rateOracle.protocolId) return '';

  return amm.protocol + (isBorrowing(amm.rateOracle.protocolId) ? '_borrow' : '');
};
