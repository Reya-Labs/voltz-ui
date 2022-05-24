"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nearestUsableTick_1 = require("./nearestUsableTick");
var tickMath_1 = require("./tickMath");
describe('#nearestUsableTick', function () {
    it('throws if tickSpacing is 0', function () {
        expect(function () { return (0, nearestUsableTick_1.nearestUsableTick)(1, 0); }).toThrow('TICK_SPACING');
    });
    it('throws if tickSpacing is negative', function () {
        expect(function () { return (0, nearestUsableTick_1.nearestUsableTick)(1, -5); }).toThrow('TICK_SPACING');
    });
    it('throws if either is non-integer', function () {
        expect(function () { return (0, nearestUsableTick_1.nearestUsableTick)(1.5, 1); }).toThrow('INTEGERS');
        expect(function () { return (0, nearestUsableTick_1.nearestUsableTick)(1, 1.5); }).toThrow('INTEGERS');
    });
    it('throws if tick is greater than TickMath.MAX_TICK', function () {
        expect(function () { return (0, nearestUsableTick_1.nearestUsableTick)(tickMath_1.TickMath.MAX_TICK + 1, 1); }).toThrow('TICK_BOUND');
        expect(function () { return (0, nearestUsableTick_1.nearestUsableTick)(tickMath_1.TickMath.MIN_TICK - 1, 1); }).toThrow('TICK_BOUND');
    });
    it('rounds at positive half', function () {
        expect((0, nearestUsableTick_1.nearestUsableTick)(5, 10)).toEqual(10);
    });
    it('rounds down below positive half', function () {
        expect((0, nearestUsableTick_1.nearestUsableTick)(4, 10)).toEqual(0);
    });
    it('rounds up for negative half', function () {
        expect((0, nearestUsableTick_1.nearestUsableTick)(-5, 10)).toEqual(-0);
    });
    it('rounds up for negative half', function () {
        expect((0, nearestUsableTick_1.nearestUsableTick)(-6, 10)).toEqual(-10);
    });
    it('cannot round past MIN_TICK', function () {
        expect((0, nearestUsableTick_1.nearestUsableTick)(tickMath_1.TickMath.MIN_TICK, tickMath_1.TickMath.MAX_TICK / 2 + 100)).toEqual(-(tickMath_1.TickMath.MAX_TICK / 2 + 100));
    });
    it('cannot round past MAX_TICK', function () {
        expect((0, nearestUsableTick_1.nearestUsableTick)(tickMath_1.TickMath.MAX_TICK, tickMath_1.TickMath.MAX_TICK / 2 + 100)).toEqual(tickMath_1.TickMath.MAX_TICK / 2 + 100);
    });
});
