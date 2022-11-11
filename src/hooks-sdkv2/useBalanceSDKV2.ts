import { useState, useEffect } from 'react';
import { AMM, Position } from '@voltz-protocol/v2-sdk';

export const useBalanceSDKV2 = (amm: AMM, rolloverPosition?: Position | null) => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!rolloverPosition) {
      setBalance(0);
      return;
    }
    void amm
      .getPositionMargin({
        tickLower: rolloverPosition.tickLower,
        tickUpper: rolloverPosition.tickUpper,
      })
      .then(setBalance);
  }, [amm.id]);

  return balance;
};

export default useBalanceSDKV2;
