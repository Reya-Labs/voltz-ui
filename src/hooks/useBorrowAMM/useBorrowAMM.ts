import { useMemo } from "react";
import { AugmentedBorrowAMM } from "@utilities";
import { Position } from "@voltz-protocol/v1-sdk/dist/types/entities";

import useAgent from "../useAgent";
import useAsyncFunction, { UseAsyncFunctionResult } from "../useAsyncFunction";
import { UnderlyingInfo } from "./types";

export type useBorrowAMMReturnType = {
  aggregatedDebt: UseAsyncFunctionResult<unknown, number | void>;
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  variableApy: UseAsyncFunctionResult<unknown, number | void>;
}

export const useBorrowAMM = ( borrowAmm?: AugmentedBorrowAMM) => {
  const { agent } = useAgent();

  const aggregatedDebt = useAsyncFunction(
    async (position: Position) => {
      const result = await borrowAmm?.getAggregatedBorrowBalance(position);
      return result;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider])
  );

  const variableDebt = useAsyncFunction(
    async (position: Position) => {
      const fixedDebt = await borrowAmm?.getFixedBorrowBalance(position);
      const posAggregatedDebt = await borrowAmm?.getAggregatedBorrowBalance(position);
      const result = borrowAmm?.getVariableBorrowBalance(
        posAggregatedDebt ? posAggregatedDebt : 0,
        fixedDebt ? fixedDebt : 0);
      return result;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider])
  );

  const variableApy = useAsyncFunction(
    async () => {
      const amm = borrowAmm?.amm;
      if (amm) {
        const apy = await amm?.getInstantApy();
        return apy;
      }
      return 0;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  return useMemo(() => ({
    aggregatedDebt,
    variableDebt,
    variableApy
  } as useBorrowAMMReturnType), 
  [
    aggregatedDebt,
    variableDebt,
    variableApy
  ]);
}

export default useBorrowAMM;