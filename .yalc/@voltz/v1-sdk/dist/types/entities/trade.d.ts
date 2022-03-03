import JSBI from 'jsbi';
import { TradeType } from '../types';
import { CurrencyAmount } from './fractions/currencyAmount';
import { Price } from './fractions/price';
import AMM from './amm';
import Token from './token';
/**
 * Represents a trade (Interest Rate Swap) executed
 * Does not account for slippage, i.e., changes in price environment that can occur between
 * the time the trade is submitted and when it is executed.
 * @template TUnderlying The underlying token, erc 20 (no support for ether currently)
 * @template TTradeType The trade type, either fixed taker (exact input) or variable taker (exact output)
 */
export declare class Trade<TUnderlying extends Token, TTradeType extends TradeType> {
    readonly amm: AMM;
    readonly notionalAmount: CurrencyAmount<TUnderlying>;
    readonly variableTokenDelta: JSBI;
    readonly fixedTokenDelta: JSBI;
    readonly fixedTokenDeltaUnbalanced: JSBI;
    /**
     * The type of the trade, either fixed taker (exact in) or variable taker (exact out).
     */
    readonly tradeType: TTradeType;
    /**
     * The cached result of the computed execution price
     * @private
     */
    private _executionPrice;
    /**
     * The price expressed in terms of output amount/input amount.
     */
    get executionPrice(): Price;
    /**
     * Construct a trade by passing in the pre-computed property values
     * @param routes The routes through which the trade occurs
     * @param tradeType The type of trade, exact input or exact output
     */
    private constructor();
}
//# sourceMappingURL=trade.d.ts.map