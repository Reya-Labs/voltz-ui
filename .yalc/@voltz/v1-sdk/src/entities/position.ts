import { BigintIsh, MaxUint256 } from '../constants'
import { Price } from './fractions/price'
import { Token } from './token'
import { CurrencyAmount } from './fractions/currencyAmount'
import { Percent } from './fractions/percent'
import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import { ZERO } from '../internalConstants'
import { maxLiquidityForAmounts } from '../utils/maxLiquidityForAmounts'
import { tickToPrice } from '../utils/priceTickConversions'
import { SqrtPriceMath } from '../utils/sqrtPriceMath'
import { TickMath } from '../utils/tickMath'
import { encodeSqrtRatioX96 } from '../utils/encodeSqrtRatioX96'
import { AMM } from './amm'

interface PositionConstructorArgs {
    amm: AMM
    tickLower: number
    tickUpper: number
    liquidity: BigintIsh
    isSettled: boolean
    margin: JSBI
    fixedTokenBalance: JSBI
    variableTokenBalance: JSBI
}


/**
 * Represents a position on a Voltz v1 AMM
 */
 export class Position {
    public readonly amm: AMM
    public readonly tickLower: number
    public readonly tickUpper: number
    public readonly liquidity: JSBI
    public isSettled: boolean;
    public margin: JSBI;
    public fixedTokenBalance: JSBI;
    public variableTokenBalance: JSBI;

  
    // cached resuts for the getters
    // private _token0Amount: CurrencyAmount<Token> | null = null
    // private _token1Amount: CurrencyAmount<Token> | null = null
    // private _mintAmounts: Readonly<{ amount0: JSBI; amount1: JSBI }> | null = null
  
    /**
     * Constructs a position for a given pool with the given liquidity
     * @param amm For which amm the liquidity is assigned
     * @param liquidity The amount of liquidity that is in the position
     * @param tickLower The lower tick of the position
     * @param tickUpper The upper tick of the position
     * @param margin 
     * @param fixedTokenBalance 
     * @param variableTokenBalance 
     */
    public constructor({ amm, liquidity, tickLower, tickUpper, isSettled, margin, fixedTokenBalance, variableTokenBalance }: PositionConstructorArgs) {
      invariant(tickLower < tickUpper, 'TICK_ORDER')
      invariant(tickLower >= TickMath.MIN_TICK && tickLower % amm.tickSpacing === 0, 'TICK_LOWER')
      invariant(tickUpper <= TickMath.MAX_TICK && tickUpper % amm.tickSpacing === 0, 'TICK_UPPER')
  
      this.amm = amm
      this.tickLower = tickLower
      this.tickUpper = tickUpper
      this.liquidity = JSBI.BigInt(liquidity)
      this.isSettled = isSettled
      this.margin = JSBI.BigInt(margin); // todo: is BigInt precise enough?
      this.fixedTokenBalance = fixedTokenBalance
      this.variableTokenBalance = variableTokenBalance
    }
  
    /**
     * Returns the price of token0 at the lower tick
     */
    public get priceLower(): Price {
      // this inverse if this value is the fixed rate (in percentage points) that corresponds to the lower tick
      return tickToPrice(this.tickLower)
    }
  
    /**
     * Returns the price of token0 at the upper tick
     */
    public get priceUpper(): Price {
      // the inverse of this value is the fixed rate (in percentage points) that corresponds to the upper tick    
      return tickToPrice(this.tickUpper)
    }


  }




