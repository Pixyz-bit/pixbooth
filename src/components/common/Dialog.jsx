import { useEffect, useId, useRef } from 'react';
export default function Dialog({ title, children, onClose, className = '', initialFocus }) {
  const dialog = useRef(null),
    titleId = useId();
  useEffect(() => {
    const previous = document.activeElement;
    const element = dialog.current;
    element.showModal();
    const focusTarget = initialFocus
      ? element.querySelector(initialFocus)
      : element.querySelector('button');
    focusTarget?.focus();
    return () => {
      element.close();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={'app-dialog ' + className}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) {
          const box = dialog.current.getBoundingClientRect();
          if (
            event.clientX < box.left ||
            event.clientX > box.right ||
            event.clientY < box.top ||
            event.clientY > box.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-heading">
        <h2 id={titleId}>{title}</h2>
        <button className="dialog-close" aria-label="Close dialog" onClick={onClose}>
          <svg
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="m5 5 10 10M15 5 5 15" />
          </svg>
        </button>
      </div>
      {children}
    </dialog>
  );
}
