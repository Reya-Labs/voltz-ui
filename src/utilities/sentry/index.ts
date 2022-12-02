import {
  BrowserClient,
  defaultIntegrations,
  defaultStackParser,
  makeFetchTransport,
} from '@sentry/react';

const environment = window.location.host;
export const sentryTracker = new BrowserClient({
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
});
