"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsbi_1 = __importDefault(require("jsbi"));
var constants_1 = require("../../constants");
var token_1 = __importDefault(require("../token"));
var tokenAmount_1 = require("./tokenAmount");
var percent_1 = __importDefault(require("./percent"));
describe('TokenAmount', function () {
    var ADDRESS_ONE = '0x0000000000000000000000000000000000000001';
    describe('constructor', function () {
        it('works', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 18
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 100);
            expect(amount.quotient).toEqual(jsbi_1.default.BigInt(100));
        });
    });
    describe('#quotient', function () {
        it('returns the amount after multiplication', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 18
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 100).multiply(new percent_1.default(15, 100));
            expect(amount.quotient).toEqual(jsbi_1.default.BigInt(15));
        });
    });
    it('token amount can be max uint256', function () {
        var amount = tokenAmount_1.TokenAmount.fromRawAmount(new token_1.default({
            id: ADDRESS_ONE,
            name: "Voltz",
            decimals: 18
        }), constants_1.MaxUint256);
        expect(amount.quotient).toEqual(constants_1.MaxUint256);
    });
    it('token amount cannot exceed max uint256', function () {
        expect(function () {
            return tokenAmount_1.TokenAmount.fromRawAmount(new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 18
            }), jsbi_1.default.add(constants_1.MaxUint256, jsbi_1.default.BigInt(1)));
        }).toThrow('AMOUNT');
    });
    it('token amount quotient cannot exceed max uint256', function () {
        expect(function () {
            return tokenAmount_1.TokenAmount.fromFractionalAmount(new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 18
            }), jsbi_1.default.add(jsbi_1.default.multiply(constants_1.MaxUint256, jsbi_1.default.BigInt(2)), jsbi_1.default.BigInt(2)), jsbi_1.default.BigInt(2));
        }).toThrow('AMOUNT');
    });
    it('token amount numerator can be gt. uint256 if denominator is gt. 1', function () {
        var amount = tokenAmount_1.TokenAmount.fromFractionalAmount(new token_1.default({
            id: ADDRESS_ONE,
            name: "Voltz",
            decimals: 18
        }), jsbi_1.default.add(constants_1.MaxUint256, jsbi_1.default.BigInt(2)), 2);
        expect(amount.numerator).toEqual(jsbi_1.default.add(jsbi_1.default.BigInt(2), constants_1.MaxUint256));
    });
    describe('#toFixed', function () {
        it('throws for decimals > token.decimals', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 0
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 1000);
            expect(function () { return amount.toFixed(3); }).toThrow('DECIMALS');
        });
        it('is correct for 0 decimals', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 0
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 123456);
            expect(amount.toFixed(0)).toEqual('123456');
        });
        it('is correct for 18 decimals', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 18
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 1e15);
            expect(amount.toFixed(9)).toEqual('0.001000000');
        });
    });
    describe('#toSignificant', function () {
        it('does not throw for sig figs > token.decimals', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 0
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 1000);
            expect(amount.toSignificant(3)).toEqual('1000');
        });
        it('is correct for 0 decimals', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 0
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 123456);
            expect(amount.toSignificant(4)).toEqual('123400');
        });
        it('is correct for 18 decimals', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 18
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 1e15);
            expect(amount.toSignificant(9)).toEqual('0.001');
        });
    });
    describe('#toExact', function () {
        it('does not throw for sig figs > token.decimals', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 0
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 1000);
            expect(amount.toExact()).toEqual('1000');
        });
        it('is correct for 0 decimals', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 0
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 123456);
            expect(amount.toExact()).toEqual('123456');
        });
        it('is correct for 18 decimals', function () {
            var token = new token_1.default({
                id: ADDRESS_ONE,
                name: "Voltz",
                decimals: 18
            });
            var amount = tokenAmount_1.TokenAmount.fromRawAmount(token, 123e13);
            expect(amount.toExact()).toEqual('0.00123');
        });
    });
});
