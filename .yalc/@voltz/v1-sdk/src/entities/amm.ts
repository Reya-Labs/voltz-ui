import { BigintIsh } from '../constants'
import { Price } from './fractions/price'
import { Token } from './token'
import { CurrencyAmount } from './fractions/currencyAmount'

import JSBI from 'jsbi'
import invariant from 'tiny-invariant'

import { FACTORY_ADDRESS } from '../constants'
import { NEGATIVE_ONE, ONE, Q192, ZERO } from '../internalConstants'
// todo: compute me, vamm, fcm address (with salt), will need to be tweaked for the new proxy pattern
// todo: get back to swap math
// import { SwapMath } from '../utils/swapMath'
import { TickMath } from '../utils/tickMath'
import { Tick, TickConstructorArgs } from './tick'

import { NoTickDataProvider, TickDataProvider } from './tickDataProvider'
import { TickListDataProvider } from './tickListDataProvider'
import { SwapMath } from '../utils/swapMath'
import { LiquidityMath } from '../utils/liquidityMath'

interface StepComputations {
    sqrtPriceStartX96: JSBI
    tickNext: number
    initialized: boolean
    sqrtPriceNextX96: JSBI
    amountIn: JSBI
    amountOut: JSBI
    feeAmount: JSBI
    feeProtocolDelta: JSBI // for LP
    fixedTokenDeltaUnbalanced: JSBI // for LP
    fixedTokenDelta: JSBI // for LP
    variableTokenDelta: JSBI
  }

/**
 * By default, pools will not allow operations that require ticks.
 */
const NO_TICK_DATA_PROVIDER_DEFAULT = new NoTickDataProvider()

/**
 * Represents a Voltz IRS AMM
 */
export class AMM {

    public readonly termStartTimestamp: JSBI;        
    public readonly termEndTimestamp: JSBI;
    public readonly underlyingToken: Token
    public readonly sqrtRatioX96: JSBI
    public readonly liquidity: JSBI
    public readonly fee: JSBI;
    public readonly tickCurrent: number
    public readonly tickSpacing: number
    public readonly tickDataProvider: TickDataProvider
    private _fixedRate?: Price
    private _price?: Price

   /**
   * Construct an IRS AMM
   * @param underlyingToken One of the tokens in the pool
   * @param sqrtRatioX96 The sqrt of the current ratio of amounts of variable token to fixed token
   * @param liquidity The current value of in range liquidity
   * @param tickCurrent The current tick of the pool
   * @param ticks The current state of the pool ticks or a data provider that can return tick data
   */
  public constructor(
    termStartTimestamp: JSBI,
    termEndTimestamp: JSBI,
    underlyingToken: Token,
    sqrtRatioX96: BigintIsh,
    liquidity: BigintIsh,
    tickCurrent: number,
    tickSpacing: number,
    fee: JSBI,
    ticks: TickDataProvider | (Tick | TickConstructorArgs)[] = NO_TICK_DATA_PROVIDER_DEFAULT
  ) {

    const tickCurrentSqrtRatioX96 = TickMath.getSqrtRatioAtTick(tickCurrent)
    const nextTickSqrtRatioX96 = TickMath.getSqrtRatioAtTick(tickCurrent + 1)
    invariant(
      JSBI.greaterThanOrEqual(JSBI.BigInt(sqrtRatioX96), tickCurrentSqrtRatioX96) &&
        JSBI.lessThanOrEqual(JSBI.BigInt(sqrtRatioX96), nextTickSqrtRatioX96),
      'PRICE_BOUNDS'
    )
    // always create a copy of the list since we want the pool's tick list to be immutable
    this.underlyingToken = underlyingToken
    this.sqrtRatioX96 = JSBI.BigInt(sqrtRatioX96)
    this.liquidity = JSBI.BigInt(liquidity)
    this.tickCurrent = tickCurrent
    this.tickDataProvider = Array.isArray(ticks) ? new TickListDataProvider(ticks, tickSpacing) : ticks
    this.tickSpacing = tickSpacing
    this.fee = fee
    this.termStartTimestamp = termStartTimestamp
    this.termEndTimestamp = termEndTimestamp
  }


/**
 * Returns the current mid fixed rate (in percentage points) of the amm, it is the ratio of fixed tokens over variable tokens
 */
public get fixedRate(): Price {
    return (
        this._fixedRate ??
        (this._fixedRate = new Price(
        JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96),
        Q192
        ))
    )
} 

public get price(): Price {
  return (
    this._price ??
    (this._price = new Price(
    Q192,
    JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96)
    ))
  )
}

  /**
   * Returns true if the token is either token0 or token1
   * @param token The token to check
   * @returns True if token is either token0 or token
   */
   public involvesToken(token: Token): boolean {
    return token.equals(this.underlyingToken)
  }

  // todo: get output amount
  // todo: get input amount


