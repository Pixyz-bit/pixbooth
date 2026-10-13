import { useEffect, useId, useRef, useState } from 'react';
import FaceStickerPanel from './FaceStickerPanel.jsx';
import PhotoSettings from './PhotoSettings.jsx';
import Icon from '../common/Icon.jsx';

const mobileToolsQuery = '(max-width: 899px), (max-height: 419px)';

export default function CameraTools({ session }) {
  const root = useRef(null);
  const id = useId();
  const [openPanels, setOpenPanels] = useState({ stickers: false, settings: false });

  const needsSinglePanel = () =>
    window.matchMedia(mobileToolsQuery).matches ||
    root.current.closest('.camera-frame-area').clientWidth < 620;

  useEffect(() => {
    const frame = root.current.closest('.camera-frame-area');
    const media = window.matchMedia(mobileToolsQuery);
    const reconcile = () => {
      if (media.matches || frame.clientWidth < 620)
        setOpenPanels((current) =>
          current.stickers && current.settings ? { ...current, settings: false } : current
        );
    };
    const observer = new ResizeObserver(reconcile);
    observer.observe(frame);
    media.addEventListener('change', reconcile);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', reconcile);
    };
  }, []);

  const toggle = (event, panel) => {
    event.preventDefault();
    const exclusive = needsSinglePanel();
    setOpenPanels((current) => {
      const opening = !current[panel];
      return exclusive && opening
        ? { stickers: panel === 'stickers', settings: panel === 'settings' }
        : { ...current, [panel]: opening };
    });
  };

  const dismiss = (event) => {
    if (event.key !== 'Escape') return;
    const panel = event.target.closest('.camera-tool');
    if (panel?.open) {
      event.preventDefault();
      event.stopPropagation();
      setOpenPanels((current) => ({ ...current, [panel.dataset.tool]: false }));
      panel.querySelector('summary').focus();
    }
  };

  return (
    <section
      ref={root}
      className="camera-tools capture-tools"
      aria-label="Camera tools"
      onKeyDown={dismiss}
    >
      <details
        className="camera-tool camera-tool-stickers"
        data-tool="stickers"
        open={openPanels.stickers}
      >
        <summary
          className="camera-tool-toggle"
          aria-label="Stickers"
          title="Stickers"
          aria-expanded={openPanels.stickers}
          aria-controls={id + '-stickers'}
          onClick={(event) => toggle(event, 'stickers')}
        >
          <Icon name="sticker" size={24} />
        </summary>
        <div className="camera-tool-content" id={id + '-stickers'}>
          <FaceStickerPanel {...session} embedded />
        </div>
      </details>
      <details
        className="camera-tool camera-tool-settings"
        data-tool="settings"
        open={openPanels.settings}
      >
        <summary
          className="camera-tool-toggle"
          aria-label="Settings"
          title="Settings"
          aria-expanded={openPanels.settings}
          aria-controls={id + '-settings'}
          onClick={(event) => toggle(event, 'settings')}
        >
          <Icon name="settings" size={24} />
        </summary>
        <div className="camera-tool-content" id={id + '-settings'}>
          <PhotoSettings {...session} embedded />
        </div>
      </details>
    </section>
  );
}
