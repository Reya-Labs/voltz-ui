"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApolloClient = void 0;
var client_1 = require("@apollo/client");
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var getApolloClient = function (uri) {
    var client = new client_1.ApolloClient({
        cache: new client_1.InMemoryCache(),
        link: new client_1.HttpLink({ uri: uri, fetch: cross_fetch_1.default }),
    });
    return client;
};
exports.getApolloClient = getApolloClient;
//# sourceMappingURL=getApolloClient.js.map