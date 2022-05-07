"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandling_1 = require("./errorHandling");
var error = {
    data: 'Reverted 0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001e656e6454696d65206d757374206265203e3d2063757272656e7454696d650000',
};
console.log((0, errorHandling_1.getReadableErrorMessage)(error, 'KOVAN'));
