"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MintOrBurn = /** @class */ (function () {
    function MintOrBurn(_a) {
        var id = _a.id, transactionId = _a.transactionId, transactionBlockNumber = _a.transactionBlockNumber, transactionTimestamp = _a.transactionTimestamp, ammId = _a.ammId, positionId = _a.positionId, sender = _a.sender;
        this.id = id;
        this.transactionId = transactionId;
        this.transactionBlockNumber = transactionBlockNumber;
        this.transactionTimestamp = transactionTimestamp;
        this.ammId = ammId;
        this.positionId = positionId;
        this.sender = sender;
    }
    return MintOrBurn;
}());
exports.default = MintOrBurn;
