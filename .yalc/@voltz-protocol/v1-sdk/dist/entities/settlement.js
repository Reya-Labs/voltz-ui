"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Settlement = /** @class */ (function () {
    function Settlement(_a) {
        var id = _a.id, transactionId = _a.transactionId, transactionTimestamp = _a.transactionTimestamp, ammId = _a.ammId, positionId = _a.positionId, settlementCashflow = _a.settlementCashflow;
        this.id = id;
        this.transactionId = transactionId;
        this.transactionTimestamp = transactionTimestamp;
        this.ammId = ammId;
        this.positionId = positionId;
        this.settlementCashflow = settlementCashflow;
    }
    return Settlement;
}());
exports.default = Settlement;
