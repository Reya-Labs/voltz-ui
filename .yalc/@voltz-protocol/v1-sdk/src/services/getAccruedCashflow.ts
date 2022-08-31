/* eslint-disable no-await-in-loop */
/* eslint-disable no-lonely-if */
import { BigNumber, utils } from 'ethers';
import { ONE_YEAR_IN_SECONDS } from '../constants';
import { Swap } from '../entities';
import { BaseRateOracle } from '../typechain';

const getAnnualizedTime = (start: number, end: number): number => {
  return (end - start) / ONE_YEAR_IN_SECONDS;
};

export type AccruedCashflowInfo = {
  avgFixedRate: number;
  accruedCashflow: number;
};

export type TransformedSwap = {
  avgFixedRate: number;
  notional: number;
  time: number;
};

export type AccruedCashflowArgs = {
  swaps: TransformedSwap[];
  rateOracle: BaseRateOracle;
  currentTime: number;
  endTime: number;
};

// get all swaps of some position, descale the values to numbers and sort by time
export function transformSwaps(swaps: Swap[], decimals: number): TransformedSwap[] {
  return swaps
    .map((s) => {
      return {
        notional: Number(
          utils.formatUnits(BigNumber.from(s.variableTokenDelta.toString()), decimals),
        ),
        time: Number(s.transactionTimestamp.toString()),
        avgFixedRate: Math.abs(
          Number(
            utils.formatUnits(
              BigNumber.from(s.fixedTokenDeltaUnbalanced.toString())
                .mul(BigNumber.from(10).pow(18))
                .div(BigNumber.from(s.variableTokenDelta.toString())),
              20,
            ),
          ),
        ),
      };
    })
    .sort((a, b) => a.time - b.time);
}

// get accrued cashflow of some position between two timestamps
async function getAccruedCashflowBetween(
  notional: number,
  fixedRate: number,
  rateOracle: BaseRateOracle,
  from: number,
  to: number,
) {
  // if notional > 0 -- VT, receives variable, pays fixed
  // if notional < 0 -- FT, received fixed, pays variable

  const nTime = getAnnualizedTime(from, to);
  const variableRate = Number(utils.formatUnits(await rateOracle.getApyFromTo(from, to), 18));

  return notional * nTime * (variableRate - fixedRate);
}

// in the case of an unwind, get the locked "profit" in the fixed token balance
// e.g. some position of 1,000 VT notional @ avg fixed rate 5%
// an unwind of 500 FT notional is triggered @ avg fixed rate 6% (at time T)
// the locked "profit" is 500 * (5% - 6%) * (Maturity - T) / YEAR
function getLockedInProfit(
  notional: number, // notional of unwind
  timeInYears: number,
  fixedRate0: number,
  fixedRate1: number,
) {
  // if the notional in unwind > 0, this means that the position is FT, then unwind (VT)
  // if the notional in unwind < 0, this means that the position is VT, then unwind (FT)

  return notional * timeInYears * (fixedRate0 - fixedRate1);
}

