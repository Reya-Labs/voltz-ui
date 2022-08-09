import { useMemo } from "react";
import { Agents } from "@contexts";
import { AugmentedBorrowAMM } from "@utilities";
import { InfoPostSwap, Position, PositionInfo } from "@voltz-protocol/v1-sdk/dist/types/entities";

import useAgent from "../useAgent";
import useAsyncFunction, { UseAsyncFunctionResult } from "../useAsyncFunction";

export type useBorrowAMMReturnType = {
  aggregatedDebt: UseAsyncFunctionResult<unknown, number | void>;
}

export const useBorrowAMM = ( amm?: AugmentedBorrowAMM) => {
  const { agent } = useAgent();

  const aggregatedDebt = useAsyncFunction(
    async (position: Position) => {
      const result = await amm?.getAggregatedBorrowBalance(position);
      return result;
    },
    useMemo(() => undefined, [!!amm?.provider])
  );

  

  return useMemo(() => ({
    aggregatedDebt,
  } as useBorrowAMMReturnType), 
  [
    aggregatedDebt 
  ]);
}

export default useBorrowAMM;