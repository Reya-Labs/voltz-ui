import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';
import { AugmentedAMM } from '@utilities';
import { isUndefined } from 'lodash';
import { BigNumber } from 'ethers';

/**
 * Returns undefined if any of the arguments are undefined
 * Returns true if margin is withdrawable
 * Return false if margin is not withdrawable
 * @param margin Margin to be withdrawn
 * @param position Position to be withdrawn from
 * @param positionAmm The AMM of position
 * @param currentPositionMarginRequirement The position's current margin requirement (initial/safety)
 */
export const isMarginWithdrawable = (
  margin?: number,
  position?: Position,
  positionAmm?: AugmentedAMM,
  currentPositionMarginRequirement?: number,
): boolean | undefined => {
  if (
    position &&
    positionAmm &&
    !isUndefined(currentPositionMarginRequirement) &&
    !isUndefined(margin) &&
    margin !== 0
  ) {
    const originalMargin = positionAmm.descale(BigNumber.from(position.margin.toString()));
    const remainingMargin = originalMargin - margin;

    if (remainingMargin < currentPositionMarginRequirement) {
      return false;
    }

    return true;
  }

  return undefined;
};