// todo: finish swap
/**
 * Executes a swap
 * @param zeroForOne Whether the amount in is token0 or token1
 * @param amountSpecified The amount of the swap, which implicitly configures the swap as exact input (positive), or exact output (negative)
 * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
 * @returns amountCalculated
 * @returns sqrtRatioX96
 * @returns liquidity
 * @returns tickCurrent
 */
 private async swap(
    amountSpecified: JSBI,
    currentTimestamp: JSBI,
    sqrtPriceLimitX96?: JSBI
 ) {
    let isFT: boolean;

    isFT = JSBI.greaterThan(amountSpecified, ZERO)

    if (!sqrtPriceLimitX96)
    sqrtPriceLimitX96 = !isFT
      ? JSBI.add(TickMath.MIN_SQRT_RATIO, ONE)
      : JSBI.subtract(TickMath.MAX_SQRT_RATIO, ONE)

      if (!isFT) {
        invariant(JSBI.greaterThan(sqrtPriceLimitX96, TickMath.MIN_SQRT_RATIO), 'RATIO_MIN')
        invariant(JSBI.lessThan(sqrtPriceLimitX96, this.sqrtRatioX96), 'RATIO_CURRENT')
      } else {
        invariant(JSBI.lessThan(sqrtPriceLimitX96, TickMath.MAX_SQRT_RATIO), 'RATIO_MAX')
        invariant(JSBI.greaterThan(sqrtPriceLimitX96, this.sqrtRatioX96), 'RATIO_CURRENT')
      }

      const exactInput = JSBI.greaterThanOrEqual(amountSpecified, ZERO)

      // keep track of swap state
  
      const state = {
        amountSpecifiedRemaining: amountSpecified,
        amountCalculated: ZERO,
        sqrtPriceX96: this.sqrtRatioX96,
        tick: this.tickCurrent,
        liquidity: this.liquidity,
        fixedTokenDeltaCumulative: 0, // for Trader (user invoking the swap)
        variableTokenDeltaCumulative: 0, // for Trader (user invoking the swap),
        fixedTokenDeltaUnbalancedCumulative: 0 //  for Trader (user invoking the swap)
      }

        // start swap while loop
    while (JSBI.notEqual(state.amountSpecifiedRemaining, ZERO) && state.sqrtPriceX96 != sqrtPriceLimitX96) {
        let step: Partial<StepComputations> = {}
        step.sqrtPriceStartX96 = state.sqrtPriceX96
  
        // because each iteration of the while loop rounds, we can't optimize this code (relative to the smart contract)
        // by simply traversing to the next available tick, we instead need to exactly replicate
        // tickBitmap.nextInitializedTickWithinOneWord
        ;[step.tickNext, step.initialized] = await this.tickDataProvider.nextInitializedTickWithinOneWord(
          state.tick,
          !isFT,
          this.tickSpacing
        )
  
        if (step.tickNext < TickMath.MIN_TICK) {
          step.tickNext = TickMath.MIN_TICK
        } else if (step.tickNext > TickMath.MAX_TICK) {
          step.tickNext = TickMath.MAX_TICK
        }
  
        step.sqrtPriceNextX96 = TickMath.getSqrtRatioAtTick(step.tickNext)
        
        ;[state.sqrtPriceX96, step.amountIn, step.amountOut, step.feeAmount] = SwapMath.computeSwapStep(
          state.sqrtPriceX96,
          (!isFT
          ? JSBI.lessThan(step.sqrtPriceNextX96, sqrtPriceLimitX96)
          : JSBI.greaterThan(step.sqrtPriceNextX96, sqrtPriceLimitX96))
            ? sqrtPriceLimitX96
            : step.sqrtPriceNextX96,
          state.liquidity,
          state.amountSpecifiedRemaining,
          this.fee,
          JSBI.subtract(this.termEndTimestamp, currentTimestamp)
        )
    
        if (exactInput) {
          state.amountSpecifiedRemaining = JSBI.subtract(
            state.amountSpecifiedRemaining,
            JSBI.add(step.amountIn, step.feeAmount)
          )
          state.amountCalculated = JSBI.subtract(state.amountCalculated, step.amountOut)
        
          // LP is a variable taker
          step.variableTokenDelta = step.amountIn;
          step.fixedTokenDeltaUnbalanced = JSBI.multiply(step.amountOut, NEGATIVE_ONE)

        } else {
          state.amountSpecifiedRemaining = JSBI.add(state.amountSpecifiedRemaining, step.amountOut)
          state.amountCalculated = JSBI.add(state.amountCalculated, JSBI.add(step.amountIn, step.feeAmount))

          // LP is a fixed taker
          step.variableTokenDelta = JSBI.multiply(step.amountOut, NEGATIVE_ONE)
          step.fixedTokenDeltaUnbalanced = step.amountIn
        }
        

        // todo: bring rebalancing logic in here
        // state.fixedTokenDeltaCumulative -= step.fixedTokenDelta; // opposite sign from that of the LP's
        // state.variableTokenDeltaCumulative -= step.variableTokenDelta; // opposite sign from that of the LP's
        
        // // necessary for testing purposes, also handy to quickly compute the fixed rate at which an interest rate swap is created
        // state.fixedTokenDeltaUnbalancedCumulative -= step.fixedTokenDeltaUnbalanced;
        // state.fixedTokenDeltaCumulative = JSBI.subtract(state.fixedTokenDeltaCumulative, step.fixedTokenDelta)
  
        // TODO
        if (JSBI.equal(state.sqrtPriceX96, step.sqrtPriceNextX96)) {
          // if the tick is initialized, run the tick transition
          if (step.initialized) {
            let liquidityNet = JSBI.BigInt((await this.tickDataProvider.getTick(step.tickNext)).liquidityNet)
            // if we're moving leftward, we interpret liquidityNet as the opposite sign
            // safe because liquidityNet cannot be type(int128).min
            if (!isFT) liquidityNet = JSBI.multiply(liquidityNet, NEGATIVE_ONE)
  
            state.liquidity = LiquidityMath.addDelta(state.liquidity, liquidityNet)
          }
  
          state.tick = !isFT ? step.tickNext - 1 : step.tickNext
        } else if (state.sqrtPriceX96 != step.sqrtPriceStartX96) {
          // recompute unless we're on a lower tick boundary (i.e. already transitioned ticks), and haven't moved
          state.tick = TickMath.getTickAtSqrtRatio(state.sqrtPriceX96)
        }
      }
  
      return {
        amountCalculated: state.amountCalculated,
        sqrtRatioX96: state.sqrtPriceX96,
        liquidity: state.liquidity,
        tickCurrent: state.tick,

      }


 }  
    
    
}

