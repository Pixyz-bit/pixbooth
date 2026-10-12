import { useEffect, useRef } from 'react';
import FaceStickerPanel from './FaceStickerPanel.jsx';
import PhotoSettings from './PhotoSettings.jsx';
import Icon from '../common/Icon.jsx';
export default function CameraTools({ session }) {
  const root = useRef(null),
    stickers = useRef(null),
    settings = useRef(null);
  const keepNarrowPanelClear = (event, other) => {
    if (event.currentTarget.open && root.current.closest('.camera-frame-area').clientWidth < 620)
      other.current.open = false;
  };
  useEffect(() => {
    const frame = root.current.closest('.camera-frame-area');
    const observer = new ResizeObserver(() => {
      if (frame.clientWidth < 620 && stickers.current.open && settings.current.open)
        settings.current.open = false;
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);
  const dismiss = (event) => {
    if (event.key !== 'Escape') return;
    const panel = event.target.closest('.camera-tool');
    if (panel?.open) {
      event.preventDefault();
      event.stopPropagation();
      panel.open = false;
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
        ref={stickers}
        className="camera-tool camera-tool-stickers"
        onToggle={(event) => keepNarrowPanelClear(event, settings)}
      >
        <summary className="camera-tool-toggle" aria-label="Stickers" title="Stickers">
          <Icon name="sticker" size={24} />
        </summary>
        <div className="camera-tool-content">
          <FaceStickerPanel {...session} embedded />
        </div>
      </details>
      <details
        ref={settings}
        className="camera-tool camera-tool-settings"
        onToggle={(event) => keepNarrowPanelClear(event, stickers)}
      >
        <summary className="camera-tool-toggle" aria-label="Settings" title="Settings">
          <Icon name="settings" size={24} />
        </summary>
        <div className="camera-tool-content">
          <PhotoSettings {...session} embedded />
        </div>
      </details>
    </section>
  );
}
