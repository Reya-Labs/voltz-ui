import { useMemo } from 'react';

import useAsyncFunction, { UseAsyncFunctionResult } from '../useAsyncFunction';
import { DateTime } from 'luxon';
import { SwapInfoPayload } from '../useAMM/types';

import { BorrowAMM, Position } from '@voltz-protocol/v1-sdk';
import { BorrowSwapInfo } from '@voltz-protocol/v1-sdk/dist/types/entities/borrowAMM';

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

export const useBorrowAMM = (borrowAmm: BorrowAMM) => {
  const underlyingDebtInNativeTokens = useAsyncFunction(
    async () => {
      return borrowAmm?.getUnderlyingBorrowBalance();
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  const variableDebtInNativeTokens = useAsyncFunction(
    async (position: Position | undefined) => {
      if (position) {
        return await borrowAmm.getAggregatedBorrowBalance(position);
      } else {
        return await borrowAmm.getUnderlyingBorrowBalance();
      }
    },
    useMemo(() => undefined, [!!borrowAmm?.provider, borrowAmm.aaveVariableDebtToken]),
  );

  const fixedDebtInNativeTokens = useAsyncFunction(
    async (position: Position) => {
      return borrowAmm?.getFixedBorrowBalance(position);
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  const underlyingDebtInUSD = useAsyncFunction(
    async () => {
      return borrowAmm?.getUnderlyingBorrowBalanceInUSD();
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  const variableDebtInUSD = useAsyncFunction(
    async (position: Position | undefined) => {
      if (position) {
        return await borrowAmm.getAggregatedBorrowBalanceInUSD(position);
      } else {
        return await borrowAmm.getUnderlyingBorrowBalanceInUSD();
      }
    },
    useMemo(() => undefined, [!!borrowAmm?.provider, borrowAmm.aaveVariableDebtToken]),
  );

  const fixedDebtInUSD = useAsyncFunction(
    async (position: Position) => {
      return borrowAmm?.getFixedBorrowBalanceInUSD(position);
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  const variableApy = useAsyncFunction(
    async () => {
      const amm = borrowAmm?.amm;
      if (amm) {
        return amm?.getInstantApy();
      }
      return 0;
    },
    useMemo(() => undefined, [!!borrowAmm?.provider]),
  );

  const borrowSwapInfo = useAsyncFunction(
    async (args: SwapInfoPayload) => {
      if (borrowAmm) {
        return await borrowAmm.getBorrowInfo({
          isFT: false,
          fixedLow: 0.001,
          fixedHigh: 990,
          ...args,
        });
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
