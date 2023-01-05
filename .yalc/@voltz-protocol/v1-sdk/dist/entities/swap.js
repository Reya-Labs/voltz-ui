"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Swap = /** @class */ (function () {
    function Swap(_a) {
        var id = _a.id, transactionId = _a.transactionId, transactionTimestamp = _a.transactionTimestamp, ammId = _a.ammId, positionId = _a.positionId, sender = _a.sender, desiredNotional = _a.desiredNotional, sqrtPriceLimitX96 = _a.sqrtPriceLimitX96, cumulativeFeeIncurred = _a.cumulativeFeeIncurred, fixedTokenDelta = _a.fixedTokenDelta, variableTokenDelta = _a.variableTokenDelta, fixedTokenDeltaUnbalanced = _a.fixedTokenDeltaUnbalanced;
        this.id = id;
        this.transactionId = transactionId;
        this.transactionTimestamp = transactionTimestamp;
        this.ammId = ammId;
        this.positionId = positionId;
        this.sender = sender;
        this.desiredNotional = desiredNotional;
        this.sqrtPriceLimitX96 = sqrtPriceLimitX96;
        this.cumulativeFeeIncurred = cumulativeFeeIncurred;
        this.fixedTokenDelta = fixedTokenDelta;
        this.variableTokenDelta = variableTokenDelta;
        this.fixedTokenDeltaUnbalanced = fixedTokenDeltaUnbalanced;
    }
    return Swap;
}());
exports.default = Swap;
//# sourceMappingURL=swap.js.map