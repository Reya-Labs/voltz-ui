import AugmentedBorrowAMM from './augmentedBorrowAmm';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';

/**
 * Returns the current position that the user has for the given amm
 * @param positions - the array of positions the user has
 * @param selectedAmm - the selected amm
 */
export const findCurrentBorrowPosition = (
  positions: Position[],
  selectedAmm: AugmentedBorrowAMM,
) => {
  return (positions || []).find((p) => {
    return (
      p.amm.id === selectedAmm.id &&
      p.positionType === 2 &&
      p.tickLower === -69000 &&
      p.tickUpper === 69060 &&
      p.variableTokenBalance.toString() !== '0'
    );
  });
};
