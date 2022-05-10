"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapProtocolIdToProtocol = function (protocolId) {
    if (protocolId === 1) {
        return 'AAVE V2';
    }
    if (protocolId === 2) {
        return 'COMPOUND';
    }
    return 'AAVE V2';
};
exports.default = mapProtocolIdToProtocol;
