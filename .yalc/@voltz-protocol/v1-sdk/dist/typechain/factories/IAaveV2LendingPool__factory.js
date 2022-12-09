"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAaveV2LendingPool__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "contract IERC20Minimal",
                name: "asset",
                type: "address",
            },
        ],
        name: "getReserveData",
        outputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "data",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct IAaveV2LendingPool.ReserveConfigurationMap",
                        name: "configuration",
                        type: "tuple",
                    },
                    {
                        internalType: "uint128",
                        name: "liquidityIndex",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "variableBorrowIndex",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "currentLiquidityRate",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "currentVariableBorrowRate",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "currentStableBorrowRate",
                        type: "uint128",
                    },
                    {
                        internalType: "uint40",
                        name: "lastUpdateTimestamp",
                        type: "uint40",
                    },
                    {
                        internalType: "address",
                        name: "aTokenAddress",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "stableDebtTokenAddress",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "variableDebtTokenAddress",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "interestRateStrategyAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint8",
                        name: "id",
                        type: "uint8",
                    },
                ],
                internalType: "struct IAaveV2LendingPool.ReserveData",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IERC20Minimal",
                name: "underlyingAsset",
                type: "address",
            },
        ],
        name: "getReserveNormalizedIncome",
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
        inputs: [
            {
                internalType: "contract IERC20Minimal",
                name: "underlyingAsset",
                type: "address",
            },
        ],
        name: "getReserveNormalizedVariableDebt",
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
        inputs: [
            {
                internalType: "contract IERC20Minimal",
                name: "asset",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "withdraw",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var IAaveV2LendingPool__factory = /** @class */ (function () {
    function IAaveV2LendingPool__factory() {
    }
    IAaveV2LendingPool__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    IAaveV2LendingPool__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    IAaveV2LendingPool__factory.abi = _abi;
    return IAaveV2LendingPool__factory;
}());
exports.IAaveV2LendingPool__factory = IAaveV2LendingPool__factory;
