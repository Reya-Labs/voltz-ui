"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentryTracker = void 0;
var browser_1 = require("@sentry/browser");
exports.sentryTracker = new browser_1.BrowserClient({
    dsn: 'https://c170b1643b064f2cb57b2204e1e3bf5f@o4504239616294912.ingest.sentry.io/4504247590060032',
    transport: browser_1.makeFetchTransport,
    stackParser: browser_1.defaultStackParser,
    integrations: browser_1.defaultIntegrations,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});
