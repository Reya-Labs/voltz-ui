"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rounding = exports.TradeType = void 0;
var TradeType;
(function (TradeType) {
    TradeType[TradeType["FIXED_TAKER"] = 0] = "FIXED_TAKER";
    TradeType[TradeType["VARIABLE_TAKER"] = 1] = "VARIABLE_TAKER";
})(TradeType = exports.TradeType || (exports.TradeType = {}));
var Rounding;
(function (Rounding) {
    Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
    Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
    Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(Rounding = exports.Rounding || (exports.Rounding = {}));
