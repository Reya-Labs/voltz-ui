"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndParseAddress = void 0;
var address_1 = require("@ethersproject/address");
var sentry_1 = require("./sentry");
/**
 * Validates an address and returns the parsed (checksummed) version of that address
 * @param address the unchecksummed hex address
 */
function validateAndParseAddress(address) {
    try {
        return (0, address_1.getAddress)(address);
    }
    catch (error) {
        sentry_1.sentryTracker.captureException(error);
        sentry_1.sentryTracker.captureMessage("".concat(address, " is not a valid address."));
        throw new Error("".concat(address, " is not a valid address."));
    }
}
exports.validateAndParseAddress = validateAndParseAddress;
//# sourceMappingURL=validateAndParseAddress.js.map