export default function CaptureIntro({ template, mode, templateLocked, mp4Supported, setMode }) {
  return (
    <>
      <div className="intro booth-intro">
        <div>
          <h1 tabIndex="-1">Strike a pose!</h1>
          <p>
            {template.name} · {template.count} {mode === 'live' ? 'five-second clips' : 'photos'}.
            Capture your moments, then make them yours.
          </p>
        </div>
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
            Live · 5 sec
          </button>
        </div>
      </div>
      {mp4Supported === false && (
        <p className="compatibility-note">
          Live MP4 needs a browser with H.264 recording. Photo mode is ready to use.
        </p>
      )}
    </>
  );
}
