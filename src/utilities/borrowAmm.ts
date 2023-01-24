import { Position } from '@voltz-protocol/v1-sdk';

/**
 * Returns the current position that the user has for the given amm
 * @param positions - the array of positions the user has
 * @param selectedAmmId - the selected amm id
 */
export const findCurrentBorrowPosition = (positions: Position[], selectedAmmId: string) => {
  // TODO: CT need to check if VT > 0 as well
  return (positions || []).find((position) => {
    return position.amm.id === selectedAmmId && isBorrowingPosition(position);
  });
};

/**
 * If the position type is 2 and the tick lower is -69000 and the tick upper is 69060, then return true.
 * @param {Position} position - Position
 * @returns A function that takes a Position and returns a boolean.
 */
export const isBorrowingPosition = (position: Position) => {
  return (
    position.positionType === 2 && position.tickLower === -69000 && position.tickUpper === 69060
  );
};
