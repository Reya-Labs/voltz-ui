"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickList = void 0;
var jsbi_1 = __importDefault(require("jsbi"));
var tiny_invariant_1 = __importDefault(require("tiny-invariant"));
var constants_1 = require("../constants");
var isSorted_1 = require("./isSorted");
function tickComparator(a, b) {
    return a.index - b.index;
}
/**
 * Utility methods for interacting with sorted lists of ticks
 */
var TickList = /** @class */ (function () {
    /**
     * Cannot be constructed
     */
    function TickList() {
    }
    TickList.validateList = function (ticks, tickSpacing) {
        (0, tiny_invariant_1.default)(tickSpacing > 0, 'TICK_SPACING_NONZERO');
        // ensure ticks are spaced appropriately
        (0, tiny_invariant_1.default)(ticks.every(function (_a) {
            var index = _a.index;
            return index % tickSpacing === 0;
        }), 'TICK_SPACING');
        // ensure tick liquidity deltas sum to 0
        (0, tiny_invariant_1.default)(jsbi_1.default.equal(ticks.reduce(function (accumulator, _a) {
            var liquidityNet = _a.liquidityNet;
            return jsbi_1.default.add(accumulator, liquidityNet);
        }, constants_1.ZERO), constants_1.ZERO), 'ZERO_NET');
        (0, tiny_invariant_1.default)((0, isSorted_1.isSorted)(ticks, tickComparator), 'SORTED');
    };
    TickList.isBelowSmallest = function (ticks, tick) {
        (0, tiny_invariant_1.default)(ticks.length > 0, 'LENGTH');
        return tick < ticks[0].index;
    };
    TickList.isAtOrAboveLargest = function (ticks, tick) {
        (0, tiny_invariant_1.default)(ticks.length > 0, 'LENGTH');
        return tick >= ticks[ticks.length - 1].index;
    };
    TickList.getTick = function (ticks, index) {
        var tick = ticks[this.binarySearch(ticks, index)];
        (0, tiny_invariant_1.default)(tick.index === index, 'NOT_CONTAINED');
        return tick;
    };
    /**
     * Finds the largest tick in the list of ticks that is less than or equal to tick
     * @param ticks list of ticks
     * @param tick tick to find the largest tick that is less than or equal to tick
     * @private
     */
    TickList.binarySearch = function (ticks, tick) {
        (0, tiny_invariant_1.default)(!this.isBelowSmallest(ticks, tick), 'BELOW_SMALLEST');
        var l = 0;
        var r = ticks.length - 1;
        var i;
        while (true) {
            i = Math.floor((l + r) / 2);
            if (ticks[i].index <= tick && (i === ticks.length - 1 || ticks[i + 1].index > tick)) {
                return i;
            }
            if (ticks[i].index < tick) {
                l = i + 1;
            }
            else {
                r = i - 1;
            }
        }
    };
    TickList.nextInitializedTick = function (ticks, tick, lte) {
        if (lte) {
            (0, tiny_invariant_1.default)(!TickList.isBelowSmallest(ticks, tick), 'BELOW_SMALLEST');
            if (TickList.isAtOrAboveLargest(ticks, tick)) {
                return ticks[ticks.length - 1];
            }
            var index_1 = this.binarySearch(ticks, tick);
            return ticks[index_1];
        }
        (0, tiny_invariant_1.default)(!this.isAtOrAboveLargest(ticks, tick), 'AT_OR_ABOVE_LARGEST');
        if (this.isBelowSmallest(ticks, tick)) {
            return ticks[0];
        }
        var index = this.binarySearch(ticks, tick);
        return ticks[index + 1];
    };
    TickList.nextInitializedTickWithinOneWord = function (ticks, tick, lte, tickSpacing) {
        var compressed = Math.floor(tick / tickSpacing); // matches rounding in the code
        if (lte) {
            var wordPos_1 = compressed >> 8;
            var minimum = (wordPos_1 << 8) * tickSpacing;
            if (TickList.isBelowSmallest(ticks, tick)) {
                return [minimum, false];
            }
            var index_2 = TickList.nextInitializedTick(ticks, tick, lte).index;
            var nextInitializedTick_1 = Math.max(minimum, index_2);
            return [nextInitializedTick_1, nextInitializedTick_1 === index_2];
        }
        var wordPos = (compressed + 1) >> 8;
        var maximum = (((wordPos + 1) << 8) - 1) * tickSpacing;
        if (this.isAtOrAboveLargest(ticks, tick)) {
            return [maximum, false];
        }
        var index = this.nextInitializedTick(ticks, tick, lte).index;
        var nextInitializedTick = Math.min(maximum, index);
        return [nextInitializedTick, nextInitializedTick === index];
    };
    return TickList;
}());
exports.TickList = TickList;
//# sourceMappingURL=tickList.js.map