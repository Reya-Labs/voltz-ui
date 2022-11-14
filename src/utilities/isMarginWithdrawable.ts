import { isUndefined } from 'lodash';

/**
 * Returns undefined if any of the arguments are undefined
 * Returns true if margin is withdrawable
 * Return false if margin is not withdrawable
 * @param marginToBeWithdrawan Margin to be withdrawn
 * @param positionMargin Current position margin
 * @param positionMarginRequirement Current position margin requirement
*/
export const isMarginWithdrawable = (
  marginToBeWithdrawan?: number,
  positionMargin?: number,
  positionMarginRequirement?: number,
): boolean | undefined => {
  if (
    !isUndefined(positionMarginRequirement) &&
    !isUndefined(positionMargin) &&
    !isUndefined(marginToBeWithdrawan) &&
    marginToBeWithdrawan !== 0
  ) {
    const remainingMargin = positionMargin - marginToBeWithdrawan;

    if (remainingMargin < positionMarginRequirement) {
      return false;
    }

    return true;
  }
};
