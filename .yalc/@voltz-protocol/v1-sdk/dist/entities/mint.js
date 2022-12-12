"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mint = /** @class */ (function () {
    function Mint(_a) {
        var id = _a.id, transactionId = _a.transactionId, transactionTimestamp = _a.transactionTimestamp, ammId = _a.ammId, positionId = _a.positionId, sender = _a.sender, amount = _a.amount;
        this.id = id;
        this.transactionId = transactionId;
        this.transactionTimestamp = transactionTimestamp;
        this.ammId = ammId;
        this.positionId = positionId;
        this.sender = sender;
        this.amount = amount;
    }
    return Mint;
}());
exports.default = Mint;
