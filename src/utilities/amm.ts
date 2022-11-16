import isBorrowing from './isBorrowing';

import { AMM, Position } from '@voltz-protocol/v1-sdk';

/**
 * Returns the current position that the user has for the given amm
 * @param positions - the array of positions the user has
 * @param selectedAmm - the selected amm
 * @param positionTypes - an array of position type ids to match. 1=Fixed, 2=Variable, 3=LP
 */
export const findCurrentPosition = (
  positions: Position[],
  selectedAmm: AMM,
  positionTypes: (1 | 2 | 3)[] = [1, 2, 3],
) => {
  return (positions || []).find((p) => {
    return (
      p.amm.id === selectedAmm.id &&
      positionTypes.includes(p.positionType as 1 | 2 | 3) && // filter by position type
      (p.tickLower !== -69000 || p.tickUpper !== 69060) // omit borrow positions
    );
  });
};

/**
 * Finds the latest amm that corresponds to the given position.
 * Please note that the returned amm will be for the latest pool, where as the position amm may correspond to an old (matured) pool.
 * @param amms - the array of available pools
 * @param selectedPosition - the selected position to find the current amm for
 */
export const findCurrentAmm = (amms: AMM[], selectedPosition: Position) => {
  // First find pools that match rate oracle and underlying token
  const matchingAmms = (amms || []).filter((amm) => {
    return (
      amm.rateOracle.id === selectedPosition.amm.rateOracle.id && // check that these are from the same source - rocket, lido etc
      amm.underlyingToken.id === selectedPosition.amm.underlyingToken.id && // check that the tokens match - aDAI !== aUSDC
      +amm.endDateTime - Date.now() >= 24 * (1000 * 60 * 60) // Has at least 24 hours until it matures
    );
  });

  // There could be multiple pools that match. Find the one with the latest end time
  if (matchingAmms.length) {
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
