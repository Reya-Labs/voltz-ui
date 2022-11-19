import { isUndefined } from 'lodash';

/**
 * Returns undefined if any of the arguments are undefined
 * Returns true if margin is can be withdrawn
 * Return false if margin is cannot be withdrawn
 * @param marginToBeWithdrawn Margin to be withdrawn
 * @param positionMargin Current position margin
 * @param positionMarginRequirement Current position margin requirement
 */
export const isMarginWithdrawable = (
  marginToBeWithdrawn?: number,
  positionMargin?: number,
  positionMarginRequirement?: number,
): boolean | undefined => {
  if (
    !isUndefined(positionMarginRequirement) &&
    !isUndefined(positionMargin) &&
    !isUndefined(marginToBeWithdrawn) &&
    marginToBeWithdrawn !== 0
  ) {
    const remainingMargin = positionMargin - marginToBeWithdrawn;

    return remainingMargin >= positionMarginRequirement;
  }
};
