import * as Sentry from '@sentry/react';
import { AMM } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash/isUndefined';
import { useEffect, useState } from 'react';

export const useCurrentPositionMarginRequirement = (
  amm: AMM,
  fixedRateLower?: number,
  fixedRateUpper?: number,
) => {
  const [currentPositionMarginRequirement, setCurrentPositionMarginRequirement] =
    useState<number>();

  // Load the users balance of the required token
  useEffect(() => {
    const getData = async () => {
      if (!isUndefined(fixedRateLower) && !isUndefined(fixedRateUpper)) {
        try {
          const mrm = await amm.getPositionMarginRequirement(fixedRateLower, fixedRateUpper);
          setCurrentPositionMarginRequirement(mrm);
        } catch (e) {
          Sentry.captureException(e);
          setCurrentPositionMarginRequirement(undefined);
        }
      } else {
        setCurrentPositionMarginRequirement(undefined);
      }
    };
    getData();
  }, [amm]);

  return currentPositionMarginRequirement;
};
