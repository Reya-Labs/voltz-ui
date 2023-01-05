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
exports.decodeInfoPostSwap = exports.decodeInfoPostMint = exports.getReadableErrorMessage = void 0;
var ethers_1 = require("ethers");
var Factory_json_1 = require("../../ABIs/Factory.json");
var sentry_1 = require("../sentry");
var constants_1 = require("./constants");
var errorJson = __importStar(require("./errorMapping.json"));
var iface = new ethers_1.ethers.utils.Interface(Factory_json_1.abi);
var getErrorData = function (error) {
    try {
        if (typeof error.error.error.data.data === 'string') {
            return error.error.error.data.data;
        }
    }
    catch (_) { }
    try {
        if (typeof error.error.data.originalError.data === 'string') {
            return error.error.data.originalError.data;
        }
    }
    catch (_) { }
    try {
        if (typeof error.data.data.data === 'string') {
            return error.data.data.data;
        }
    }
    catch (_) { }
    try {
        if (typeof error.data.data === 'string') {
            return error.data.data;
        }
    }
    catch (_) { }
    try {
        if (typeof error.error.data === 'string') {
            return error.error.data;
        }
    }
    catch (_) { }
    try {
        if (typeof error.data === 'string') {
            return error.data;
        }
    }
    catch (_) { }
    console.error("Unknown error type. ".concat(error));
    sentry_1.sentryTracker.captureException(error);
    sentry_1.sentryTracker.captureMessage("Unknown error type. ".concat(error));
    throw new Error(constants_1.CRITICAL_ERROR_MESSAGE);
};
var getErrorSignature = function (error) {
    var reason = getErrorData(error);
    try {
        if (reason.startsWith('0x08c379a0')) {
            return 'Error';
        }
        var decodedError = iface.parseError(reason);
        var errSig = decodedError.signature.split('(')[0];
        return errSig;
    }
    catch (_a) {
        console.error("Failing to get error signature. ".concat(error));
        sentry_1.sentryTracker.captureException(error);
        sentry_1.sentryTracker.captureMessage("Failing to get error signature. ".concat(error));
        throw new Error(constants_1.CRITICAL_ERROR_MESSAGE);
    }
};
var getReadableErrorMessageWithoutSentry = function (error) {
    var errSig = getErrorSignature(error);
    if (errSig === 'Error') {
        var reason = getErrorData(error);
        try {
            // Remove the error signature
            var encodedMessage = reason.slice(0, 2).concat(reason.slice(10));
            var rawErrorMessage_1 = ethers_1.utils.defaultAbiCoder.decode(['string'], encodedMessage)[0];
            if (Object.keys(errorJson).some(function (e) { return e === rawErrorMessage_1; })) {
                return errorJson[rawErrorMessage_1];
            }
        }
        catch (_) { }
        return constants_1.CRITICAL_ERROR_MESSAGE;
    }
    try {
        return errorJson[errSig];
    }
    catch (_) { }
    return constants_1.CRITICAL_ERROR_MESSAGE;
};
var getReadableErrorMessage = function (error) {
    var message = getReadableErrorMessageWithoutSentry(error);
    sentry_1.sentryTracker.captureException(error);
    sentry_1.sentryTracker.captureMessage("Error message: ".concat(message));
    return message;
};
exports.getReadableErrorMessage = getReadableErrorMessage;
var decodeInfoPostMint = function (error) {
    var errSig = getErrorSignature(error);
    if (errSig === 'MarginLessThanMinimum') {
        var reason = getErrorData(error);
        var decodingResult = iface.decodeErrorResult(errSig, reason);
        return {
            marginRequirement: decodingResult.marginRequirement,
        };
    }
    sentry_1.sentryTracker.captureException(error);
    sentry_1.sentryTracker.captureMessage("Failing to get info post mint.");
    throw new Error((0, exports.getReadableErrorMessage)(error));
};
exports.decodeInfoPostMint = decodeInfoPostMint;
var decodeInfoPostSwap = function (error) {
    var errSig = getErrorSignature(error);
    if (errSig === 'MarginRequirementNotMet') {
        var reason = getErrorData(error);
        var decodingResult = iface.decodeErrorResult(errSig, reason);
        return {
            marginRequirement: decodingResult.marginRequirement,
            tick: decodingResult.tick,
            fee: decodingResult.cumulativeFeeIncurred,
            availableNotional: decodingResult.variableTokenDelta,
            fixedTokenDelta: decodingResult.fixedTokenDelta,
            fixedTokenDeltaUnbalanced: decodingResult.fixedTokenDeltaUnbalanced,
        };
    }
    sentry_1.sentryTracker.captureException(error);
    sentry_1.sentryTracker.captureMessage("Failing to get info post swap.");
    throw new Error((0, exports.getReadableErrorMessage)(error));
};
exports.decodeInfoPostSwap = decodeInfoPostSwap;
//# sourceMappingURL=errorHandling.js.map