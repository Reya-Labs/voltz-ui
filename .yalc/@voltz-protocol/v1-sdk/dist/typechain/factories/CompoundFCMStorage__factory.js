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
exports.CompoundFCMStorage__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [],
        name: "paused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "traders",
        outputs: [
            {
                internalType: "uint256",
                name: "marginInScaledYieldBearingTokens",
                type: "uint256",
            },
            {
                internalType: "int256",
                name: "fixedTokenBalance",
                type: "int256",
            },
            {
                internalType: "int256",
                name: "variableTokenBalance",
                type: "int256",
            },
            {
                internalType: "bool",
                name: "isSettled",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "underlyingToken",
        outputs: [
            {
                internalType: "contract IERC20Minimal",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
var _bytecode = "0x608060405234801561001057600080fd5b5061015c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632495a599146100465780635c975abb1461007657806392a88fa21461009a575b600080fd5b600454610059906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b60045461008a90600160a01b900460ff1681565b604051901515815260200161006d565b6100d46100a83660046100f6565b600360208190526000918252604090912080546001820154600283015492909301549092919060ff1684565b604080519485526020850193909352918301521515606082015260800161006d565b60006020828403121561010857600080fd5b81356001600160a01b038116811461011f57600080fd5b939250505056fea26469706673582212203bad3db0e9da7e7168a35c8818a4e0fa08503f17bd9fab0dd2d945e67fc53d6c64736f6c63430008090033";
var CompoundFCMStorage__factory = /** @class */ (function (_super) {
    __extends(CompoundFCMStorage__factory, _super);
    function CompoundFCMStorage__factory() {
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
    CompoundFCMStorage__factory.prototype.deploy = function (overrides) {
        return _super.prototype.deploy.call(this, overrides || {});
    };
    CompoundFCMStorage__factory.prototype.getDeployTransaction = function (overrides) {
        return _super.prototype.getDeployTransaction.call(this, overrides || {});
    };
    CompoundFCMStorage__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    CompoundFCMStorage__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    CompoundFCMStorage__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    CompoundFCMStorage__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    CompoundFCMStorage__factory.bytecode = _bytecode;
    CompoundFCMStorage__factory.abi = _abi;
    return CompoundFCMStorage__factory;
}(ethers_1.ContractFactory));
exports.CompoundFCMStorage__factory = CompoundFCMStorage__factory;
