import AugmentedBorrowAMM from "./augmentedBorrowAmm";
import AugmentedAMM from './augmentedAmm';
import { Position } from "@voltz-protocol/v1-sdk/dist/types/entities";

/**
 * Returns the current position that the user has for the given amm 
 * @param positions - the array of positions the user has 
 * @param selectedAmm - the selected amm
 * @param positionTypes - an array of position type ids to match. 1=Fixed, 2=Variable, 3=LP
 */
 export const findCurrentBorrowPosition = (positions: Position[], selectedAmm: AugmentedBorrowAMM) => {
  return (positions || []).find(p => {
    return (
      p.amm.id === selectedAmm.id && p.positionType === 2
    );
  });
}

/**
 * Finds the latest amm that corresponds to the given position.
 * Please note that the returned amm will be for the latest pool, where as the position amm may correspond to an old (matured) pool.
 * @param amms - the array of available pools
 * @param selectedPosition - the selected position to find the current amm for
 */
export const findCurrentBorrowAmm = (amms: AugmentedAMM[], selectedPosition: Position) => {
  // First find pools that match rate oracle and underlying token
  const matchingAmms = (amms || []).filter(amm => {
    return (
      amm.rateOracle.id === selectedPosition.amm.rateOracle.id && // check that these are from the same source - rocket, lido etc
      amm.underlyingToken.id === selectedPosition.amm.underlyingToken.id && // check that the tokens match - aDAI !== aUSDC
      (Math.abs(+amm.endDateTime - Date.now()) / (1000 * 60 * 60)) >= 24 // Has at least 24 hours until it matures
    );
  })

  // There could be multiple pools that match. Find the one with the latest end time
  if(matchingAmms.length) {
    matchingAmms.sort((a,b) => +a.endDateTime - +b.endDateTime);
    const amm = matchingAmms.pop();
    return fromAMMtoBorrowAMM(amm);
  }
  
  return undefined;
}

/**
 * Turn an AMM object into a BorrowAMM 
 * @param amm - a pools
 */
export const fromAMMtoBorrowAMM = (amm: AugmentedAMM | undefined) => {
  if (!amm) {
    return undefined;
  }
  return new AugmentedBorrowAMM({
    id: amm.id,
    amm: amm
  })
}
