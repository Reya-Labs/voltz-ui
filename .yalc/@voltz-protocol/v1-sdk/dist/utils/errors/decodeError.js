"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandling_1 = require("./errorHandling");
var error = {
    data: "Reverted 0x798f045e0000000000000000000000000000000000000000000000000000000000000000",
};
console.log((0, errorHandling_1.getReadableErrorMessage)(error, 'KOVAN'));
