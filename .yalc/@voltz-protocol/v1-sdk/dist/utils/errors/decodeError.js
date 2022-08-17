"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandling_1 = require("./errorHandling");
var error = {
    data: "Reverted 0x43f2832100000000000000000000000000000000000000000000000000000000000075e0ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffede0ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb173d8000000000000000000000000000000000000000000000000000000000031a0330000000000000000000000000000000000000000000000000000000000001653ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb164c6",
};
console.log((0, errorHandling_1.getReadableErrorMessage)(error, 'KOVAN'));
