"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedAndVariableMath__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [],
        name: "ONE_HUNDRED_IN_WAD",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "SECONDS_IN_YEAR_IN_WAD",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
var _bytecode = "0x60aa610038600b82828239805160001a607314602b57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe7300000000000000000000000000000000000000003014608060405260043610603d5760003560e01c8063652ec9bf146042578063cee7121f146063575b600080fd5b605168056bc75e2d6310000081565b60405190815260200160405180910390f35b60516a1a1601fc4ea7109e0000008156fea2646970667358221220fb1e03919d29534049b53c99c83e501c5bd417434c2e25ca932ae67d57728d3e64736f6c63430008090033";
var FixedAndVariableMath__factory = /** @class */ (function (_super) {
    __extends(FixedAndVariableMath__factory, _super);
    function FixedAndVariableMath__factory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        if (args.length === 1) {
            _this = _super.call(this, _abi, _bytecode, args[0]) || this;
        }
        else {
            _this = _super.apply(this, args) || this;
        }
        return _this;
    }
    FixedAndVariableMath__factory.prototype.deploy = function (overrides) {
        return _super.prototype.deploy.call(this, overrides || {});
    };
    FixedAndVariableMath__factory.prototype.getDeployTransaction = function (overrides) {
        return _super.prototype.getDeployTransaction.call(this, overrides || {});
    };
    FixedAndVariableMath__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    FixedAndVariableMath__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    FixedAndVariableMath__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    FixedAndVariableMath__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    FixedAndVariableMath__factory.bytecode = _bytecode;
    FixedAndVariableMath__factory.abi = _abi;
    return FixedAndVariableMath__factory;
}(ethers_1.ContractFactory));
exports.FixedAndVariableMath__factory = FixedAndVariableMath__factory;
