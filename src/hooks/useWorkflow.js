import { useEffect, useRef, useState } from 'react';
export default function useWorkflow({ completed, layoutChosen, onLeaveCapture }) {
  const [page, setPage] = useState(
    ['/templates', '/booth', '/edit'].includes(location.hash.slice(1)) ? 'templates' : 'home'
  );
  const leaveCapture = useRef(onLeaveCapture);
  leaveCapture.current = onLeaveCapture;
  useEffect(() => {
    document.querySelector('main h1')?.focus();
  }, [page]);
  useEffect(() => {
    function route() {
      const requested = location.hash.slice(1);
      const next =
        requested === '/edit' && completed
          ? 'editor'
          : ['/booth', '/edit'].includes(requested) && layoutChosen
            ? 'booth'
            : ['/templates', '/booth', '/edit'].includes(requested)
              ? 'templates'
              : 'home';
      const path =
        next === 'editor'
          ? '/edit'
          : next === 'booth'
            ? '/booth'
            : next === 'templates'
              ? '/templates'
              : '/';
      if (requested !== path) history.replaceState(null, '', `#${path}`);
      setPage(next);
      if (next !== 'booth') leaveCapture.current();
    }
    route();
    window.addEventListener('hashchange', route);
    return () => window.removeEventListener('hashchange', route);
  }, [completed, layoutChosen]);
  return {
    page,
    setPage,
  };
}
