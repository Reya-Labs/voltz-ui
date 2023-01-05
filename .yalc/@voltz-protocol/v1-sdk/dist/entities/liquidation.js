"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Liquidation = /** @class */ (function () {
    function Liquidation(_a) {
        var id = _a.id, transactionId = _a.transactionId, transactionTimestamp = _a.transactionTimestamp, ammId = _a.ammId, positionId = _a.positionId, liquidator = _a.liquidator, reward = _a.reward, notionalUnwound = _a.notionalUnwound;
        this.id = id;
        this.transactionId = transactionId;
        this.transactionTimestamp = transactionTimestamp;
        this.ammId = ammId;
        this.positionId = positionId;
        this.liquidator = liquidator;
        this.reward = reward;
        this.notionalUnwound = notionalUnwound;
    }
    return Liquidation;
}());
exports.default = Liquidation;
//# sourceMappingURL=liquidation.js.map