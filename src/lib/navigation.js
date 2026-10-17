export function navigate(path) {
  if (window.location.pathname !== path || window.location.hash) {
    window.history.pushState(null, '', path);
  }

  window.dispatchEvent(new Event('pixbooth:navigate'));
}

export function navigateLink(event) {
  // Keep Ctrl-click, new tabs, and other normal link behavior.
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  navigate(event.currentTarget.getAttribute('href'));
}