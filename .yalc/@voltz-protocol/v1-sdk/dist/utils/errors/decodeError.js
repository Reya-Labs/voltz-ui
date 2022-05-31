"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandling_1 = require("./errorHandling");
var error = {
    data: "Reverted 0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000017636c6f7365546f4f724265796f6e644d61747572697479000000000000000000",
};
console.log((0, errorHandling_1.getReadableErrorMessage)(error, 'PROD'));
