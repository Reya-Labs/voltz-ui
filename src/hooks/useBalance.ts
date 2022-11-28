import { useState, useEffect } from 'react';
import { AMM, Position } from '@voltz-protocol/v1-sdk';

export const useBalance = (amm: AMM, rolloverPosition?: Position) => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const rolloverParams = rolloverPosition
      ? {
          fixedHigh: rolloverPosition.fixedRateUpper.toNumber(),
          fixedLow: rolloverPosition.fixedRateLower.toNumber(),
        }
      : undefined;

    const getBalance = async () => {
      const newBalance = await amm.underlyingTokens(rolloverParams);
      setBalance(newBalance);
    };
    getBalance();
  }, [amm.id]);

  return balance;
};
