"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initializable__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
            },
        ],
        name: "Initialized",
        type: "event",
    },
];
var Initializable__factory = /** @class */ (function () {
    function Initializable__factory() {
    }
    Initializable__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    Initializable__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    Initializable__factory.abi = _abi;
    return Initializable__factory;
}());
exports.Initializable__factory = Initializable__factory;
