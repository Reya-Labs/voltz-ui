"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var luxon_1 = require("luxon");
var timestampWadToDateTime = function (wad) {
    var wadString = wad.toString();
    var truncated = wadString.substring(0, wadString.length - 15);
    return luxon_1.DateTime.fromMillis(parseInt(truncated, 10));
};
exports.default = timestampWadToDateTime;
