"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tick = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
var tiny_invariant_1 = __importDefault(require("tiny-invariant"));
var tickMath_1 = require("../utils/tickMath");
var Tick = /** @class */ (function () {
    function Tick(_a) {
        var index = _a.index, liquidityGross = _a.liquidityGross, liquidityNet = _a.liquidityNet;
        (0, tiny_invariant_1.default)(index >= tickMath_1.TickMath.MIN_TICK && index <= tickMath_1.TickMath.MAX_TICK, 'TICK');
        this.index = index;
        this.liquidityGross = jsbi_1.default.BigInt(liquidityGross);
        this.liquidityNet = jsbi_1.default.BigInt(liquidityNet);
    }
    return Tick;
}());
exports.Tick = Tick;
