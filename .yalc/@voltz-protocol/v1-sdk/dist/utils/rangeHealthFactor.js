"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRangeHealthFactor = void 0;
var entities_1 = require("../entities");
var getRangeHealthFactor = function (fixedLow, fixedHigh, currentAPR) {
    if (fixedLow < currentAPR && currentAPR < fixedHigh) {
        if (0.15 * fixedHigh + 0.85 * fixedLow > currentAPR ||
            currentAPR > 0.85 * fixedHigh + 0.15 * fixedLow) {
            return entities_1.HealthFactorStatus.WARNING;
        }
        return entities_1.HealthFactorStatus.HEALTHY;
    }
    return entities_1.HealthFactorStatus.DANGER;
};
exports.getRangeHealthFactor = getRangeHealthFactor;
//# sourceMappingURL=rangeHealthFactor.js.map