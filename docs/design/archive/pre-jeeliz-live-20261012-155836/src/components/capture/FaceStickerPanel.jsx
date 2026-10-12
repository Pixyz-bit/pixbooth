import Chevron from '../common/Chevron.jsx';
import StickerPicker from './StickerPicker.jsx';
export default function FaceStickerPanel({
  sticker,
  setSticker,
  busy,
  completed,
  cameraActive,
  face,
}) {
  return (
    <details className="sticker-panel panel" open>
      <summary>
        <span>Face stickers</span>
        <Chevron />
      </summary>
      <div className="sticker-content">
        <StickerPicker selected={sticker} onSelect={setSticker} disabled={busy || completed} />
        <p className="sticker-status" role="status" aria-live="polite">
          {sticker === 'none'
            ? 'Choose a sticker to wear in your photos.'
            : !cameraActive
              ? 'Switch on the camera to use your sticker.'
              : face.state === 'loading'
                ? 'Loading face tracking…'
                : face.state === 'tracking'
                  ? 'Face found. Your sticker is ready.'
                  : face.state === 'error'
                    ? 'Face tracking couldn’t load. Retry or choose None.'
                    : 'Face the camera to place your sticker.'}
        </p>
        {face.state === 'error' && (
          <button className="text-button" onClick={face.retry}>
            Retry face tracking
          </button>
        )}
      </div>
    </details>
  );
}
