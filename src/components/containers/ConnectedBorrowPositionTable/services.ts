import { Position } from "@voltz-protocol/v1-sdk";
import { AugmentedAMM, AugmentedBorrowAMM } from "@utilities";
import { DateTime } from "luxon";

export const getBorrowAmmsfromAmms = (amms: AugmentedAMM[]) => {
  return amms.map(amm => new AugmentedBorrowAMM({id: amm.id, amm: amm}));
}

export const getTotalVariableDebt = async (borrowAmms: AugmentedBorrowAMM[], positions: Position[]) => {
  let sum: number = 0;
  let countVariablePositions: number = 0;
  for (const p of positions) {
    if (p.positionType == 2) {
      for (const b of borrowAmms) {
        if(b.amm && p.amm.id == b.amm.id && DateTime.now() < b.amm.endDateTime) {
          const varDebt = await b.getAggregatedBorrowBalance(p);
          countVariablePositions += ((varDebt == 0 ) ? 0 : 1);
          sum = varDebt;
        }
      }
    }
  }
  return [sum, countVariablePositions];
}

export const getTotalFixedDebt = async (borrowAmms: AugmentedBorrowAMM[], positions: Position[]) => {
  let sum: number = 0;
  let countFixedPositions: number = 0;
  for (const p of positions) {
    if (p.positionType == 2) {
      for (const b of borrowAmms) {
        if(b.amm && p.amm.id == b.amm.id && DateTime.now() < b.amm.endDateTime) {
          const fixDebt = await b.getFixedBorrowBalance(p);
          countFixedPositions += ((fixDebt == 0 ) ? 0 : 1);
          sum += fixDebt;
        }
      }
    }
  }
  return [sum, countFixedPositions];
}