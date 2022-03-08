"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Q192 = exports.Q96 = exports.ONE = exports.ZERO = exports.NEGATIVE_ONE = exports.AMM_INIT_CODE_HASH = exports.PERIPHERY_ADDRESS = exports.FACTORY_ADDRESS = exports.ADDRESS_ZERO = exports.MaxUint256 = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
exports.MaxUint256 = jsbi_1.default.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
exports.ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
// todo: needs to be adjusted
exports.FACTORY_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
// todo: needs to be adjusted
exports.PERIPHERY_ADDRESS = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';
// todo: needs to be adjusted
exports.AMM_INIT_CODE_HASH = '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54';
// constants used internally but not expected to be used externally
exports.NEGATIVE_ONE = jsbi_1.default.BigInt(-1);
exports.ZERO = jsbi_1.default.BigInt(0);
exports.ONE = jsbi_1.default.BigInt(1);
// used in liquidity amount math
exports.Q96 = jsbi_1.default.exponentiate(jsbi_1.default.BigInt(2), jsbi_1.default.BigInt(96));
exports.Q192 = jsbi_1.default.exponentiate(exports.Q96, jsbi_1.default.BigInt(2));
