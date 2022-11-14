import { Position } from '@voltz-protocol/v1-sdk';
import { AugmentedBorrowAMM } from '@utilities';
import { DateTime } from 'luxon';

export const getTotalVariableDebt = async (
  borrowAmms: AugmentedBorrowAMM[],
  positions: Position[] | undefined,
) => {
  let sum: number = 0;
  let countVariablePositions: number = 0;

  for (const b of borrowAmms) {
    let hasPosition: boolean = false;
    if (positions && positions.length !== 0) {
      for (const p of positions) {
        if (b.amm && p.amm.id === b.amm.id && DateTime.now() < b.amm.endDateTime) {
          const varDebt = await b.getAggregatedBorrowBalanceInUSD(p);
          countVariablePositions += varDebt === 0 ? 0 : 1;
          sum += varDebt;
          hasPosition = true;
        }
      }
    }

    if (!hasPosition) {
      if (b.amm && DateTime.now() < b.amm.endDateTime) {
        const varDebt = await b.getUnderlyingBorrowBalanceInUSD();
        countVariablePositions += varDebt === 0 ? 0 : 1;
        sum += varDebt;
      }
    }
  }
  return [sum, countVariablePositions];
};

export const getTotalFixedDebt = async (
  borrowAmms: AugmentedBorrowAMM[],
  positions: Position[],
) => {
  let sum: number = 0;
  let countFixedPositions: number = 0;
  for (const p of positions) {
    if (p.positionType === 2) {
      for (const b of borrowAmms) {
        if (b.amm && p.amm.id === b.amm.id && DateTime.now() < b.amm.endDateTime) {
          const fixDebt = await b.getFixedBorrowBalanceInUSD(p);
          countFixedPositions += fixDebt === 0 ? 0 : 1;
          sum += fixDebt;
        }
      }
    }
  }
  return [sum, countFixedPositions];
};
