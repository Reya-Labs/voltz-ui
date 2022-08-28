"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandling_1 = require("./errorHandling");
var error = {
    data: "0x6b4fff24000000000000000000000000000000000000000000000000000000000000193e",
};
console.log((0, errorHandling_1.getReadableErrorMessage)(error, 'KOVAN'));
