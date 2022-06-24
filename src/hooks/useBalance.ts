import { useState, useEffect } from "react";
import { AugmentedAMM } from "@utilities";
import { BigNumber } from "ethers";

export const useBalance = (amm: AugmentedAMM) => {
  const [balance, setBalance] = useState<BigNumber>();

  useEffect(() => {
    const getBalance = async () => {
      const newBalance = await amm.getUnderlyingTokenBalance();
      setBalance(newBalance);
    }
    getBalance();
  }, [amm.id]);

  return balance;
}

export default useBalance;