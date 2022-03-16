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
exports.AaveFCMStorage__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
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
var _bytecode = "0x608060405234801561001057600080fd5b50610120806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632495a59914603757806392a88fa2146066575b600080fd5b6004546049906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b609d607136600460be565b600360208190526000918252604090912080546001820154600283015492909301549092919060ff1684565b6040805194855260208501939093529183015215156060820152608001605d565b60006020828403121560ce578081fd5b81356001600160a01b038116811460e3578182fd5b939250505056fea26469706673582212206cfdf00c225b8cb068985302a603537c67ad678b7a9a6dd752edd92bad0c742f64736f6c63430008040033";
var AaveFCMStorage__factory = /** @class */ (function (_super) {
    __extends(AaveFCMStorage__factory, _super);
    function AaveFCMStorage__factory() {
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
    AaveFCMStorage__factory.prototype.deploy = function (overrides) {
        return _super.prototype.deploy.call(this, overrides || {});
    };
    AaveFCMStorage__factory.prototype.getDeployTransaction = function (overrides) {
        return _super.prototype.getDeployTransaction.call(this, overrides || {});
    };
    AaveFCMStorage__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    AaveFCMStorage__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    AaveFCMStorage__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    AaveFCMStorage__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    AaveFCMStorage__factory.bytecode = _bytecode;
    AaveFCMStorage__factory.abi = _abi;
    return AaveFCMStorage__factory;
}(ethers_1.ContractFactory));
exports.AaveFCMStorage__factory = AaveFCMStorage__factory;
