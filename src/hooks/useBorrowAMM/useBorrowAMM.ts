import { useMemo } from 'react';
import { AugmentedBorrowAMM } from '@utilities';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';

import useAsyncFunction, { UseAsyncFunctionResult } from '../useAsyncFunction';
import { DateTime } from 'luxon';
import { BorrowSwapInfo } from '@voltz-protocol/v1-sdk/dist/types/entities/borrowAMM';
import { SwapInfoPayload } from '../useAMM/types';

export type useBorrowAMMReturnType = {
  underlyingDebtInNativeTokens: UseAsyncFunctionResult<unknown, number | void>;
  variableDebtInNativeTokens: UseAsyncFunctionResult<unknown, number | void>;
  fixedDebtInNativeTokens: UseAsyncFunctionResult<unknown, number | void>;
  underlyingDebtInUSD: UseAsyncFunctionResult<unknown, number | void>;
  variableDebtInUSD: UseAsyncFunctionResult<unknown, number | void>;
  fixedDebtInUSD: UseAsyncFunctionResult<unknown, number | void>;
  variableApy: UseAsyncFunctionResult<unknown, number | void>;
  borrowSwapInfo: UseAsyncFunctionResult<unknown, BorrowSwapInfo | void>;
  fixedApr: UseAsyncFunctionResult<unknown, number | void>;
  endDate: DateTime | undefined;
};

export const useBorrowAMM = (borrowAmm: AugmentedBorrowAMM) => {
  const underlyingDebtInNativeTokens = useAsyncFunction(
    async () => {
      const result = await borrowAmm?.getUnderlyingBorrowBalance();
      return result;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  const variableDebtInNativeTokens = useAsyncFunction(
    async (position: Position | undefined) => {
      if (position) {
        const resultPos = await borrowAmm.getAggregatedBorrowBalance(position);
        return resultPos;
      } else {
        const resultPos = await borrowAmm.getUnderlyingBorrowBalance();
        return resultPos;
      }
    },
    useMemo(() => undefined, [!!borrowAmm?.provider, borrowAmm.aaveVariableDebtToken]),
  );

  const fixedDebtInNativeTokens = useAsyncFunction(
    async (position: Position) => {
      const result = await borrowAmm?.getFixedBorrowBalance(position);
      return result;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  const underlyingDebtInUSD = useAsyncFunction(
    async () => {
      const result = await borrowAmm?.getUnderlyingBorrowBalanceInUSD();
      return result;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  const variableDebtInUSD = useAsyncFunction(
    async (position: Position | undefined) => {
      if (position) {
        const resultPos = await borrowAmm.getAggregatedBorrowBalanceInUSD(position);
        return resultPos;
      } else {
        const resultPos = await borrowAmm.getUnderlyingBorrowBalanceInUSD();
        return resultPos;
      }
    },
    useMemo(() => undefined, [!!borrowAmm?.provider, borrowAmm.aaveVariableDebtToken]),
  );

  const fixedDebtInUSD = useAsyncFunction(
    async (position: Position) => {
      const result = await borrowAmm?.getFixedBorrowBalanceInUSD(position);
      return result;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
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

  const borrowSwapInfo = useAsyncFunction(
    async (args: SwapInfoPayload) => {
      if (borrowAmm) {
        const info = await borrowAmm.getBorrowInfo({
          isFT: false,
          fixedLow: 0.001,
          fixedHigh: 990,
          ...args,
        });
        return info;
      }
      return undefined;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  const fixedApr = useAsyncFunction(
    async (position: Position) => {
      const amm = borrowAmm?.amm;
      if (amm && position.amm.id === amm.id) {
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

  return useMemo(
    () =>
      ({
        underlyingDebtInNativeTokens,
        variableDebtInNativeTokens,
        fixedDebtInNativeTokens,
        underlyingDebtInUSD,
        variableDebtInUSD,
        fixedDebtInUSD,
        borrowSwapInfo,
        variableApy,
        fixedApr,
        endDate,
      } as useBorrowAMMReturnType),
    [
      underlyingDebtInNativeTokens,
      variableDebtInNativeTokens,
      fixedDebtInNativeTokens,
      underlyingDebtInUSD,
      variableDebtInUSD,
      fixedDebtInUSD,
      borrowSwapInfo,
      variableApy,
      fixedApr,
      endDate,
    ],
  );
};

export default useBorrowAMM;
