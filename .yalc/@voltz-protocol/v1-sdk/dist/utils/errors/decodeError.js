"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandling_1 = require("./errorHandling");
var error = {
    data: "Reverted 0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000034f4c440000000000000000000000000000000000000000000000000000000000",
};
console.log((0, errorHandling_1.getReadableErrorMessage)(error, 'KOVAN'));
