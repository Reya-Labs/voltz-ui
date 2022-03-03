"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trade = void 0;
var price_1 = require("./fractions/price");
// a trade is equivalent to a swap
/**
 * Represents a trade (Interest Rate Swap) executed
 * Does not account for slippage, i.e., changes in price environment that can occur between
 * the time the trade is submitted and when it is executed.
 * @template TUnderlying The underlying token, erc 20 (no support for ether currently)
 * @template TTradeType The trade type, either fixed taker (exact input) or variable taker (exact output)
 */
var Trade = /** @class */ (function () {
    // todo: price impact
    /**
     * Construct a trade by passing in the pre-computed property values
     * @param routes The routes through which the trade occurs
     * @param tradeType The type of trade, exact input or exact output
     */
    function Trade(_a) {
        var amm = _a.amm, notionalAmount = _a.notionalAmount, variableTokenDelta = _a.variableTokenDelta, fixedTokenDelta = _a.fixedTokenDelta, fixedTokenDeltaUnbalanced = _a.fixedTokenDeltaUnbalanced, tradeType = _a.tradeType;
        this.amm = amm;
        this.notionalAmount = notionalAmount;
        this.variableTokenDelta = variableTokenDelta;
        this.fixedTokenDelta = fixedTokenDelta;
        this.fixedTokenDeltaUnbalanced = fixedTokenDeltaUnbalanced;
        this.tradeType = tradeType;
    }
    Object.defineProperty(Trade.prototype, "executionPrice", {
        /**
         * The price expressed in terms of output amount/input amount.
         */
        get: function () {
            var _a;
            return ((_a = this._executionPrice) !== null && _a !== void 0 ? _a : (this._executionPrice = new price_1.Price(this.variableTokenDelta, this.fixedTokenDelta)));
        },
        enumerable: false,
        configurable: true
    });
    return Trade;
}());
exports.Trade = Trade;
