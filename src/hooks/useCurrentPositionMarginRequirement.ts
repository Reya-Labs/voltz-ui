import { useState, useEffect } from 'react';
import { AugmentedAMM } from '@utilities';
import { isUndefined } from 'lodash';

export const useCurrentPositionMarginRequirement = (
  amm: AugmentedAMM,
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

export default useCurrentPositionMarginRequirement;
