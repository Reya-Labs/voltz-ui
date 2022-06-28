import { useState, useEffect } from "react";
import { AugmentedAMM } from "@utilities";

export const useBalance = (amm: AugmentedAMM) => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const getBalance = async () => {
      const newBalance = await amm.underlyingTokens();
      setBalance(newBalance);
    }
    getBalance();
  }, [amm.id]);

  return balance;
}

export default useBalance;