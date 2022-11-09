import { useState, useEffect } from 'react';
import { AugmentedAMM } from '@utilities';

export const useCurrentPositionMarginRequirement = (amm: AugmentedAMM) => {
  const [currentPositionMarginRequirement, setCurrentPositionMarginRequirement] = useState<number>();

  // Load the users balance of the required token
  useEffect(() => {
    const getData = async () => {
      try {
        const mrm = await amm.getPositionMarginRequirement(1, 999);
        setCurrentPositionMarginRequirement(mrm);
      } catch (e) {
        setCurrentPositionMarginRequirement(undefined);
      }
    };
    getData();
  }, [amm]);

  return currentPositionMarginRequirement;
};

export default useCurrentPositionMarginRequirement;
