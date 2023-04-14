import { Position } from '@voltz-protocol/v1-sdk';

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
