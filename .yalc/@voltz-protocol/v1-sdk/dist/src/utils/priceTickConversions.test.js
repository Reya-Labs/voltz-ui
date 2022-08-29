"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var price_1 = require("../entities/fractions/price");
var priceTickConversions_1 = require("./priceTickConversions");
describe('priceTickConversions', function () {
    describe('#tickToPrice', function () {
        it('price is 1', function () {
            expect((0, priceTickConversions_1.tickToPrice)(0).toSignificant(5)).toEqual('1');
        });
        it('price is 2.7181', function () {
            expect((0, priceTickConversions_1.tickToPrice)(10000).toSignificant(5)).toEqual('2.7181');
        });
        it('price is 0.36789', function () {
            expect((0, priceTickConversions_1.tickToPrice)(-10000).toSignificant(5)).toEqual('0.3679');
        });
    });
    describe('#priceToClosestTick', function () {
        // NOTE: the first argument to the Price constructor is the denominator and the second one is the numerator
        it('tick 10000', function () {
            expect((0, priceTickConversions_1.priceToClosestTick)(new price_1.Price(3679, 10000))).toEqual(9999); // investigate if this can be an issue
        });
        it('tick -10000', function () {
            expect((0, priceTickConversions_1.priceToClosestTick)(new price_1.Price(10000, 3679))).toEqual(-10000);
        });
        describe('reciprocal with tickToPrice', function () {
            it('tick -10000', function () {
                expect((0, priceTickConversions_1.priceToClosestTick)((0, priceTickConversions_1.tickToPrice)(-10000))).toEqual(-10000);
            });
            it('tick 10000', function () {
                expect((0, priceTickConversions_1.priceToClosestTick)((0, priceTickConversions_1.tickToPrice)(10000))).toEqual(10000);
            });
            it('tick 0', function () {
                expect((0, priceTickConversions_1.priceToClosestTick)((0, priceTickConversions_1.tickToPrice)(0))).toEqual(0);
            });
            it('tick 30000', function () {
                expect((0, priceTickConversions_1.priceToClosestTick)((0, priceTickConversions_1.tickToPrice)(30000))).toEqual(30000);
            });
            it('tick -30000', function () {
                expect((0, priceTickConversions_1.priceToClosestTick)((0, priceTickConversions_1.tickToPrice)(-30000))).toEqual(-30000);
            });
        });
    });
    describe('#fixedRateToPrice', function () {
        it("10000/3679", function () {
            expect((0, priceTickConversions_1.fixedRateToPrice)(new price_1.Price(10000, 3679))).toEqual(new price_1.Price(3679, 10000));
        });
        it("3679/10000", function () {
            expect((0, priceTickConversions_1.fixedRateToPrice)(new price_1.Price(3679, 10000))).toEqual(new price_1.Price(10000, 3679));
        });
    });
    describe("#tickToFixedRate", function () {
        it('fixed rate is 1, price is also 1', function () {
            expect((0, priceTickConversions_1.tickToFixedRate)(0).toSignificant(5)).toEqual('1');
        });
        it('price is 2.7181, fixed rate is 0.3679 %', function () {
            expect((0, priceTickConversions_1.tickToFixedRate)(10000).toSignificant(5)).toEqual('0.3679');
        });
        it('price is 0.36789, fixed rate is 2.7181 %', function () {
            expect((0, priceTickConversions_1.tickToFixedRate)(-10000).toSignificant(5)).toEqual('2.7181');
        });
    });
    describe("#fixedRateToTheClosestTick", function () {
        it('tick 10000', function () {
            expect((0, priceTickConversions_1.fixedRateToClosestTick)(new price_1.Price(10000, 3679))).toEqual(9999); // investigate if this can be an issue
        });
        it('tick -10000', function () {
            expect((0, priceTickConversions_1.fixedRateToClosestTick)(new price_1.Price(3679, 10000))).toEqual(-10000);
        });
        describe('reciprocal with tickToFixedRate', function () {
            it('tick -10000', function () {
                expect((0, priceTickConversions_1.fixedRateToClosestTick)((0, priceTickConversions_1.tickToFixedRate)(-10000))).toEqual(-10000);
            });
            it('tick 10000', function () {
                expect((0, priceTickConversions_1.fixedRateToClosestTick)((0, priceTickConversions_1.tickToFixedRate)(10000))).toEqual(10000);
            });
            it('tick 0', function () {
                expect((0, priceTickConversions_1.fixedRateToClosestTick)((0, priceTickConversions_1.tickToFixedRate)(0))).toEqual(0);
            });
            it('tick 30000', function () {
                expect((0, priceTickConversions_1.fixedRateToClosestTick)((0, priceTickConversions_1.tickToFixedRate)(30000))).toEqual(30000);
            });
            it('tick -30000', function () {
                expect((0, priceTickConversions_1.fixedRateToClosestTick)((0, priceTickConversions_1.tickToFixedRate)(-30000))).toEqual(-30000);
            });
        });
    });
    describe("#priceToFixedRate", function () {
        it('10000/3679', function () {
            expect((0, priceTickConversions_1.priceToFixedRate)(new price_1.Price(10000, 3679))).toEqual((new price_1.Price(3679, 10000)));
        });
    });
});
