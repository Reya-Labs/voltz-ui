import { useState, useRef, useEffect } from "react";
import { AugmentedAMM } from "@utilities";
import { BigNumber } from "ethers";
import { Token } from '@voltz-protocol/v1-sdk';
import useWallet from "./useWallet";

export const useBalance = (amm: AugmentedAMM) => {
  const [balance, setBalance] = useState<BigNumber>();
  const { getTokenBalance } = useWallet();
  const token = useRef<Token>();

  // Load the users balance of the required token 
  useEffect(() => {
    if(token.current?.id !== amm.underlyingToken.id) {
      token.current = amm.underlyingToken;
      getTokenBalance(amm.underlyingToken)
        .then((currentBalance) => {
          setBalance(currentBalance);
        })
        .catch(() => {
          setBalance(undefined);
        })
    }
  }, [amm.underlyingToken, amm.underlyingToken.id, getTokenBalance]);

  return balance;
}

export default useBalance;