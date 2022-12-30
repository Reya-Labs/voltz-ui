import { AMM, Position } from '@voltz-protocol/v1-sdk';
import { useEffect, useState } from 'react';

export const useBalance = (amm: AMM, rolloverPosition?: Position) => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const getBalance = async () => {
      const settlementBalance = rolloverPosition?.settlementBalance || 0;
      const newBalance = await amm.underlyingTokens();
      setBalance(newBalance + settlementBalance);
    };
    void getBalance();
  }, [amm, amm.id, rolloverPosition]);

  return balance;
};
