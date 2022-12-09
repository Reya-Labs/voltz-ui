"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubgraphBadges = void 0;
var client_1 = require("@apollo/client");
var helpers_1 = require("./helpers");
var sentry_1 = require("../sentry");
function getSubgraphBadges(_a) {
    var _b;
    var userId = _a.userId, seasonId = _a.seasonId, seasonStart = _a.seasonStart, seasonEnd = _a.seasonEnd, badgesSubgraphUrl = _a.badgesSubgraphUrl;
    return __awaiter(this, void 0, void 0, function () {
        var badgesResponse, badgeQuery, client, id, data, subgraphBadges, _i, subgraphBadges_1, badge, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    badgesResponse = [];
                    if (!badgesSubgraphUrl) return [3 /*break*/, 2];
                    badgeQuery = "\n                query( $id: String) {\n                    seasonUser(id: $id) {\n                        id\n                        badges {\n                        id\n                        awardedTimestamp\n                        mintedTimestamp\n                        badgeType\n                        }\n                    }\n                }\n            ";
                    client = new client_1.ApolloClient({
                        cache: new client_1.InMemoryCache(),
                        link: new client_1.HttpLink({ uri: badgesSubgraphUrl, fetch: fetch })
                    });
                    id = "".concat(userId.toLowerCase(), "#").concat(seasonId);
                    return [4 /*yield*/, client.query({
                            query: (0, client_1.gql)(badgeQuery),
                            variables: {
                                id: id,
                            },
                        })];
                case 1:
                    data = _c.sent();
                    subgraphBadges = (((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.seasonUser) ? data.data.seasonUser.badges : []);
                    for (_i = 0, subgraphBadges_1 = subgraphBadges; _i < subgraphBadges_1.length; _i++) {
                        badge = subgraphBadges_1[_i];
                        if (parseInt(badge.awardedTimestamp) > 0 || parseInt(badge.mintedTimestamp) > 0) {
                            badgesResponse.push({
                                id: badge.id,
                                badgeType: badge.badgeType,
                                awardedTimestampMs: (0, helpers_1.toMillis)(parseInt(badge.awardedTimestamp)),
                                mintedTimestampMs: (0, helpers_1.toMillis)(parseInt(badge.mintedTimestamp)),
                            });
                        }
                    }
                    _c.label = 2;
                case 2: return [2 /*return*/, badgesResponse];
                case 3:
                    error_1 = _c.sent();
                    sentry_1.sentryTracker.captureException(error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getSubgraphBadges = getSubgraphBadges;
