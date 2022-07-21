import { Position } from "@voltz-protocol/v1-sdk/dist/types/entities";
import AugmentedAMM from "./augmentedAmm";

/**
 * Returns the current position that the user has for the given amm 
 * @param positions - the array of positions the user has 
 * @param selectedAmm - the selected amm
 */
export const findCurrentPosition = (positions: Position[], selectedAmm: AugmentedAMM) => {
  return (positions || []).find(p => {
    return p.amm.rateOracle.id === selectedAmm.rateOracle.id && p.positionType === 3;
  });
}

/**
 * Finds the amm that corresponds to the given position. 
 * Please note that the returned amm will be for the current pool, where as the position may correspond to an old (matured) pool.
 * @param amms - the array of available pools
 * @param selectedPosition - the selected position to find the current amm for
 */
export const findCurrentAmm = (amms: AugmentedAMM[], selectedPosition: Position) => {
  const currentAmm = (amms || []).find(amm => {
    return amm.rateOracle.id === selectedPosition.amm.rateOracle.id;
  });
  return (currentAmm as AugmentedAMM) || undefined;
}