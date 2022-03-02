import { TradeType } from '../constants'
import { AMM } from './amm'
import { Token } from './token'
import { CurrencyAmount } from './fractions/currencyAmount'
import JSBI from 'jsbi'
import { Price } from './fractions/price'
import { Percent } from './fractions/percent'
import invariant from 'tiny-invariant'

// a trade is equivalent to a swap
/**
 * Represents a trade (Interest Rate Swap) executed
 * Does not account for slippage, i.e., changes in price environment that can occur between
 * the time the trade is submitted and when it is executed.
 * @template TUnderlying The underlying token, erc 20 (no support for ether currently)
 * @template TTradeType The trade type, either fixed taker (exact input) or variable taker (exact output)
 */
 export class Trade<TUnderlying extends Token, TTradeType extends TradeType> {
    
    public readonly amm: AMM
    public readonly notionalAmount: CurrencyAmount<TUnderlying>
    public readonly variableTokenDelta: JSBI
    public readonly fixedTokenDelta: JSBI
    public readonly fixedTokenDeltaUnbalanced: JSBI
    // todo: cumulativeFeeIncurred?
    // todo: sqrtPriceLimit?
  
    /**
     * The type of the trade, either fixed taker (exact in) or variable taker (exact out).
     */
    public readonly tradeType: TTradeType

    // the inverse of this value is the fixed rate in percentage points
    /**
     * The cached result of the computed execution price
     * @private
     */
    private _executionPrice: Price | undefined
  
    /**
     * The price expressed in terms of output amount/input amount.
     */
    public get executionPrice(): Price {
      return (
        this._executionPrice ??
        (this._executionPrice = new Price(
          this.variableTokenDelta,
          this.fixedTokenDelta
        ))
      )
    }
  
    // todo: price impact

    /**
     * Construct a trade by passing in the pre-computed property values
     * @param routes The routes through which the trade occurs
     * @param tradeType The type of trade, exact input or exact output
     */
    private constructor({
      amm,
      notionalAmount,
      variableTokenDelta,
      fixedTokenDelta,
      fixedTokenDeltaUnbalanced,
      tradeType
    }: {
      amm: AMM,
      notionalAmount: CurrencyAmount<TUnderlying>,
      variableTokenDelta: JSBI,
      fixedTokenDelta: JSBI,
      fixedTokenDeltaUnbalanced: JSBI
      tradeType: TTradeType
    }) {
      this.amm = amm
      this.notionalAmount = notionalAmount
      this.variableTokenDelta = variableTokenDelta
      this.fixedTokenDelta = fixedTokenDelta
      this.fixedTokenDeltaUnbalanced = fixedTokenDeltaUnbalanced
      this.tradeType = tradeType
    }
    
    // todo: finish the below
    // /**
    //  * Get the minimum amount that must be received from this trade for the given slippage tolerance
    //  * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
    //  * @returns The amount out
    //  */
    // public minimumAmountOut(slippageTolerance: Percent, amountOut = this.outputAmount): CurrencyAmount<TOutput> {
    //   invariant(!slippageTolerance.lessThan(ZERO), 'SLIPPAGE_TOLERANCE')
    //   if (this.tradeType === TradeType.EXACT_OUTPUT) {
    //     return amountOut
    //   } else {
    //     const slippageAdjustedAmountOut = new Fraction(ONE)
    //       .add(slippageTolerance)
    //       .invert()
    //       .multiply(amountOut.quotient).quotient
    //     return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut)
    //   }
    // }
  
    // /**
    //  * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
    //  * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
    //  * @returns The amount in
    //  */
    // public maximumAmountIn(slippageTolerance: Percent, amountIn = this.inputAmount): CurrencyAmount<TInput> {
    //   invariant(!slippageTolerance.lessThan(ZERO), 'SLIPPAGE_TOLERANCE')
    //   if (this.tradeType === TradeType.EXACT_INPUT) {
    //     return amountIn
    //   } else {
    //     const slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient
    //     return CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn)
    //   }
    // }
  
    // /**
    //  * Return the execution price after accounting for slippage tolerance
    //  * @param slippageTolerance the allowed tolerated slippage
    //  * @returns The execution price
    //  */
    // public worstExecutionPrice(slippageTolerance: Percent): Price<TInput, TOutput> {
    //   return new Price(
    //     this.inputAmount.currency,
    //     this.outputAmount.currency,
    //     this.maximumAmountIn(slippageTolerance).quotient,
    //     this.minimumAmountOut(slippageTolerance).quotient
    //   )
    // }
  
  }