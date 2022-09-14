"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.redeemBadge = void 0;
var constants_1 = require("../constants");
var typechain_1 = require("../typechain");
var resultsJson = __importStar(require("./results.json")); // Input provided by the SDK
var redeemBadge = function (badgesAddress, signer, season, simulation) { return __awaiter(void 0, void 0, void 0, function () {
    var badgesContract, address, metadata, ls, index, i, metadataURI, approval, position, error_1, estimatedGas, tx, receipt, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                badgesContract = typechain_1.ERC721LeaderboardNFT__factory.connect(badgesAddress, signer);
                return [4 /*yield*/, signer.getAddress()];
            case 1:
                address = _a.sent();
                if (season in Object.keys(resultsJson)) {
                    ls = resultsJson[season];
                    index = -1;
                    for (i = 0; i < ls.length; i += 1) {
                        if (ls[i].address.toLowerCase() === address.toLowerCase()) {
                            index = i;
                        }
                    }
                    if (index === -1) {
                        return [2 /*return*/, {
                                status: 'FAIL',
                                error: "No such address in this season ".concat(address.toLowerCase(), "."),
                            }];
                    }
                    metadata = ls[index];
                }
                else {
                    return [2 /*return*/, {
                            status: 'FAIL',
                            error: "No such season ".concat(season, "."),
                        }];
                }
                metadataURI = metadata.metadataURI, approval = metadata.approval, position = metadata.position;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, badgesContract.callStatic.redeem(address, metadataURI, position.toString(), season, approval)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, {
                        status: 'FAIL',
                        error: 'Simulation failed',
                    }];
            case 5:
                if (simulation) {
                    return [2 /*return*/, {
                            status: 'SUCCESS',
                        }];
                }
                _a.label = 6;
            case 6:
                _a.trys.push([6, 10, , 11]);
                return [4 /*yield*/, badgesContract.estimateGas.redeem(address, metadataURI, position.toString(), season, approval)];
            case 7:
                estimatedGas = _a.sent();
                return [4 /*yield*/, badgesContract.redeem(address, metadataURI, position.toString(), season, approval, {
                        gasLimit: (0, constants_1.getGasBuffer)(estimatedGas),
                    })];
            case 8:
                tx = _a.sent();
                return [4 /*yield*/, tx.wait()];
            case 9:
                receipt = _a.sent();
                return [2 /*return*/, {
                        status: 'SUCCESS',
                        receipt: receipt,
                    }];
            case 10:
                error_2 = _a.sent();
                return [2 /*return*/, {
                        status: 'FAIL',
                        error: 'Transaction failed',
                    }];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.redeemBadge = redeemBadge;
