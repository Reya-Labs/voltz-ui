"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeInfoPostSwap = exports.decodeInfoPostMint = exports.getReadableErrorMessage = exports.getErrorSignature = exports.extractErrorSignature = exports.errorMessageMapping = exports.iface = void 0;
var ethers_1 = require("ethers");
var factory = __importStar(require("./Factory.json"));
exports.iface = new ethers_1.ethers.utils.Interface(factory.abi);
exports.errorMessageMapping = {
    LOK: 'The pool has not been initialized yet',
    CanOnlyTradeIfUnlocked: 'The pool has not been initialized yet',
    closeToOrBeyondMaturity: 'The pool is close to or beyond maturity',
    TLU: 'Lower Fixed Rate must be smaller than Upper Fixed Rate',
    TLM: 'Lower Fixed Rate is too low',
    TUM: 'Upper Fixed Rate is too high',
    'only sender or approved integration': 'No approval to act on this address behalf',
    'MS or ME': 'No approval to act on this address behalf',
    'only msg.sender or approved can mint': 'No approval to act on this address behalf',
    'E<=S': 'Internal error: The timestamps of the pool are not correct',
    'B.T<S': 'Internal error: Operations need current timestamp to be before maturity',
    'endTime must be >= currentTime': 'Internal error: Operations need current timestamp to be before maturity',
    'parameters not set': 'Internal error: Margin Calculator parameters not set',
    SPL: 'No notional available in that direction',
    MarginRequirementNotMet: 'No enough margin for this operation',
    NP: 'Active positions should have positive liquidity',
    LO: 'Internal Error: Liquidity exceeds maximum amount per tick',
    'not enough liquidity to burn': 'Not enough liquidity to burn',
    PositionNotSettled: 'The position needs to be settled first',
    WithdrawalExceedsCurrentMargin: 'No enough margin to withdraw',
    MarginLessThanMinimum: 'No enough margin for this operation',
    InvalidMarginDelta: 'Amount of notional must be greater than 0!',
    LiquidityDeltaMustBePositiveInMint: 'Internal error: Liquidity for mint should be positive',
    LiquidityDeltaMustBePositiveInBurn: 'Internal error: Liquidity for burn should be positive',
    IRSNotionalAmountSpecifiedMustBeNonZero: 'Amount of notional must be greater than 0!',
    'tick must be properly spaced': 'Internal error: Ticks must be properly spaced!',
    TSOFLOW: 'Internal error: Timestamp overflows',
    'already settled': 'Position already settled',
    'from > to': 'Internal error: Rates disorder when getting rate in the rate oracle',
    'Misordered dates': 'Internal error: Rates disorder when getting apy in the rate oracle',
    UNITS: 'Internal error: Timestamps not initialized when getting variable factor',
    '>216': 'Internal error: Observation overflows in the rate oracle',
    'New size of oracle buffer should be positive': 'New size of oracle buffer should be positive',
    OLD: 'Internal error: Rate oracle not matured enough',
    'x must be > 0': 'Internal error: the value must be positive in BitMath',
    'SafeMath: addition overflow': 'Internal error: addition overflow',
    'SafeMath: subtraction overflow': 'ERC20: transfer amount exceeds balance',
    'SafeMath: multiplication overflow': 'Internal error: multiplication overflow',
    'ERC20: transfer from the zero address': 'Internal error: ERC20: transfer from the zero address',
    'ERC20: transfer to the zero address': 'Internal error: ERC20: transfer to the zero address',
    'ERC20: transfer amount exceeds balance': 'ERC20: transfer amount exceeds balance',
    'ERC20: mint to the zero address': 'ERC20: mint to the zero address',
    'ERC20: burn from the zero address': 'ERC20: burn from the zero address',
    'ERC20: burn amount exceeds balance': 'ERC20: burn amount exceeds balance',
    'ERC20: approve from the zero address': 'ERC20: approve from the zero address',
    'ERC20: approve to the zero address': 'ERC20: approve to the zero address',
    CT_CALLER_MUST_BE_LENDING_POOL: 'Internal error: Caller must lending pool',
    CT_INVALID_MINT_AMOUNT: 'Internal error: Invalid aToken amount to mint',
    CT_INVALID_BURN_AMOUNT: 'Internal error: Invalid aToken amount to burn',
    'Division by zero': 'Internal error: Division by zero in aToken',
    overflow: 'Internal error: Overflow in aToken',
    'overflow in toUint160': 'Internal error: Overflow when casting to Uint160',
    'overflow in toInt128': 'Internal error: Overflow when casting to Int128',
    'overflow in toInt256': 'Internal error: Overflow when casting to Int256',
    'denominator underflows': 'Internal error: Denominator underflows in SqrtPriceMath',
    'starting px must be > quotient': 'Internal error: Next price should be higher than current price in SqrtPriceMath',
    'starting price must be > 0': 'Internal error: Starting price not initialized in SqrtPriceMath',
    'liquidity must be > 0': 'Internal error: Liquidity must be positive in tick range',
    'tick outside of range': 'Internal error: Tick outside of range in TickMath',
    'price outside of range': 'Internal error: Price outside of range in TickMath',
    'Wad Ray Math: 49': 'Internal error: addition overflow in WadRayMath',
    'Wad Ray Math: 50': 'Internal error: division by zero in WadRayMath',
    /// @dev No need to unwind a net zero position
    PositionNetZero: 'No need to unwind a net zero position',
    /// The position/trader needs to be below the liquidation threshold to be liquidated
    CannotLiquidate: 'Position is not liquidatable',
    /// Only the position/trade owner can update the LP/Trader margin
    OnlyOwnerCanUpdatePosition: 'No approval to update this position',
    OnlyVAMM: 'No approval for this operation',
    OnlyFCM: 'No approval for this operation',
    /// Positions and Traders cannot be settled before the applicable interest rate swap has matured
    CannotSettleBeforeMaturity: 'Cannot settle before maturity',
    /// @dev There are not enough funds available for the requested operation
    NotEnoughFunds: 'No enough funds to perform this operation',
    /// @dev The two values were expected to have oppostite sigs, but do not
    ExpectedOppositeSigns: 'Internal error',
    /// @dev Error which is reverted if the sqrt price of the vamm is non-zero before a vamm is initialized
    ExpectedSqrtPriceZeroBeforeInit: 'Internal error',
    /// @dev only the margin engine can run a certain function
    OnlyMarginEngine: 'No approval for this operation',
    /// The resulting margin does not meet minimum requirements
    MarginRequirementNotMetFCM: 'No enough margin to perform this operation',
    /// @dev getReserveNormalizedIncome returned zero for underlying asset. Oracle only supports active Aave-V2 assets.
    AavePoolGetReserveNormalizedIncomeReturnedZero: 'Internal error',
    /// @dev currentTime < queriedTime
    OOO: 'Internal error',
};
var extractErrorSignature = function (message) {
    // eslint-disable-next-line no-restricted-syntax
    for (var errSig in exports.errorMessageMapping) {
        if (message.includes(errSig)) {
            return errSig;
        }
    }
    throw new Error('Unrecognized error signature');
};
exports.extractErrorSignature = extractErrorSignature;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var getErrorSignature = function (error, environment) {
    switch (environment) {
        case 'LOCALHOST_SDK': {
            try {
                var message = error.message;
                var errSig = (0, exports.extractErrorSignature)(message);
                return errSig;
            }
            catch (_a) {
                throw new Error('Unrecognized error type');
            }
        }
        case 'LOCALHOST_UI': {
            try {
                var message = error.data.message;
                var errSig = (0, exports.extractErrorSignature)(message);
                return errSig;
            }
            catch (_b) {
                throw new Error('Unrecognized error type');
            }
        }
        case 'PROD': {
            try {
                var reason = error.data.toString().replace('Reverted ', '');
                if (reason.startsWith('0x08c379a0')) {
                    return 'Error';
                }
                var decodedError = exports.iface.parseError(reason);
                var errSig = decodedError.signature.split('(')[0];
                return errSig;
            }
            catch (_c) {
                throw new Error('Unrecognized error type');
            }
        }
        default: {
            throw new Error('Unrecognized network for decoding errors');
        }
    }
};
exports.getErrorSignature = getErrorSignature;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var getReadableErrorMessage = function (error, environment) {
    var errSig = (0, exports.getErrorSignature)(error, environment);
    if (errSig === 'Error') {
        var reason = error.data.toString().replace('Reverted ', '');
        reason = "0x".concat(reason.substring(10));
        try {
            var rawErrorMessage = ethers_1.utils.defaultAbiCoder.decode(['string'], reason)[0];
            if (rawErrorMessage in exports.errorMessageMapping) {
                return exports.errorMessageMapping[rawErrorMessage];
            }
            return "Unrecognized error (Raw error: ".concat(rawErrorMessage, ")");
        }
        catch (_) {
            return 'Unrecognized error';
        }
    }
    if (errSig in exports.errorMessageMapping) {
        return exports.errorMessageMapping[errSig];
    }
    return 'Unrecognized error';
};
exports.getReadableErrorMessage = getReadableErrorMessage;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var decodeInfoPostMint = function (error, environment) {
    var errSig = (0, exports.getErrorSignature)(error, environment);
    if (errSig === 'MarginLessThanMinimum') {
        switch (environment) {
            case 'LOCALHOST_SDK': {
                try {
                    var message = error.message;
                    var args = message
                        .split(errSig)[1]
                        .split('(')[1]
                        .split(')')[0]
                        .replaceAll(' ', '')
                        .split(',');
                    var result = { marginRequirement: ethers_1.BigNumber.from(args[0]) };
                    return result;
                }
                catch (_a) {
                    throw new Error('Unrecognized error type');
                }
            }
            case 'LOCALHOST_UI': {
                try {
                    var message = error.data.message;
                    var args = message
                        .split(errSig)[1]
                        .split('(')[1]
                        .split(')')[0]
                        .replaceAll(' ', '')
                        .split(',');
                    var result = { marginRequirement: ethers_1.BigNumber.from(args[0]) };
                    return result;
                }
                catch (_b) {
                    throw new Error('Unrecognized error type');
                }
            }
            case 'PROD': {
                try {
                    var reason = error.data.toString().replace('Reverted ', '');
                    var decodingResult = exports.iface.decodeErrorResult(errSig, reason);
                    var result = {
                        marginRequirement: decodingResult.marginRequirement,
                    };
                    return result;
                }
                catch (_c) {
                    throw new Error('Unrecognized error type');
                }
            }
            default: {
                throw new Error('Unrecognized network for decoding errors');
            }
        }
    }
    if (errSig in exports.errorMessageMapping) {
        throw new Error(exports.errorMessageMapping[errSig]);
    }
    throw new Error('Unrecognized error');
};
exports.decodeInfoPostMint = decodeInfoPostMint;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var decodeInfoPostSwap = function (error, environment) {
    var errSig = (0, exports.getErrorSignature)(error, environment);
    if (errSig === 'MarginRequirementNotMet') {
        switch (environment) {
            case 'LOCALHOST_SDK': {
                try {
                    var message = error.message;
                    var args = message
                        .split(errSig)[1]
                        .split('(')[1]
                        .split(')')[0]
                        .replaceAll(' ', '')
                        .split(',');
                    var result = {
                        marginRequirement: ethers_1.BigNumber.from(args[0]),
                        tick: parseInt(args[1], 10),
                        fee: ethers_1.BigNumber.from(args[4]),
                        availableNotional: ethers_1.BigNumber.from(args[3]),
                        fixedTokenDeltaUnbalanced: ethers_1.BigNumber.from(args[5]),
                    };
                    return result;
                }
                catch (_a) {
                    throw new Error('Unrecognized error type');
                }
            }
            case 'LOCALHOST_UI': {
                try {
                    var message = error.data.message;
                    var args = message
                        .split(errSig)[1]
                        .split('(')[1]
                        .split(')')[0]
                        .replaceAll(' ', '')
                        .split(',');
                    var result = {
                        marginRequirement: ethers_1.BigNumber.from(args[0]),
                        tick: parseInt(args[1], 10),
                        fee: ethers_1.BigNumber.from(args[4]),
                        availableNotional: ethers_1.BigNumber.from(args[3]),
                        fixedTokenDeltaUnbalanced: ethers_1.BigNumber.from(args[5]),
                    };
                    return result;
                }
                catch (_b) {
                    throw new Error('Unrecognized error type');
                }
            }
            case 'PROD': {
                try {
                    var reason = error.data.toString().replace('Reverted ', '');
                    var decodingResult = exports.iface.decodeErrorResult(errSig, reason);
                    var result = {
                        marginRequirement: decodingResult.marginRequirement,
                        tick: decodingResult.tick,
                        fee: decodingResult.cumulativeFeeIncurred,
                        availableNotional: decodingResult.variableTokenDelta,
                        fixedTokenDeltaUnbalanced: decodingResult.fixedTokenDeltaUnbalanced,
                    };
                    return result;
                }
                catch (_c) {
                    throw new Error('Unrecognized error type');
                }
            }
            default: {
                throw new Error('Unrecognized network for decoding errors');
            }
        }
    }
    if (errSig in exports.errorMessageMapping) {
        throw new Error(exports.errorMessageMapping[errSig]);
    }
    throw new Error('Unrecognized error');
};
exports.decodeInfoPostSwap = decodeInfoPostSwap;
