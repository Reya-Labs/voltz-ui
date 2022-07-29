"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandling_1 = require("./errorHandling");
var error = {
    data: "Reverted 0x43f2832100000000000000000000000000000000000000000000000002dcc710bfcf5199ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcddd00000000000000000000000000000000000000000000000032ea6f8f16ebf476fffffffffffffffffffffffffffffffffffffffffffffffff21f494c589c0000000000000000000000000000000000000000000000000000000471bc2be37138000000000000000000000000000000000000000000000000321761547f1cc45b",
};
console.log((0, errorHandling_1.getReadableErrorMessage)(error, 'KOVAN'));
