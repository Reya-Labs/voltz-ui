import { useMemo, useEffect } from "react";
import { AugmentedBorrowAMM } from "@utilities";
import { Position } from "@voltz-protocol/v1-sdk/dist/types/entities";

import useAgent from "../useAgent";
import useAsyncFunction, { UseAsyncFunctionResult } from "../useAsyncFunction";
import { DateTime } from "luxon";

export type useBorrowAMMReturnType = {
  underlyingDebt: UseAsyncFunctionResult<unknown, number | void>;
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  fixedDebt: UseAsyncFunctionResult<unknown, number | void>;
  variableApy: UseAsyncFunctionResult<unknown, number | void>;
  fullyCollateralisedMarginRequirement: UseAsyncFunctionResult<unknown, number | void>;
  fixedApr: UseAsyncFunctionResult<unknown, number | void>;
  endDate: DateTime |  undefined;
}

export const useBorrowAMM = ( borrowAmm: AugmentedBorrowAMM) => {
  const { agent } = useAgent();

  const underlyingDebt = useAsyncFunction(
    async () => {
      const result = await borrowAmm?.getUnderlyingBorrowBalance();
      return result;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider])
  );

  const variableDebt = useAsyncFunction(
    async (position: Position | undefined) => {
      if (position){
        const resultPos = await borrowAmm?.getAggregatedBorrowBalance(position);
        return resultPos;
      } else {
        const resultPos = await borrowAmm.getUnderlyingBorrowBalance();
        return resultPos;
      }
    },
    useMemo(() => undefined, [!!borrowAmm?.provider, borrowAmm.aaveVariableDebtToken])
  );

  const fixedDebt = useAsyncFunction(
    async (position: Position) => {
      const result = await borrowAmm?.getFixedBorrowBalance(position);
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

  const fullyCollateralisedMarginRequirement = useAsyncFunction(
    async (args:{fixedTokenBalance: number, variableTokenBalance: number}) => {
      if (borrowAmm) {
        const fcMargin = 
          await borrowAmm.getFullyCollateralisedMarginRequirement(
            args.fixedTokenBalance,
            args.variableTokenBalance
          );
        return fcMargin;
      }
      return 0;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider])
  );

  const fixedApr = useAsyncFunction(
    async (position: Position) => {
      const amm = borrowAmm?.amm;
      if (amm && position.amm.id == amm.id) {
        const positionInfo = await amm.getPositionInformation(position);
        return positionInfo.fixedRateSinceLastSwap;
      }
      return undefined;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  const endDate = useMemo(() => {
      const amm = borrowAmm?.amm;
      if (amm) {
        return amm?.endDateTime;
      }
      return undefined;
  }, [borrowAmm]);


  return useMemo(() => ({
    underlyingDebt,
    variableDebt,
    fullyCollateralisedMarginRequirement,
    fixedDebt,
    variableApy,
    fixedApr,
    endDate
  } as useBorrowAMMReturnType), 
  [
    underlyingDebt,
    variableDebt,
    fullyCollateralisedMarginRequirement,
    fixedDebt,
    variableApy,
    fixedApr,
    endDate
  ]);
}

export default useBorrowAMM;