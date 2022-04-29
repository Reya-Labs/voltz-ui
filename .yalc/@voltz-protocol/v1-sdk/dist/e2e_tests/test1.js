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
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var src_1 = require("../../src");
var tickMath_1 = require("../../src/utils/tickMath");
var setup = function () { return __awaiter(void 0, void 0, void 0, function () {
    var vammAddress, marginEngineAddress, provider, privateKey, wallet, other, ammWallet, ammOther, fixedLows, fixedHighs, notionals, i, fixedLow, fixedHigh, notional, mintMarginRequirement, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                vammAddress = '0xe451980132e65465d0a498c53f0b5227326dd73f';
                marginEngineAddress = '0x75537828f2ce51be7289709686a69cbfdbb714f1';
                provider = new ethers_1.providers.JsonRpcProvider('http://0.0.0.0:8545/');
                privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
                wallet = new ethers_1.Wallet(privateKey, provider);
                other = new ethers_1.Wallet('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', provider);
                ammWallet = new src_1.AMM({
                    id: vammAddress,
                    signer: wallet,
                    provider: provider,
                    createdTimestamp: '1646856471',
                    fcmAddress: '0x5392a33f7f677f59e833febf4016cddd88ff9e67',
                    liquidity: '0',
                    marginEngineAddress: marginEngineAddress,
                    rateOracle: new src_1.RateOracle({
                        id: '0x0165878a594ca255338adfa4d48449f69242eb8f',
                        protocolId: 1,
                    }),
                    underlyingToken: new src_1.Token({
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
                ammOther = new src_1.AMM({
                    id: vammAddress,
                    signer: other,
                    provider: provider,
                    createdTimestamp: '1646856471',
                    fcmAddress: '0x5392a33f7f677f59e833febf4016cddd88ff9e67',
                    liquidity: '0',
                    marginEngineAddress: marginEngineAddress,
                    rateOracle: new src_1.RateOracle({
                        id: '0x0165878a594ca255338adfa4d48449f69242eb8f',
                        protocolId: 1,
                    }),
                    underlyingToken: new src_1.Token({
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
                fixedLows = [2, 7, 5, 10, 11];
                fixedHighs = [12, 10, 9, 15, 45];
                notionals = [500000, 40000, 30000, 600000, 1000000];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 100)) return [3 /*break*/, 7];
                console.log("step " + i.toString());
                fixedLow = fixedLows[i % fixedLows.length];
                fixedHigh = fixedHighs[i % fixedHighs.length];
                notional = notionals[i % notionals.length];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, ammWallet.getMinimumMarginRequirementPostMint({
                        fixedLow: fixedLow,
                        fixedHigh: fixedHigh,
                        margin: 0,
                        notional: notional,
                    })];
            case 3:
                mintMarginRequirement = (_a.sent());
                return [4 /*yield*/, ammWallet.mint({
                        fixedLow: fixedLow,
                        fixedHigh: fixedHigh,
                        margin: mintMarginRequirement,
                        notional: notional,
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1.message);
                if (error_1.message.toString().includes("Cannot read properties of undefined")) {
                    return [3 /*break*/, 7];
                }
                return [3 /*break*/, 6];
            case 6:
                i += 1;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}); };
setup();
