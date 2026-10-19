export default function CaptureMode({ mode, templateLocked, mp4Supported, setMode }) {
  return (
    <div className="capture-mode" role="group" aria-label="Capture mode">
      <button
        className={mode === 'photo' ? 'active' : ''}
        aria-pressed={mode === 'photo'}
        disabled={templateLocked}
        onClick={() => setMode('photo')}
      >
        Photo
      </button>
      <button
        className={mode === 'live' ? 'active' : ''}
        aria-pressed={mode === 'live'}
        disabled={templateLocked || mp4Supported !== true}
        onClick={() => setMode('live')}
        title={
          mp4Supported === false
            ? 'MP4 encoding is unavailable in this browser. Try current Chrome, Edge or Safari.'
            : undefined
        }
      >
        Live · 7 sec
      </button>
    </div>
  );
}
