"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMellowLPVaults = void 0;
var mellowLpRouter_1 = __importDefault(require("../mellowLpRouter"));
var mellowLpVault_1 = __importDefault(require("../mellowLpVault"));
var config_1 = require("./config");
var getMellowLPVaults = function (_a) {
    var network = _a.network, providerURL = _a.providerURL;
    var config = (0, config_1.getConfig)({
        network: network,
        providerURL: providerURL,
    });
    var vaults = config.MELLOW_VAULTS.filter(function (item) { return item.metadata.show; }).map(function (item) {
        var vault = new mellowLpVault_1.default({
            id: item.voltzVault,
            ethWrapperAddress: config.MELLOW_ETH_WRAPPER,
            erc20RootVaultAddress: item.erc20RootVault,
            provider: config.PROVIDER,
            metadata: __assign(__assign({}, item.metadata), { underlyingPools: item.metadata.vaults.reduce(function (allPools, currentVault) {
                    if (currentVault.weight > 0) {
                        var appendingPools = currentVault.pools.filter(function (p) { return !allPools.includes(p); });
                        return __spreadArray(__spreadArray([], allPools, true), appendingPools, true);
                    }
                    return allPools;
                }, []) }),
        });
        return vault;
    });
    var routers = config.MELLOW_ROUTERS.filter(function (item) { return item.metadata.show; }).map(function (item) {
        var vault = new mellowLpRouter_1.default({
            id: "mellow-".concat(item.metadata.token.toLowerCase()),
            mellowRouterAddress: item.router,
            provider: config.PROVIDER,
            metadata: __assign(__assign({}, item.metadata), { underlyingPools: item.metadata.vaults.reduce(function (allPools, currentVault) {
                    if (currentVault.weight > 0) {
                        var appendingPools = currentVault.pools.filter(function (p) { return !allPools.includes(p); });
                        return __spreadArray(__spreadArray([], allPools, true), appendingPools, true);
                    }
                    return allPools;
                }, []) }),
        });
        return vault;
    });
    return routers.concat(vaults);
};
exports.getMellowLPVaults = getMellowLPVaults;
//# sourceMappingURL=getMellowLPVaults.js.map