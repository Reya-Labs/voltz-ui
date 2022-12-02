import {
  BrowserClient,
  defaultIntegrations,
  defaultStackParser,
  makeFetchTransport,
} from '@sentry/react';

const environment = window.location.host;
let sentryTracker: BrowserClient | null = null;
export const initSentryTracker = () =>
  (sentryTracker = new BrowserClient({
    environment,
    enabled: environment.indexOf('localhost') === -1,
    dsn: process.env.SENTRY_DSN,
    release: process.env.SENTRY_RELEASE,
    transport: makeFetchTransport,
    stackParser: defaultStackParser,
    integrations: defaultIntegrations,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  }));

export const getSentryTracker = () => {
  if (!sentryTracker) {
    throw new Error('Sentry tracker is not setup!');
  }
  return sentryTracker;
};
