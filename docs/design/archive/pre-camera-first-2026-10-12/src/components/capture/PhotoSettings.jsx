import Icon from '../common/Icon.jsx';
export default function PhotoSettings({
  busy,
  completed,
  delay,
  setDelay,
  mirror,
  setMirror,
  devices,
  deviceId,
  status,
  openCamera,
}) {
  return (
    <details className="settings-panel" open>
      <summary>
        <span>
          <Icon name="timer" size={18} />
          Photo settings
        </span>
        <svg
          className="settings-chevron"
          aria-hidden="true"
          viewBox="0 0 20 20"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m5 7 5 5 5-5" />
        </svg>
      </summary>
      <div className="session-settings" aria-label="Photo controls">
        <fieldset disabled={busy || completed}>
          <legend>
            <Icon name="timer" />
            Countdown
          </legend>
          <div className="segmented">
            {[0, 3, 5].map((seconds) => (
              <button
                key={seconds}
                aria-pressed={delay === seconds}
                onClick={() => setDelay(seconds)}
              >
                {seconds ? `${seconds} sec` : 'Off'}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="mirror-row">
          <div>
            <span className="setting-label">
              <Icon name="mirror" />
              Mirror photo
            </span>
            <p className="setting-note">Match the preview.</p>
          </div>
          <button
            className={`switch ${mirror ? 'on' : ''}`}
            role="switch"
            aria-checked={mirror}
            aria-label="Mirror photo"
            disabled={busy || completed}
            onClick={() => setMirror(!mirror)}
          >
            <span />
          </button>
        </div>
        {devices.length > 1 && (
          <label className="camera-select">
            Camera
            <select
              value={deviceId}
              disabled={busy || status !== 'ready'}
              onChange={(e) => openCamera(e.target.value)}
            >
              {devices.map((device, index) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${index + 1}`}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </details>
  );
}
