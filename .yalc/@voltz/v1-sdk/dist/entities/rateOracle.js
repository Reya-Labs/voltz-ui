"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mapProtocolIdToProtocol_1 = __importDefault(require("../utils/mapProtocolIdToProtocol"));
var RateOracle = /** @class */ (function () {
    function RateOracle(_a) {
        var id = _a.id, protocolId = _a.protocolId;
        this.id = id;
        this.protocol = (0, mapProtocolIdToProtocol_1.default)(protocolId);
    }
    return RateOracle;
}());
exports.default = RateOracle;
