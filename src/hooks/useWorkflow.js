import { useEffect, useRef, useState } from 'react';

function readPath() {
  // Keep old links such as /#/templates working.
  if (window.location.hash.startsWith('#/')) {
    return window.location.hash.slice(1).split('?')[0];
  }

  return window.location.pathname;
}

function resolvePage(path, completed, layoutChosen) {
  if (path === '/edit' && completed) return 'editor';

  if (['/booth', '/edit'].includes(path) && layoutChosen) {
    return 'booth';
  }

  if (['/templates', '/booth', '/edit'].includes(path)) {
    return 'templates';
  }

  return 'home';
}

export default function useWorkflow({
  completed,
  layoutChosen,
  onLeaveCapture,
}) {
  const [requestedPath, setRequestedPath] = useState(readPath);
  const [page, setPage] = useState(() =>
    resolvePage(readPath(), completed, layoutChosen)
  );

  const leaveCapture = useRef(onLeaveCapture);
  leaveCapture.current = onLeaveCapture;

  useEffect(() => {
    function updatePath() {
      setRequestedPath(readPath());
    }

    window.addEventListener('popstate', updatePath);
    window.addEventListener('pixbooth:navigate', updatePath);
    window.addEventListener('hashchange', updatePath);

    return () => {
      window.removeEventListener('popstate', updatePath);
      window.removeEventListener('pixbooth:navigate', updatePath);
      window.removeEventListener('hashchange', updatePath);
    };
  }, []);

  useEffect(() => {
    const next = resolvePage(requestedPath, completed, layoutChosen);

    const paths = {
      home: '/',
      templates: '/templates',
      booth: '/booth',
      editor: '/edit',
    };

    const path = paths[next];

    if (
      window.location.pathname !== path ||
      window.location.hash.startsWith('#/')
    ) {
      window.history.replaceState(
        null,
        '',
        path + window.location.search
      );
    }

    if (requestedPath !== path) {
      setRequestedPath(path);
    }

    setPage(next);

    if (next !== 'booth') {
      leaveCapture.current();
    }
  }, [requestedPath, completed, layoutChosen]);

  useEffect(() => {
    document.querySelector('main h1')?.focus();
  }, [page]);

  return { page, setPage };
}