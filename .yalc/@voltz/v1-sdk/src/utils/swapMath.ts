import JSBI from 'jsbi'
import { NEGATIVE_ONE, ZERO } from '../internalConstants'
import { SqrtPriceMath } from './sqrtPriceMath'

const MAX_FEE = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(6))

export abstract class SwapMath {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  public static computeSwapStep(
    sqrtRatioCurrentX96: JSBI,
    sqrtRatioTargetX96: JSBI,
    liquidity: JSBI,
    amountRemaining: JSBI,
    feePercentage: JSBI,
    timeToMaturityInSeconds: JSBI
  ): [JSBI, JSBI, JSBI, JSBI] {
    
    let sqrtRatioNextX96: JSBI = JSBI.BigInt(0)
    let amountIn: JSBI = JSBI.BigInt(0)
    let amountOut: JSBI = JSBI.BigInt(0)
    let feeAmount: JSBI = JSBI.BigInt(0)

    const zeroForOne = JSBI.greaterThanOrEqual(sqrtRatioCurrentX96, sqrtRatioTargetX96)
    const exactIn = JSBI.greaterThanOrEqual(amountRemaining, ZERO)

    if (exactIn) {
      amountIn = zeroForOne
        ? SqrtPriceMath.getAmount0Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, true)
        : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, true)
      if (JSBI.greaterThanOrEqual(amountRemaining, amountIn!)) {
        sqrtRatioNextX96 = sqrtRatioTargetX96
      } else {
        sqrtRatioNextX96 = SqrtPriceMath.getNextSqrtPriceFromInput(
          sqrtRatioCurrentX96,
          liquidity,
          amountRemaining,
          zeroForOne
        )
      }
    } else {
      amountOut = zeroForOne
        ? SqrtPriceMath.getAmount1Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, false)
        : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, false)
      if (JSBI.greaterThanOrEqual(JSBI.multiply(amountRemaining, NEGATIVE_ONE), amountOut)) {
        sqrtRatioNextX96 = sqrtRatioTargetX96
      } else {
        sqrtRatioNextX96 = SqrtPriceMath.getNextSqrtPriceFromOutput(
          sqrtRatioCurrentX96,
          liquidity,
          JSBI.multiply(amountRemaining, NEGATIVE_ONE),
          zeroForOne
        )
      }
    }

    const max = JSBI.equal(sqrtRatioTargetX96, sqrtRatioNextX96)
    let notional;

    if (zeroForOne) {
      amountIn =
        max && exactIn
          ? amountIn
          : SqrtPriceMath.getAmount0Delta(sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, true)
      amountOut =
        max && !exactIn
          ? amountOut
          : SqrtPriceMath.getAmount1Delta(sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, false)
      // variable taker
      notional = amountOut
    } else {
      amountIn =
        max && exactIn
          ? amountIn
          : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, sqrtRatioNextX96, liquidity, true)
      amountOut =
        max && !exactIn
          ? amountOut
          : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, sqrtRatioNextX96, liquidity, false)
      // variable taker
      notional = amountIn
    }

    if (!exactIn && JSBI.greaterThan(amountOut!, JSBI.multiply(amountRemaining, NEGATIVE_ONE))) {
      amountOut = JSBI.multiply(amountRemaining, NEGATIVE_ONE)
    }

    feeAmount = JSBI.multiply(JSBI.multiply(notional, feePercentage), timeToMaturityInSeconds)

    return [sqrtRatioNextX96, amountIn, amountOut, feeAmount]
  }
}