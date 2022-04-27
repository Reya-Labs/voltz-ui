"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FCMSettlement = /** @class */ (function () {
    function FCMSettlement(_a) {
        var id = _a.id, transactionId = _a.transactionId, transactionTimestamp = _a.transactionTimestamp, ammId = _a.ammId, fcmPositionId = _a.fcmPositionId, settlementCashflow = _a.settlementCashflow;
        this.id = id;
        this.transactionId = transactionId;
        this.transactionTimestamp = transactionTimestamp;
        this.ammId = ammId;
        this.fcmPositionId = fcmPositionId;
        this.settlementCashflow = settlementCashflow;
    }
    return FCMSettlement;
}());
exports.default = FCMSettlement;
