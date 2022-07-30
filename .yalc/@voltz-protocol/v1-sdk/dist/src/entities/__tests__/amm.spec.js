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
var typechain_1 = require("../../typechain");
var price_1 = require("../fractions/price");
var tokenAmount_1 = require("../fractions/tokenAmount");
var jsbi_1 = __importDefault(require("jsbi"));
describe('amm', function () {
    describe('amm init', function () {
        var amm_wallet, amm_other;
        var wallet, other;
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var vammAddress, marginEngineAddress, provider, privateKey, vammContract;
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
                vammContract = typechain_1.VAMM__factory.connect(vammAddress, wallet);
                return [2 /*return*/];
            });
        }); });
        it.skip('fcm', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fixedLow, fixedHigh, mint_req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fixedLow = 1;
                        fixedHigh = 2;
                        return [4 /*yield*/, amm_wallet.getMinimumMarginRequirementPostMint({
                                fixedLow: fixedLow,
                                fixedHigh: fixedHigh,
                                margin: 0,
                                notional: 100000,
                            })];
                    case 1:
                        mint_req = (_a.sent());
                        console.log('pre-mint req', mint_req);
                        return [4 /*yield*/, amm_wallet.mint({
                                fixedLow: fixedLow,
                                fixedHigh: fixedHigh,
                                margin: mint_req + 10,
                                notional: 100000,
                            })];
                    case 2:
                        _a.sent();
                        console.log('mint done');
                        return [4 /*yield*/, amm_other.FCMSwap({
                                notional: 50000,
                            })];
                    case 3:
                        _a.sent();
                        console.log('fcm swap done');
                        return [4 /*yield*/, amm_other.FCMUnwind({
                                notionalToUnwind: 50000,
                            })];
                    case 4:
                        _a.sent();
                        console.log('fcm unwind done');
                        return [4 /*yield*/, amm_other.FCMSwap({
                                notional: 50000,
                            })];
                    case 5:
                        _a.sent();
                        console.log('fcm swap 2 done');
                        return [2 /*return*/];
                }
            });
        }); });
        it.skip('fcm settlement', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, amm_other.settleFCMTrader()];
                    case 1:
                        _a.sent();
                        console.log('fcm settlement done');
                        return [2 /*return*/];
                }
            });
        }); });
        it('mints and swaps', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fixedLowMinter, fixedHighMinter, fixedLowSwapper, fixedHighSwapper, mint_req, underlyingToken, _notionalFraction, _notionalTA, _notional, _a, swap_req, swap_notional, swap_fee, swap_slippage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fixedLowMinter = 8;
                        fixedHighMinter = 12;
                        fixedLowSwapper = 3;
                        fixedHighSwapper = 6;
                        return [4 /*yield*/, amm_wallet.getMinimumMarginRequirementPostMint({
                                fixedLow: fixedLowMinter,
                                fixedHigh: fixedHighMinter,
                                margin: 0,
                                notional: 100000,
                            })];
                    case 1:
                        mint_req = (_b.sent());
                        console.log('pre-mint req', mint_req);
                        underlyingToken = new token_1.default({
                            id: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
                            name: 'Voltz',
                            decimals: 18,
                        });
                        _notionalFraction = price_1.Price.fromNumber(100000.5);
                        _notionalTA = tokenAmount_1.TokenAmount.fromFractionalAmount(underlyingToken, _notionalFraction.numerator, _notionalFraction.denominator);
                        console.log('_notionalTA', jsbi_1.default.toNumber(_notionalTA.numerator), jsbi_1.default.toNumber(_notionalTA.denominator));
                        _notional = _notionalTA.scale();
                        console.log(_notional.toString());
                        return [4 /*yield*/, amm_wallet.mint({
                                fixedLow: fixedLowMinter,
                                fixedHigh: fixedHighMinter,
                                margin: mint_req + 10,
                                notional: 100000
                            })];
                    case 2:
                        _b.sent();
                        console.log('mint done');
                        return [4 /*yield*/, amm_other.getInfoPostSwap({
                                isFT: false,
                                notional: 50000,
                                fixedLow: fixedLowSwapper,
                                fixedHigh: fixedHighSwapper,
                            })];
                    case 3:
                        _a = (_b.sent()), swap_req = _a.marginRequirement, swap_notional = _a.availableNotional, swap_fee = _a.fee, swap_slippage = _a.slippage;
                        console.log('pre-swap req', swap_req);
                        console.log('pre-swap notional', swap_notional);
                        console.log('pre-swap fee', swap_fee);
                        console.log('pre-swap slippage', swap_slippage);
                        return [4 /*yield*/, amm_other.swap({
                                isFT: false,
                                notional: 50000,
                                fixedLow: fixedLowSwapper,
                                fixedHigh: fixedHighSwapper,
                                margin: swap_req + 10,
                            })];
                    case 4:
                        _b.sent();
                        console.log('swap done');
                        return [2 /*return*/];
                }
            });
        }); });
        it.skip('liquidation thresholds', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fixedLowMinter, fixedHighMinter, fixedLowSwapper, fixedHighSwapper, liquidation_threshold_position, liquidation_threshold_trader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fixedLowMinter = 1;
                        fixedHighMinter = 2;
                        fixedLowSwapper = 3;
                        fixedHighSwapper = 6;
                        return [4 /*yield*/, amm_other.getLiquidationThreshold({
                                owner: wallet.address,
                                fixedLow: fixedLowMinter,
                                fixedHigh: fixedHighMinter,
                            })];
                    case 1:
                        liquidation_threshold_position = (_a.sent());
                        console.log('liquidation threshold position', liquidation_threshold_position);
                        return [4 /*yield*/, amm_other.getLiquidationThreshold({
                                owner: other.address,
                                fixedLow: fixedLowSwapper,
                                fixedHigh: fixedHighSwapper,
                            })];
                    case 2:
                        liquidation_threshold_trader = (_a.sent());
                        console.log('liquidation threshold trader', liquidation_threshold_trader);
                        return [2 /*return*/];
                }
            });
        }); });
        it.skip('settle positions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fixedLowMinter, fixedHighMinter, fixedLowSwapper, fixedHighSwapper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fixedLowMinter = 1;
                        fixedHighMinter = 2;
                        fixedLowSwapper = 3;
                        fixedHighSwapper = 6;
                        console.log('settling position...');
                        return [4 /*yield*/, amm_wallet.settlePosition({
                                owner: wallet.address,
                                fixedLow: fixedLowMinter,
                                fixedHigh: fixedHighMinter,
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, amm_other.settlePosition({
                                owner: other.address,
                                fixedLow: fixedLowSwapper,
                                fixedHigh: fixedHighSwapper,
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
