import { AMM, Position } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash/isUndefined';

import { getSentryTracker } from './sentry';

/**
 * Checks if the user has enough underlying tokens.
 * Returns boolean if validation was able to proceed, undefined if not.
 * @param amm - the amm for the position
 * @param amount - the amount of underlying tokens to check
 * @param rolloverPosition - the rollover position
 */
export const hasEnoughUnderlyingTokens = async (
  amm: AMM,
  amount: number | undefined,
  rolloverPosition?: Position | undefined,
) => {
  if (!isUndefined(amount)) {
    try {
      return await amm.hasEnoughUnderlyingTokens(
        amount,
        rolloverPosition
          ? {
              fixedHigh: rolloverPosition.fixedRateUpper.toNumber(),
              fixedLow: rolloverPosition.fixedRateLower.toNumber(),
            }
          : undefined,
      );
    } catch (error) {
      getSentryTracker().captureException(error);
    }
  }
};

/**
 * Checks if a is less than b.
 * Returns boolean if validation was able to proceed, undefined if not.
 * @param a - the number to check
 * @param b - the second number that you want to compare against
 */
export const lessThan = (a: number | undefined, b: number | undefined) => {
  if (!isUndefined(a) && !isUndefined(b)) {
    return a < b;
  }
};

export const lessThanEpsilon = (a: number | undefined, b: number | undefined, eps: number) => {
  if (!isUndefined(a) && !isUndefined(b)) {
    return a + eps < b;
  }
};
