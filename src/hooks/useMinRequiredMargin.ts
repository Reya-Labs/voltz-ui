import { useState, useEffect } from 'react';
import { AugmentedAMM } from '@utilities';

export const useMinRequiredMargin = (amm: AugmentedAMM) => {
  const [minRequiredMargin, setMinRequiredMargin] = useState<number>();

  // Load the users balance of the required token
  useEffect(() => {
    const getData = async () => {
      try {
        const mrm = await amm.getPositionMarginRequirement(1, 999);
        setMinRequiredMargin(mrm);
      } catch (e) {
        setMinRequiredMargin(undefined);
      }
    };
    getData();
  }, [amm]);

  return minRequiredMargin;
};

export default useMinRequiredMargin;
