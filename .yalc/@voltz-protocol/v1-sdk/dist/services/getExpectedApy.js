"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpectedApy = void 0;
var constants_1 = require("../constants");
var getAnnualizedTime = function (start, end) {
    return (end - start) / constants_1.ONE_YEAR_IN_SECONDS;
};
var getExpectedApy = function (current, // current timestamp in seconds
end, // end timestamp in seconds
uft, // unbalanced fixed token balance
vt, // variable token balance
margin, // margin until the current timestamp (margin + accrued cashflow)
predictedApr) {
    // (rate[end]/rate[current])^(YEAR / (end-current)) - 1 = APY(current, end)
    // rate[end]/rate[current] = (APY(current, end) + 1)^((end - current)/YEAR)
    // rate[end]/rate[current] - 1 = (APY(current, end) + 1)^((end - current)/YEAR) - 1
    var vf = Math.pow((1 + predictedApr), getAnnualizedTime(current, end)) - 1;
    // cashflow = uft * (end - current) / YEAR * 0.01 + vt * (rate[end]/rate[current] - 1)
    var ecs = uft * getAnnualizedTime(current, end) * 0.01 + vt * vf;
    // PNL = (1 + estimated cashflow / margin so far) ^ (YEAR / (end - current)) - 1
    var pnl = (ecs / margin) * (1 / getAnnualizedTime(current, end));
    return [pnl, ecs];
};
exports.getExpectedApy = getExpectedApy;
