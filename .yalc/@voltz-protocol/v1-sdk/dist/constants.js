"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONE_YEAR_IN_SECONDS = exports.MAX_FIXED_RATE = exports.MIN_FIXED_RATE = exports.MAX_TICK = exports.MIN_TICK = exports.Rounding = exports.Q192 = exports.Q96 = exports.ONE = exports.ZERO = exports.NEGATIVE_ONE = exports.PERIPHERY_ADDRESS = exports.FACTORY_ADDRESS = exports.ADDRESS_ZERO = exports.TresholdApprovalBn = exports.MaxUint256Bn = exports.MaxUint256 = void 0;
var ethers_1 = require("ethers");
var jsbi_1 = __importDefault(require("jsbi"));
exports.MaxUint256 = jsbi_1.default.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
exports.MaxUint256Bn = ethers_1.BigNumber.from('115792089237316195423570985008687907853269984665640564039457584007913129639935');
exports.TresholdApprovalBn = ethers_1.BigNumber.from('6277101735386680763835789423207666416102355444464034512896');
exports.ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
// Latest kovan deployment address of the factory
exports.FACTORY_ADDRESS = '0x9f9e5e2dFbE4c94eFFeb5aAa60D87BD3C72484cf';
// Latest kovan deployment address of the periphery
exports.PERIPHERY_ADDRESS = '0xE63B5516f7Eda93da983c16Ec8775a5029Ed1eba';
// constants used internally but not expected to be used externally
exports.NEGATIVE_ONE = jsbi_1.default.BigInt(-1);
exports.ZERO = jsbi_1.default.BigInt(0);
exports.ONE = jsbi_1.default.BigInt(1);
// used in liquidity amount math
exports.Q96 = jsbi_1.default.exponentiate(jsbi_1.default.BigInt(2), jsbi_1.default.BigInt(96));
exports.Q192 = jsbi_1.default.exponentiate(exports.Q96, jsbi_1.default.BigInt(2));
var Rounding;
(function (Rounding) {
    Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
    Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
    Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(Rounding = exports.Rounding || (exports.Rounding = {}));
/**
 * The minimum tick that can be used on any pool.
 */
exports.MIN_TICK = -69100;
/**
 * The maximum tick that can be used on any pool.
 */
exports.MAX_TICK = 69100;
/**
 * The minimum tick that can be used on any pool.
 */
exports.MIN_FIXED_RATE = 0.001;
/**
 * The maximum tick that can be used on any pool.
 */
exports.MAX_FIXED_RATE = 1001;
exports.ONE_YEAR_IN_SECONDS = 31536000;
