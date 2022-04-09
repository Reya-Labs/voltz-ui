"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Swap = /** @class */ (function () {
    function Swap(_a) {
        var id = _a.id, transactionId = _a.transactionId, transactionBlockNumber = _a.transactionBlockNumber, transactionTimestamp = _a.transactionTimestamp, ammId = _a.ammId, positionId = _a.positionId, sender = _a.sender, txIndex = _a.txIndex, sqrtPriceX96 = _a.sqrtPriceX96, liquidity = _a.liquidity, tick = _a.tick;
        this.id = id;
        this.transactionId = transactionId;
        this.transactionBlockNumber = transactionBlockNumber;
        this.transactionTimestamp = transactionTimestamp;
        this.ammId = ammId;
        this.positionId = positionId;
        this.sender = sender;
        this.txIndex = txIndex;
        this.sqrtPriceX96 = sqrtPriceX96;
        this.liquidity = liquidity;
        this.tick = tick;
    }
    return Swap;
}());
exports.default = Swap;
