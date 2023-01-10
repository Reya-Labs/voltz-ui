import { AMM, Position } from '@voltz-protocol/v1-sdk';

import { getConfig } from '../../hooks/voltz-config/config';

/**
 * Returns the current position that the user has for the given amm
 * @param positions - the array of positions the user has
 * @param selectedAmmId - the selected amm id
 */
export const findCurrentPosition = (positions: Position[], selectedAmmId: string) => {
  return (positions || []).find((p) => {
    return p.amm.id === selectedAmmId;
  });
};

/**
 * Finds the latest amm that corresponds to the given position.
 * Please note that the returned amm will be for the latest pool, whereas the position amm may correspond to an old (matured) pool.
 * @param amms - the array of available pools
 * @param selectedPosition - the selected position to find the current amm for
 */
export const findCurrentAmm = (amms: AMM[] = [], selectedPosition: Position) => {
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
  const matchingAMMs = (amms || []).filter((amm) => {
    return (
      amm.rateOracle.id === selectedPosition.amm.rateOracle.id && // check that these are from the same source - rocket, lido etc
      amm.underlyingToken.id === selectedPosition.amm.underlyingToken.id && // check that the tokens match - aDAI !== aUSDC
      +amm.endDateTime - Date.now() >= 24 * (1000 * 60 * 60) // Has at least 24 hours until it matures
    );
  });

  // There could be multiple pools that match. Find the one with the latest end time
  if (matchingAMMs.length > 0) {
    matchingAMMs.sort((a, b) => +a.endDateTime - +b.endDateTime);
    return matchingAMMs.pop();
  }

  return undefined;
};

/**
 * Returns AMM pool name and includes borrowing tag
 * @param amm - the amm
 */
export const getAmmProtocol = (amm: AMM) => {
  return amm.protocol + (isBorrowing(amm.rateOracle.protocolId) ? '_borrow' : '');
};

/**
 * It returns true if the rateOracleProtocolId is 5 or 6, and false otherwise
 * @param {number} rateOracleProtocolId - The ID of the rate oracle protocol.
 * @returns A boolean value.
 */
export const isBorrowing = (rateOracleProtocolId: number): boolean => {
  return rateOracleProtocolId === 5 || rateOracleProtocolId === 6;
};
