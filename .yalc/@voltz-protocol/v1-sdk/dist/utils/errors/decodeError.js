"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandling_1 = require("./errorHandling");
var error = {
    data: "Reverted 0x43f283210000000000000000000000000000000000000000000000000000000000001b58ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed78ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedc83100000000000000000000000000000000000000000000000000000000000b73bd0000000000000000000000000000000000000000000000000000000000000526ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedc3ed",
};
console.log((0, errorHandling_1.getReadableErrorMessage)(error, 'KOVAN'));
