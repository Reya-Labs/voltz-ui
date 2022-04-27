"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var token_1 = __importDefault(require("../token"));
var rateOracle_1 = __importDefault(require("../rateOracle"));
var amm_1 = __importDefault(require("../amm"));
var tickMath_1 = require("../../utils/tickMath");
describe('amm', function () {
    describe('amm init', function () {
        var amm_wallet, amm_other;
        var wallet, other;
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var vammAddress, marginEngineAddress, provider, privateKey;
            return __generator(this, function (_a) {
                vammAddress = '0xe451980132e65465d0a498c53f0b5227326dd73f';
                marginEngineAddress = '0x75537828f2ce51be7289709686a69cbfdbb714f1';
                provider = new ethers_1.providers.JsonRpcProvider('http://0.0.0.0:8545/');
                privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
                wallet = new ethers_1.Wallet(privateKey, provider);
                other = new ethers_1.Wallet('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', provider);
                amm_wallet = new amm_1.default({
                    id: vammAddress,
                    signer: wallet,
                    provider: provider,
                    createdTimestamp: '1646856471',
                    fcmAddress: '0x5392a33f7f677f59e833febf4016cddd88ff9e67',
                    liquidity: '0',
                    marginEngineAddress: marginEngineAddress,
                    rateOracle: new rateOracle_1.default({
                        id: '0x0165878a594ca255338adfa4d48449f69242eb8f',
                        protocolId: 1,
                    }),
                    underlyingToken: new token_1.default({
                        id: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
                        name: 'USDC',
                        decimals: 18,
                    }),
                    sqrtPriceX96: tickMath_1.TickMath.getSqrtRatioAtTick(0).toString(),
                    termEndTimestamp: '1649458800000000000000000000',
                    termStartTimestamp: '1646856441000000000000000000',
                    tick: '0',
                    tickSpacing: '1000',
                    txCount: 0,
                    updatedTimestamp: '1646856471',
                });
                amm_other = new amm_1.default({
                    id: vammAddress,
                    signer: other,
                    provider: provider,
                    createdTimestamp: '1646856471',
                    fcmAddress: '0x5392a33f7f677f59e833febf4016cddd88ff9e67',
                    liquidity: '0',
                    marginEngineAddress: marginEngineAddress,
                    rateOracle: new rateOracle_1.default({
                        id: '0x0165878a594ca255338adfa4d48449f69242eb8f',
                        protocolId: 1,
                    }),
                    underlyingToken: new token_1.default({
                        id: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
                        name: 'USDC',
                        decimals: 18,
                    }),
                    sqrtPriceX96: tickMath_1.TickMath.getSqrtRatioAtTick(0).toString(),
                    termEndTimestamp: '1649458800000000000000000000',
                    termStartTimestamp: '1646856441000000000000000000',
                    tick: '0',
                    tickSpacing: '1000',
                    txCount: 0,
                    updatedTimestamp: '1646856471',
                });
                return [2 /*return*/];
            });
        }); });
        it("Disordered ticks in swap", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_other.swap({
                                isFT: true,
                                notional: 5000000,
                                fixedLow: 2,
                                fixedHigh: 1,
                                margin: 0,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        failure = true;
                        expect(error_1 instanceof Error);
                        expect(error_1.message).toBe("Lower Fixed Rate must be smaller than Upper Fixed Rate!");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Disordered ticks in mint", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_wallet.mint({
                                fixedLow: 2,
                                fixedHigh: 1,
                                margin: 0,
                                notional: 5000000
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        failure = true;
                        expect(error_2 instanceof Error);
                        expect(error_2.message).toBe("Lower Fixed Rate must be smaller than Upper Fixed Rate!");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Fixed rate too low in swap", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_other.swap({
                                isFT: true,
                                notional: 5000000,
                                fixedLow: 0.000001,
                                fixedHigh: 1,
                                margin: 0,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        failure = true;
                        expect(error_3 instanceof Error);
                        expect(error_3.message).toBe("Lower Fixed Rate is too low!");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Fixed rate too low in mint", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_wallet.mint({
                                fixedLow: 0.000001,
                                fixedHigh: 1,
                                margin: 0,
                                notional: 5000000
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        failure = true;
                        expect(error_4 instanceof Error);
                        expect(error_4.message).toBe("Lower Fixed Rate is too low!");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Fixed rate too high in swap", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_other.swap({
                                isFT: true,
                                notional: 5000000,
                                fixedLow: 1,
                                fixedHigh: 1500,
                                margin: 0,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        failure = true;
                        expect(error_5 instanceof Error);
                        expect(error_5.message).toBe("Upper Fixed Rate is too high!");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Fixed rate too high in mint", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_wallet.mint({
                                fixedLow: 1,
                                fixedHigh: 1500,
                                margin: 0,
                                notional: 5000000
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        failure = true;
                        expect(error_6 instanceof Error);
                        expect(error_6.message).toBe("Upper Fixed Rate is too high!");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Notional 0 in swap", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_other.swap({
                                isFT: true,
                                notional: 0,
                                fixedLow: 1,
                                fixedHigh: 2,
                                margin: 0,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        failure = true;
                        expect(error_7 instanceof Error);
                        expect(error_7.message).toBe("Amount of notional must be greater than 0!");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Notional 0 in mint", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_wallet.mint({
                                fixedLow: 1,
                                fixedHigh: 2,
                                margin: 0,
                                notional: 0
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _a.sent();
                        failure = true;
                        expect(error_8 instanceof Error);
                        expect(error_8.message).toBe("Amount of notional must be greater than 0!");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Negative margin in swap", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_other.swap({
                                isFT: true,
                                notional: 5000000,
                                fixedLow: 1,
                                fixedHigh: 2,
                                margin: -10,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        failure = true;
                        expect(error_9 instanceof Error);
                        expect(error_9.message).toBe("Amount of margin cannot be negative!");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Negative margin in mint", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_wallet.mint({
                                fixedLow: 1,
                                fixedHigh: 2,
                                margin: -10,
                                notional: 5000000
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_10 = _a.sent();
                        failure = true;
                        expect(error_10 instanceof Error);
                        expect(error_10.message).toBe("Amount of margin cannot be negative!");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("MarginRequirementNotMet", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_other.swap({
                                isFT: true,
                                notional: 5000000,
                                fixedLow: 1,
                                fixedHigh: 2,
                                margin: 0,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_11 = _a.sent();
                        failure = true;
                        expect(error_11 instanceof Error);
                        expect(error_11.message).toBe("No enough margin for this operation");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("MarginLessThanMinimum", function () { return __awaiter(void 0, void 0, void 0, function () {
            var failure, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        failure = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, amm_wallet.mint({
                                fixedLow: 1,
                                fixedHigh: 2,
                                margin: 0,
                                notional: 5000000
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_12 = _a.sent();
                        failure = true;
                        expect(error_12 instanceof Error);
                        expect(error_12.message).toBe("No enough margin for this operation");
                        return [3 /*break*/, 4];
                    case 4:
                        expect(failure).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
