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
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableMaturedWeights = exports.closeOrPastMaturity = void 0;
var constants_1 = require("../../../constants");
var closeOrPastMaturity = function (timestampMS) {
    return Date.now().valueOf() + constants_1.DEPOSIT_WINDOW > timestampMS;
};
exports.closeOrPastMaturity = closeOrPastMaturity;
var disableMaturedWeights = function (config) {
    return __assign(__assign({}, config), { MELLOW_ROUTERS: config.MELLOW_ROUTERS.map(function (router) {
            return __assign(__assign({}, router), { metadata: __assign(__assign({}, router.metadata), { vaults: router.metadata.vaults.map(function (vault) {
                        return __assign(__assign({}, vault), { weight: (0, exports.closeOrPastMaturity)(vault.maturityTimestampMS) ? 0 : vault.weight });
                    }) }) });
        }) });
};
exports.disableMaturedWeights = disableMaturedWeights;
//# sourceMappingURL=utils.js.map