// get the accrued cashflow and average fixed rate of particular position
export const getAccruedCashflow = async ({
  swaps,
  rateOracle,
  currentTime,
  endTime,
}: AccruedCashflowArgs): Promise<AccruedCashflowInfo> => {
  if (swaps.length === 0) {
    return {
      avgFixedRate: 0,
      accruedCashflow: 0,
    };
  }
  let info = {
    accruedCashflow: 0,
    ...swaps[0],
  };

  for (let i = 1; i < swaps.length; i += 1) {
    const timeUntilMaturity = getAnnualizedTime(swaps[i].time, endTime);

    if (info.notional >= 0) {
      // overall position: VT

      if (swaps[i].notional < 0) {
        // swap: FT

        if (info.notional + swaps[i].notional > 0) {
          // partial unwind

          const lockedInProfit = getLockedInProfit(
            swaps[i].notional,
            timeUntilMaturity,
            info.avgFixedRate,
            swaps[i].avgFixedRate,
          );

          const accruedCashflowBetween = await getAccruedCashflowBetween(
            -swaps[i].notional, // notional > 0
            info.avgFixedRate,
            rateOracle,
            info.time,
            swaps[i].time,
          );

          info = {
            accruedCashflow: info.accruedCashflow + lockedInProfit + accruedCashflowBetween,
            notional: info.notional + swaps[i].notional,
            time: info.time,
            avgFixedRate: info.avgFixedRate,
          };
        } else {
          // full unwind + FT

          const lockedInProfit = getLockedInProfit(
            -info.notional,
            timeUntilMaturity,
            info.avgFixedRate,
            swaps[i].avgFixedRate,
          );

          const accruedCashflowBetween = await getAccruedCashflowBetween(
            info.notional, // notional > 0
            info.avgFixedRate,
            rateOracle,
            info.time,
            swaps[i].time,
          );

          info = {
            accruedCashflow: info.accruedCashflow + lockedInProfit + accruedCashflowBetween,
            notional: info.notional + swaps[i].notional,
            time: swaps[i].time,
            avgFixedRate: swaps[i].avgFixedRate,
          };
        }
      } else {
        // swap: VT -- extend position

        const accruedCashflowBetween = await getAccruedCashflowBetween(
          info.notional,
          info.avgFixedRate,
          rateOracle,
          info.time,
          swaps[i].time,
        );

        info = {
          accruedCashflow: info.accruedCashflow + accruedCashflowBetween,
          notional: info.notional + swaps[i].notional,
          time: swaps[i].time,
          avgFixedRate:
            (info.avgFixedRate * info.notional + swaps[i].avgFixedRate * swaps[i].notional) /
            (info.notional + swaps[i].notional),
        };
      }
    } else {
      // position: FT

      if (swaps[i].notional < 0) {
        // swap: FT -- extend position

        const accruedCashflowBetween = await getAccruedCashflowBetween(
          info.notional,
          info.avgFixedRate,
          rateOracle,
          info.time,
          swaps[i].time,
        );

        info = {
          accruedCashflow: info.accruedCashflow + accruedCashflowBetween,
          notional: info.notional + swaps[i].notional,
          time: swaps[i].time,
          avgFixedRate:
            (info.avgFixedRate * info.notional + swaps[i].avgFixedRate * swaps[i].notional) /
            (info.notional + swaps[i].notional),
        };
      } else {
        // swap: VT

        if (info.notional + swaps[i].notional < 0) {
          // partial unwind

          const lockedInProfit = getLockedInProfit(
            swaps[i].notional,
            timeUntilMaturity,
            info.avgFixedRate,
            swaps[i].avgFixedRate,
          );

          const accruedCashflowBetween = await getAccruedCashflowBetween(
            -swaps[i].notional, // notional < 0
            info.avgFixedRate,
            rateOracle,
            info.time,
            swaps[i].time,
          );

          info = {
            accruedCashflow: info.accruedCashflow + lockedInProfit + accruedCashflowBetween,
            notional: info.notional + swaps[i].notional,
            time: info.time,
            avgFixedRate: info.avgFixedRate,
          };
        } else {
          // full unwind + VT

          const lockedInProfit = getLockedInProfit(
            -info.notional,
            timeUntilMaturity,
            info.avgFixedRate,
            swaps[i].avgFixedRate,
          );

          const accruedCashflowBetween = await getAccruedCashflowBetween(
            info.notional, // notional < 0
            info.avgFixedRate,
            rateOracle,
            info.time,
            swaps[i].time,
          );

          info = {
            accruedCashflow: info.accruedCashflow + lockedInProfit + accruedCashflowBetween,
            notional: info.notional + swaps[i].notional,
            time: swaps[i].time,
            avgFixedRate: swaps[i].avgFixedRate,
          };
        }
      }
    }
  }

  // all swaps are processed, get the accrued of the overall position between the last update and now
  {
    const accruedCashflowBetween = await getAccruedCashflowBetween(
      info.notional,
      info.avgFixedRate,
      rateOracle,
      info.time,
      currentTime,
    );

    info = {
      accruedCashflow: info.accruedCashflow + accruedCashflowBetween,
      notional: info.notional,
      time: currentTime,
      avgFixedRate: info.avgFixedRate,
    };
  }

  return {
    avgFixedRate: 100 * info.avgFixedRate,
    accruedCashflow: info.accruedCashflow,
  };
};
