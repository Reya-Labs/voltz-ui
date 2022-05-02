"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarginUpdate = /** @class */ (function () {
    function MarginUpdate(_a) {
        var id = _a.id, transactionId = _a.transactionId, transactionTimestamp = _a.transactionTimestamp, ammId = _a.ammId, positionId = _a.positionId, depositer = _a.depositer, marginDelta = _a.marginDelta;
        this.id = id;
        this.transactionId = transactionId;
        this.transactionTimestamp = transactionTimestamp;
        this.ammId = ammId;
        this.positionId = positionId;
        this.depositer = depositer;
        this.marginDelta = marginDelta;
    }
    return MarginUpdate;
}());
exports.default = MarginUpdate;
