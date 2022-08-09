import { Position, PositionInfo, AMM, BorrowAMM } from "@voltz-protocol/v1-sdk";
import { isUndefined } from "lodash";
import { Agents } from '@contexts';
import { AugmentedAMM, AugmentedBorrowAMM } from "@utilities";
import { borrowAction } from "src/store/actions";

export const getBorrowAmmsfromAmms = (amms: AugmentedAMM[]) => {
  return amms.map(amm => new AugmentedBorrowAMM({id: amm.id, amm: amm}));
}

export const getTotalAggregatedDebt = async (borrowAmms: AugmentedBorrowAMM[], positions: Position[]) => {
  let sum: number = 0;
  for (const p of positions) {
    if (p.positionType == 2) {
      for (const b of borrowAmms) {
        if(b.amm && p.amm.id == b.amm.id) {
          const debt = await b.getAggregatedBorrowBalance(p);
          sum += debt;
        }
      }
    }
  }

  return sum;
}