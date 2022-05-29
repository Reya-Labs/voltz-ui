"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapProtocolIdToProtocol = function (protocolId) {
    if (protocolId === 1) {
        return 'AAVE V2';
    }
    if (protocolId === 2) {
        return 'COMPOUND';
    }
    throw new Error('No protocol recognized');
};
exports.default = mapProtocolIdToProtocol;
