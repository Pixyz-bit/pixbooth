import posthog from 'posthog-js';

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;
export const analyticsProperties = { app: 'pixbooth', environment: import.meta.env.MODE };
export const posthogEnabled = Boolean(typeof window !== 'undefined' && posthogKey && posthogHost);

if (!posthogEnabled) {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const missingVariable = !posthogKey ? 'VITE_POSTHOG_KEY' : 'VITE_POSTHOG_HOST';
    throw new Error(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`
    );
  }
} else {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    ui_host: 'https://us.posthog.com',
    autocapture: false,
    disable_session_recording: true,
    capture_pageview: false,
    before_send: (event) => {
      if (event) event.properties = { ...event.properties, ...analyticsProperties };
      return event;
    },
    loaded: (client) => {
      client.register(analyticsProperties);
      const capturePage = () => {
        const route = window.location.pathname;
        client.capture('$pageview', {
          route,
$current_url: window.location.origin + route,        });
      };
      capturePage();
window.addEventListener('pixbooth:navigate', capturePage);
window.addEventListener('popstate', capturePage);    },
    defaults: '2026-05-30',
    logs: {
      serviceName: 'pixbooth-web',
      environment: import.meta.env.MODE,
    },
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
  });
}

export default posthog;
