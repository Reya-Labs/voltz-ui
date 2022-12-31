import { AMM, Position } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';

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
  amount: number,
  rolloverPosition?: Position,
) => {
  try {
    return (await amm.underlyingTokens()) + (rolloverPosition?.settlementBalance || 0) >= amount;
  } catch (error) {
    getSentryTracker().captureException(error);
  }
};

/**
 * If both valueA and valueB are defined, return true if valueA is less than valueB, otherwise return undefined.
 * @param {number | undefined} valueA - number | undefined
 * @param {number | undefined} valueB - number | undefined
 * @returns A function that takes two numbers and returns true if the first number is less than the second number.
 */
export const lessThan = (valueA: number | undefined, valueB: number | undefined) => {
  if (!isUndefined(valueA) && !isUndefined(valueB)) {
    return valueA < valueB;
  }
};

/**
 * If valueA and valueB are defined, return true if valueA + eps is less than valueB.
 * @param {number | undefined} valueA - The first number to compare
 * @param {number | undefined} valueB - The second number to compare
 * @param {number} eps - The epsilon value to use for the comparison.
 * @returns A function that takes 3 arguments and returns valueA boolean.
 */
export const lessThanEpsilon = (
  valueA: number | undefined,
  valueB: number | undefined,
  eps: number,
) => {
  if (!isUndefined(valueA) && !isUndefined(valueB)) {
    return valueA + eps < valueB;
  }
};
