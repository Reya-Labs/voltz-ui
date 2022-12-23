import { Position } from '@voltz-protocol/v1-sdk';

/**
 * Returns the current position that the user has for the given amm
 * @param positions - the array of positions the user has
 * @param selectedAmmId - the selected amm id
 */
export const findCurrentBorrowPosition = (positions: Position[], selectedAmmId: string) => {
  // CT: need to check if VT > 0 as well
  return (positions || []).find((p) => {
    return (
      p.amm.id === selectedAmmId &&
      p.positionType === 2 &&
      p.tickLower === -69000 &&
      p.tickUpper === 69060
    );
  });
};
