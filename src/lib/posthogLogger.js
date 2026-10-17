import posthog, { posthogEnabled, analyticsProperties } from './posthog.js';

export function logPosthogInfo(message, attributes) {
  if (posthogEnabled) posthog.logger.info(message, { ...attributes, ...analyticsProperties });
}
