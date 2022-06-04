"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandling_1 = require("./errorHandling");
var error = {
    data: "Reverted 0xbfc66394",
};
console.log((0, errorHandling_1.getReadableErrorMessage)(error, 'KOVAN'));
